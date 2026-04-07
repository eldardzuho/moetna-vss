import {
  WorkflowData,
  WorkflowResponse,
  createWorkflow,
} from "@moetnavss/framework/workflows-sdk"
import { UpdateRbacRolePolicyDTO } from "@moetnavss/types"
import { updateRbacRolePoliciesStep } from "../steps/update-rbac-role-policies"

export type UpdateRbacRolePoliciesWorkflowInput = {
  selector: Record<string, any>
  update: Omit<UpdateRbacRolePolicyDTO, "id">
}

export const updateRbacRolePoliciesWorkflowId = "update-rbac-role-policies"

export const updateRbacRolePoliciesWorkflow = createWorkflow(
  updateRbacRolePoliciesWorkflowId,
  (input: WorkflowData<UpdateRbacRolePoliciesWorkflowInput>) => {
    return new WorkflowResponse(updateRbacRolePoliciesStep(input))
  }
)
