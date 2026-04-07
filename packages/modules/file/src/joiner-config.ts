import { defineJoinerConfig, Modules } from "@moetnavss/framework/utils"

export const joinerConfig = defineJoinerConfig(Modules.FILE, {
  models: [{ name: "File" }],
})
