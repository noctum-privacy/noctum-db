import { pgTable, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const watchedWalletsTable = pgTable("watched_wallets", {
  id: text("id").primaryKey(),
  ownerWallet: text("owner_wallet").notNull(),
  watchedWallet: text("watched_wallet").notNull(),
  label: text("label"),
  alertLevel: text("alert_level").notNull().default("high"),
  notifyX: boolean("notify_x").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const securityAlertsTable = pgTable("security_alerts", {
  id: text("id").primaryKey(),
  watchedWallet: text("watched_wallet").notNull(),
  threatType: text("threat_type").notNull(),
  severity: text("severity").notNull(),
  txHash: text("tx_hash"),
  details: jsonb("details"),
  acknowledged: boolean("acknowledged").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertWatchedWalletSchema = createInsertSchema(watchedWalletsTable).omit({ createdAt: true });
export type InsertWatchedWallet = z.infer<typeof insertWatchedWalletSchema>;
export type WatchedWallet = typeof watchedWalletsTable.$inferSelect;
export type SecurityAlert = typeof securityAlertsTable.$inferSelect;
