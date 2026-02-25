import Link from "next/link";
import {
  Search, ShoppingCart, User, Package, Filter,
  Grid3X3, List, ChevronRight, Zap, Star, Heart
} from "lucide-react";

import { db } from "@meridian/db";
import { products, tenants } from "@meridian/db/schema";
import { eq } from "drizzle-orm";

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
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-[12px]">
            <span className="text-slate-300">Free shipping on orders $500+</span>
            <div className="flex items-center gap-4">
              <Link href="/account" className="text-slate-300 hover:text-white transition-colors">My Account</Link>
              <span className="text-slate-500">|</span>
              <Link href="/quick-order" className="text-slate-300 hover:text-white transition-colors">Quick Order</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md shadow-blue-500/20">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-bold text-slate-900 tracking-tight">Meridian</span>
                  <span className="text-[10px] font-medium text-slate-400 block -mt-1">SUPPLY CO.</span>
                </div>
              </Link>
              <nav className="hidden lg:flex items-center gap-1">
                <Link href="/products" className="rounded-lg bg-slate-100 px-3.5 py-2 text-[13px] font-medium text-slate-900">Products</Link>
                <Link href="/categories" className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-100">Categories</Link>
                <Link href="/quick-order" className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-100">Quick Order</Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search products..."
                  className="h-10 w-72 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm focus:bg-white focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                />
              </div>
              <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">0</span>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-slate-900">All Products</span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">All Products</h1>
            <p className="mt-1 text-sm text-slate-500">{productList.length} products available</p>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="h-4 w-4" /> Filters
            </button>
            <div className="flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden">
              <button className="flex h-10 w-10 items-center justify-center text-slate-900 bg-slate-100"><Grid3X3 className="h-4 w-4" /></button>
              <button className="flex h-10 w-10 items-center justify-center text-slate-400 hover:text-slate-600"><List className="h-4 w-4" /></button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {productList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <Package className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No products available</h3>
            <p className="mt-1 text-sm text-slate-500">Check back soon for new arrivals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productList.map((product) => (
              <div key={product.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white product-card-hover">
                {/* Image */}
                <div className="relative bg-gradient-to-br from-slate-50 to-slate-100/80 p-10 flex items-center justify-center overflow-hidden">
                  <Package className="h-16 w-16 text-slate-300 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-400" />
                  <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-slate-400 opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0 hover:text-red-500 hover:bg-red-50">
                    <Heart className="h-4 w-4" />
                  </button>
                  {product.status === "active" && (
                    <div className="absolute top-3 left-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                      IN STOCK
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">{product.sku}</code>
                    {product.brand && (
                      <span className="text-[11px] font-medium text-blue-600">{product.brand}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                  {product.description && (
                    <p className="mt-1.5 text-[12px] text-slate-500 line-clamp-2 leading-relaxed">{product.description}</p>
                  )}

                  {/* Rating */}
                  <div className="mt-3 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < 4 ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                    ))}
                    <span className="ml-1.5 text-[11px] text-slate-400">(24)</span>
                  </div>

                  {/* Price & CTA */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-slate-900">
                        {product.basePrice ? `$${Number(product.basePrice).toFixed(2)}` : "Contact"}
                      </span>
                      {product.basePrice && (
                        <span className="ml-1.5 text-[11px] text-slate-400">/each</span>
                      )}
                    </div>
                    <button className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-[12px] font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95">
                      <ShoppingCart className="h-3.5 w-3.5" /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-slate-50 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-[13px] font-bold text-slate-900">Meridian</span>
            </div>
            <p className="text-[12px] text-slate-400">&copy; 2026 Meridian Commerce. Open Source B2B Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
