export const Modules = {
  ANALYTICS: "analytics",
  AUTH: "auth",
  CACHE: "cache",
  CART: "cart",
  CUSTOMER: "customer",
  EVENT_BUS: "event_bus",
  INVENTORY: "inventory",
  LINK: "link_modules",
  PAYMENT: "payment",
  PRICING: "pricing",
  PRODUCT: "product",
  PROMOTION: "promotion",
  SALES_CHANNEL: "sales_channel",
  TAX: "tax",
  FULFILLMENT: "fulfillment",
  STOCK_LOCATION: "stock_location",
  USER: "user",
  WORKFLOW_ENGINE: "workflows",
  REGION: "region",
  ORDER: "order",
  API_KEY: "api_key",
  STORE: "store",
  CURRENCY: "currency",
  FILE: "file",
  NOTIFICATION: "notification",
  INDEX: "index",
  LOCKING: "locking",
  SETTINGS: "settings",
  CACHING: "caching",
  TRANSLATION: "translation",
  RBAC: "rbac",
} as const

export const MODULE_PACKAGE_NAMES = {
  [Modules.ANALYTICS]: "@moetnavss/medusa/analytics",
  [Modules.AUTH]: "@moetnavss/medusa/auth",
  [Modules.CACHE]: "@moetnavss/medusa/cache-inmemory",
  [Modules.CART]: "@moetnavss/medusa/cart",
  [Modules.CUSTOMER]: "@moetnavss/medusa/customer",
  [Modules.EVENT_BUS]: "@moetnavss/medusa/event-bus-local",
  [Modules.INVENTORY]: "@moetnavss/medusa/inventory",
  [Modules.LINK]: "@moetnavss/medusa/link-modules",
  [Modules.PAYMENT]: "@moetnavss/medusa/payment",
  [Modules.PRICING]: "@moetnavss/medusa/pricing",
  [Modules.PRODUCT]: "@moetnavss/medusa/product",
  [Modules.PROMOTION]: "@moetnavss/medusa/promotion",
  [Modules.SALES_CHANNEL]: "@moetnavss/medusa/sales-channel",
  [Modules.FULFILLMENT]: "@moetnavss/medusa/fulfillment",
  [Modules.STOCK_LOCATION]: "@moetnavss/medusa/stock-location",
  [Modules.TAX]: "@moetnavss/medusa/tax",
  [Modules.USER]: "@moetnavss/medusa/user",
  [Modules.WORKFLOW_ENGINE]: "@moetnavss/medusa/workflow-engine-inmemory",
  [Modules.REGION]: "@moetnavss/medusa/region",
  [Modules.ORDER]: "@moetnavss/medusa/order",
  [Modules.API_KEY]: "@moetnavss/medusa/api-key",
  [Modules.STORE]: "@moetnavss/medusa/store",
  [Modules.CURRENCY]: "@moetnavss/medusa/currency",
  [Modules.FILE]: "@moetnavss/medusa/file",
  [Modules.NOTIFICATION]: "@moetnavss/medusa/notification",
  [Modules.INDEX]: "@moetnavss/medusa/index-module",
  [Modules.LOCKING]: "@moetnavss/medusa/locking",
  [Modules.SETTINGS]: "@moetnavss/medusa/settings",
  [Modules.CACHING]: "@moetnavss/medusa/caching",
  [Modules.TRANSLATION]: "@moetnavss/medusa/translation",
  [Modules.RBAC]: "@moetnavss/medusa/rbac",
}

export const REVERSED_MODULE_PACKAGE_NAMES = Object.entries(
  MODULE_PACKAGE_NAMES
).reduce((acc, [key, value]) => {
  acc[value] = key
  return acc
}, {})

// TODO: temporary fix until the event bus, cache and workflow engine are migrated to use providers and therefore only a single resolution will be good
export const TEMPORARY_REDIS_MODULE_PACKAGE_NAMES = {
  [Modules.EVENT_BUS]: "@moetnavss/medusa/event-bus-redis",
  [Modules.CACHE]: "@moetnavss/medusa/cache-redis",
  [Modules.WORKFLOW_ENGINE]: "@moetnavss/medusa/workflow-engine-redis",
  [Modules.LOCKING]: "@moetnavss/medusa/locking-redis",
}

REVERSED_MODULE_PACKAGE_NAMES[
  TEMPORARY_REDIS_MODULE_PACKAGE_NAMES[Modules.EVENT_BUS]
] = Modules.EVENT_BUS
REVERSED_MODULE_PACKAGE_NAMES[
  TEMPORARY_REDIS_MODULE_PACKAGE_NAMES[Modules.CACHE]
] = Modules.CACHE
REVERSED_MODULE_PACKAGE_NAMES[
  TEMPORARY_REDIS_MODULE_PACKAGE_NAMES[Modules.WORKFLOW_ENGINE]
] = Modules.WORKFLOW_ENGINE
REVERSED_MODULE_PACKAGE_NAMES[
  TEMPORARY_REDIS_MODULE_PACKAGE_NAMES[Modules.LOCKING]
] = Modules.LOCKING

/**
 * Making modules be referenced as a type as well.
 */
export type Modules = (typeof Modules)[keyof typeof Modules]
export const ModuleRegistrationName = Modules
