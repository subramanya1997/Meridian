export type TenantId = string;
export type UserId = string;

export interface Tenant {
  id: TenantId;
  name: string;
  slug: string;
  customDomain?: string;
  logoUrl?: string;
  settings: Record<string, unknown>;
  plan: "starter" | "pro" | "enterprise";
  status: "active" | "inactive" | "suspended";
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: UserId;
  email: string;
  name?: string;
  avatarUrl?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantMembership {
  id: string;
  tenantId: TenantId;
  userId: UserId;
  role: "owner" | "admin" | "member" | "viewer";
  joinedAt: Date;
}

export interface Product {
  id: string;
  tenantId: TenantId;
  sku: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  brand?: string;
  manufacturer?: string;
  basePrice?: number;
  costPrice?: number;
  currency: string;
  status: "draft" | "active" | "archived" | "discontinued";
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  tenantId: TenantId;
  name: string;
  slug: string;
  description?: string;
  path: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  tenantId: TenantId;
  orderNumber: string;
  customerId: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "canceled";
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  total: number;
  currency: string;
  paymentStatus: "unpaid" | "authorized" | "paid" | "refunded";
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  tenantId: TenantId;
  companyName: string;
  accountNumber?: string;
  email?: string;
  phone?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}
