import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { tenants, users, tenantMemberships } from "./schema/tenants";
import { categories, products } from "./schema/products";
import { customers } from "./schema/orders";

const connectionString = process.env.DATABASE_URL ?? "postgresql://meridian:meridian_dev@localhost:5432/meridian";
const client = postgres(connectionString);
const db = drizzle(client);

async function seed() {
  console.log("Seeding database...");

  const [tenant] = await db
    .insert(tenants)
    .values({
      name: "Demo Distributor",
      slug: "demo",
      settings: { currency: "USD", locale: "en-US" },
      plan: "pro",
    })
    .returning();

  console.log("Created tenant:", tenant!.name);

  const [user] = await db
    .insert(users)
    .values({
      email: "admin@demo.meridian.app",
      name: "Admin User",
      passwordHash: "$2b$10$placeholder",
      emailVerified: true,
    })
    .returning();

  console.log("Created user:", user!.email);

  await db.insert(tenantMemberships).values({
    tenantId: tenant!.id,
    userId: user!.id,
    role: "owner",
  });

  const [category] = await db
    .insert(categories)
    .values({
      tenantId: tenant!.id,
      name: "Plumbing Supplies",
      slug: "plumbing-supplies",
      description: "All plumbing supplies and fixtures",
    })
    .returning();

  console.log("Created category:", category!.name);

  const sampleProducts = [
    { sku: "PLM-001", name: "Kitchen Faucet - Chrome", slug: "kitchen-faucet-chrome", basePrice: "149.99", brand: "AquaFlow" },
    { sku: "PLM-002", name: "Bathroom Sink Faucet - Brushed Nickel", slug: "bathroom-sink-faucet-brushed-nickel", basePrice: "89.99", brand: "AquaFlow" },
    { sku: "PLM-003", name: "Pipe Wrench 14-inch", slug: "pipe-wrench-14-inch", basePrice: "32.50", brand: "ProGrip" },
    { sku: "PLM-004", name: "PVC Pipe 1-inch x 10ft", slug: "pvc-pipe-1-inch-10ft", basePrice: "4.99", brand: "PipeWorks" },
    { sku: "PLM-005", name: "Copper Fitting 1/2-inch Elbow", slug: "copper-fitting-half-inch-elbow", basePrice: "2.49", brand: "CopperPro" },
  ];

  for (const p of sampleProducts) {
    await db.insert(products).values({
      tenantId: tenant!.id,
      sku: p.sku,
      name: p.name,
      slug: p.slug,
      basePrice: p.basePrice,
      brand: p.brand,
      status: "active",
      description: `High-quality ${p.name.toLowerCase()} for professional and residential use.`,
    });
  }

  console.log(`Created ${sampleProducts.length} sample products`);

  await db.insert(customers).values({
    tenantId: tenant!.id,
    companyName: "Smith Plumbing Co.",
    accountNumber: "CUST-001",
    email: "orders@smithplumbing.com",
    phone: "555-0100",
  });

  console.log("Created sample customer");

  console.log("Seed completed successfully!");
  await client.end();
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
