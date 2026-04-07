import { defineMikroOrmCliConfig, Modules } from "@moetnavss/framework/utils"
import * as entities from "./src/models"

export default defineMikroOrmCliConfig(Modules.INDEX, {
  entities: Object.values(entities),
})
