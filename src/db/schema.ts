import { pgTable, uuid, varchar, doublePrecision, text, timestamp, boolean, jsonb, integer, date, index, decimal } from 'drizzle-orm/pg-core';

export const nodes = pgTable('nodes', {
  id: uuid('id').defaultRandom().primaryKey(),
  nodeName: varchar('node_name', { length: 255 }).notNull(),
  typology: varchar('typology', { length: 20 }).notNull(),
  description: text('description'),
  photoUrl: text('photo_url'),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  boundary: jsonb('boundary'),

  // Society fields
  population: integer('population'),
  vibe: varchar('vibe', { length: 100 }),
  nextEventDate: date('next_event_date'),

  // Asset fields
  acreage: varchar('acreage', { length: 50 }),
  price: integer('price'),
  zoning: varchar('zoning', { length: 100 }),
  editability: integer('editability'),
  isDistressed: boolean('is_distressed').default(false).notNull(),

  // Facility fields
  capacityPax: integer('capacity_pax'),
  internetSpeed: varchar('internet_speed', { length: 50 }),
  availability: varchar('availability', { length: 100 }),
  isFreeOffer: boolean('is_free_offer').default(false).notNull(),

  // Investor flag
  seekingCapital: boolean('seeking_capital').default(false).notNull(),
  capitalAmount: varchar('capital_amount', { length: 100 }),

  // Metadata
  ipHash: varchar('ip_hash', { length: 64 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  isVisible: boolean('is_visible').default(true).notNull(),
}, (table) => [
  index('idx_nodes_typology').on(table.typology, table.isVisible),
  index('idx_nodes_location').on(table.latitude, table.longitude),
  index('idx_nodes_ip_hash').on(table.ipHash, table.createdAt),
]);

export const amenities = pgTable('amenities', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  geometryType: varchar('geometry_type', { length: 20 }).notNull(),
  coordinates: jsonb('coordinates').notNull(),
  color: varchar('color', { length: 20 }).notNull(),
  icon: varchar('icon', { length: 50 }),
  city: varchar('city', { length: 100 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('idx_amenities_city').on(table.city),
]);

// ═══ CivicPattern: Engine A — The Archive ═══

export const archiveEntries = pgTable('archive_entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  country: varchar('country', { length: 100 }).notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),

  // Typology classification
  typologyTags: jsonb('typology_tags').notNull().$type<string[]>(),
  originalFunction: varchar('original_function', { length: 100 }),
  currentFunction: varchar('current_function', { length: 100 }),
  isConversion: boolean('is_conversion').default(false).notNull(),

  // Architectural metrics
  floorAreaSqm: decimal('floor_area_sqm', { precision: 12, scale: 2 }),
  publicPrivateRatio: decimal('public_private_ratio', { precision: 5, scale: 2 }),
  floorCount: integer('floor_count'),
  yearBuilt: integer('year_built'),
  yearConverted: integer('year_converted'),

  // Success metrics
  digitalFootprintScore: integer('digital_footprint_score'),
  activationScore: integer('activation_score'),
  annualVisitors: integer('annual_visitors'),

  // Media
  photoUrls: jsonb('photo_urls').$type<string[]>(),
  sourceUrl: text('source_url'),

  // Metadata
  submittedByIp: varchar('submitted_by_ip', { length: 64 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
}, (table) => [
  index('idx_archive_location').on(table.latitude, table.longitude),
  index('idx_archive_function').on(table.originalFunction, table.currentFunction),
  index('idx_archive_city').on(table.city, table.country),
]);

// ═══ CivicPattern: Engine C — The Site Scout ═══

export const ghostSites = pgTable('ghost_sites', {
  id: uuid('id').defaultRandom().primaryKey(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  boundary: jsonb('boundary'),

  // Detection data
  abandonmentProbability: decimal('abandonment_probability', { precision: 5, scale: 2 }).notNull(),
  vacancySince: date('vacancy_since'),
  lastKnownFunction: varchar('last_known_function', { length: 100 }),
  lotSizeSqm: decimal('lot_size_sqm', { precision: 12, scale: 2 }),
  ownershipType: varchar('ownership_type', { length: 50 }),

  // Condition signals
  ndviScore: decimal('ndvi_score', { precision: 5, scale: 3 }),
  nightLightScore: decimal('night_light_score', { precision: 5, scale: 3 }),
  hasBoardedWindows: boolean('has_boarded_windows'),
  lastReviewDate: date('last_review_date'),
  osmStatus: varchar('osm_status', { length: 50 }),

  // Address
  address: text('address'),
  city: varchar('city', { length: 100 }).notNull(),
  country: varchar('country', { length: 100 }).notNull(),

  // Metadata
  detectedAt: timestamp('detected_at', { withTimezone: true }).defaultNow().notNull(),
  lastScanned: timestamp('last_scanned', { withTimezone: true }).defaultNow().notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
}, (table) => [
  index('idx_ghost_location').on(table.latitude, table.longitude),
  index('idx_ghost_city').on(table.city, table.abandonmentProbability),
]);

// ═══ CivicPattern: Engine B — The Context Scanner ═══

export const neighborhoodAnalyses = pgTable('neighborhood_analyses', {
  id: uuid('id').defaultRandom().primaryKey(),
  centerLatitude: doublePrecision('center_latitude').notNull(),
  centerLongitude: doublePrecision('center_longitude').notNull(),
  radiusMeters: integer('radius_meters').default(800).notNull(),

  // Urban grain
  solidVoidRatio: decimal('solid_void_ratio', { precision: 5, scale: 2 }),
  intersectionsPerSqkm: integer('intersections_per_sqkm'),
  streetIntegrationScore: decimal('street_integration_score', { precision: 5, scale: 2 }),

  // Demographics
  populationInCatchment: integer('population_in_catchment'),
  medianAge: decimal('median_age', { precision: 4, scale: 1 }),
  medianIncome: integer('median_income'),
  youthPct: decimal('youth_pct', { precision: 5, scale: 2 }),
  elderlyPct: decimal('elderly_pct', { precision: 5, scale: 2 }),

  // Amenity gaps
  missingAmenities: jsonb('missing_amenities').$type<string[]>(),
  healthScore: integer('health_score'),
  diagnosisText: text('diagnosis_text'),

  // Cache
  computedAt: timestamp('computed_at', { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
}, (table) => [
  index('idx_neighborhood_center').on(table.centerLatitude, table.centerLongitude),
]);

// ═══ CivicPattern: Synthesis Loop ═══

export const reuseRecommendations = pgTable('reuse_recommendations', {
  id: uuid('id').defaultRandom().primaryKey(),
  ghostSiteId: uuid('ghost_site_id').references(() => ghostSites.id, { onDelete: 'cascade' }).notNull(),
  analysisId: uuid('analysis_id').references(() => neighborhoodAnalyses.id),

  // Recommendation
  suggestedFunction: varchar('suggested_function', { length: 255 }).notNull(),
  confidenceScore: decimal('confidence_score', { precision: 5, scale: 2 }).notNull(),
  rationale: text('rationale').notNull(),

  // Matched case studies
  caseStudyIds: jsonb('case_study_ids').$type<string[]>(),
  estimatedCostPerSqmLow: decimal('estimated_cost_per_sqm_low', { precision: 10, scale: 2 }),
  estimatedCostPerSqmHigh: decimal('estimated_cost_per_sqm_high', { precision: 10, scale: 2 }),

  // Metadata
  generatedAt: timestamp('generated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('idx_reuse_ghost').on(table.ghostSiteId),
]);

// ═══ CivicPattern: Data Ingestion Pipeline ═══

export const rawIngestion = pgTable('raw_ingestion', {
  id: uuid('id').defaultRandom().primaryKey(),
  source: varchar('source', { length: 50 }).notNull(),
  sourceId: text('source_id'),
  rawData: jsonb('raw_data').notNull(),
  name: varchar('name', { length: 255 }),
  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude'),
  status: varchar('status', { length: 20 }).default('staged').notNull(),
  promotedTo: uuid('promoted_to'),
  ingestedAt: timestamp('ingested_at', { withTimezone: true }).defaultNow().notNull(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
}, (table) => [
  index('idx_ingestion_status').on(table.status, table.ingestedAt),
  index('idx_ingestion_source').on(table.source, table.sourceId),
]);
