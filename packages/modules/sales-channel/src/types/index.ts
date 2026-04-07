import { Logger, UpdateSalesChannelDTO } from "@moetnavss/framework/types"

export type InitializeModuleInjectableDependencies = {
  logger?: Logger
}

export type UpdateSalesChanneInput = UpdateSalesChannelDTO & { id: string }
