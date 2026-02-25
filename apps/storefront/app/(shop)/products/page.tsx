import { Package, Filter, Grid3X3, List } from "lucide-react";

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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">All Products</h1>
            <p className="mt-1 text-sm text-slate-500">{productList.length} products available</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Button variant="outline" className="rounded-xl">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <div className="flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden">
              <button className="flex h-10 w-10 items-center justify-center text-slate-900 bg-slate-100">
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center text-slate-400 hover:text-slate-600">
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <SearchInput placeholder="Search products..." className="mb-8 max-w-md" />

        {/* Product Grid */}
        {productList.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No products available"
            description="Check back soon for new arrivals."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productList.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
