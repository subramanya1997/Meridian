import { Plus, Download, Upload } from "lucide-react";

import { db } from "@meridian/db";
import { products, tenants } from "@meridian/db/schema";
import { eq } from "drizzle-orm";

import { PageHeader, SearchInput, Button } from "@meridian/ui";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { ProductTable } from "../../../components/products/product-table";

export default async function ProductsPage() {
  let productList: {
    id: string;
    sku: string;
    name: string;
    status: string;
    basePrice: string | null;
    brand: string | null;
    manufacturer: string | null;
    currency: string;
  }[] = [];
  let error: string | null = null;

  try {
    const tenant = await db.query.tenants.findFirst({
      where: eq(tenants.slug, "demo"),
    });
    if (tenant) {
      productList = await db.query.products.findMany({
        where: eq(products.tenantId, tenant.id),
        columns: {
          id: true,
          sku: true,
          name: true,
          status: true,
          basePrice: true,
          brand: true,
          manufacturer: true,
          currency: true,
        },
      });
    }
  } catch {
    error = "Database connection not available. Start Docker services with: docker compose up -d";
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Products" }]} />

      <PageHeader
        title="Products"
        description={`Manage your product catalog · ${productList.length} products`}
      >
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </PageHeader>

      <SearchInput
        placeholder="Search products by name, SKU, brand..."
        className="mb-5 max-w-sm"
      />

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      ) : (
        <ProductTable products={productList} />
      )}
    </>
  );
}
