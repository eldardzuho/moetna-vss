import { validateAndTransformQuery } from "@moetnavss/framework"
import { MiddlewareRoute } from "@moetnavss/framework/http"
import { PolicyOperation } from "@moetnavss/framework/utils"
import * as QueryConfig from "./query-config"
import { Entities } from "./query-config"
import { AdminGetProductVariantsParams } from "./validators"

export const adminProductVariantRoutesMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/product-variants/*",
    policies: [
      {
        resource: Entities.product_variant,
        operation: PolicyOperation.read,
      },
    ],
  },
  {
    method: ["GET"],
    matcher: "/admin/product-variants",
    middlewares: [
      validateAndTransformQuery(
        AdminGetProductVariantsParams,
        QueryConfig.listProductVariantQueryConfig
      ),
    ],
    policies: [
      {
        resource: Entities.product_variant,
        operation: PolicyOperation.read,
      },
    ],
  },
]
