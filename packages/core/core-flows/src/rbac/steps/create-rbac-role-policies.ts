import { Modules } from "@moetnavss/framework/utils"
import { StepResponse, createStep } from "@moetnavss/framework/workflows-sdk"
import { CreateRbacRolePolicyDTO, IRbacModuleService } from "@moetnavss/types"

export type CreateRbacRolePoliciesStepInput = {
  policies: CreateRbacRolePolicyDTO[]
}

export const createRbacRolePoliciesStepId = "create-rbac-role-policies"

export const createRbacRolePoliciesStep = createStep(
  createRbacRolePoliciesStepId,
  async (data: CreateRbacRolePoliciesStepInput, { container }) => {
    const service = container.resolve<IRbacModuleService>(Modules.RBAC)

    if (!data.policies?.length) {
      return new StepResponse([], [])
    }

    const created = await service.createRbacRolePolicies(data.policies)

    return new StepResponse(
      created,
      (created ?? []).map((rp) => rp.id)
    )
  },
  async (createdIds: string[] | undefined, { container }) => {
    if (!createdIds?.length) {
      return
    }

    const service = container.resolve<IRbacModuleService>(Modules.RBAC)
    await service.deleteRbacRolePolicies(createdIds)
  }
)
