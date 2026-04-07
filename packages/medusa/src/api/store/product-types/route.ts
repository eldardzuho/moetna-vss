import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@moetnavss/framework/http"
import { HttpTypes } from "@moetnavss/framework/types"
import { ContainerRegistrationKeys } from "@moetnavss/framework/utils"

export const GET = async (
  req: AuthenticatedMedusaRequest<HttpTypes.StoreProductTypeListParams>,
  res: MedusaResponse<HttpTypes.StoreProductTypeListResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: product_types, metadata } = await query.graph(
    {
      entity: "product_type",
      filters: req.filterableFields,
      pagination: req.queryConfig.pagination,
      fields: req.queryConfig.fields,
    },
    {
      locale: req.locale,
    }
  )

  res.json({
    product_types,
    count: metadata?.count ?? 0,
    offset: metadata?.skip ?? 0,
    limit: metadata?.take ?? 0,
  })
}
