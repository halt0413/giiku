import {
  date,
  doublePrecision,
  pgTable,
  text,
  timestamp,
  integer
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  password: text('password').notNull(),
  created_at: date('created_at').defaultNow(),
});

export const event = pgTable('event', {
  id: text('id').primaryKey(),
  host_user: text('host_user')
    .notNull()
    .references(() => users.id),
  location_name: text('location_name').notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  meeting_time: text('meeting_time').notNull(),
  minute: integer('minute').notNull(),
  penalty: integer('penalty').notNull(),
  members: text('members').array().default([]),
});
