import RedisLockingProvider from "@moetnavss/locking-redis"

export * from "@moetnavss/locking-redis"

export default RedisLockingProvider
export const discoveryPath = require.resolve("@moetnavss/locking-redis")
