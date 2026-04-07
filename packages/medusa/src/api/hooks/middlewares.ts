import { MiddlewareRoute } from "@moetnavss/framework/http"

export const hooksRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["POST"],
    bodyParser: { preserveRawBody: true },
    matcher: "/hooks/payment/:provider",
  },
]
