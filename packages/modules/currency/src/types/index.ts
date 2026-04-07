import { IEventBusModuleService, Logger } from "@moetnavss/framework/types"

export type InitializeModuleInjectableDependencies = {
  logger?: Logger
  EventBus?: IEventBusModuleService
}
