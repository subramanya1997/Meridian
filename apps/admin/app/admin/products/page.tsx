import Link from "next/link";
import { Package, Plus, ArrowLeft } from "lucide-react";

import { db } from "@meridian/db";
import { products, tenants } from "@meridian/db/schema";
import { eq } from "drizzle-orm";

export default async function ProductsPage() {
  let productList: { id: string; sku: string; name: string; status: string; basePrice: string | null; brand: string | null }[] = [];
  let error: string | null = null;

  try {
    const tenant = await db.query.tenants.findFirst({
      where: eq(tenants.slug, "demo"),
    });

    if (tenant) {
      productList = await db.query.products.findMany({
        where: eq(products.tenantId, tenant.id),
        columns: { id: true, sku: true, name: true, status: true, basePrice: true, brand: true },
      });
    }
  } catch (e) {
    error = "Database connection not available. Start Docker services with: docker compose up -d";
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-card">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary">Meridian</h1>
          <p className="text-xs text-muted-foreground">Commerce Platform</p>
        </div>
        <nav className="px-3">
          <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm bg-accent text-accent-foreground">
            <Package className="h-4 w-4" /> Products
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Products</h2>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>

        {error ? (
          <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-6">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        ) : (
          <div className="rounded-xl border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">SKU</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Name</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Brand</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Price</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                        No products yet. Add your first product to get started.
                      </td>
                    </tr>
                  ) : (
                    productList.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-muted/50">
                        <td className="px-6 py-4 font-mono text-xs">{product.sku}</td>
                        <td className="px-6 py-4 font-medium">{product.name}</td>
                        <td className="px-6 py-4">{product.brand ?? "—"}</td>
                        <td className="px-6 py-4">{product.basePrice ? `$${product.basePrice}` : "—"}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            product.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {product.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
