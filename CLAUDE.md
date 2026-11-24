# Klothe

Multi-vendor clothing marketplace for Bangladesh.

## Stack

- Next.js (App Router, TypeScript strict, Tailwind CSS, src directory)
- shadcn/ui, Prettier, Vitest, pnpm
- Neon PostgreSQL, Drizzle ORM, Better Auth, Cloudinary, Resend

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run `tsc --noEmit` |
| `pnpm test` | Run Vitest (`vitest run`) |
| `pnpm format` | Prettier write |
| `pnpm db:generate` | Drizzle generate migrations |
| `pnpm db:migrate` | Drizzle migrate |
| `pnpm db:push` | Drizzle push schema |
| `pnpm db:seed` | Seed database |
| `pnpm db:studio` | Drizzle Studio |

## Environment

Copy `.env.example` to `.env` and fill in real values. Never commit `.env`.

Key env vars: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `RESEND_API_KEY`, `EMAIL_FROM`.

## Configuration

- `src/config/site.ts` — site name, currency (BDT), shipping zones (flat rate by zone).
- `src/env.ts` — Zod-validated env vars.
- `components.json` — shadcn/ui config (Tailwind v4, `src/app/globals.css`, new-york style).

## Database

Drizzle schema lives under `src/server/db`. Migrations generated with `pnpm db:generate`.

## Notes

- Currency stored as integer taka; format with `formatBDT()` helper.
- Phone: valid Bangladeshi number `01XXXXXXXXX` required before any order.
- Roles: Admin, Staff, Seller, Customer (permissions enforced server-side).
