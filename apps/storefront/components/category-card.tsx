import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { cn } from "@meridian/ui";

interface CategoryCardProps {
  name: string;
  description: string;
  count: string;
  icon: LucideIcon;
  gradient: string;
  href: string;
}

export function CategoryCard({ name, description, count, icon: Icon, gradient, href }: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
        <div
          className={cn(
            "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
            gradient
          )}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{name}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[12px] font-semibold text-blue-600">{count} items</span>
          <ArrowRight className="h-3.5 w-3.5 text-blue-600 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
        </div>
        <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-[80px] bg-gradient-to-bl from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}
