import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button, Card, CardContent } from "@meridian/ui";

const PROMOS = [
  {
    title: "Bulk Order Savings",
    subtitle: "Plumbing & pipe fittings",
    discount: "15%",
    discountLabel: "Volume Discount",
    bg: "bg-gradient-to-br from-emerald-500 to-green-700",
  },
  {
    title: "Clearance Tools",
    subtitle: "Hand & power tools",
    discount: "20%",
    discountLabel: "Limited Offer",
    bg: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
];

export function PromoBanners() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {PROMOS.map((promo) => (
            <Card
              key={promo.title}
              className={`${promo.bg} border-0 text-white overflow-hidden`}
            >
              <CardContent className="p-8 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{promo.title}</h3>
                  <p className="text-white/80 text-sm mt-1">{promo.subtitle}</p>
                  <Button
                    asChild
                    size="sm"
                    variant="secondary"
                    className="mt-4 rounded-full"
                  >
                    <Link href="/products">
                      Shop Now
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-extrabold">{promo.discount}</p>
                  <p className="text-white/70 text-sm mt-1">{promo.discountLabel}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
