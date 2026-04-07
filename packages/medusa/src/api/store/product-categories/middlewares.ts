import { MiddlewareRoute } from "@moetnavss/framework/http"
import { validateAndTransformQuery } from "@moetnavss/framework"
import { applyCategoryFilters } from "./helpers"
import * as QueryConfig from "./query-config"
import {
  StoreProductCategoriesParams,
  StoreProductCategoryParams,
} from "./validators"

export const storeProductCategoryRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/store/product-categories",
    middlewares: [
      validateAndTransformQuery(
        StoreProductCategoriesParams,
        QueryConfig.listProductCategoryConfig
      ),
      applyCategoryFilters,
    ],
  },
  {
    method: ["GET"],
    matcher: "/store/product-categories/:id",
    middlewares: [
      validateAndTransformQuery(
        StoreProductCategoryParams,
        QueryConfig.retrieveProductCategoryConfig
      ),
      applyCategoryFilters,
    ],
  },
]
