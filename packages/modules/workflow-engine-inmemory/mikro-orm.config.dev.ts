import { defineMikroOrmCliConfig, Modules } from "@moetnavss/framework/utils"
import * as entities from "./src/models"

export default defineMikroOrmCliConfig(Modules.WORKFLOW_ENGINE, {
  entities: Object.values(entities),
})
