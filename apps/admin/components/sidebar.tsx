"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Layers,
  Bot,
  Plug,
  FileText,
  Zap,
  LayoutDashboard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ScrollArea, Avatar, AvatarFallback, Separator, Tooltip } from "@meridian/ui";

const NAV_ITEMS: { name: string; icon: LucideIcon; href: string }[] = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Products", icon: Package, href: "/products" },
  { name: "Orders", icon: ShoppingCart, href: "/orders" },
  { name: "Customers", icon: Users, href: "/customers" },
  { name: "Categories", icon: Layers, href: "/categories" },
  { name: "Content", icon: FileText, href: "/content" },
  { name: "Integrations", icon: Plug, href: "/integrations" },
  { name: "AI Agents", icon: Bot, href: "/agents" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

function SidebarLogo() {
  return (
    <div className="flex items-center gap-3 px-6 h-16 border-b border-white/10">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
        <Zap className="h-4 w-4 text-white" />
      </div>
      <div>
        <h1 className="text-[15px] font-semibold text-white tracking-tight">Meridian</h1>
        <p className="text-[11px] text-slate-400 -mt-0.5">Commerce Platform</p>
      </div>
    </div>
  );
}

function SidebarNavItem({ item, isActive }: { item: (typeof NAV_ITEMS)[number]; isActive: boolean }) {
  const Icon = item.icon;
  return (
    <Tooltip content={item.name} side="right">
      <Link
        href={item.href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150 ${
          isActive
            ? "bg-white/10 text-white shadow-sm"
            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
        }`}
      >
        <Icon className="h-[18px] w-[18px]" />
        {item.name}
      </Link>
    </Tooltip>
  );
}

function SidebarUserPanel() {
  return (
    <div className="p-3 border-t border-white/10">
      <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-semibold text-white">
            AU
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-white truncate">Admin User</p>
          <p className="text-[11px] text-slate-400 truncate">admin@demo.meridian.app</p>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-[260px] bg-[#0f1729] flex flex-col">
      <SidebarLogo />
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return <SidebarNavItem key={item.name} item={item} isActive={isActive} />;
          })}
        </nav>
      </ScrollArea>
      <Separator className="bg-white/10" />
      <SidebarUserPanel />
    </aside>
  );
}
