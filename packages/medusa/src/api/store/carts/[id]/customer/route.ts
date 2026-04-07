import { transferCartCustomerWorkflowId } from "@moetnavss/core-flows"
import { HttpTypes } from "@moetnavss/framework/types"

import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@moetnavss/framework/http"
import { Modules } from "@moetnavss/framework/utils"
import { AdditionalData } from "@moetnavss/types"
import { refetchCart } from "../../helpers"

export const POST = async (
  req: AuthenticatedMedusaRequest<AdditionalData, HttpTypes.SelectParams>,
  res: MedusaResponse<HttpTypes.StoreCartResponse>
) => {
  const we = req.scope.resolve(Modules.WORKFLOW_ENGINE)

  await we.run(transferCartCustomerWorkflowId, {
    input: {
      id: req.params.id,
      customer_id: req.auth_context?.actor_id,
      additional_data: req.validatedBody.additional_data,
    },
  })

  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ cart })
}
