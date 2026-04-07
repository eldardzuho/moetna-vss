import "./types"
import { NotificationModuleService } from "@services"
import loadProviders from "./loaders/providers"
import { Module, Modules } from "@moetnavss/framework/utils"

export default Module(Modules.NOTIFICATION, {
  service: NotificationModuleService,
  loaders: [loadProviders],
})
