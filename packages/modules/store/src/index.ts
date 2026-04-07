import { StoreModuleService } from "@services"
import { Module, Modules } from "@moetnavss/framework/utils"

export default Module(Modules.STORE, {
  service: StoreModuleService,
})
