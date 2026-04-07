import { ContainerLike } from "@moetnavss/framework"
import { Logger } from "@moetnavss/framework/types"
import { FlowCancelOptions } from "@moetnavss/framework/workflows-sdk"

export type InitializeModuleInjectableDependencies = {
  logger?: Logger
}

export type WorkflowOrchestratorCancelOptions = Omit<
  FlowCancelOptions,
  "transaction" | "transactionId" | "container"
> & {
  transactionId: string
  container?: ContainerLike
}
