import { Package, SlidersHorizontal } from "lucide-react";

import { db } from "@meridian/db";
import { products, tenants } from "@meridian/db/schema";
import { eq } from "drizzle-orm";

import { Button, EmptyState, SearchInput } from "@meridian/ui";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { ProductCard } from "../../../components/product-card";

async function getProducts() {
  try {
    const tenant = await db.query.tenants.findFirst({ where: eq(tenants.slug, "demo") });
    if (!tenant) return [];
    return db.query.products.findMany({
      where: eq(products.tenantId, tenant.id),
      columns: { id: true, sku: true, name: true, basePrice: true, brand: true, slug: true, description: true, status: true },
    });
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const productList = await getProducts();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All Products" }]} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">All Products</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {productList.length} products available
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SearchInput placeholder="Search products..." className="w-64" />
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Grid */}
        {productList.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No products available"
            description="Check back soon for new arrivals."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {productList.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
