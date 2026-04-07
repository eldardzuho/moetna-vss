import { CustomerModuleService } from "@services"
import { Module, Modules } from "@moetnavss/framework/utils"

export default Module(Modules.CUSTOMER, {
  service: CustomerModuleService,
})
