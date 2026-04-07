import { Module, Modules } from "@moetnavss/framework/utils"
import { StockLocationModuleService } from "@services"

export default Module(Modules.STOCK_LOCATION, {
  service: StockLocationModuleService,
})
