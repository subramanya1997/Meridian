import type { LucideIcon } from "lucide-react";

import { cn } from "@meridian/ui";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
}

interface FeatureStripProps {
  features: Feature[];
}

export function FeatureStrip({ features }: FeatureStripProps) {
  return (
    <section className="border-y bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex items-center gap-3.5 py-6 px-5">
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", f.bg)}>
                  <Icon className={cn("h-5 w-5", f.color)} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-900">{f.title}</p>
                  <p className="text-[12px] text-slate-500">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
