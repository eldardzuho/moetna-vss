import { exportOrdersWorkflow } from "@moetnavss/core-flows"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@moetnavss/framework/http"
import { HttpTypes } from "@moetnavss/framework/types"

/**
 * @since 2.12.3
 */
export const POST = async (
  req: AuthenticatedMedusaRequest<{}, HttpTypes.AdminOrderFilters>,
  res: MedusaResponse<HttpTypes.AdminExportOrderResponse>
) => {
  const selectFields = req.queryConfig.fields ?? []
  const input = { select: selectFields, filter: req.filterableFields }

  const { transaction } = await exportOrdersWorkflow(req.scope).run({
    input,
  })

  res.status(202).json({ transaction_id: transaction.transactionId })
}
