# Meridian Commerce — MVP Technical Specification

**Project Codename:** Meridian
**Version:** 1.0.0-MVP
**Date:** February 24, 2026
**Status:** Draft

---

## 1. Executive Summary

**Meridian** is an open-source, agentic B2B eCommerce platform inspired by UnilogCorp's CX1 suite — rebuilt from the ground up with a modern stack and AI-first architecture. The core thesis: mid-market wholesale distributors, manufacturers, and specialty retailers should be able to launch a fully functional digital commerce operation **without hiring a single external developer**. Every configuration, integration, content task, and customization that traditionally requires a developer is handled by embedded AI agents or a no-code interface.

The MVP delivers five connected modules: **Product Information Management (PIM)**, **B2B Storefront**, **Integration Hub**, **AI Agent Layer**, and **Admin Dashboard** — all built on Next.js 15, PostgreSQL, and shadcn/ui.

---

## 2. Guiding Principles

1. **Agentic-First**: Every manual workflow has an AI agent counterpart. Users describe what they want in natural language; agents execute.
2. **Zero External Dev Dependency**: No task — from theme changes to ERP mapping — should require leaving the platform or hiring a contractor.
3. **Composable Modules**: Each module works standalone or together. Adopt PIM alone, or run the full suite.
4. **Multi-Tenant by Default**: A single deployment supports unlimited tenants with complete data isolation.
5. **API-First**: Every feature is accessible via a typed REST/tRPC API before any UI is built.
6. **Progressive Complexity**: Simple tasks are simple. Power-user capabilities exist but don't clutter the default experience.

---

## 3. Technology Stack

### 3.1 Frontend

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **Next.js 15** (App Router) | Server Components, Server Actions, streaming, ISR for storefront performance |
| UI System | **shadcn/ui** + Radix UI + Tailwind CSS 4 | Accessible, composable, fully customizable components; no vendor lock-in |
| State | **Zustand** (client) + React Server Components (server) | Minimal client JS; server-first data loading |
| Forms | **React Hook Form** + **Zod** | Type-safe validation shared between client and server |
| Markdown Editor | **MDXEditor** | Simple, extensible markdown editor for CMS pages, blogs, and product descriptions |
| Data Tables | **TanStack Table** + shadcn data-table | Virtual scrolling, sorting, filtering for large catalogs |
| Charts | **Recharts** | Dashboard analytics visualizations |
| AI Chat UI | **Anthropic Agents SDK** (`@anthropic-ai/sdk`) | Streaming agent responses with native tool-use, multi-turn conversations |

### 3.2 Backend

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Runtime | **Node.js 22** (via Next.js API Routes + Server Actions) | Unified deployment; no separate backend service for MVP |
| API Layer | **tRPC v11** | End-to-end type safety between client and server |
| ORM | **Drizzle ORM** | Type-safe, performant, SQL-close; better for complex B2B queries than Prisma |
| Database | **PostgreSQL 16** | JSONB for flexible attributes, full-text search, row-level security for multi-tenancy |
| Search | **PostgreSQL pg_trgm + tsvector** (MVP) → Meilisearch (v2) | Avoid external dependency for MVP; upgrade path clear |
| Cache | **Redis 7** (Upstash for serverless) | Session store, rate limiting, real-time inventory cache |
| File Storage | **S3-compatible** (AWS S3 / Cloudflare R2 / MinIO) | Product images, documents, digital assets |
| Auth | **Auth.js v5** (NextAuth) | Multi-provider, multi-tenant sessions; JWT + database strategy |
| Background Jobs | **BullMQ** (Redis-backed) | Import processing, agent task queues, webhook delivery |
| Email | **React Email** + **Resend** | Transactional emails (order confirmation, invite, etc.) |

### 3.3 AI / Agent Layer

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Orchestration | **Anthropic Agents SDK** (`@anthropic-ai/sdk`) | Native multi-step agent workflows with tool calling, streaming, and multi-agent handoff |
| LLM Provider | **Anthropic Claude API** (primary) + OpenAI (fallback) | Claude for complex reasoning; OpenAI for embeddings |
| Embeddings | **OpenAI text-embedding-3-small** | Product similarity, semantic search, content clustering |
| Vector Store | **pgvector** (PostgreSQL extension) | Keep vector data co-located with relational data |
| Agent Memory | **PostgreSQL** (agent_sessions, agent_messages tables) | Persistent conversation context per agent per tenant |

### 3.4 Infrastructure

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Hosting | **Vercel** (frontend) + **Railway/Fly.io** (workers) | Edge-optimized storefront; dedicated worker processes for agents/jobs |
| Database | **Neon** (serverless Postgres) or **Supabase** | Branching for preview environments; connection pooling |
| Monitoring | **Sentry** (errors) + **PostHog** (analytics) | Full observability stack |
| CI/CD | **GitHub Actions** | Lint, test, build, deploy pipeline |
| Monorepo | **Turborepo** | Shared packages between apps (types, db, ui, agents) |

---

## 4. System Architecture

### 4.1 Monorepo Structure

```
meridian/
├── apps/
│   ├── admin/              # Admin dashboard (Next.js app)
│   ├── storefront/         # B2B storefront (Next.js app)
│   └── worker/             # Background job processor
├── packages/
│   ├── db/                 # Drizzle schema, migrations, seed
│   ├── api/                # tRPC routers (shared between apps)
│   ├── ui/                 # shadcn/ui components (shared)
│   ├── agents/             # AI agent definitions and tools
│   ├── integrations/       # ERP/payment connector framework
│   ├── email/              # Email templates (React Email)
│   ├── config/             # Shared config (env, constants)
│   └── types/              # Shared TypeScript types
├── tooling/
│   ├── eslint/             # ESLint config
│   ├── typescript/         # TSConfig base
│   └── tailwind/           # Tailwind config
├── turbo.json
├── package.json
└── docker-compose.yml      # Local dev: Postgres + Redis + MinIO
```

### 4.2 Multi-Tenancy Model

**Strategy: Schema-based isolation using PostgreSQL Row-Level Security (RLS)**

Every table includes a `tenant_id` column. RLS policies enforce that queries only return data for the authenticated tenant. This provides strong data isolation without the operational overhead of separate schemas or databases.

```sql
-- Every table gets this column
ALTER TABLE products ADD COLUMN tenant_id UUID NOT NULL REFERENCES tenants(id);

-- RLS policy pattern
CREATE POLICY tenant_isolation ON products
  USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Set tenant context at connection level
SET app.current_tenant = 'tenant-uuid-here';
```

The Drizzle ORM layer wraps all queries with a tenant-scoped context:

```typescript
// packages/db/src/tenant-context.ts
export function withTenant<T>(tenantId: string, fn: () => Promise<T>): Promise<T> {
  return db.transaction(async (tx) => {
    await tx.execute(sql`SET LOCAL app.current_tenant = ${tenantId}`);
    return fn();
  });
}
```

### 4.3 Authentication Architecture

```
┌──────────────────────────────────────────────────────┐
│                    Auth.js v5                         │
│                                                      │
│  Providers:                                          │
│  ├── Credentials (email/password)                    │
│  ├── Google OAuth                                    │
│  ├── Microsoft OAuth (for enterprise)                │
│  └── Magic Link (passwordless)                       │
│                                                      │
│  Session Strategy: JWT (stateless) + DB sessions     │
│  JWT Payload: { userId, tenantId, role, permissions }│
│                                                      │
│  Multi-Tenant: User ↔ TenantMembership ↔ Tenant     │
│  (one user can belong to multiple tenants)           │
└──────────────────────────────────────────────────────┘
```

### 4.4 Request Flow

```
Browser → Vercel Edge → Next.js Middleware (tenant resolution via subdomain/custom domain)
  → Auth.js session validation
  → tRPC Router (with tenant context injected)
  → Drizzle ORM (with RLS tenant filter)
  → PostgreSQL
```

Storefront requests use ISR (Incremental Static Regeneration) with on-demand revalidation for product pages and category pages. Admin requests are fully dynamic (SSR).

---

## 5. Database Schema (Core Tables)

### 5.1 Tenancy & Auth

```sql
-- Tenants (organizations)
CREATE TABLE tenants (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,          -- subdomain: {slug}.meridian.app
  custom_domain TEXT UNIQUE,                   -- optional custom domain
  logo_url      TEXT,
  settings      JSONB DEFAULT '{}',            -- theme, currency, locale, etc.
  plan          TEXT DEFAULT 'starter',         -- starter, pro, enterprise
  status        TEXT DEFAULT 'active',
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Users (global, can belong to multiple tenants)
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  name          TEXT,
  password_hash TEXT,                          -- null for OAuth users
  avatar_url    TEXT,
  email_verified BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Tenant membership (user ↔ tenant with role)
CREATE TABLE tenant_memberships (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id  UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role       TEXT NOT NULL DEFAULT 'member',   -- owner, admin, member, viewer
  invited_by UUID REFERENCES users(id),
  joined_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tenant_id, user_id)
);

-- API keys for external integrations
CREATE TABLE api_keys (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  key_hash    TEXT NOT NULL,                   -- bcrypt hash of the key
  prefix      TEXT NOT NULL,                   -- first 8 chars for identification
  permissions JSONB DEFAULT '["*"]',
  last_used   TIMESTAMPTZ,
  expires_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT now()
);
```

### 5.2 Product Information Management (PIM)

```sql
-- Product categories (hierarchical via ltree)
CREATE EXTENSION IF NOT EXISTS ltree;

CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL,
  description TEXT,
  path        LTREE NOT NULL,                  -- e.g., 'plumbing.faucets.kitchen'
  image_url   TEXT,
  sort_order  INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  metadata    JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tenant_id, slug)
);

CREATE INDEX idx_categories_path ON categories USING gist(path);

-- Attribute definitions (shared across products)
CREATE TABLE attribute_definitions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id),
  name          TEXT NOT NULL,                 -- "Color", "Voltage", "Material"
  slug          TEXT NOT NULL,
  type          TEXT NOT NULL,                 -- text, number, boolean, select, multi_select, rich_text
  unit          TEXT,                          -- "inches", "lbs", "volts"
  options       JSONB,                         -- for select types: ["Red","Blue","Green"]
  is_filterable BOOLEAN DEFAULT false,         -- show in storefront faceted search
  is_required   BOOLEAN DEFAULT false,
  sort_order    INT DEFAULT 0,
  group_name    TEXT,                          -- group attributes: "Dimensions", "Electrical"
  created_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tenant_id, slug)
);

-- Products
CREATE TABLE products (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id        UUID NOT NULL REFERENCES tenants(id),
  sku              TEXT NOT NULL,
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL,
  description      TEXT,                       -- rich text (HTML)
  short_description TEXT,
  brand            TEXT,
  manufacturer     TEXT,
  manufacturer_part_number TEXT,
  upc              TEXT,
  base_price       NUMERIC(12,2),              -- list price
  cost_price       NUMERIC(12,2),
  currency         TEXT DEFAULT 'USD',
  weight           NUMERIC(10,3),
  weight_unit      TEXT DEFAULT 'lbs',
  length           NUMERIC(10,3),
  width            NUMERIC(10,3),
  height           NUMERIC(10,3),
  dimension_unit   TEXT DEFAULT 'in',
  status           TEXT DEFAULT 'draft',       -- draft, active, archived, discontinued
  is_taxable       BOOLEAN DEFAULT true,
  tax_code         TEXT,
  seo_title        TEXT,
  seo_description  TEXT,
  seo_keywords     TEXT[],
  metadata         JSONB DEFAULT '{}',
  search_vector    TSVECTOR,                   -- full-text search index
  embedding        VECTOR(1536),               -- pgvector for semantic search
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now(),
  published_at     TIMESTAMPTZ,
  UNIQUE (tenant_id, sku),
  UNIQUE (tenant_id, slug)
);

CREATE INDEX idx_products_search ON products USING gin(search_vector);
CREATE INDEX idx_products_embedding ON products USING ivfflat(embedding vector_cosine_ops);

-- Product → Category mapping (many-to-many)
CREATE TABLE product_categories (
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  is_primary  BOOLEAN DEFAULT false,
  PRIMARY KEY (product_id, category_id)
);

-- Product attribute values
CREATE TABLE product_attributes (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id             UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  attribute_definition_id UUID NOT NULL REFERENCES attribute_definitions(id),
  value_text             TEXT,
  value_number           NUMERIC,
  value_boolean          BOOLEAN,
  value_json             JSONB,               -- for multi_select and complex values
  UNIQUE (product_id, attribute_definition_id)
);

-- Product variants (sizes, colors, etc.)
CREATE TABLE product_variants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku         TEXT NOT NULL,
  name        TEXT,                            -- "Large / Red"
  price       NUMERIC(12,2),                  -- override base price
  cost_price  NUMERIC(12,2),
  weight      NUMERIC(10,3),
  options     JSONB NOT NULL,                  -- {"size":"Large","color":"Red"}
  status      TEXT DEFAULT 'active',
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Product media (images, videos, documents)
CREATE TABLE product_media (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  type        TEXT NOT NULL,                   -- image, video, document, spec_sheet
  url         TEXT NOT NULL,
  alt_text    TEXT,
  filename    TEXT,
  mime_type   TEXT,
  size_bytes  BIGINT,
  width       INT,
  height      INT,
  sort_order  INT DEFAULT 0,
  is_primary  BOOLEAN DEFAULT false,
  metadata    JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Product relationships (cross-sell, upsell, accessories, related)
CREATE TABLE product_relationships (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  related_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  type          TEXT NOT NULL,                 -- cross_sell, upsell, accessory, related, substitute
  sort_order    INT DEFAULT 0,
  UNIQUE (product_id, related_id, type)
);
```

### 5.3 Inventory

```sql
-- Warehouse locations
CREATE TABLE warehouses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id),
  name        TEXT NOT NULL,
  code        TEXT NOT NULL,
  address     JSONB,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tenant_id, code)
);

-- Inventory levels per product/variant per warehouse
CREATE TABLE inventory (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id),
  product_id    UUID NOT NULL REFERENCES products(id),
  variant_id    UUID REFERENCES product_variants(id),
  warehouse_id  UUID NOT NULL REFERENCES warehouses(id),
  quantity       INT NOT NULL DEFAULT 0,
  reserved       INT NOT NULL DEFAULT 0,       -- reserved for pending orders
  reorder_point  INT,
  reorder_qty    INT,
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE (product_id, variant_id, warehouse_id)
);
```

### 5.4 Customer & Pricing

```sql
-- B2B customers (separate from auth users; represent businesses)
CREATE TABLE customers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id         UUID NOT NULL REFERENCES tenants(id),
  company_name      TEXT NOT NULL,
  account_number    TEXT,
  email             TEXT,
  phone             TEXT,
  tax_exempt        BOOLEAN DEFAULT false,
  tax_exempt_id     TEXT,
  credit_limit      NUMERIC(12,2),
  payment_terms     TEXT,                      -- NET30, NET60, COD, etc.
  status            TEXT DEFAULT 'active',
  erp_customer_id   TEXT,                      -- linked ERP record
  metadata          JSONB DEFAULT '{}',
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

-- Customer groups for tiered pricing
CREATE TABLE customer_groups (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL,
  description TEXT,
  discount_pct NUMERIC(5,2),                  -- default discount for this group
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tenant_id, slug)
);

-- Customer → Group membership
CREATE TABLE customer_group_memberships (
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  group_id    UUID NOT NULL REFERENCES customer_groups(id) ON DELETE CASCADE,
  PRIMARY KEY (customer_id, group_id)
);

-- Customer-specific pricing (overrides base price)
CREATE TABLE customer_pricing (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id),
  product_id   UUID NOT NULL REFERENCES products(id),
  variant_id   UUID REFERENCES product_variants(id),
  customer_id  UUID REFERENCES customers(id),
  group_id     UUID REFERENCES customer_groups(id),
  price        NUMERIC(12,2) NOT NULL,
  min_qty      INT DEFAULT 1,                  -- quantity break pricing
  valid_from   TIMESTAMPTZ,
  valid_until  TIMESTAMPTZ,
  source       TEXT DEFAULT 'manual',          -- manual, erp_sync, agent
  created_at   TIMESTAMPTZ DEFAULT now(),
  CHECK (customer_id IS NOT NULL OR group_id IS NOT NULL)
);
```

### 5.5 Orders & Cart

```sql
-- Shopping carts (persistent, supports multiple saved carts)
CREATE TABLE carts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id),
  customer_id   UUID REFERENCES customers(id),
  session_id    TEXT,                           -- for anonymous carts
  name          TEXT DEFAULT 'Default',         -- saved cart name
  status        TEXT DEFAULT 'active',          -- active, saved, converted, abandoned
  metadata      JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE cart_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id       UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id    UUID NOT NULL REFERENCES products(id),
  variant_id    UUID REFERENCES product_variants(id),
  quantity      INT NOT NULL DEFAULT 1,
  unit_price    NUMERIC(12,2),                 -- resolved price at time of add
  notes         TEXT,                           -- line-item notes
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Orders
CREATE TABLE orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id         UUID NOT NULL REFERENCES tenants(id),
  order_number      TEXT NOT NULL,              -- human-readable: MRD-2026-00001
  customer_id       UUID NOT NULL REFERENCES customers(id),
  status            TEXT DEFAULT 'pending',     -- pending, confirmed, processing, shipped, delivered, canceled
  subtotal          NUMERIC(12,2) NOT NULL,
  tax_amount        NUMERIC(12,2) DEFAULT 0,
  shipping_amount   NUMERIC(12,2) DEFAULT 0,
  discount_amount   NUMERIC(12,2) DEFAULT 0,
  total             NUMERIC(12,2) NOT NULL,
  currency          TEXT DEFAULT 'USD',
  shipping_address  JSONB,
  billing_address   JSONB,
  payment_method    TEXT,
  payment_status    TEXT DEFAULT 'unpaid',      -- unpaid, authorized, paid, refunded
  purchase_order    TEXT,                       -- B2B: PO number
  notes             TEXT,
  erp_order_id      TEXT,                      -- synced ERP record
  placed_at         TIMESTAMPTZ DEFAULT now(),
  shipped_at        TIMESTAMPTZ,
  delivered_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tenant_id, order_number)
);

CREATE TABLE order_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id    UUID NOT NULL REFERENCES products(id),
  variant_id    UUID REFERENCES product_variants(id),
  sku           TEXT NOT NULL,
  name          TEXT NOT NULL,
  quantity      INT NOT NULL,
  unit_price    NUMERIC(12,2) NOT NULL,
  total_price   NUMERIC(12,2) NOT NULL,
  tax_amount    NUMERIC(12,2) DEFAULT 0,
  notes         TEXT,
  metadata      JSONB DEFAULT '{}'
);
```

### 5.6 CMS (Markdown-Based Content Management)

```sql
-- Content types: pages, blog posts, knowledge base articles, etc.
CREATE TABLE cms_content (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES tenants(id),
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL,
  type            TEXT NOT NULL DEFAULT 'page', -- page, blog_post, landing, kb_article, announcement
  body_markdown   TEXT NOT NULL DEFAULT '',      -- markdown source (single source of truth)
  body_html       TEXT,                          -- pre-rendered HTML for fast serving
  excerpt         TEXT,                          -- short summary (auto-generated or manual)
  featured_image  TEXT,                          -- URL to hero/cover image
  author_id       UUID REFERENCES users(id),
  status          TEXT DEFAULT 'draft',          -- draft, published, archived
  seo_title       TEXT,
  seo_description TEXT,
  seo_keywords    TEXT[],
  metadata        JSONB DEFAULT '{}',            -- flexible per-type metadata
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tenant_id, slug)
);

-- Tags for organizing content (blogs, articles, etc.)
CREATE TABLE cms_tags (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tenant_id, slug)
);

-- Content ↔ Tag mapping (many-to-many)
CREATE TABLE cms_content_tags (
  content_id UUID NOT NULL REFERENCES cms_content(id) ON DELETE CASCADE,
  tag_id     UUID NOT NULL REFERENCES cms_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, tag_id)
);

-- Content revisions (version history for markdown content)
CREATE TABLE cms_revisions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id    UUID NOT NULL REFERENCES cms_content(id) ON DELETE CASCADE,
  body_markdown TEXT NOT NULL,
  revised_by    UUID REFERENCES users(id),
  revision_note TEXT,
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

### 5.7 Integration Hub

```sql
-- Integration configurations
CREATE TABLE integrations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id),
  type          TEXT NOT NULL,                 -- erp, payment, shipping, tax, marketing
  provider      TEXT NOT NULL,                 -- quickbooks, netsuite, stripe, etc.
  name          TEXT NOT NULL,
  config        JSONB NOT NULL DEFAULT '{}',   -- encrypted credentials and settings
  field_mapping JSONB DEFAULT '{}',            -- field mapping configuration
  status        TEXT DEFAULT 'inactive',       -- inactive, active, error
  last_sync_at  TIMESTAMPTZ,
  error_log     JSONB DEFAULT '[]',
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Sync log for audit trail
CREATE TABLE sync_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES tenants(id),
  integration_id  UUID NOT NULL REFERENCES integrations(id),
  direction       TEXT NOT NULL,               -- inbound, outbound
  entity_type     TEXT NOT NULL,               -- product, order, customer, inventory
  entity_id       TEXT,
  status          TEXT NOT NULL,               -- success, error, skipped
  request_data    JSONB,
  response_data   JSONB,
  error_message   TEXT,
  duration_ms     INT,
  created_at      TIMESTAMPTZ DEFAULT now()
);
```

### 5.8 AI Agent System

```sql
-- Agent definitions (which agents are available)
CREATE TABLE agent_definitions (
  id          TEXT PRIMARY KEY,                -- catalog_agent, content_agent, etc.
  name        TEXT NOT NULL,
  description TEXT,
  category    TEXT NOT NULL,                   -- content, commerce, integration, analytics
  tools       JSONB NOT NULL,                  -- available tool definitions
  model       TEXT DEFAULT 'claude-sonnet-4-20250514',
  is_active   BOOLEAN DEFAULT true
);

-- Agent sessions (conversations with agents)
CREATE TABLE agent_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID NOT NULL REFERENCES tenants(id),
  user_id         UUID NOT NULL REFERENCES users(id),
  agent_id        TEXT NOT NULL REFERENCES agent_definitions(id),
  title           TEXT,
  status          TEXT DEFAULT 'active',       -- active, completed, failed
  context         JSONB DEFAULT '{}',          -- session-specific context
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Agent messages (conversation history)
CREATE TABLE agent_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  UUID NOT NULL REFERENCES agent_sessions(id) ON DELETE CASCADE,
  role        TEXT NOT NULL,                   -- user, assistant, tool
  content     TEXT NOT NULL,
  tool_calls  JSONB,                           -- tool invocations
  tool_results JSONB,                          -- tool execution results
  tokens_used INT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Agent task queue (async agent jobs)
CREATE TABLE agent_tasks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id),
  agent_id      TEXT NOT NULL REFERENCES agent_definitions(id),
  session_id    UUID REFERENCES agent_sessions(id),
  type          TEXT NOT NULL,                 -- enrich_product, generate_descriptions, map_fields, etc.
  input         JSONB NOT NULL,
  output        JSONB,
  status        TEXT DEFAULT 'queued',         -- queued, running, completed, failed
  progress      INT DEFAULT 0,                 -- 0-100
  error_message TEXT,
  started_at    TIMESTAMPTZ,
  completed_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

---

## 6. Module Specifications

### 6.1 Module: Product Information Management (PIM)

The PIM is the data backbone. Every product, attribute, category, media asset, and relationship flows through this module.

**MVP Feature Set:**

| Feature | Description | Priority |
|---------|------------|----------|
| Product CRUD | Create, read, update, delete products with all fields | P0 |
| Bulk import/export | CSV/XLSX import with column mapping; CSV export | P0 |
| Category management | Hierarchical categories with drag-and-drop tree | P0 |
| Attribute system | Dynamic attribute definitions; assign to products | P0 |
| Media management | Upload, crop, reorder images; attach documents | P0 |
| Variant management | Create variants with option combinations | P1 |
| Product relationships | Cross-sell, upsell, accessory, related, substitute | P1 |
| Full-text search | PostgreSQL tsvector-based search across all fields | P0 |
| Faceted filtering | Filter products by category, status, brand, attributes | P0 |
| Bulk editing | Select multiple products; bulk update fields | P1 |
| Data validation | Required fields, format validation, completeness score | P1 |
| Version history | Track changes to product data over time | P2 |

**Admin UI Pages:**
- `/admin/products` — Product list with search, filter, sort, pagination
- `/admin/products/[id]` — Product detail editor (tabbed: General, Attributes, Media, Variants, Pricing, SEO, Relationships)
- `/admin/products/import` — Import wizard with AI-powered column mapping
- `/admin/categories` — Category tree manager
- `/admin/attributes` — Attribute definition manager

### 6.2 Module: B2B Storefront

A server-rendered, SEO-optimized, mobile-responsive storefront purpose-built for B2B buying workflows.

**MVP Feature Set:**

| Feature | Description | Priority |
|---------|------------|----------|
| Product catalog | Category browse, search, faceted filters | P0 |
| Product detail page | Images, description, attributes, variants, related | P0 |
| Customer-specific pricing | Show resolved price based on logged-in customer | P0 |
| Real-time inventory | Show stock availability per warehouse | P0 |
| Cart management | Add, update, remove; persist across sessions | P0 |
| Multiple saved carts | Name and save carts for reorder | P1 |
| Quick order | Enter SKUs + quantities directly (spreadsheet-style) | P0 |
| Bulk order (CSV upload) | Upload CSV of SKU + quantity to populate cart | P1 |
| Checkout flow | Shipping address, PO number, payment method, order review | P0 |
| Order history | View past orders with status tracking | P0 |
| Reorder | One-click reorder from past order | P1 |
| Account portal | Company info, addresses, users, payment methods | P0 |
| RFQ (Request for Quote) | Submit quote request for custom/bulk pricing | P1 |
| Predictive search | Autocomplete with product images and prices | P0 |
| SEO optimization | Server-rendered pages, meta tags, structured data | P0 |
| Mobile responsive | Full functionality on mobile/tablet | P0 |
| PWA support | Installable, offline product browsing | P2 |

**Storefront Pages:**
- `/` — Homepage (CMS-driven)
- `/products` — Product listing with filters
- `/products/[slug]` — Product detail page
- `/categories/[...slug]` — Category pages (nested)
- `/cart` — Shopping cart
- `/checkout` — Multi-step checkout
- `/account` — Customer account dashboard
- `/account/orders` — Order history
- `/account/orders/[id]` — Order detail
- `/quick-order` — Quick order pad
- `/rfq` — Request for quote form
- `/search?q=` — Search results
- `/blog` — Blog listing page (paginated, filterable by tag)
- `/blog/[slug]` — Individual blog post
- `/[slug]` — CMS pages (about, contact, policies, etc.)

### 6.3 Module: Integration Hub

A framework for connecting external business systems (ERPs, payment processors, tax engines) without writing code.

**MVP Feature Set:**

| Feature | Description | Priority |
|---------|------------|----------|
| Integration marketplace | Browse, configure, activate integrations | P0 |
| ERP connector framework | Standardized adapter interface for ERP sync | P0 |
| QuickBooks Online connector | Bidirectional sync: products, customers, orders, inventory | P0 |
| Stripe payment connector | Accept cards, ACH, invoicing at checkout | P0 |
| Webhook system | Inbound/outbound webhooks for custom integrations | P1 |
| Field mapping UI | Visual drag-and-drop field mapping | P0 |
| Sync scheduling | Cron-based sync scheduling (e.g., inventory every 15 min) | P1 |
| Sync monitoring | Dashboard showing sync status, errors, retry | P0 |
| API key management | Generate/revoke API keys for third-party access | P0 |
| CSV/SFTP import | Scheduled file-based imports | P2 |

**Integration Adapter Interface:**

```typescript
// packages/integrations/src/types.ts
export interface IntegrationAdapter {
  id: string;
  name: string;
  type: 'erp' | 'payment' | 'shipping' | 'tax' | 'marketing';
  
  // Configuration schema (rendered as form)
  configSchema: z.ZodSchema;
  
  // Field mapping capabilities
  supportedEntities: ('product' | 'customer' | 'order' | 'inventory')[];
  
  // Connection test
  testConnection(config: unknown): Promise<{ success: boolean; error?: string }>;
  
  // Sync methods
  pullProducts?(config: unknown, since?: Date): AsyncGenerator<ExternalProduct>;
  pushOrder?(config: unknown, order: Order): Promise<{ externalId: string }>;
  pullInventory?(config: unknown): AsyncGenerator<InventoryUpdate>;
  pullCustomers?(config: unknown, since?: Date): AsyncGenerator<ExternalCustomer>;
  pushCustomer?(config: unknown, customer: Customer): Promise<{ externalId: string }>;
}
```

### 6.4 Module: AI Agent Layer (Meridian Agents)

The differentiating layer. Eight specialized agents, each with defined tools and capabilities, accessible via a unified chat interface or triggered automatically.

#### Agent 1: Catalog Agent
**Purpose:** Import, clean, and organize product data from any source.
**Trigger:** User uploads a CSV/XLSX or says "import my products"
**Tools:**
- `parse_file` — Extract columns and sample rows from uploaded file
- `suggest_mapping` — Map source columns to Meridian product fields
- `validate_import` — Run validation rules, report errors
- `execute_import` — Create/update products from mapped data
- `deduplicate` — Find and merge duplicate products
- `bulk_categorize` — Assign categories based on product names/descriptions

#### Agent 2: Content Agent
**Purpose:** Generate and enrich product content, blog posts, and CMS pages.
**Trigger:** User selects products and says "write descriptions", "improve SEO", or "draft a blog post"
**Tools:**
- `generate_description` — Write product description from attributes/specs
- `generate_seo` — Create SEO title, meta description, keywords
- `generate_marketing_copy` — Create promotional copy for landing pages
- `improve_content` — Rewrite existing content for clarity/conversion
- `translate_content` — Translate product content to other languages
- `generate_alt_text` — Create image alt text from product context
- `draft_blog_post` — Generate a markdown blog post draft from a topic or product
- `suggest_content_ideas` — Propose blog/article topics based on catalog and industry trends

#### Agent 3: Taxonomy Agent
**Purpose:** Build and maintain the category/attribute structure.
**Trigger:** User says "organize my categories" or "suggest attributes"
**Tools:**
- `analyze_catalog` — Scan products to identify natural groupings
- `suggest_categories` — Propose category hierarchy
- `suggest_attributes` — Recommend attribute definitions per category
- `auto_classify` — Assign products to categories using embeddings
- `merge_categories` — Consolidate redundant categories

#### Agent 4: Search & Merchandising Agent
**Purpose:** Optimize search relevance and product placement.
**Trigger:** User says "improve search" or "merchandise homepage"
**Tools:**
- `analyze_search_queries` — Review search logs for patterns
- `suggest_synonyms` — Create synonym rules for better recall
- `boost_products` — Adjust product ranking for categories/searches
- `create_collection` — Auto-curate product collections
- `analyze_zero_results` — Find queries returning no results; suggest fixes

#### Agent 5: Integration Agent
**Purpose:** Configure ERP/system integrations without manual setup.
**Trigger:** User says "connect my QuickBooks" or "set up Stripe"
**Tools:**
- `detect_system` — Identify ERP from user description
- `configure_connection` — Set up connection parameters
- `auto_map_fields` — Suggest field mappings based on source schema
- `test_sync` — Run a test sync with sample records
- `diagnose_error` — Analyze sync failures and suggest fixes

#### Agent 6: Analytics Agent
**Purpose:** Generate business insights and reports from platform data.
**Trigger:** User asks "how are sales trending?" or "show me top products"
**Tools:**
- `query_analytics` — Run analytical queries against platform data
- `generate_chart` — Create chart configurations for the dashboard
- `compare_periods` — Compare metrics across date ranges
- `identify_trends` — Find significant trends and anomalies
- `generate_report` — Create a formatted report (PDF/email)

#### Agent 7: Storefront Builder Agent
**Purpose:** Design and customize storefront pages and content without code.
**Trigger:** User says "redesign my homepage", "create a landing page", or "set up a blog"
**Tools:**
- `generate_page` — Create a CMS page with markdown content
- `modify_theme` — Adjust colors, fonts, layout settings
- `create_banner` — Generate promotional banner content
- `generate_markdown` — Produce structured markdown for any content type (page, post, article)
- `preview_page` — Generate a preview of changes

#### Agent 8: Customer Support Agent (Buyer-Facing)
**Purpose:** Help B2B buyers find products, check availability, track orders.
**Trigger:** Buyer clicks chat widget on storefront
**Tools:**
- `search_products` — Search catalog with natural language
- `check_inventory` — Check stock availability
- `check_order_status` — Look up order by number
- `get_pricing` — Retrieve customer-specific pricing
- `create_rfq` — Submit a request for quote
- `add_to_cart` — Add items to the buyer's cart

**Unified Agent Chat UI:**

```
┌─────────────────────────────────────────┐
│  🤖 Meridian Agent                      │
│  ─────────────────────────────          │
│  Agent: Catalog Agent                   │
│                                         │
│  You: Import this spreadsheet           │
│  [📎 products.xlsx]                     │
│                                         │
│  Agent: I've analyzed your file.        │
│  Found 847 products across 12 columns.  │
│                                         │
│  Here's my suggested mapping:           │
│  ┌──────────────┬──────────────┐        │
│  │ Your Column  │ Meridian     │        │
│  ├──────────────┼──────────────┤        │
│  │ Item #       │ SKU          │        │
│  │ Desc         │ Name         │        │
│  │ List $       │ Base Price   │        │
│  │ MFR          │ Manufacturer │        │
│  │ ...          │ ...          │        │
│  └──────────────┴──────────────┘        │
│                                         │
│  [✅ Approve] [✏️ Edit Mapping]         │
│                                         │
│  ───────────────────────────            │
│  [Type a message...]          [Send]    │
└─────────────────────────────────────────┘
```

### 6.5 Module: Admin Dashboard

The central command center for managing the entire platform.

**MVP Pages:**

| Page | Description |
|------|------------|
| `/admin` | Overview dashboard: sales, orders, inventory alerts, agent activity |
| `/admin/products/*` | PIM module pages (see 6.1) |
| `/admin/orders` | Order list with status filters |
| `/admin/orders/[id]` | Order detail with fulfillment actions |
| `/admin/customers` | Customer list with account details |
| `/admin/customers/[id]` | Customer detail with orders, pricing, group membership |
| `/admin/integrations` | Integration marketplace and config |
| `/admin/integrations/[id]` | Integration detail, field mapping, sync logs |
| `/admin/content` | CMS content list (pages, blog posts, articles) with type filter |
| `/admin/content/[id]` | Markdown editor with live preview, metadata sidebar, tag management |
| `/admin/content/new` | New content creation (select type: page, blog post, article, announcement) |
| `/admin/content/tags` | Tag management for organizing content |
| `/admin/agents` | Agent hub: all agents, recent sessions |
| `/admin/agents/[agentId]` | Agent chat interface |
| `/admin/settings` | Tenant settings: general, branding, domains, billing |
| `/admin/settings/team` | Team management: invite, roles, permissions |
| `/admin/settings/api-keys` | API key management |
| `/admin/analytics` | Analytics dashboard with charts |

---

## 7. Non-Functional Requirements

### 7.1 Performance

| Metric | Target |
|--------|--------|
| Storefront TTFB | < 200ms (ISR cached pages) |
| Product page load | < 1.5s (LCP) |
| Search response | < 300ms (PostgreSQL FTS) |
| Admin page load | < 2s |
| API response (p95) | < 500ms |
| Catalog import (1K products) | < 60s |
| Agent response (first token) | < 2s |

### 7.2 Scalability

| Dimension | MVP Target |
|-----------|-----------|
| Products per tenant | 500,000 |
| Concurrent users (storefront) | 1,000 |
| Concurrent admin users | 50 |
| Tenants | 100 |
| Orders per day per tenant | 5,000 |

### 7.3 Security

- All data encrypted at rest (PostgreSQL TDE) and in transit (TLS 1.3)
- Row-Level Security for complete tenant isolation
- OWASP Top 10 compliance
- SOC 2 Type II readiness (architecture-level)
- Rate limiting on all API endpoints (Redis-based)
- CSRF protection via SameSite cookies
- Content Security Policy headers
- Input sanitization (DOMPurify for rich text)
- Audit logging for all admin actions
- API keys hashed with bcrypt, shown once on creation
- Secrets stored in encrypted JSONB fields (libsodium)

### 7.4 Accessibility

- WCAG 2.1 AA compliance (leveraging Radix UI primitives in shadcn)
- Keyboard navigation for all interactive elements
- Screen reader support with proper ARIA labels
- High contrast mode support
- Focus management for modals and dialogs

---

## 8. Development Phases

### Phase 1: Foundation (Weeks 1-3)
- Monorepo setup (Turborepo + package structure)
- Database schema + migrations (Drizzle)
- Auth system (Auth.js, multi-tenant sessions)
- tRPC API scaffolding
- shadcn/ui component library setup
- Admin layout (sidebar, header, breadcrumbs)
- CI/CD pipeline

### Phase 2: PIM Core (Weeks 4-6)
- Product CRUD API + UI
- Category management (tree with ltree)
- Attribute system
- Media upload (S3) + management
- Product search (tsvector)
- CSV import/export (basic)

### Phase 3: Storefront (Weeks 7-9)
- Storefront app scaffolding (Next.js, ISR)
- Product catalog + category pages
- Product detail page
- Search with autocomplete
- Cart system (persistent)
- Customer auth (separate from admin auth)

### Phase 4: B2B Commerce (Weeks 10-12)
- Customer-specific pricing resolution
- Inventory management
- Checkout flow (multi-step)
- Order management (admin)
- Order history (storefront)
- Quick order pad
- PO number support

### Phase 5: Integration Hub (Weeks 13-14)
- Integration framework + adapter interface
- QuickBooks Online connector
- Stripe payment connector
- Field mapping UI
- Sync scheduling + monitoring
- Webhook system

### Phase 6: AI Agents (Weeks 15-18)
- Agent framework (Anthropic Agents SDK with tool-use and multi-agent handoff)
- Agent chat UI (admin panel — streaming with tool-call rendering)
- Catalog Agent (import, mapping, dedup)
- Content Agent (descriptions, SEO, blog draft generation)
- Integration Agent (guided setup)
- Taxonomy Agent (category suggestions)
- Storefront Builder Agent (CMS markdown pages)
- Customer Support Agent (buyer chat)

### Phase 7: Polish & Launch (Weeks 19-20)
- Performance optimization (caching, ISR tuning)
- Security audit
- Documentation (API docs, user guides)
- Seed data and demo tenant
- Deployment to production
- Launch 🚀

---

## 9. API Design (tRPC Router Overview)

```typescript
// packages/api/src/root.ts
export const appRouter = createTRPCRouter({
  // Auth & Tenancy
  auth: authRouter,          // login, register, forgotPassword, resetPassword
  tenant: tenantRouter,      // getTenant, updateTenant, updateSettings
  team: teamRouter,          // listMembers, invite, updateRole, remove

  // PIM
  product: productRouter,    // list, get, create, update, delete, bulkUpdate, search
  category: categoryRouter,  // list, getTree, create, update, delete, reorder
  attribute: attributeRouter, // list, create, update, delete
  media: mediaRouter,        // upload, delete, reorder
  import: importRouter,      // parseFile, mapColumns, validate, execute

  // Commerce
  customer: customerRouter,       // list, get, create, update, delete
  customerGroup: customerGroupRouter, // CRUD
  pricing: pricingRouter,         // resolvePrice, list, upsert, delete
  inventory: inventoryRouter,     // getStock, updateStock, listAlerts
  cart: cartRouter,               // get, addItem, updateItem, removeItem, saveCarts
  order: orderRouter,             // list, get, create, updateStatus, cancel
  checkout: checkoutRouter,       // createSession, applyShipping, placeOrder
  
  // Integration
  integration: integrationRouter, // list, get, configure, activate, deactivate
  sync: syncRouter,               // trigger, getStatus, getLogs
  webhook: webhookRouter,         // list, create, delete, test

  // CMS (Markdown-based)
  content: contentRouter,    // list, get, create, update, delete, publish (pages, blog posts, articles)
  tag: tagRouter,            // list, create, update, delete
  revision: revisionRouter,  // list, get, restore (content version history)

  // Agents
  agent: agentRouter,        // listAgents, createSession, sendMessage, getTasks
  
  // Analytics
  analytics: analyticsRouter, // dashboard, salesReport, productReport
});
```

---

## 10. Deployment Architecture

```
                    ┌──────────────────────┐
                    │    Cloudflare DNS     │
                    │  *.meridian.app       │
                    │  custom domains       │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │      Vercel Edge     │
                    │  Next.js Middleware   │
                    │  (tenant resolution)  │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
    ┌─────────▼──────┐ ┌──────▼───────┐ ┌──────▼───────┐
    │  apps/admin    │ │apps/storefront│ │  API Routes  │
    │  (SSR/CSR)     │ │  (ISR/SSR)   │ │  (tRPC)      │
    └─────────┬──────┘ └──────┬───────┘ └──────┬───────┘
              │                │                │
              └────────────────┼────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
    ┌─────────▼──────┐ ┌──────▼───────┐ ┌──────▼───────┐
    │  PostgreSQL    │ │    Redis     │ │  S3 / R2     │
    │  (Neon)        │ │  (Upstash)   │ │  (media)     │
    │  + pgvector    │ │  + BullMQ    │ │              │
    └────────────────┘ └──────────────┘ └──────────────┘
                               │
                    ┌──────────▼───────────┐
                    │   Worker Process     │
                    │   (Railway/Fly.io)   │
                    │   - BullMQ consumers │
                    │   - Agent executors   │
                    │   - Sync schedulers   │
                    └──────────────────────┘
```

---

## 11. Success Criteria for MVP

| Criteria | Metric |
|----------|--------|
| A distributor can import 10K products via CSV | < 5 minutes total |
| AI Content Agent generates descriptions for 100 products | < 10 minutes |
| A buyer can search, add to cart, and place an order | < 3 minutes |
| Customer-specific pricing resolves correctly | 100% accuracy |
| QuickBooks sync round-trips an order | < 30 seconds |
| Storefront Lighthouse score | > 90 (Performance) |
| Admin can configure a new integration without code | Zero-code setup |
| Agent chat resolves a product import question | Within conversation |

---

*End of Technical Specification*