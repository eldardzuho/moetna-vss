import { getOrderDetailWorkflow } from "@moetnavss/core-flows"
import { MedusaRequest, MedusaResponse } from "@moetnavss/framework/http"
import { HttpTypes } from "@moetnavss/framework/types"

// TODO: Do we want to apply some sort of authentication here? My suggestion is that we do
export const GET = async (
  req: MedusaRequest<HttpTypes.SelectParams>,
  res: MedusaResponse<HttpTypes.StoreOrderResponse>
) => {
  const workflow = getOrderDetailWorkflow(req.scope)
  const { result } = await workflow.run({
    input: {
      fields: req.queryConfig.fields,
      order_id: req.params.id,
      filters: {
        is_draft_order: false,
      },
    },
  })

  res.status(200).json({ order: result as HttpTypes.StoreOrder })
}
