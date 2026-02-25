import { Truck, Shield, Clock, Headphones, Wrench, PenTool, Package, Building2, Zap } from "lucide-react";

import { db } from "@meridian/db";
import { products, tenants } from "@meridian/db/schema";
import { eq } from "drizzle-orm";

import { HeroSection } from "../../components/hero-section";
import { FeatureStrip } from "../../components/feature-strip";
import { SectionHeader } from "../../components/section-header";
import { CategoryCard } from "../../components/category-card";
import { ProductCard } from "../../components/product-card";
import { TestimonialCard } from "../../components/testimonial-card";
import { CTASection } from "../../components/cta-section";

async function getFeaturedProducts() {
  try {
    const tenant = await db.query.tenants.findFirst({ where: eq(tenants.slug, "demo") });
    if (!tenant) return [];
    return db.query.products.findMany({
      where: eq(products.tenantId, tenant.id),
      columns: { id: true, sku: true, name: true, basePrice: true, brand: true, slug: true },
      limit: 4,
    });
  } catch {
    return [];
  }
}

const categories = [
  { name: "Plumbing Supplies", count: "2,400+", icon: Wrench, gradient: "from-blue-500 to-blue-700", description: "Faucets, pipes, fittings & more", href: "/products" },
  { name: "Hand Tools", count: "1,800+", icon: PenTool, gradient: "from-emerald-500 to-emerald-700", description: "Professional-grade tools", href: "/products" },
  { name: "Pipe & Fittings", count: "3,200+", icon: Package, gradient: "from-violet-500 to-violet-700", description: "Copper, PVC, steel & more", href: "/products" },
];

const features = [
  { icon: Truck, title: "Free Shipping", description: "On orders over $500", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Shield, title: "Secure Payments", description: "PCI-DSS compliant", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Clock, title: "Same Day Dispatch", description: "Order before 2pm", color: "text-violet-600", bg: "bg-violet-50" },
  { icon: Headphones, title: "Expert Support", description: "Dedicated account manager", color: "text-amber-600", bg: "bg-amber-50" },
];

const testimonials = [
  { name: "Mike Johnson", role: "Owner, Johnson Plumbing", text: "Meridian transformed how we order supplies. The quick-order feature alone saves us hours every week.", stars: 5 },
  { name: "Sarah Chen", role: "Procurement, Pacific Builders", text: "Customer-specific pricing and real-time inventory are game changers for our business.", stars: 5 },
];

export default async function StorefrontHome() {
  const featured = await getFeaturedProducts();

  return (
    <>
      <HeroSection />
      <FeatureStrip features={features} />

      {/* Categories */}
      <section className="py-20">
        <SectionHeader eyebrow="Browse" title="Shop by Category" viewAllHref="/categories" viewAllLabel="View all categories" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.name} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-20 bg-slate-50">
          <SectionHeader eyebrow="Top Picks" title="Featured Products" viewAllHref="/products" viewAllLabel="View all products" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} {...product} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[12px] font-bold uppercase tracking-widest text-blue-600 mb-2">Why Meridian</p>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Built for B2B Buyers</h2>
            <p className="mt-3 text-slate-500 max-w-lg mx-auto">Everything you need to streamline your procurement workflow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: "Customer-Specific Pricing", description: "Negotiated rates, volume discounts, and contract pricing — all resolved automatically at checkout." },
              { icon: Zap, title: "Quick Order Pad", description: "Enter SKUs and quantities directly. Upload a CSV. Reorder from past orders with one click." },
              { icon: Shield, title: "Enterprise-Grade Security", description: "SOC 2 ready architecture with row-level data isolation and encrypted transactions." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                    <Icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[12px] font-bold uppercase tracking-widest text-blue-400 mb-2">Testimonials</p>
            <h2 className="text-3xl font-bold text-white tracking-tight">Trusted by Professionals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
