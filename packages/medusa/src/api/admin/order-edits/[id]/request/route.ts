import { requestOrderEditRequestWorkflow } from "@moetnavss/core-flows"
import { HttpTypes } from "@moetnavss/framework/types"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@moetnavss/framework/http"

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<HttpTypes.AdminOrderEditPreviewResponse>
) => {
  const { id } = req.params

  const { result } = await requestOrderEditRequestWorkflow(req.scope).run({
    input: {
      order_id: id,
      requested_by: req.auth_context.actor_id,
    },
  })

  res.json({
    order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
