import { batchPromotionRulesWorkflow } from "@moetnavss/core-flows"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@moetnavss/framework/http"
import { BatchMethodRequest, HttpTypes } from "@moetnavss/framework/types"
import { RuleType } from "@moetnavss/framework/utils"
import { refetchBatchRules } from "../../../helpers"

export const POST = async (
  req: AuthenticatedMedusaRequest<
    BatchMethodRequest<
      HttpTypes.AdminCreatePromotionRule,
      HttpTypes.AdminUpdatePromotionRule
    >,
    HttpTypes.AdminGetPromotionRuleParams
  >,
  res: MedusaResponse<HttpTypes.AdminPromotionRuleBatchResponse>
) => {
  const id = req.params.id
  const { result } = await batchPromotionRulesWorkflow(req.scope).run({
    input: {
      id,
      rule_type: RuleType.TARGET_RULES,
      create: req.validatedBody.create,
      update: req.validatedBody.update,
      delete: req.validatedBody.delete,
    },
  })

  const batchResults = await refetchBatchRules(
    result,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json(batchResults)
}
