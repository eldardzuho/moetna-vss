import { OrderTypes } from "@moetnavss/framework/types"

export type CreateOrderLineItemAdjustmentDTO =
  OrderTypes.CreateOrderLineItemAdjustmentDTO

export interface UpdateOrderLineItemAdjustmentDTO
  extends Partial<CreateOrderLineItemAdjustmentDTO> {
  id: string
}
