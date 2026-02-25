import Link from "next/link";
import {
  Search, ShoppingCart, User, Package, ArrowRight,
  Truck, Shield, Clock, Headphones, Star,
  ChevronRight, Zap, Building2, Wrench, PenTool
} from "lucide-react";

import { db } from "@meridian/db";
import { products, tenants } from "@meridian/db/schema";
import { eq } from "drizzle-orm";

async function getFeaturedProducts() {
  try {
    const tenant = await db.query.tenants.findFirst({ where: eq(tenants.slug, "demo") });
    if (!tenant) return [];
    return db.query.products.findMany({
      where: eq(products.tenantId, tenant.id),
      columns: { id: true, sku: true, name: true, basePrice: true, brand: true, slug: true },
      limit: 4,
    });
  } catch {
    return [];
  }
}

const categories = [
  { name: "Plumbing Supplies", count: "2,400+", icon: Wrench, gradient: "from-blue-500 to-blue-700", description: "Faucets, pipes, fittings & more" },
  { name: "Hand Tools", count: "1,800+", icon: PenTool, gradient: "from-emerald-500 to-emerald-700", description: "Professional-grade tools" },
  { name: "Pipe & Fittings", count: "3,200+", icon: Package, gradient: "from-violet-500 to-violet-700", description: "Copper, PVC, steel & more" },
];

const features = [
  { icon: Truck, title: "Free Shipping", description: "On orders over $500", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Shield, title: "Secure Payments", description: "PCI-DSS compliant", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Clock, title: "Same Day Dispatch", description: "Order before 2pm", color: "text-violet-600", bg: "bg-violet-50" },
  { icon: Headphones, title: "Expert Support", description: "Dedicated account manager", color: "text-amber-600", bg: "bg-amber-50" },
];

const testimonials = [
  { name: "Mike Johnson", role: "Owner, Johnson Plumbing", text: "Meridian transformed how we order supplies. The quick-order feature alone saves us hours every week.", stars: 5 },
  { name: "Sarah Chen", role: "Procurement, Pacific Builders", text: "Customer-specific pricing and real-time inventory are game changers for our business.", stars: 5 },
];

export default async function StorefrontHome() {
  const featured = await getFeaturedProducts();

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-[12px]">
            <div className="flex items-center gap-4">
              <span className="text-slate-300">Free shipping on orders $500+</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">Call us: (555) 123-4567</span>
            </div>
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
                {["Products", "Categories", "Quick Order", "Deals"].map((item) => (
                  <Link
                    key={item}
                    href={item === "Products" ? "/products" : `/${item.toLowerCase().replace(" ", "-")}`}
                    className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search 10,000+ products..."
                  className="h-10 w-72 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm transition-all focus:w-96 focus:bg-white focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                />
              </div>
              <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm">
                  0
                </span>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 mb-8">
              <Zap className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-[12px] font-semibold text-blue-700">AI-Powered B2B Commerce Platform</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Professional Supplies,{" "}
              <span className="text-gradient">Delivered Fast</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-500 leading-relaxed">
              Your trusted wholesale source for plumbing, tools, and industrial equipment.
              Volume pricing, real-time inventory, and dedicated support.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-slate-900 px-7 py-3.5 text-[14px] font-semibold text-white shadow-xl shadow-slate-900/20 transition-all hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/25 hover:-translate-y-0.5"
              >
                Browse Catalog
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/quick-order"
                className="inline-flex items-center gap-2.5 rounded-xl border-2 border-slate-200 bg-white px-7 py-3.5 text-[14px] font-semibold text-slate-700 transition-all hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Quick Order
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8">
              {[
                { value: "10K+", label: "Products" },
                { value: "500+", label: "Brands" },
                { value: "99.8%", label: "Fill Rate" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="border-y bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-3.5 py-6 px-5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${f.bg}`}>
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-900">{f.title}</p>
                  <p className="text-[12px] text-slate-500">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-widest text-blue-600 mb-2">Browse</p>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Shop by Category</h2>
            </div>
            <Link href="/categories" className="group flex items-center gap-1 text-[13px] font-semibold text-blue-600 hover:text-blue-700">
              View all categories
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} href="/products">
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 card-hover cursor-pointer">
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} shadow-lg`}>
                    <cat.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{cat.description}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-[12px] font-semibold text-blue-600">{cat.count} items</span>
                    <ArrowRight className="h-3.5 w-3.5 text-blue-600 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                  <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-[80px] bg-gradient-to-bl from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-widest text-blue-600 mb-2">Top Picks</p>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Featured Products</h2>
              </div>
              <Link href="/products" className="group flex items-center gap-1 text-[13px] font-semibold text-blue-600 hover:text-blue-700">
                View all products
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product) => (
                <div key={product.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white product-card-hover">
                  <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-10 flex items-center justify-center">
                    <Package className="h-16 w-16 text-slate-300 transition-transform group-hover:scale-110 group-hover:text-blue-400 duration-300" />
                    <div className="absolute top-3 right-3 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">NEW</div>
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-mono font-medium text-slate-400">{product.sku}</p>
                    <h3 className="mt-1 font-semibold text-slate-900 leading-snug">{product.name}</h3>
                    {product.brand && <p className="mt-1 text-[12px] text-slate-500">{product.brand}</p>}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-bold text-slate-900">
                        {product.basePrice ? `$${Number(product.basePrice).toFixed(2)}` : "Contact"}
                      </span>
                      <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-[12px] font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md">
                        <ShoppingCart className="h-3.5 w-3.5" /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[12px] font-bold uppercase tracking-widest text-blue-600 mb-2">Why Meridian</p>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Built for B2B Buyers</h2>
            <p className="mt-3 text-slate-500 max-w-lg mx-auto">Everything you need to streamline your procurement workflow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: "Customer-Specific Pricing", description: "Negotiated rates, volume discounts, and contract pricing — all resolved automatically at checkout." },
              { icon: Zap, title: "Quick Order Pad", description: "Enter SKUs and quantities directly. Upload a CSV. Reorder from past orders with one click." },
              { icon: Shield, title: "Enterprise-Grade Security", description: "SOC 2 ready architecture with row-level data isolation and encrypted transactions." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                  <item.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[12px] font-bold uppercase tracking-widest text-blue-400 mb-2">Testimonials</p>
            <h2 className="text-3xl font-bold text-white tracking-tight">Trusted by Professionals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[15px] text-slate-300 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-[12px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Ready to streamline your ordering?</h2>
          <p className="mt-4 text-lg text-blue-100 max-w-lg mx-auto">Create your account and start ordering with customer-specific pricing today.</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-[14px] font-semibold text-blue-700 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5">
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white/10 hover:-translate-y-0.5">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="text-[15px] font-bold text-slate-900">Meridian</span>
              </div>
              <p className="text-[13px] text-slate-500 leading-relaxed">Open-source, AI-first B2B eCommerce platform for wholesale distributors.</p>
            </div>
            {[
              { title: "Products", links: ["All Products", "Categories", "Brands", "New Arrivals", "Deals"] },
              { title: "Account", links: ["My Orders", "Quick Order", "Saved Carts", "Request Quote", "Support"] },
              { title: "Company", links: ["About Us", "Contact", "Blog", "API Docs", "Privacy Policy"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-[13px] font-semibold text-slate-900 mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}><Link href="#" className="text-[13px] text-slate-500 hover:text-blue-600 transition-colors">{link}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
            <p className="text-[12px] text-slate-400">&copy; 2026 Meridian Commerce. All rights reserved.</p>
            <p className="text-[12px] text-slate-400">Powered by Meridian — Open Source B2B Commerce</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
