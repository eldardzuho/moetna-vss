import { defineConfig } from "@moetnavss/utils"

const { Modules } = require("@moetnavss/utils")

const DB_HOST = process.env.DB_HOST
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_TEMP_NAME
const DB_URL = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
process.env.POSTGRES_URL = DB_URL
process.env.LOG_LEVEL = "error"

const customTaxProviderRegistration = {
  resolve: {
    services: [require("@moetnavss/tax/dist/providers/system").default],
  },
  id: "system_2",
}

const customPaymentProvider = {
  resolve: {
    services: [require("@moetnavss/payment/dist/providers/system").default],
  },
  id: "default_2",
}

const customFulfillmentProvider = {
  resolve: "@moetnavss/fulfillment-manual",
  id: "test-provider",
}

const customFulfillmentProviderCalculated = {
  resolve: require("./dist/utils/providers/fulfillment-manual-calculated")
    .default,
  id: "test-provider-calculated",
}

module.exports = defineConfig({
  admin: {
    disable: true,
  },
  plugins: [],
  projectConfig: {
    databaseUrl: DB_URL,
    databaseType: "postgres",
    http: {
      jwtSecret: "test",
      cookieSecret: "test",
    },
  },
  featureFlags: {},
  modules: [
    {
      key: "testingModule",
      resolve: "__tests__/__fixtures__/testing-module",
    },
    {
      key: "auth",
      resolve: "@moetnavss/auth",
      options: {
        providers: [
          {
            id: "emailpass",
            resolve: "@moetnavss/auth-emailpass",
          },
        ],
      },
    },
    {
      key: Modules.USER,
      scope: "internal",
      resolve: "@moetnavss/user",
      options: {
        jwt_secret: "test",
      },
    },
    {
      key: Modules.CACHE,
      resolve: "@moetnavss/cache-inmemory",
      options: { ttl: 0 }, // Cache disabled
    },
    {
      key: Modules.LOCKING,
      resolve: "@moetnavss/locking",
    },
    {
      key: Modules.STOCK_LOCATION,
      resolve: "@moetnavss/stock-location",
      options: {},
    },
    {
      key: Modules.INVENTORY,
      resolve: "@moetnavss/inventory",
      options: {},
    },
    {
      key: Modules.PRODUCT,
      resolve: "@moetnavss/product",
    },
    {
      key: Modules.PRICING,
      resolve: "@moetnavss/pricing",
    },
    {
      key: Modules.PROMOTION,
      resolve: "@moetnavss/promotion",
    },
    {
      key: Modules.REGION,
      resolve: "@moetnavss/region",
    },
    {
      key: Modules.CUSTOMER,
      resolve: "@moetnavss/customer",
    },
    {
      key: Modules.SALES_CHANNEL,
      resolve: "@moetnavss/sales-channel",
    },
    {
      key: Modules.CART,
      resolve: "@moetnavss/cart",
    },
    {
      key: Modules.WORKFLOW_ENGINE,
      resolve: "@moetnavss/workflow-engine-inmemory",
    },
    {
      key: Modules.API_KEY,
      resolve: "@moetnavss/api-key",
    },
    {
      key: Modules.STORE,
      resolve: "@moetnavss/store",
    },
    {
      key: Modules.TAX,
      resolve: "@moetnavss/tax",
      options: {
        providers: [customTaxProviderRegistration],
      },
    },
    {
      key: Modules.CURRENCY,
      resolve: "@moetnavss/currency",
    },
    {
      key: Modules.ORDER,
      resolve: "@moetnavss/order",
    },
    {
      key: Modules.PAYMENT,
      resolve: "@moetnavss/payment",
      options: {
        providers: [customPaymentProvider],
      },
    },
    {
      key: Modules.FULFILLMENT,
      resolve: "@moetnavss/fulfillment",
      options: {
        providers: [
          customFulfillmentProvider,
          customFulfillmentProviderCalculated,
        ],
      },
    },
    {
      key: Modules.NOTIFICATION,
      options: {
        providers: [
          {
            resolve: "@moetnavss/notification-local",
            id: "local-notification-provider",
            options: {
              name: "Local Notification Provider",
              channels: ["log", "email"],
            },
          },
        ],
      },
    },
    {
      key: Modules.INDEX,
      resolve: "@moetnavss/index",
      disable: process.env.ENABLE_INDEX_MODULE !== "true",
    },
    {
      key: "brand",
      resolve: "src/modules/brand",
    },
    {
      key: Modules.RBAC,
      resolve: "@moetnavss/rbac",
    },
  ],
})
