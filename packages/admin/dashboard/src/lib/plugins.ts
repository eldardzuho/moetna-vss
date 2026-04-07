import { HttpTypes } from "@moetnavss/types"

export const LOYALTY_PLUGIN_NAME = "@moetnavss/loyalty-plugin"

export const getLoyaltyPlugin = (plugins: HttpTypes.AdminPlugin[]) => {
  return plugins?.find((plugin) => plugin.name === LOYALTY_PLUGIN_NAME)
}
