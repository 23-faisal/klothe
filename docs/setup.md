# Database Setup (Neon + Drizzle)

This guide walks through provisioning a Neon PostgreSQL database and connecting it to Klothe.

## Prerequisites

- A [Neon](https://neon.tech) account
- Node.js and pnpm installed
- The Klothe repository cloned

## Step 1: Create a Neon project

1. Log in to [Neon Console](https://console.neon.tech).
2. Create a new project (choose any region close to your users).
3. Neon provisions a PostgreSQL database with a connection string.

## Step 2: Copy the pooled connection string

1. In the Neon Console, go to your project → **Connection details**.
2. Select the **pooled** connection string (it ends in `-pooler.neon.tech` and uses port `5432`).
3. The format is:

   ```
   postgresql://<user>:<password>@<endpoint>.neon.tech/<dbname>?sslmode=require
   ```

## Step 3: Add it to `.env.local`

1. Copy `.env.example` to `.env.local` (create it if it does not exist):

   ```bash
   cp .env.example .env.local
   ```

2. Replace the `DATABASE_URL` value with your pooled Neon connection string:

   ```
   DATABASE_URL="postgresql://<user>:<password>@<endpoint>.neon.tech/<dbname>?sslmode=require"
   ```

3. Save the file. Do **not** commit `.env.local` — it is gitignored.

## Step 4: Verify the connection

Run the local checks to confirm the app compiles and the health endpoint works:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Then start the dev server and call the health route:

```bash
pnpm dev
```

In another terminal:

```bash
curl http://localhost:3000/api/health
```

Expected response when the database is reachable:

```json
{ "status": "ok" }
```

If the database is unreachable or `DATABASE_URL` is not set, the route returns:

```json
{ "status": "error" }
```

with HTTP status `503`.

## Step 5: Push or migrate the schema

Once tables are defined in `src/db/schema/`, synchronize the database:

```bash
# Generate a migration from the schema
pnpm db:generate

# Apply migrations to the database
pnpm db:migrate

# Or push schema changes directly (development only)
pnpm db:push

# Open Drizzle Studio to inspect the database
pnpm db:studio
```

## Notes

- `src/db/index.ts` exports the Drizzle client (`db`) and the raw Neon SQL tagged-template client (`sql`).
- The `/api/health` route runs `SELECT 1` against the database and is marked `force-dynamic` so it is never prerendered at build time.
- No tables exist yet; they are added in a later task.
