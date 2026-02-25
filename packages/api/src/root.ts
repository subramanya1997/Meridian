import { createRouter } from "./trpc";
import { productRouter } from "./routers/product";
import { tenantRouter } from "./routers/tenant";
import { healthRouter } from "./routers/health";

export const appRouter = createRouter({
  health: healthRouter,
  tenant: tenantRouter,
  product: productRouter,
});

export type AppRouter = typeof appRouter;
