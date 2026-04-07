import { execSync } from "child_process"
import { cpSync, existsSync, mkdirSync, rmSync } from "fs"
import path from "path"
import { BundlerOptions } from "../types"
import { writeNextFiles } from "../utils/write-next-files"
import { generateExtensionModules } from "../utils/generate-extensions"

export async function build(options: BundlerOptions) {
  const nextDir = path.resolve(process.cwd(), ".medusa/admin-next")

  // Generate Next.js app files and extension barrel modules
  await writeNextFiles(nextDir, options, "production")
  await generateExtensionModules(nextDir, options.sources, options.plugins)

  // Clear previous Next.js build cache
  const nextCacheDir = path.resolve(nextDir, ".next")
  if (existsSync(nextCacheDir)) {
    rmSync(nextCacheDir, { recursive: true, force: true })
  }

  // Run next build — static export goes to nextDir/out/ by default
  execSync(`npx next build`, {
    cwd: nextDir,
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" },
  })

  // Next.js static export with basePath creates a subdirectory matching
  // the basePath (e.g. out/app/). The Express router is mounted at the
  // basePath and strips the prefix, so we copy just the subdirectory
  // contents to outDir for serve.ts to serve directly.
  const basePath = (options.path ?? "/app").replace(/^\//, "")
  const nextOutDir = path.resolve(nextDir, "out")
  const basePathDir = path.resolve(nextOutDir, basePath)
  const outDir = path.resolve(process.cwd(), options.outDir)

  mkdirSync(outDir, { recursive: true })

  if (basePath && existsSync(basePathDir)) {
    cpSync(basePathDir, outDir, { recursive: true })
  } else {
    cpSync(nextOutDir, outDir, { recursive: true })
  }
}
