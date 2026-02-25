import Link from "next/link";
import { Package, ShoppingCart, Users, BarChart3, Settings, Layers, Bot, Plug } from "lucide-react";

const modules = [
  { name: "Products", description: "Manage your product catalog", icon: Package, href: "/admin/products", count: "0" },
  { name: "Orders", description: "View and manage orders", icon: ShoppingCart, href: "/admin/orders", count: "0" },
  { name: "Customers", description: "Manage B2B customers", icon: Users, href: "/admin/customers", count: "0" },
  { name: "Categories", description: "Organize product taxonomy", icon: Layers, href: "/admin/categories", count: "0" },
  { name: "Integrations", description: "Connect external systems", icon: Plug, href: "/admin/integrations", count: "0" },
  { name: "AI Agents", description: "AI-powered automation", icon: Bot, href: "/admin/agents", count: "8" },
  { name: "Analytics", description: "Business insights", icon: BarChart3, href: "/admin/analytics", count: "" },
  { name: "Settings", description: "Tenant configuration", icon: Settings, href: "/admin/settings", count: "" },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary">Meridian</h1>
          <p className="text-xs text-muted-foreground">Commerce Platform</p>
        </div>
        <nav className="px-3">
          {modules.map((mod) => (
            <Link
              key={mod.name}
              href={mod.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <mod.icon className="h-4 w-4" />
              {mod.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome to Meridian Commerce. Your B2B eCommerce command center.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { label: "Total Products", value: "5", change: "+5 today" },
            { label: "Active Orders", value: "0", change: "No orders yet" },
            { label: "Customers", value: "1", change: "+1 today" },
            { label: "Revenue", value: "$0.00", change: "Getting started" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-6 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Module Cards */}
        <h3 className="text-lg font-semibold mb-4">Modules</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {modules.map((mod) => (
            <Link key={mod.name} href={mod.href}>
              <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <mod.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold">{mod.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{mod.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
