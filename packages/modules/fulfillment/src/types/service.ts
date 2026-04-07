import { FulfillmentTypes } from "@moetnavss/framework/types"

export type UpdateShippingOptionsInput = Required<
  Pick<FulfillmentTypes.UpdateShippingOptionDTO, "id">
> &
  FulfillmentTypes.UpdateShippingOptionDTO
