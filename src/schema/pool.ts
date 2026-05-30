import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const poolDenominationsTable = pgTable("pool_denominations", {
  id: text("id").primaryKey(),
  token: text("token").notNull(),
  amount: text("amount").notNull(),
  poolSize: integer("pool_size").notNull().default(0),
  anonymitySet: integer("anonymity_set").notNull().default(0),
  fee: text("fee").notNull(),
  contractAddress: text("contract_address"),
  denominationWei: text("denomination_wei"),
});

export const depositsTable = pgTable("deposits", {
  id: text("id").primaryKey(),
  commitment: text("commitment").notNull().unique(),
  denominationId: text("denomination_id").notNull(),
  walletAddress: text("wallet_address").notNull(),
  txHash: text("tx_hash").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const withdrawalsTable = pgTable("withdrawals", {
  id: text("id").primaryKey(),
  nullifierHash: text("nullifier_hash").notNull().unique(),
  recipient: text("recipient").notNull(),
  txHash: text("tx_hash").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const poolTransactionsTable = pgTable("pool_transactions", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  denominationId: text("denomination_id").notNull(),
  walletAddress: text("wallet_address").notNull(),
  txHash: text("tx_hash").notNull(),
  status: text("status").notNull().default("confirmed"),
  note: text("note"),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
});

export const insertDepositSchema = createInsertSchema(depositsTable).omit({ createdAt: true });
export type InsertDeposit = z.infer<typeof insertDepositSchema>;
export type Deposit = typeof depositsTable.$inferSelect;
export type PoolTransaction = typeof poolTransactionsTable.$inferSelect;
