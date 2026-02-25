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
    <div className="border-b bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <span key={item.label} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                {isLast || !item.href ? (
                  <span className={isLast ? "font-medium text-slate-900" : ""}>{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-blue-600 transition-colors">
                    {item.label}
                  </Link>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
