import * as entities from "./src/models"
import { defineMikroOrmCliConfig, Modules } from "@moetnavss/framework/utils"

export default defineMikroOrmCliConfig(Modules.SALES_CHANNEL, {
  entities: Object.values(entities),
})
