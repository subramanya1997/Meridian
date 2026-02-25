import Link from "next/link";
import {
  Package, ShoppingCart, Users, BarChart3, Settings,
  Layers, Bot, Plug, Search, Bell, ChevronRight,
  TrendingUp, ArrowUpRight, DollarSign, FileText,
  Zap, LayoutDashboard
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/", active: true },
  { name: "Products", icon: Package, href: "/admin/products" },
  { name: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  { name: "Customers", icon: Users, href: "/admin/customers" },
  { name: "Categories", icon: Layers, href: "/admin/categories" },
  { name: "Integrations", icon: Plug, href: "/admin/integrations" },
  { name: "AI Agents", icon: Bot, href: "/admin/agents" },
  { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

const stats = [
  { label: "Total Products", value: "5", change: "+5 this week", icon: Package, gradient: "from-blue-500 to-blue-700", bgLight: "bg-blue-50", textColor: "text-blue-600" },
  { label: "Active Orders", value: "0", change: "No orders yet", icon: ShoppingCart, gradient: "from-emerald-500 to-emerald-700", bgLight: "bg-emerald-50", textColor: "text-emerald-600" },
  { label: "Customers", value: "1", change: "+1 this week", icon: Users, gradient: "from-violet-500 to-violet-700", bgLight: "bg-violet-50", textColor: "text-violet-600" },
  { label: "Revenue", value: "$0.00", change: "Getting started", icon: DollarSign, gradient: "from-amber-500 to-orange-600", bgLight: "bg-amber-50", textColor: "text-amber-600" },
];

const quickActions = [
  { name: "Products", description: "Manage your product catalog", icon: Package, href: "/admin/products", color: "bg-blue-500" },
  { name: "Orders", description: "View and manage orders", icon: ShoppingCart, href: "/admin/orders", color: "bg-emerald-500" },
  { name: "Customers", description: "Manage B2B customers", icon: Users, href: "/admin/customers", color: "bg-violet-500" },
  { name: "Categories", description: "Organize product taxonomy", icon: Layers, href: "/admin/categories", color: "bg-indigo-500" },
  { name: "Integrations", description: "Connect external systems", icon: Plug, href: "/admin/integrations", color: "bg-teal-500" },
  { name: "AI Agents", description: "AI-powered automation", icon: Bot, href: "/admin/agents", color: "bg-purple-500" },
  { name: "Content", description: "CMS pages & blog", icon: FileText, href: "/admin/content", color: "bg-rose-500" },
  { name: "Analytics", description: "Business insights", icon: BarChart3, href: "/admin/analytics", color: "bg-orange-500" },
];

const recentActivity = [
  { action: "Product imported", detail: "Kitchen Faucet - Chrome (PLM-001)", time: "Just now", icon: Package, color: "text-blue-500" },
  { action: "Product imported", detail: "Bathroom Sink Faucet (PLM-002)", time: "Just now", icon: Package, color: "text-blue-500" },
  { action: "Customer created", detail: "Smith Plumbing Co.", time: "Just now", icon: Users, color: "text-violet-500" },
  { action: "Tenant configured", detail: "Demo Distributor", time: "Just now", icon: Zap, color: "text-amber-500" },
];

export default function AdminDashboard() {
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
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-semibold text-white">
              AU
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white truncate">Admin User</p>
              <p className="text-[11px] text-slate-400 truncate">admin@demo.meridian.app</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[260px]">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white/80 backdrop-blur-xl px-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search anything..."
                className="h-9 w-72 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm transition-colors focus:bg-white focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">3</span>
            </button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-semibold text-white">
                AU
              </div>
              <span className="text-sm font-medium text-slate-700">Admin</span>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Good morning, Admin</h2>
            <p className="text-sm text-slate-500 mt-1">Here&apos;s what&apos;s happening with your store today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm card-hover">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[13px] font-medium text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-[28px] font-bold text-slate-900 tracking-tight">{stat.value}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className={`inline-flex items-center gap-0.5 rounded-full ${stat.bgLight} px-2 py-0.5 text-[11px] font-semibold ${stat.textColor}`}>
                        <TrendingUp className="h-3 w-3" />
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 transition-opacity group-hover:opacity-100`} />
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold text-slate-900">Modules</h3>
                <span className="text-xs text-slate-400">{quickActions.length} available</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {quickActions.map((action) => (
                  <Link key={action.name} href={action.href}>
                    <div className="group flex items-center gap-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm card-hover cursor-pointer">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${action.color} shadow-md`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-slate-900">{action.name}</p>
                        <p className="text-[12px] text-slate-500 truncate">{action.description}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold text-slate-900">Recent Activity</h3>
                <button className="text-xs font-medium text-blue-600 hover:text-blue-700">View all</button>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 transition-colors hover:bg-slate-50">
                      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 ${item.color}`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-slate-900">{item.action}</p>
                        <p className="text-[12px] text-slate-500 truncate">{item.detail}</p>
                      </div>
                      <span className="text-[11px] text-slate-400 whitespace-nowrap">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Start Banner */}
              <div className="mt-4 overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-5 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-white">Getting Started</p>
                    <p className="mt-1 text-[12px] text-blue-100 leading-relaxed">
                      Import your product catalog, configure integrations, and launch your B2B storefront.
                    </p>
                    <button className="mt-3 inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-[12px] font-semibold text-blue-700 shadow-sm transition-transform hover:scale-105">
                      Start Setup
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
