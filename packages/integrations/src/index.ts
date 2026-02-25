export interface IntegrationAdapter {
  id: string;
  name: string;
  type: "erp" | "payment" | "shipping" | "tax" | "marketing";
  supportedEntities: ("product" | "customer" | "order" | "inventory")[];
  testConnection(config: unknown): Promise<{ success: boolean; error?: string }>;
}

export const INTEGRATION_TYPES = ["erp", "payment", "shipping", "tax", "marketing"] as const;
