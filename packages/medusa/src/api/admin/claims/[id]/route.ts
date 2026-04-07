import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@moetnavss/framework/http"
import { MedusaError } from "@moetnavss/framework/utils"
import { AdminClaimResponse, HttpTypes } from "@moetnavss/framework/types"

export const GET = async (
  req: AuthenticatedMedusaRequest<{}, HttpTypes.SelectParams>,
  res: MedusaResponse<AdminClaimResponse>
) => {
  const claim = await refetchEntity({
    entity: "order_claim",
    idOrFilter: req.params.id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  })

  if (!claim) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `Claim with id: ${req.params.id} was not found`
    )
  }

  res.status(200).json({ claim })
}
