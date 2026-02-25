import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {isLast || !item.href ? (
              <span className={isLast ? "font-medium text-slate-900" : ""}>{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-slate-700 transition-colors">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
