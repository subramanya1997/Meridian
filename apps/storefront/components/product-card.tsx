import Link from "next/link";
import { ShoppingCart, Heart, Package } from "lucide-react";

import { Button, Badge, Card, CardContent, cn } from "@meridian/ui";

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
  const price = basePrice ? Number(basePrice) : null;
  const savings = price ? Math.round(price * 0.1) : null; // mock 10% savings

  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Image area */}
      <div className="relative bg-muted/30 p-6 flex items-center justify-center aspect-square">
        <Package className="h-16 w-16 text-muted-foreground/30 transition-transform duration-300 group-hover:scale-105" />

        {/* Save badge */}
        {savings && savings > 0 && (
          <Badge variant="destructive" className="absolute top-3 left-3 text-[10px] font-bold rounded-md">
            Save ${savings}
          </Badge>
        )}

        {/* Wishlist */}
        <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-sm border opacity-0 group-hover:opacity-100 transition-all hover:text-destructive">
          <Heart className="h-4 w-4" />
        </button>

        {/* Status */}
        {status === "active" && (
          <Badge className="absolute bottom-3 left-3 text-[10px] rounded-md">
            In Stock
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-2">
        {/* Brand + SKU */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">{sku}</span>
          {brand && (
            <>
              <span className="text-muted-foreground">·</span>
              <span className="text-xs font-medium text-primary">{brand}</span>
            </>
          )}
        </div>

        {/* Name */}
        <Link href={`/products/${slug}`}>
          <h3 className="font-medium leading-snug line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {/* Description (default variant only) */}
        {variant === "default" && description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-lg font-bold">
            {price ? `$${price.toFixed(2)}` : "Contact"}
          </span>
          {price && (
            <span className="text-xs text-muted-foreground">USD</span>
          )}
          {variant === "default" && (
            <span className="text-xs text-muted-foreground ml-auto">25 pieces</span>
          )}
        </div>

        {/* Add to Cart */}
        <Button className="w-full mt-2 gap-2" size="sm">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
