import { MedusaModule } from "@moetnavss/framework/modules-sdk"
import { IEventBusService } from "@moetnavss/framework/types"
import { Modules } from "@moetnavss/framework/utils"

export const initialize = async (): Promise<IEventBusService> => {
  const serviceKey = Modules.EVENT_BUS
  const loaded = await MedusaModule.bootstrap<IEventBusService>({
    moduleKey: serviceKey,
    defaultPath: "@moetnavss/event-bus-local",
  })

  return loaded[serviceKey]
}
