import * as entities from "./src/models"
import { defineMikroOrmCliConfig, Modules } from "@moetnavss/framework/utils"

export default defineMikroOrmCliConfig(Modules.API_KEY, {
  entities: Object.values(entities),
})
