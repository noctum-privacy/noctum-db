# noctum-db

  PostgreSQL schema and Drizzle ORM setup for Noctum Protocol.

  ## Schema Modules

  | Module | Tables | Description |
  |---|---|---|
  | `pool` | deposits, withdrawals | Privacy pool transactions |
  | `proofs` | zk_proofs | Zero-knowledge identity proofs |
  | `security` | security_alerts, watched_wallets | Threat monitoring |
  | `agent` | agent_interactions | @Noctum_io agent feed |
  | `developer` | api_keys, webhooks, api_usage | Developer access |
  | `stats` | protocol_stats, activity_events | Protocol statistics |

  All tables use `text` primary keys (UUID strings) for ZK proof ID compatibility.

  ## Getting Started

  ```bash
  pnpm install

  # Set env
  DATABASE_URL=postgresql://...

  # Push schema to database
  pnpm run push

  # Open Drizzle Studio
  pnpm run studio
  ```

  ## License

  MIT
  