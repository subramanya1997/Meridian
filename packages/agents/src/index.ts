export const AVAILABLE_AGENTS = [
  "catalog_agent",
  "content_agent",
  "taxonomy_agent",
  "search_agent",
  "integration_agent",
  "analytics_agent",
  "storefront_builder_agent",
  "customer_support_agent",
] as const;

export type AgentId = (typeof AVAILABLE_AGENTS)[number];
