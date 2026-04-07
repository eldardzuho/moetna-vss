import { MedusaContainer } from "@moetnavss/framework/types"
import { refetchEntity } from "@moetnavss/framework/http"

export const refetchOrder = async (
  idOrFilter: string | object,
  scope: MedusaContainer,
  fields: string[]
) => {
  return await refetchEntity({ entity: "order", idOrFilter, scope, fields })
}
