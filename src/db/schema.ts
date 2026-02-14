import { pgTable, uuid, varchar, doublePrecision, text, timestamp, boolean, jsonb, integer, date, index } from 'drizzle-orm/pg-core';

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
