# Meridian Commerce - Agent Instructions

## Overview

Meridian Commerce is an open-source, AI-first B2B eCommerce platform built as a Turborepo monorepo. See `docs/meridian_tech_spec.md` for the full technical specification.

## Project Structure

- `apps/admin` — Admin dashboard (Next.js 15, port 3000)
- `apps/storefront` — B2B storefront (Next.js 15, port 3001)
- `apps/worker` — Background job processor
- `packages/db` — Drizzle ORM schema, migrations, seed
- `packages/api` — tRPC routers (shared between apps)
- `packages/ui` — shadcn/ui components (shared)
- `packages/config` — Shared config and env validation (Zod)
- `packages/types` — Shared TypeScript types
- `packages/agents`, `packages/email`, `packages/integrations` — Stub packages

## Cursor Cloud specific instructions

### Infrastructure services

Start Docker services before running anything that touches the database:

```bash
sudo dockerd &>/dev/null &   # only if Docker daemon is not running
sleep 3
sudo docker compose up -d    # starts PostgreSQL 16, Redis 7, MinIO
```

Wait ~5 seconds for healthchecks to pass before running migrations or dev servers.

### Database

- **Connection**: `postgresql://meridian:meridian_dev@localhost:5432/meridian`
- **Migrations**: `pnpm --filter @meridian/db db:migrate`
- **Seed data**: `pnpm --filter @meridian/db db:seed` (creates demo tenant, admin user, 5 sample products, 1 customer)
- **Generate new migrations** after schema changes: `pnpm --filter @meridian/db db:generate`
- **Drizzle Studio**: `pnpm --filter @meridian/db db:studio`

### Common commands

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Dev (all apps) | `pnpm dev` |
| Dev (admin only) | `pnpm --filter @meridian/admin dev` |
| Dev (storefront only) | `pnpm --filter @meridian/storefront dev` |
| Build all | `pnpm build` |
| Lint all | `pnpm lint` |
| Type check | `pnpm type-check` |

### Gotchas

- Use **extensionless imports** (e.g., `from "./schema/tenants"` not `from "./schema/tenants.js"`) in all packages. Drizzle-kit's CJS resolver and Next.js transpilePackages both work correctly with extensionless imports.
- The `.env` file at workspace root is read by all apps. The `packages/config/src/env.ts` module validates env vars with Zod and provides typed defaults for local dev.
- Next.js 15.5 shows a deprecation warning for `next lint`; this is cosmetic and does not affect functionality.
- Both admin and storefront have `transpilePackages` configured in `next.config.ts` to handle workspace package imports.
- When adding a new dependency used directly in app code (e.g., `drizzle-orm`), add it to the app's `package.json` even if it's already a transitive dep from a workspace package.
