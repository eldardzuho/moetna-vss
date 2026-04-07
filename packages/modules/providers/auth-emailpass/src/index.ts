import { ModuleProvider, Modules } from "@moetnavss/framework/utils"
import { EmailPassAuthService } from "./services/emailpass"

const services = [EmailPassAuthService]

export default ModuleProvider(Modules.AUTH, {
  services,
})
