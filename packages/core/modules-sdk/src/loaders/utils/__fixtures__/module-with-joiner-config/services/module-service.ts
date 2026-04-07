import { IModuleService, ModuleJoinerConfig } from "@moetnavss/types"
import { defineJoinerConfig } from "@moetnavss/utils"

export class ModuleService implements IModuleService {
  __joinerConfig(): ModuleJoinerConfig {
    return defineJoinerConfig("module-service", {
      alias: [
        {
          name: ["custom_name"],
          entity: "Custom",
        },
      ],
    })
  }
}
