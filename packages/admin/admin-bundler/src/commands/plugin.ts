import { readFileSync, rmSync } from "fs"
import { builtinModules } from "node:module"
import path from "path"

interface PluginOptions {
  root: string
  outDir: string
}

export async function plugin(options: PluginOptions) {
  const esbuild = await import("esbuild")

  const pkg = JSON.parse(
    readFileSync(path.resolve(options.root, "package.json"), "utf-8")
  )
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    "react",
    "react/jsx-runtime",
    "react-router-dom",
    "react-i18next",
    "@moetnavss/js-sdk",
    "@moetnavss/admin-sdk",
    "@tanstack/react-query",
    ...builtinModules,
    ...builtinModules.map((m) => `node:${m}`),
  ]

  const outDir = path.resolve(options.root, options.outDir, "src/admin")
  const entryPoint = path.resolve(
    options.root,
    "src/admin/__admin-extensions__.js"
  )

  // Clear previous build
  try {
    rmSync(path.join(outDir, "admin"), { recursive: true, force: true })
  } catch {
    // Directory might not exist
  }

  const originalNodeEnv = process.env.NODE_ENV
  ;(process.env as any).NODE_ENV = "production"

  // Build ESM format
  await esbuild.build({
    entryPoints: [entryPoint],
    bundle: true,
    format: "esm",
    outfile: path.join(outDir, "index.mjs"),
    external,
    minify: false,
    jsx: "automatic",
    platform: "browser",
    target: "es2021",
    logLevel: "silent",
  })

  // Build CJS format
  await esbuild.build({
    entryPoints: [entryPoint],
    bundle: true,
    format: "cjs",
    outfile: path.join(outDir, "index.js"),
    external,
    minify: false,
    jsx: "automatic",
    platform: "browser",
    target: "es2021",
    logLevel: "silent",
  })

  ;(process.env as any).NODE_ENV = originalNodeEnv
}
