import { createFulfillmentWorkflow } from "@moetnavss/core-flows"
import { HttpTypes } from "@moetnavss/framework/types"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@moetnavss/framework/http"
import { refetchFulfillment } from "./helpers"

export const POST = async (
  req: AuthenticatedMedusaRequest<
    HttpTypes.AdminCreateFulfillment,
    HttpTypes.SelectParams
  >,
  res: MedusaResponse<HttpTypes.AdminFulfillmentResponse>
) => {
  const { result: fullfillment } = await createFulfillmentWorkflow(
    req.scope
  ).run({
    input: {
      ...req.validatedBody,
      created_by: req.auth_context.actor_id,
    },
  })

  const fulfillment = await refetchFulfillment(
    fullfillment.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ fulfillment })
}
