import { HttpTypes } from "@moetnavss/types"

export type AdminOrderPreviewLineItem = HttpTypes.AdminOrderLineItem & {
  actions?: HttpTypes.AdminOrderChangeAction[]
}
