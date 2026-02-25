import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

import { Badge, Button } from "@meridian/ui";

const HERO_STATS = [
  { value: "10K+", label: "Products" },
  { value: "500+", label: "Brands" },
  { value: "99.8%", label: "Fill Rate" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-gradient">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="rounded-full border-blue-200 bg-blue-50 text-blue-700 mb-8 px-4 py-1.5">
            <Zap className="h-3.5 w-3.5 mr-2 text-blue-600" />
            AI-Powered B2B Commerce Platform
          </Badge>

          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Professional Supplies,{" "}
            <span className="text-gradient">Delivered Fast</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-500 leading-relaxed">
            Your trusted wholesale source for plumbing, tools, and industrial equipment.
            Volume pricing, real-time inventory, and dedicated support.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-xl px-7 py-3.5 text-[14px] font-semibold shadow-xl shadow-slate-900/20">
              <Link href="/products">
                Browse Catalog
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl border-2 px-7 py-3.5 text-[14px] font-semibold">
              <Link href="/quick-order">Quick Order</Link>
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
