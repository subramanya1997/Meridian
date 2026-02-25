import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

import { cn } from "@meridian/ui";

interface ModuleCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

export function ModuleCard({ name, description, icon: Icon, href, color }: ModuleCardProps) {
  return (
    <Link href={href}>
      <div className="group flex items-center gap-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-md",
            color
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-slate-900">{name}</p>
          <p className="text-[12px] text-slate-500 truncate">{description}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-300 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
      </div>
    </Link>
  );
}
