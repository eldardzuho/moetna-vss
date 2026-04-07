import { cancelFulfillmentWorkflow } from "@moetnavss/core-flows"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@moetnavss/framework/http"
import { refetchFulfillment } from "../../helpers"
import { HttpTypes } from "@moetnavss/framework/types"

export const POST = async (
  req: AuthenticatedMedusaRequest<{}, HttpTypes.SelectParams>,
  res: MedusaResponse<HttpTypes.AdminFulfillmentResponse>
) => {
  const { id } = req.params
  await cancelFulfillmentWorkflow(req.scope).run({
    input: { id },
  })

  const fulfillment = await refetchFulfillment(
    id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ fulfillment })
}
