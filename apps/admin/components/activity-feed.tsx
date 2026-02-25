import type { LucideIcon } from "lucide-react";

import { cn } from "@meridian/ui";

interface ActivityItem {
  action: string;
  detail: string;
  time: string;
  icon: LucideIcon;
  color: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
  title?: string;
}

export function ActivityFeed({ items, title = "Recent Activity" }: ActivityFeedProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
        <button className="text-xs font-medium text-blue-600 hover:text-blue-700">View all</button>
      </div>
      <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-3 p-4 transition-colors hover:bg-slate-50">
                <div
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100",
                    item.color
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-slate-900">{item.action}</p>
                  <p className="text-[12px] text-slate-500 truncate">{item.detail}</p>
                </div>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">{item.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
