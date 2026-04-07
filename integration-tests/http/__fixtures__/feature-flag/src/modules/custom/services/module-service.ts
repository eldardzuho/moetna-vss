import { IModuleService } from "@moetnavss/types"
import { MedusaContext } from "@moetnavss/utils"

// @ts-expect-error
export class ModuleService implements IModuleService {
  public property = "value"

  constructor() {}
  async methodName(input, @MedusaContext() context) {
    return input + " called"
  }
}
