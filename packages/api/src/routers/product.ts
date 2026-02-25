import { z } from "zod";
import { eq, and, ilike } from "drizzle-orm";
import { products } from "@meridian/db/schema";

import { createRouter, publicProcedure } from "../trpc";

export const productRouter = createRouter({
  list: publicProcedure
    .input(
      z.object({
        tenantId: z.string().uuid(),
        search: z.string().optional(),
        status: z.string().optional(),
        limit: z.number().min(1).max(100).default(25),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const conditions = [eq(products.tenantId, input.tenantId)];
      if (input.status) {
        conditions.push(eq(products.status, input.status));
      }
      if (input.search) {
        conditions.push(ilike(products.name, `%${input.search}%`));
      }

      return ctx.db.query.products.findMany({
        where: and(...conditions),
        limit: input.limit,
        offset: input.offset,
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.products.findFirst({
        where: eq(products.id, input.id),
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        tenantId: z.string().uuid(),
        sku: z.string().min(1),
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
        basePrice: z.string().optional(),
        brand: z.string().optional(),
        status: z.enum(["draft", "active", "archived", "discontinued"]).default("draft"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [product] = await ctx.db.insert(products).values(input).returning();
      return product;
    }),
});
