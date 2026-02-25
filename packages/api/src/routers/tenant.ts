import { z } from "zod";
import { eq } from "drizzle-orm";
import { tenants } from "@meridian/db/schema";

import { createRouter, publicProcedure } from "../trpc";

export const tenantRouter = createRouter({
  getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    const result = await ctx.db.query.tenants.findFirst({
      where: eq(tenants.slug, input.slug),
    });
    return result ?? null;
  }),

  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.tenants.findMany();
  }),
});
