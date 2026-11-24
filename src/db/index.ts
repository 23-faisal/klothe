import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

const pool =
  process.env.DATABASE_URL === undefined
    ? null
    : new Pool({ connectionString: process.env.DATABASE_URL });

const db = pool === null ? null : drizzle(pool);

export { pool, db };
