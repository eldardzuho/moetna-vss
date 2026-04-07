import { markOrderFulfillmentAsDeliveredWorkflow } from "@moetnavss/core-flows"
import { HttpTypes } from "@moetnavss/framework/types"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@moetnavss/framework/http"

export const POST = async (
  req: AuthenticatedMedusaRequest<{}, HttpTypes.AdminGetOrderParams>,
  res: MedusaResponse<HttpTypes.AdminOrderResponse>
) => {
  const { id: orderId, fulfillment_id: fulfillmentId } = req.params

  await markOrderFulfillmentAsDeliveredWorkflow(req.scope).run({
    input: { orderId, fulfillmentId },
  })

  const order = await refetchEntity({
    entity: "order",
    idOrFilter: orderId,
    scope: req.scope,
    fields: req.queryConfig.fields,
  })

  res.status(200).json({ order })
}
