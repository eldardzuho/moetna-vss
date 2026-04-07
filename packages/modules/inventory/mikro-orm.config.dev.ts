import * as entities from "./src/models"

import { defineMikroOrmCliConfig, Modules } from "@moetnavss/framework/utils"

export default defineMikroOrmCliConfig(Modules.INVENTORY, {
  entities: Object.values(entities),
})
