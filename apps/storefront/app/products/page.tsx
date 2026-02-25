import Link from "next/link";
import { Search, ShoppingCart, User, Package } from "lucide-react";

import { db } from "@meridian/db";
import { products, tenants } from "@meridian/db/schema";
import { eq } from "drizzle-orm";

export default async function ProductsPage() {
  let productList: { id: string; sku: string; name: string; basePrice: string | null; brand: string | null; shortDescription: string | null }[] = [];
  let error: string | null = null;

  try {
    const tenant = await db.query.tenants.findFirst({
      where: eq(tenants.slug, "demo"),
    });

    if (tenant) {
      productList = await db.query.products.findMany({
        where: eq(products.tenantId, tenant.id),
        columns: { id: true, sku: true, name: true, basePrice: true, brand: true, shortDescription: true },
      });
    }
  } catch {
    error = "Unable to load products. Ensure database is running.";
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary">Meridian Store</Link>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search products..."
                  className="h-9 w-64 rounded-md border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button className="relative p-2 text-muted-foreground hover:text-foreground">
                <ShoppingCart className="h-5 w-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>

        {error ? (
          <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-6">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productList.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground py-12">No products available yet.</p>
            ) : (
              productList.map((product) => (
                <div key={product.id} className="rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-muted/50 p-8 flex items-center justify-center">
                    <Package className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
                    <h3 className="font-semibold mt-1">{product.name}</h3>
                    {product.brand && <p className="text-sm text-muted-foreground">{product.brand}</p>}
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-lg font-bold text-primary">
                        {product.basePrice ? `$${product.basePrice}` : "Contact for price"}
                      </p>
                      <button className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                        <ShoppingCart className="h-3 w-3" /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
