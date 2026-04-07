import express, { IRouter, Router } from "express"
import fs from "fs"
import path from "path"

type ServeOptions = {
  outDir: string
}

const router = Router()

export async function serve(options: ServeOptions): Promise<IRouter> {
  const staticDir = path.resolve(process.cwd(), options.outDir)

  if (!fs.existsSync(staticDir)) {
    throw new Error(
      `Could not find admin build output at "${staticDir}". Make sure to run 'medusa build' before starting the server.`
    )
  }

  // Serve the statically exported Next.js build with Express
  router.use(express.static(staticDir, { extensions: ["html"] }))

  // SPA fallback: serve index.html for any non-file route
  router.get("*", (_req, res) => {
    const indexPath = path.join(staticDir, "index.html")
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath)
    } else {
      // For catch-all route, Next.js export generates [[...slug]].html
      const catchAllPath = path.join(staticDir, "[[...slug]].html")
      if (fs.existsSync(catchAllPath)) {
        res.sendFile(catchAllPath)
      } else {
        res.status(404).send("Admin page not found")
      }
    }
  })

  return router
}
