import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";

import { cn } from "@meridian/ui";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  gradient: string;
  bgLight: string;
  textColor: string;
}

export function StatCard({ label, value, change, icon: Icon, gradient, bgLight, textColor }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-[28px] font-bold text-slate-900 tracking-tight">{value}</p>
          <div className="mt-2 flex items-center gap-1.5">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                bgLight,
                textColor
              )}
            >
              <TrendingUp className="h-3 w-3" />
              {change}
            </span>
          </div>
        </div>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
            gradient
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100",
          gradient
        )}
      />
    </div>
  );
}
