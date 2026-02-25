"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Zap } from "lucide-react";

import { Button, SearchInput, cn } from "@meridian/ui";

const NAV_ITEMS = [
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Quick Order", href: "/quick-order" },
  { name: "Deals", href: "/deals" },
];

interface SiteHeaderProps {
  cartCount?: number;
}

export function SiteHeader({ cartCount = 0 }: SiteHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Nav */}
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
              {NAV_ITEMS.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors",
                      isActive
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Search + Actions */}
          <div className="flex items-center gap-3">
            <SearchInput
              placeholder="Search 10,000+ products..."
              className="hidden md:block w-72 transition-all focus-within:w-96"
            />
            <Button variant="outline" size="icon" className="relative rounded-xl">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm">
                {cartCount}
              </span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-xl">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
