import Link from "next/link";
import {
  Package, Plus, ArrowLeft, Search, Filter,
  Download, Upload, MoreHorizontal, Zap, ChevronRight,
  LayoutDashboard, ShoppingCart, Users, Layers,
  Plug, Bot, BarChart3, Settings, Bell
} from "lucide-react";

import { db } from "@meridian/db";
import { products, tenants } from "@meridian/db/schema";
import { eq } from "drizzle-orm";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Products", icon: Package, href: "/admin/products", active: true },
  { name: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  { name: "Customers", icon: Users, href: "/admin/customers" },
  { name: "Categories", icon: Layers, href: "/admin/categories" },
  { name: "Integrations", icon: Plug, href: "/admin/integrations" },
  { name: "AI Agents", icon: Bot, href: "/admin/agents" },
  { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default async function ProductsPage() {
  let productList: { id: string; sku: string; name: string; status: string; basePrice: string | null; brand: string | null; manufacturer: string | null; currency: string }[] = [];
  let error: string | null = null;

  try {
    const tenant = await db.query.tenants.findFirst({
      where: eq(tenants.slug, "demo"),
    });
    if (tenant) {
      productList = await db.query.products.findMany({
        where: eq(products.tenantId, tenant.id),
        columns: { id: true, sku: true, name: true, status: true, basePrice: true, brand: true, manufacturer: true, currency: true },
      });
    }
  } catch {
    error = "Database connection not available. Start Docker services with: docker compose up -d";
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-[260px] bg-[#0f1729] flex flex-col">
        <div className="flex items-center gap-3 px-6 h-16 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-semibold text-white tracking-tight">Meridian</h1>
            <p className="text-[11px] text-slate-400 -mt-0.5">Commerce Platform</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150 ${
                item.active
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-semibold text-white">AU</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white truncate">Admin User</p>
              <p className="text-[11px] text-slate-400 truncate">admin@demo.meridian.app</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-[260px]">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white/80 backdrop-blur-xl px-8">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-700 transition-colors">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-slate-900">Products</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50">
              <Bell className="h-4 w-4" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-semibold text-white">AU</div>
          </div>
        </header>

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Products</h2>
              <p className="text-sm text-slate-500 mt-1">Manage your product catalog &middot; {productList.length} products</p>
            </div>
            <div className="flex items-center gap-2.5">
              <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                <Download className="h-4 w-4" /> Export
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                <Upload className="h-4 w-4" /> Import
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-[13px] font-medium text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md">
                <Plus className="h-4 w-4" /> Add Product
              </button>
            </div>
          </div>

          {/* Search / Filter Bar */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search products by name, SKU, brand..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm transition-colors focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50">
              <Filter className="h-4 w-4" /> Filter
            </button>
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80">
                    <th className="px-5 py-3.5 text-left text-[12px] font-semibold uppercase tracking-wider text-slate-500">Product</th>
                    <th className="px-5 py-3.5 text-left text-[12px] font-semibold uppercase tracking-wider text-slate-500">SKU</th>
                    <th className="px-5 py-3.5 text-left text-[12px] font-semibold uppercase tracking-wider text-slate-500">Brand</th>
                    <th className="px-5 py-3.5 text-right text-[12px] font-semibold uppercase tracking-wider text-slate-500">Price</th>
                    <th className="px-5 py-3.5 text-center text-[12px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-5 py-3.5 text-right text-[12px] font-semibold uppercase tracking-wider text-slate-500"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {productList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-16 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                          <Package className="h-6 w-6 text-slate-400" />
                        </div>
                        <p className="mt-4 text-sm font-medium text-slate-900">No products yet</p>
                        <p className="mt-1 text-sm text-slate-500">Get started by adding your first product.</p>
                      </td>
                    </tr>
                  ) : (
                    productList.map((product) => (
                      <tr key={product.id} className="group transition-colors hover:bg-blue-50/40">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-blue-100 transition-colors">
                              <Package className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                            </div>
                            <span className="font-medium text-slate-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <code className="rounded-md bg-slate-100 px-2 py-1 text-[12px] font-mono text-slate-600">{product.sku}</code>
                        </td>
                        <td className="px-5 py-4 text-slate-600">{product.brand ?? "—"}</td>
                        <td className="px-5 py-4 text-right">
                          <span className="font-semibold text-slate-900">
                            {product.basePrice ? `$${Number(product.basePrice).toFixed(2)}` : "—"}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            product.status === "active"
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
                              : product.status === "draft"
                              ? "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200"
                              : "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200"
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${
                              product.status === "active" ? "bg-emerald-500" : product.status === "draft" ? "bg-amber-500" : "bg-slate-400"
                            }`} />
                            {product.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {productList.length > 0 && (
                <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
                  <p className="text-[12px] text-slate-500">Showing {productList.length} of {productList.length} products</p>
                  <div className="flex items-center gap-1.5">
                    <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-slate-500 hover:bg-slate-50">Previous</button>
                    <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-[12px] font-medium text-white">1</button>
                    <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-slate-500 hover:bg-slate-50">Next</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
