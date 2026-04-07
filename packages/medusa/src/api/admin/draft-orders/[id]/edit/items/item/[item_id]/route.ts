import { updateDraftOrderItemWorkflow } from "@moetnavss/core-flows"
import { AuthenticatedMedusaRequest, MedusaResponse } from "@moetnavss/framework"
import { HttpTypes } from "@moetnavss/types"
import { AdminUpdateDraftOrderItemType } from "../../../../../validators"

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminUpdateDraftOrderItemType>,
  res: MedusaResponse
) => {
  const { id, item_id } = req.params

  const { result } = await updateDraftOrderItemWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      order_id: id,
      items: [
        {
          ...req.validatedBody,
          id: item_id,
        },
      ],
    },
  })

  res.json({
    draft_order_preview: result as unknown as HttpTypes.AdminOrderPreview,
  })
}
