import { pgTable, uuid, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";

export const homepageBanners = pgTable("homepage_banners", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  imageUrl: text("image_url"),
  linkUrl: text("link_url"),
  badgeText: text("badge_text"),
  discountText: text("discount_text"),
  bgColor: text("bg_color").default("bg-primary"),
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const promoBanners = pgTable("promo_banners", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  title: text("title").notNull(),
  description: text("description"),
  ctaText: text("cta_text").default("Shop Now"),
  ctaLink: text("cta_link").default("/products"),
  discountPct: text("discount_pct"),
  discountLabel: text("discount_label"),
  bgColor: text("bg_color").default("bg-gradient-to-br from-emerald-500 to-green-700"),
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
