import { MedusaRequest, MedusaResponse } from "@moetnavss/framework"
import { ContainerRegistrationKeys } from "@moetnavss/framework/utils"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const config = req.scope.resolve(ContainerRegistrationKeys.CONFIG_MODULE)

  res.status(200).json({
    enabled:
      !!config.projectConfig.http.authMethodsPerActor?.user?.includes("cloud"),
  })
}
