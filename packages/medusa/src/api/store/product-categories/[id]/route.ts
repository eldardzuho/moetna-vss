import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@moetnavss/framework/http"
import { StoreProductCategoryResponse } from "@moetnavss/framework/types"
import {
  ContainerRegistrationKeys,
  MedusaError,
} from "@moetnavss/framework/utils"
import { StoreProductCategoryParamsType } from "../validators"

export const GET = async (
  req: AuthenticatedMedusaRequest<StoreProductCategoryParamsType>,
  res: MedusaResponse<StoreProductCategoryResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: category } = await query.graph(
    {
      entity: "product_category",
      filters: { id: req.params.id, ...req.filterableFields },
      fields: req.queryConfig.fields,
    },
    {
      locale: req.locale,
    }
  )

  if (!category) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `Product category with id: ${req.params.id} was not found`
    )
  }

  res.json({ product_category: category[0] })
}
