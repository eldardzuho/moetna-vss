import "@moetnavss/utils"
export * from "@moetnavss/types"

import type { ModuleOptions as ModuleOptionsType } from "@moetnavss/types"

// Re-declare ModuleOptions to enable augmentation from @moetnavss/framework/types
// EventBusEventsOptions is exported via "export *" and gets augmentations from @moetnavss/utils
export interface ModuleOptions extends ModuleOptionsType {}
