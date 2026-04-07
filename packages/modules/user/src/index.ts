import { UserModuleService } from "@services"
import { Module, Modules } from "@moetnavss/framework/utils"

export default Module(Modules.USER, {
  service: UserModuleService,
})
