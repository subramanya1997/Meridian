import Link from "next/link";
import { ChevronRight, Wrench, Zap, HardHat, Pipette, Hammer, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CategoryItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

const CATEGORIES: CategoryItem[] = [
  { name: "Plumbing", icon: Pipette, href: "/products" },
  { name: "Electrical", icon: Zap, href: "/products" },
  { name: "Hand Tools", icon: Wrench, href: "/products" },
  { name: "Power Tools", icon: Hammer, href: "/products" },
  { name: "Safety", icon: ShieldCheck, href: "/products" },
  { name: "Hardware", icon: HardHat, href: "/products" },
];

export function CategoryRow() {
  return (
    <section className="py-12 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-tight">Shop by Category</h2>
          <Link
            href="/categories"
            className="text-sm font-medium text-primary hover:text-primary/80 inline-flex items-center gap-1"
          >
            View Category
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.name} href={cat.href} className="group text-center">
                <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary/10">
                  <Icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm font-medium text-foreground">{cat.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
