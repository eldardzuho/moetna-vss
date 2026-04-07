import {
  defineMiddlewares,
  validateAndTransformBody,
} from "@moetnavss/framework/http"
import { z } from "@moetnavss/framework/zod"

const CustomPostSchema = z.object({
  foo: z.string(),
})

export default defineMiddlewares({
  routes: [
    {
      method: ["POST"],
      matcher: "/custom",
      middlewares: [validateAndTransformBody(CustomPostSchema)],
    },
  ],
})
