"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@meridian/ui";
import { ProductCard } from "./product-card";

interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  basePrice: string | null;
  brand: string | null;
  description?: string | null;
  status?: string;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewAllHref?: string;
}

export function ProductCarousel({ title, products, viewAllHref }: ProductCarouselProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-sm font-medium text-primary hover:text-primary/80 inline-flex items-center gap-1"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <Carousel
          opts={{ align: "start", loop: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <ProductCard {...product} variant="compact" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 hidden md:flex" />
          <CarouselNext className="-right-4 hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
