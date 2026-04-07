import { cancelBeginOrderEditWorkflow } from "@moetnavss/core-flows"
import { HttpTypes } from "@moetnavss/framework/types"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@moetnavss/framework/http"

export const DELETE = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<HttpTypes.AdminOrderEditDeleteResponse>
) => {
  const { id } = req.params

  await cancelBeginOrderEditWorkflow(req.scope).run({
    input: {
      order_id: id,
    },
  })

  res.status(200).json({
    id,
    object: "order-edit",
    deleted: true,
  })
}
