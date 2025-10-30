import { pgTable, text, date, uuid, foreignKey, timestamp, doublePrecision,  } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text("name"),
    password: text("password").notNull(),
    created_At: date("created_at"),
});

export const event = pgTable("event", 
    {
        id: uuid("id").primaryKey(),
        host_user: text("host_user").notNull().references(() => users.id),
        password: text("password").notNull(),
        location_name: text("location_name").notNull(),
        latitude: doublePrecision("latitude").notNull(),
        longitude: doublePrecision("longitude").notNull(),
        meeting_time: timestamp("meeting_time").notNull(),
    },
);