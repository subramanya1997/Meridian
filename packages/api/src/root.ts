import { createRouter } from "./trpc";
import { productRouter } from "./routers/product";
import { tenantRouter } from "./routers/tenant";
import { healthRouter } from "./routers/health";
import { contentRouter } from "./routers/content";

export const appRouter = createRouter({
  health: healthRouter,
  tenant: tenantRouter,
  product: productRouter,
  content: contentRouter,
});

export type AppRouter = typeof appRouter;
