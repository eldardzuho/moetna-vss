import {
  createOrderShipmentWorkflow,
  CreateOrderShipmentWorkflowInput,
} from "@moetnavss/core-flows"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@moetnavss/framework/utils"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@moetnavss/framework/http"
import { AdditionalData, HttpTypes } from "@moetnavss/framework/types"

export const POST = async (
  req: AuthenticatedMedusaRequest<
    HttpTypes.AdminCreateOrderShipment & AdditionalData,
    HttpTypes.AdminGetOrderParams
  >,
  res: MedusaResponse<HttpTypes.AdminOrderResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const variables = { id: req.params.id }

  const input: CreateOrderShipmentWorkflowInput = {
    ...req.validatedBody,
    order_id: req.params.id,
    fulfillment_id: req.params.fulfillment_id,
    labels: req.validatedBody.labels ?? [],
    created_by: req.auth_context.actor_id,
  }

  await createOrderShipmentWorkflow(req.scope).run({
    input,
  })

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "order",
    variables,
    fields: req.queryConfig.fields,
  })

  const [order] = await remoteQuery(queryObject)
  res.status(200).json({ order })
}
