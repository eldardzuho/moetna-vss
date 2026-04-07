import { ModuleProvider, Modules } from "@moetnavss/framework/utils"
import { PostgresAdvisoryLockProvider } from "./services/advisory-lock"

const services = [PostgresAdvisoryLockProvider]

export default ModuleProvider(Modules.LOCKING, {
  services,
})
