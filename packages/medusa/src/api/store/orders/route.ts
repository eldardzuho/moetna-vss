import { getOrdersListWorkflow } from "@moetnavss/core-flows"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@moetnavss/framework/http"
import { HttpTypes, OrderDTO } from "@moetnavss/framework/types"

export const GET = async (
  req: AuthenticatedMedusaRequest<HttpTypes.StoreOrderFilters>,
  res: MedusaResponse<HttpTypes.StoreOrderListResponse>
) => {
  const variables = {
    filters: {
      ...req.filterableFields,
      is_draft_order: false,
      customer_id: req.auth_context.actor_id,
    },
    ...req.queryConfig.pagination,
  }

  const workflow = getOrdersListWorkflow(req.scope)
  const { result } = await workflow.run({
    input: {
      fields: req.queryConfig.fields,
      variables,
    },
  })

  const { rows, metadata } = result as {
    rows: OrderDTO[]
    metadata: any
  }

  res.json({
    orders: rows as unknown as HttpTypes.StoreOrder[],
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
