"use client";

import { Package, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  StatusBadge,
  EmptyState,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@meridian/ui";

interface ProductData {
  id: string;
  sku: string;
  name: string;
  status: string;
  basePrice: string | null;
  brand: string | null;
  manufacturer: string | null;
  currency: string;
}

interface ProductTableProps {
  products: ProductData[];
}

function ProductRow({ product }: { product: ProductData }) {
  return (
    <TableRow className="group hover:bg-blue-50/40">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-blue-100 transition-colors">
            <Package className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <span className="font-medium text-slate-900">{product.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <code className="rounded-md bg-slate-100 px-2 py-1 text-[12px] font-mono text-slate-600">
          {product.sku}
        </code>
      </TableCell>
      <TableCell className="text-slate-600">{product.brand ?? "—"}</TableCell>
      <TableCell className="text-right">
        <span className="font-semibold text-slate-900">
          {product.basePrice ? `$${Number(product.basePrice).toFixed(2)}` : "—"}
        </span>
      </TableCell>
      <TableCell className="text-center">
        <StatusBadge status={product.status} />
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export function ProductTable({ products }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm">
        <EmptyState
          icon={Package}
          title="No products yet"
          description="Get started by adding your first product."
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-slate-100 bg-slate-50/80 hover:bg-slate-50/80">
            <TableHead className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">
              Product
            </TableHead>
            <TableHead className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">
              SKU
            </TableHead>
            <TableHead className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">
              Brand
            </TableHead>
            <TableHead className="text-right text-[12px] font-semibold uppercase tracking-wider text-slate-500">
              Price
            </TableHead>
            <TableHead className="text-center text-[12px] font-semibold uppercase tracking-wider text-slate-500">
              Status
            </TableHead>
            <TableHead className="text-right text-[12px] font-semibold uppercase tracking-wider text-slate-500" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
        <p className="text-[12px] text-slate-500">
          Showing {products.length} of {products.length} products
        </p>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" className="text-[12px]">
            Previous
          </Button>
          <Button size="sm" className="text-[12px]">
            1
          </Button>
          <Button variant="outline" size="sm" className="text-[12px]">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
