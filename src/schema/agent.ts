import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const agentInteractionsTable = pgTable("agent_interactions", {
  id: text("id").primaryKey(),
  xHandle: text("x_handle").notNull(),
  command: text("command"),
  inputText: text("input_text").notNull(),
  responseText: text("response_text").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertAgentInteractionSchema = createInsertSchema(agentInteractionsTable).omit({ createdAt: true });
export type InsertAgentInteraction = z.infer<typeof insertAgentInteractionSchema>;
export type AgentInteraction = typeof agentInteractionsTable.$inferSelect;
