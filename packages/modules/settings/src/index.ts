import { SettingsModuleService } from "@/services"
import { Module } from "@moetnavss/framework/utils"
import { Modules } from "@moetnavss/utils"

export default Module(Modules.SETTINGS, {
  service: SettingsModuleService,
})
