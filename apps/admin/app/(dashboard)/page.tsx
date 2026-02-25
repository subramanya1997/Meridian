import {
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Layers,
  Bot,
  Plug,
  DollarSign,
  FileText,
  Zap,
} from "lucide-react";

import { PageHeader } from "@meridian/ui";
import { StatCard } from "../../components/stat-card";
import { ModuleCard } from "../../components/module-card";
import { ActivityFeed } from "../../components/activity-feed";
import { GettingStartedBanner } from "../../components/getting-started-banner";

const stats = [
  {
    label: "Total Products",
    value: "5",
    change: "+5 this week",
    icon: Package,
    gradient: "from-blue-500 to-blue-700",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    label: "Active Orders",
    value: "0",
    change: "No orders yet",
    icon: ShoppingCart,
    gradient: "from-emerald-500 to-emerald-700",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    label: "Customers",
    value: "1",
    change: "+1 this week",
    icon: Users,
    gradient: "from-violet-500 to-violet-700",
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
  },
  {
    label: "Revenue",
    value: "$0.00",
    change: "Getting started",
    icon: DollarSign,
    gradient: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
  },
];

const modules = [
  { name: "Products", description: "Manage your product catalog", icon: Package, href: "/products", color: "bg-blue-500" },
  { name: "Orders", description: "View and manage orders", icon: ShoppingCart, href: "/orders", color: "bg-emerald-500" },
  { name: "Customers", description: "Manage B2B customers", icon: Users, href: "/customers", color: "bg-violet-500" },
  { name: "Categories", description: "Organize product taxonomy", icon: Layers, href: "/categories", color: "bg-indigo-500" },
  { name: "Integrations", description: "Connect external systems", icon: Plug, href: "/integrations", color: "bg-teal-500" },
  { name: "AI Agents", description: "AI-powered automation", icon: Bot, href: "/agents", color: "bg-purple-500" },
  { name: "Content", description: "CMS pages & blog", icon: FileText, href: "/content", color: "bg-rose-500" },
  { name: "Analytics", description: "Business insights", icon: BarChart3, href: "/analytics", color: "bg-orange-500" },
];

const recentActivity = [
  { action: "Product imported", detail: "Kitchen Faucet - Chrome (PLM-001)", time: "Just now", icon: Package, color: "text-blue-500" },
  { action: "Product imported", detail: "Bathroom Sink Faucet (PLM-002)", time: "Just now", icon: Package, color: "text-blue-500" },
  { action: "Customer created", detail: "Smith Plumbing Co.", time: "Just now", icon: Users, color: "text-violet-500" },
  { action: "Tenant configured", detail: "Demo Distributor", time: "Just now", icon: Zap, color: "text-amber-500" },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Good morning, Admin"
        description="Here's what's happening with your store today."
      />

      {/* Stats Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Modules */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-semibold text-slate-900">Modules</h3>
            <span className="text-xs text-slate-400">{modules.length} available</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {modules.map((mod) => (
              <ModuleCard key={mod.name} {...mod} />
            ))}
          </div>
        </div>

        {/* Activity + Getting Started */}
        <div>
          <ActivityFeed items={recentActivity} />
          <GettingStartedBanner />
        </div>
      </div>
    </>
  );
}
