import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const activityEventsTable = pgTable("activity_events", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  txHash: text("tx_hash"),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
});

export type ActivityEvent = typeof activityEventsTable.$inferSelect;
