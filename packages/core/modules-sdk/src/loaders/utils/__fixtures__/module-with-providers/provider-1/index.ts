import { ModuleProviderService } from "./services/provider-service"
import { ModuleProvider } from "@moetnavss/utils"

export * from "./services/provider-service"

export default ModuleProvider("provider-1", {
  services: [ModuleProviderService],
})
