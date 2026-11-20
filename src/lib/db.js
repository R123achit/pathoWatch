import { Pool } from "pg";

// Reuse a single pool across hot reloads in dev to avoid exhausting
// connections, and across serverless invocations in production.
let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return pool;
}

export async function query(text, params) {
  const client = getPool();
  return client.query(text, params);
}
