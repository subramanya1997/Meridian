import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "@meridian/db";

export interface Context {
  db: typeof db;
  tenantId?: string;
  userId?: string;
}

export function createTRPCContext(opts?: { tenantId?: string; userId?: string }): Context {
  return {
    db,
    tenantId: opts?.tenantId,
    userId: opts?.userId,
  };
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createRouter = t.router;
export const publicProcedure = t.procedure;
