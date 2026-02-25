import { db } from "@meridian/db";
import { products, tenants } from "@meridian/db/schema";
import { eq } from "drizzle-orm";

import { HeroSection } from "../../components/hero-section";
import { CategoryRow } from "../../components/category-row";
import { ProductCarousel } from "../../components/product-carousel";
import { PromoBanners } from "../../components/promo-banners";
import { TestimonialCarousel } from "../../components/testimonial-carousel";

async function getProducts() {
  try {
    const tenant = await db.query.tenants.findFirst({ where: eq(tenants.slug, "demo") });
    if (!tenant) return [];
    return db.query.products.findMany({
      where: eq(products.tenantId, tenant.id),
      columns: { id: true, sku: true, name: true, basePrice: true, brand: true, slug: true, description: true, status: true },
    });
  } catch {
    return [];
  }
}

export default async function StorefrontHome() {
  const allProducts = await getProducts();

  return (
    <>
      <HeroSection />
      <CategoryRow />
      <ProductCarousel
        title="Today's Best Deals"
        products={allProducts}
        viewAllHref="/products"
      />
      <PromoBanners />
      <ProductCarousel
        title="Recent Products"
        products={allProducts}
        viewAllHref="/products"
      />
      <TestimonialCarousel />
    </>
  );
}
