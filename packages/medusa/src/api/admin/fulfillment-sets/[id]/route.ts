import { deleteFulfillmentSetsWorkflow } from "@moetnavss/core-flows"
import { HttpTypes } from "@moetnavss/framework/types"

import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@moetnavss/framework/http"

export const DELETE = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<HttpTypes.AdminFulfillmentSetDeleteResponse>
) => {
  const { id } = req.params

  await deleteFulfillmentSetsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "fulfillment_set",
    deleted: true,
  })
}
