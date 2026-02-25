import Link from "next/link";
import { Package, ShoppingCart, Star, Heart } from "lucide-react";

import { Button, Badge, cn } from "@meridian/ui";

interface ProductCardProps {
  id: string;
  sku: string;
  name: string;
  slug: string;
  basePrice: string | null;
  brand: string | null;
  description?: string | null;
  status?: string;
  variant?: "default" | "compact";
}

export function ProductCard({
  sku,
  name,
  slug,
  basePrice,
  brand,
  description,
  status,
  variant = "default",
}: ProductCardProps) {
  const isCompact = variant === "compact";

  return (
    <Link href={`/products/${slug}`}>
      <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        {/* Image Placeholder */}
        <div className="relative bg-gradient-to-br from-slate-50 to-slate-100/80 p-10 flex items-center justify-center overflow-hidden">
          <Package className="h-16 w-16 text-slate-300 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-400" />
          {!isCompact && (
            <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-slate-400 opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0 hover:text-red-500 hover:bg-red-50">
              <Heart className="h-4 w-4" />
            </button>
          )}
          {isCompact && (
            <div className="absolute top-3 right-3">
              <Badge className="rounded-full bg-blue-600 text-white text-[10px] font-bold border-0 shadow-sm">
                NEW
              </Badge>
            </div>
          )}
          {!isCompact && status === "active" && (
            <div className="absolute top-3 left-3">
              <Badge className="rounded-full bg-emerald-500 text-white text-[10px] font-bold border-0 shadow-sm">
                IN STOCK
              </Badge>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <code className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
              {sku}
            </code>
            {brand && <span className="text-[11px] font-medium text-blue-600">{brand}</span>}
          </div>
          <h3 className="font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          {!isCompact && description && (
            <p className="mt-1.5 text-[12px] text-slate-500 line-clamp-2 leading-relaxed">{description}</p>
          )}

          {/* Rating (non-compact only) */}
          {!isCompact && (
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < 4 ? "fill-amber-400 text-amber-400" : "text-slate-200"
                  )}
                />
              ))}
              <span className="ml-1.5 text-[11px] text-slate-400">(24)</span>
            </div>
          )}

          {/* Price & CTA */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-slate-900">
                {basePrice ? `$${Number(basePrice).toFixed(2)}` : "Contact"}
              </span>
              {!isCompact && basePrice && (
                <span className="ml-1.5 text-[11px] text-slate-400">/each</span>
              )}
            </div>
            <Button size="sm" className="rounded-xl text-[12px] font-semibold">
              <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
