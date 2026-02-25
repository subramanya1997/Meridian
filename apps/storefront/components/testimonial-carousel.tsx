"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@meridian/ui";
import { TestimonialCard } from "./testimonial-card";

const TESTIMONIALS = [
  {
    name: "Mike Johnson",
    role: "Owner, Johnson Plumbing",
    title: "Highly Recommended!",
    text: "The ordering process was seamless and the support team was super helpful. Our procurement is now 3x faster.",
    stars: 5,
    accentColor: "bg-primary",
  },
  {
    name: "Sarah Chen",
    role: "Procurement, Pacific Builders",
    title: "Fantastic Experience!",
    text: "Fast delivery and top quality products. Customer-specific pricing saved us thousands this quarter.",
    stars: 5,
    accentColor: "bg-amber-600",
  },
  {
    name: "David Park",
    role: "Manager, AllFix Services",
    title: "Best B2B Platform",
    text: "The quick order feature and real-time inventory changed how we manage supplies. Highly recommend.",
    stars: 5,
    accentColor: "bg-blue-600",
  },
];

export function TestimonialCarousel() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-tight">What our Customers say</h2>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {TESTIMONIALS.map((t) => (
              <CarouselItem key={t.name} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <TestimonialCard {...t} />
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
