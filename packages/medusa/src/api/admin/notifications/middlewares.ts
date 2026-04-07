import { validateAndTransformQuery } from "@moetnavss/framework"
import { MiddlewareRoute } from "@moetnavss/framework/http"
import { PolicyOperation } from "@moetnavss/framework/utils"
import * as QueryConfig from "./query-config"
import { Entities } from "./query-config"
import {
  AdminGetNotificationParams,
  AdminGetNotificationsParams,
} from "./validators"

export const adminNotificationRoutesMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/notifications/*",
    policies: [
      {
        resource: Entities.notification,
        operation: PolicyOperation.read,
      },
    ],
  },
  {
    method: ["GET"],
    matcher: "/admin/notifications",
    middlewares: [
      validateAndTransformQuery(
        AdminGetNotificationsParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
    policies: [
      {
        resource: Entities.notification,
        operation: PolicyOperation.read,
      },
    ],
  },
  {
    method: ["GET"],
    matcher: "/admin/notifications/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetNotificationParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
]
