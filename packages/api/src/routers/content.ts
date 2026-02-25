import { z } from "zod";
import { eq, and, asc } from "drizzle-orm";
import { homepageBanners, promoBanners } from "@meridian/db/schema";

import { createRouter, publicProcedure } from "../trpc";

export const contentRouter = createRouter({
  // Homepage Banners
  listBanners: publicProcedure
    .input(z.object({ tenantId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.homepageBanners.findMany({
        where: eq(homepageBanners.tenantId, input.tenantId),
        orderBy: [asc(homepageBanners.sortOrder)],
      });
    }),

  createBanner: publicProcedure
    .input(
      z.object({
        tenantId: z.string().uuid(),
        title: z.string().min(1),
        subtitle: z.string().optional(),
        imageUrl: z.string().optional(),
        linkUrl: z.string().optional(),
        badgeText: z.string().optional(),
        discountText: z.string().optional(),
        bgColor: z.string().optional(),
        sortOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [banner] = await ctx.db.insert(homepageBanners).values(input).returning();
      return banner;
    }),

  updateBanner: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1).optional(),
        subtitle: z.string().optional(),
        imageUrl: z.string().optional(),
        linkUrl: z.string().optional(),
        badgeText: z.string().optional(),
        discountText: z.string().optional(),
        bgColor: z.string().optional(),
        sortOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const [banner] = await ctx.db
        .update(homepageBanners)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(homepageBanners.id, id))
        .returning();
      return banner;
    }),

  deleteBanner: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(homepageBanners).where(eq(homepageBanners.id, input.id));
      return { success: true };
    }),

  // Promo Banners
  listPromos: publicProcedure
    .input(z.object({ tenantId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.promoBanners.findMany({
        where: eq(promoBanners.tenantId, input.tenantId),
        orderBy: [asc(promoBanners.sortOrder)],
      });
    }),

  createPromo: publicProcedure
    .input(
      z.object({
        tenantId: z.string().uuid(),
        title: z.string().min(1),
        description: z.string().optional(),
        ctaText: z.string().optional(),
        ctaLink: z.string().optional(),
        discountPct: z.string().optional(),
        discountLabel: z.string().optional(),
        bgColor: z.string().optional(),
        sortOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [promo] = await ctx.db.insert(promoBanners).values(input).returning();
      return promo;
    }),

  updatePromo: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        ctaText: z.string().optional(),
        ctaLink: z.string().optional(),
        discountPct: z.string().optional(),
        discountLabel: z.string().optional(),
        bgColor: z.string().optional(),
        sortOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const [promo] = await ctx.db
        .update(promoBanners)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(promoBanners.id, id))
        .returning();
      return promo;
    }),

  deletePromo: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(promoBanners).where(eq(promoBanners.id, input.id));
      return { success: true };
    }),
});
