import { cn } from "../lib/utils";

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string; ring: string }> = {
  active: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", ring: "ring-emerald-200" },
  published: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", ring: "ring-emerald-200" },
  confirmed: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", ring: "ring-blue-200" },
  processing: { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-500", ring: "ring-indigo-200" },
  shipped: { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-500", ring: "ring-indigo-200" },
  delivered: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", ring: "ring-emerald-200" },
  draft: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", ring: "ring-amber-200" },
  pending: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", ring: "ring-amber-200" },
  unpaid: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", ring: "ring-amber-200" },
  paid: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", ring: "ring-emerald-200" },
  canceled: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", ring: "ring-red-200" },
  archived: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400", ring: "ring-slate-200" },
  discontinued: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400", ring: "ring-slate-200" },
  inactive: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400", ring: "ring-slate-200" },
};

const DEFAULT_CONFIG = { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400", ring: "ring-slate-200" };

interface StatusBadgeProps {
  status: string;
  className?: string;
}

function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? DEFAULT_CONFIG;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset",
        config.bg,
        config.text,
        config.ring,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {status}
    </span>
  );
}

export { StatusBadge, STATUS_CONFIG };
export type { StatusBadgeProps };
