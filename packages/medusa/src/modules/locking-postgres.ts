import PostgresLockingProvider from "@moetnavss/locking-postgres"

export * from "@moetnavss/locking-postgres"

export default PostgresLockingProvider
export const discoveryPath = require.resolve("@moetnavss/locking-postgres")
