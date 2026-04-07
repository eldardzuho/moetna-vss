import { MedusaStoreRequest } from "@moetnavss/framework/http"
import {
  MedusaPricingContext,
  TaxCalculationContext,
} from "@moetnavss/framework/types"

export type StoreRequestWithContext<
  Body,
  QueryFields = Record<string, unknown>
> = MedusaStoreRequest<Body, QueryFields> & {
  pricingContext?: MedusaPricingContext
  taxContext?: {
    taxLineContext?: TaxCalculationContext
    taxInclusivityContext?: {
      automaticTaxes: boolean
    }
  }
}
