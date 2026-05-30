import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const zkProofsTable = pgTable("zk_proofs", {
  id: text("id").primaryKey(),
  proofId: text("proof_id").notNull().unique(),
  walletAddress: text("wallet_address").notNull(),
  proofType: text("proof_type").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  shareUrl: text("share_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
});

export const insertZkProofSchema = createInsertSchema(zkProofsTable).omit({ createdAt: true });
export type InsertZkProof = z.infer<typeof insertZkProofSchema>;
export type ZkProof = typeof zkProofsTable.$inferSelect;
