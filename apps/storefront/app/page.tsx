import Link from "next/link";
import { Search, ShoppingCart, User, Package } from "lucide-react";

export default function StorefrontHome() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold text-primary">
                Meridian Store
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
                  Products
                </Link>
                <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground">
                  Categories
                </Link>
                <Link href="/quick-order" className="text-sm text-muted-foreground hover:text-foreground">
                  Quick Order
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search products..."
                  className="h-9 w-64 rounded-md border bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button className="relative p-2 text-muted-foreground hover:text-foreground">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  0
                </span>
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Professional B2B<br />
            <span className="text-primary">Wholesale Distribution</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Your trusted source for plumbing supplies, tools, and industrial equipment. 
            Volume pricing, quick ordering, and dedicated support for businesses.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Package className="h-4 w-4" /> Browse Catalog
            </Link>
            <Link
              href="/quick-order"
              className="inline-flex items-center gap-2 rounded-md border bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
            >
              Quick Order
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Plumbing Supplies", "Hand Tools", "Pipe & Fittings"].map((cat) => (
              <div key={cat} className="rounded-xl border bg-card p-8 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{cat}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Browse collection</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>Powered by Meridian Commerce - Open Source B2B eCommerce Platform</p>
        </div>
      </footer>
    </div>
  );
}
