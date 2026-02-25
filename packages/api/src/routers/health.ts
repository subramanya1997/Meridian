import { createRouter, publicProcedure } from "../trpc";

export const healthRouter = createRouter({
  check: publicProcedure.query(() => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      version: "1.0.0-mvp",
    };
  }),
});
