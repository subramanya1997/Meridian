import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  viewAllHref,
  viewAllLabel = "View all",
}: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-widest text-blue-600 mb-2">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h2>
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="group flex items-center gap-1 text-[13px] font-semibold text-blue-600 hover:text-blue-700"
          >
            {viewAllLabel}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
