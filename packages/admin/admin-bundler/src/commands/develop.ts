import express, { IRouter } from "express"
import path from "path"

import { BundlerOptions } from "../types"
import { writeNextFiles } from "../utils/write-next-files"
import { generateExtensionModules } from "../utils/generate-extensions"

const router = express.Router()

export async function develop(options: BundlerOptions): Promise<IRouter> {
  try {
    const nextDir = path.resolve(process.cwd(), ".medusa/admin-next")

    // Generate Next.js app files and extension barrel modules
    await writeNextFiles(nextDir, options)
    await generateExtensionModules(nextDir, options.sources, options.plugins)

    // Create Next.js dev server and mount as Express middleware
    const next = (await import("next")).default
    const app = next({
      dev: true,
      dir: nextDir,
      quiet: true,
    })

    await app.prepare()
    const handle = app.getRequestHandler()

    const basePath = options.path ?? "/app"

    router.all("*", (req, res) => {
      // Express strips the mount path (e.g. /app) when using app.use(path, router),
      // but Next.js basePath expects the full URL including /app prefix.
      // Reconstruct the original URL so Next.js routing works correctly.
      // When req.url is just "/" (root), don't append it to avoid "/app/" trailing
      // slash which causes a 308 redirect loop (Next.js redirects /app/ → /app).
      req.url = basePath + (req.url === "/" ? "" : req.url)
      return handle(req, res)
    })
  } catch (error) {
    console.error(error)
    throw new Error(
      "Failed to start admin development server. See error above."
    )
  }

  return router
}
