import { ModuleProvider, Modules } from "@moetnavss/framework/utils"
import { S3FileService } from "./services/s3-file"

const services = [S3FileService]

export default ModuleProvider(Modules.FILE, {
  services,
})
