import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@moetnavss/framework/http"

import {
  importProductsAsChunksWorkflowId,
  waitConfirmationProductImportStepId,
} from "@moetnavss/core-flows"
import { IWorkflowEngineService } from "@moetnavss/framework/types"
import { Modules, TransactionHandlerType } from "@moetnavss/framework/utils"
import { StepResponse } from "@moetnavss/framework/workflows-sdk"

/**
 * @since 2.8.5
 */
export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const workflowEngineService: IWorkflowEngineService = req.scope.resolve(
    Modules.WORKFLOW_ENGINE
  )
  const transactionId = req.params.transaction_id

  await workflowEngineService.setStepSuccess({
    idempotencyKey: {
      action: TransactionHandlerType.INVOKE,
      transactionId,
      stepId: waitConfirmationProductImportStepId,
      workflowId: importProductsAsChunksWorkflowId,
    },
    stepResponse: new StepResponse(true),
  })

  res.status(202).json({})
}
