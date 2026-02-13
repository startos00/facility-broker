import { pgTable, uuid, varchar, doublePrecision, text, timestamp, boolean, jsonb, index } from 'drizzle-orm/pg-core';

export const properties = pgTable('properties', {
  id: uuid('id').defaultRandom().primaryKey(),
  nodeName: varchar('node_name', { length: 255 }).notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  typology: varchar('typology', { length: 50 }).notNull(),
  priceEstimate: varchar('price_estimate', { length: 100 }),
  notes: text('notes'),
  photoUrl: text('photo_url'),
  ipHash: varchar('ip_hash', { length: 64 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  isVisible: boolean('is_visible').default(true).notNull(),
}, (table) => [
  index('idx_properties_location').on(table.latitude, table.longitude),
  index('idx_properties_visible').on(table.isVisible, table.createdAt),
  index('idx_properties_ip_hash').on(table.ipHash, table.createdAt),
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
