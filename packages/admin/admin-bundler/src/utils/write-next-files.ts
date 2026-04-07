import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import outdent from "outdent"
import { BundlerOptions } from "../types"

/**
 * Generates a minimal Next.js app at the given directory that wraps
 * the existing @moetnavss/dashboard React app.
 *
 * Structure created:
 *   .medusa/admin-next/
 *     next.config.mjs
 *     tsconfig.json
 *     app/
 *       layout.tsx
 *       [[...slug]]/
 *         page.tsx
 *       globals.css
 *     extensions/
 *       widgets.ts   (generated barrel)
 *       routes.ts    (generated barrel)
 *       forms.ts     (generated barrel)
 *       displays.ts  (generated barrel)
 *       menu-items.ts(generated barrel)
 *       i18n.ts      (generated barrel)
 */
export async function writeNextFiles(
  outDir: string,
  options: BundlerOptions,
  mode: "development" | "production" = "development"
) {
  await mkdir(join(outDir, "app", "[[...slug]]"), { recursive: true })
  await mkdir(join(outDir, "extensions"), { recursive: true })

  const backendUrl = options.backendUrl ?? ""
  const storefrontUrl = options.storefrontUrl ?? ""
  const basePath = options.path ?? "/app"

  await Promise.all([
    writeNextConfig(outDir, basePath, mode),
    writeTsConfig(outDir),
    writeLayout(outDir),
    writeCatchAllPage(outDir, options.plugins),
    writeGlobalCSS(outDir),
    writeEnvFile(outDir, backendUrl, storefrontUrl, options),
    writeNotFound(outDir),
    writeErrorPage(outDir),
  ])
}

async function writeNextConfig(outDir: string, basePath: string, mode: "development" | "production") {
  // Only include output/distDir for production static export builds
  const outputConfig = mode === "production"
    ? `output: "export",\n      distDir: process.env.NEXT_DIST_DIR || "out",`
    : ""

  const config = outdent`
    import { fileURLToPath } from "node:url"
    import { dirname, resolve } from "node:path"

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    /** @type {import('next').NextConfig} */
    const nextConfig = {
      basePath: "${basePath}",
      ${outputConfig}
      eslint: {
        ignoreDuringBuilds: true,
      },
      typescript: {
        ignoreBuildErrors: true,
      },
      transpilePackages: [
        "@moetnavss/dashboard",
        "@moetnavss/ui",
        "@moetnavss/icons",
        "@moetnavss/js-sdk",
        "@moetnavss/admin-shared",
      ],
      webpack: (config, { isServer, webpack }) => {
        // Resolve virtual:medusa/* imports to our generated barrel files.
        // We use NormalModuleReplacementPlugin because webpack 5 treats "virtual:"
        // as a URI scheme and processes it BEFORE resolve.alias, causing
        // "UnhandledSchemeError". NormalModuleReplacementPlugin intercepts earlier.
        const virtualModules = {
          "virtual:medusa/widgets": resolve(__dirname, "extensions/widgets.ts"),
          "virtual:medusa/routes": resolve(__dirname, "extensions/routes.ts"),
          "virtual:medusa/forms": resolve(__dirname, "extensions/forms.ts"),
          "virtual:medusa/displays": resolve(__dirname, "extensions/displays.ts"),
          "virtual:medusa/menu-items": resolve(__dirname, "extensions/menu-items.ts"),
          "virtual:medusa/i18n": resolve(__dirname, "extensions/i18n.ts"),
          "virtual:medusa/links": resolve(__dirname, "extensions/links.ts"),
        }

        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(
            /^virtual:medusa\\//, 
            (resource) => {
              const target = virtualModules[resource.request]
              if (target) {
                resource.request = target
              }
            }
          )
        )

        // Replace Vite-style define globals with actual values at build time.
        // Must use JSON.stringify so the values become string literals in the
        // client bundle (process.env is not available in the browser).
        config.plugins.push(
          new webpack.DefinePlugin({
            __BACKEND_URL__: JSON.stringify(process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "/"),
            __STOREFRONT_URL__: JSON.stringify(process.env.NEXT_PUBLIC_MEDUSA_STOREFRONT_URL || "http://localhost:8000"),
            __BASE__: JSON.stringify(process.env.NEXT_PUBLIC_MEDUSA_BASE || "/"),
            __AUTH_TYPE__: JSON.stringify(process.env.NEXT_PUBLIC_MEDUSA_AUTH_TYPE || "session"),
            __JWT_TOKEN_STORAGE_KEY__: JSON.stringify(process.env.NEXT_PUBLIC_MEDUSA_JWT_TOKEN_STORAGE_KEY || ""),
            __MAX_UPLOAD_FILE_SIZE__: Number(process.env.NEXT_PUBLIC_MEDUSA_MAX_UPLOAD_FILE_SIZE) || 1048576,
          })
        )

        return config
      },
    }

    export default nextConfig
  `

  await writeFile(join(outDir, "next.config.mjs"), config)
}

async function writeTsConfig(outDir: string) {
  const tsconfig = JSON.stringify(
    {
      compilerOptions: {
        target: "es2021",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: false,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: {
          "@/*": ["./*"],
        },
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"],
    },
    null,
    2
  )

  await writeFile(join(outDir, "tsconfig.json"), tsconfig)
}

async function writeLayout(outDir: string) {
  const layout = outdent`
    import type { Metadata } from "next"
    import "./globals.css"

    export const metadata: Metadata = {
      title: "MoetnaVSS Admin",
      description: "MoetnaVSS Commerce Admin Dashboard",
    }

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode
    }) {
      return (
        <html lang="en">
          <body>
            <div id="medusa">{children}</div>
          </body>
        </html>
      )
    }
  `

  await writeFile(join(outDir, "app", "layout.tsx"), layout)
}

async function writeCatchAllPage(outDir: string, plugins?: string[]) {
  const pluginImports =
    plugins
      ?.map((p, i) => `import plugin${i} from "${p}"`)
      .join("\n") ?? ""

  const pluginArray = plugins?.map((_, i) => `plugin${i}`).join(", ") ?? ""

  // Use next/dynamic with ssr:false to completely disable server-side rendering.
  // The dashboard app uses React Router v6 internally which conflicts with
  // Next.js server rendering and causes "Maximum call stack size exceeded".
  //
  // The page.tsx is a server component so it can export generateStaticParams()
  // (required for output: "export" with dynamic routes). The actual client
  // component lives in client.tsx.
  const clientComponent = outdent`
    "use client"

    import dynamic from "next/dynamic"
    ${pluginImports}

    const App = dynamic(() => import("@moetnavss/dashboard"), { ssr: false })

    export default function AdminClient() {
      return <App plugins={[${pluginArray}]} />
    }
  `

  const page = outdent`
    import AdminClient from "./client"

    // Required for Next.js static export (output: "export") with dynamic routes.
    // Returns only the root slug so a single HTML entry point is generated;
    // all real routing is handled client-side by React Router.
    export function generateStaticParams() {
      return [{ slug: [] }]
    }

    export default function AdminPage() {
      return <AdminClient />
    }
  `

  await writeFile(join(outDir, "app", "[[...slug]]", "client.tsx"), clientComponent)
  await writeFile(join(outDir, "app", "[[...slug]]", "page.tsx"), page)
}

async function writeGlobalCSS(outDir: string) {
  // Import the dashboard source CSS directly (includes Tailwind, fonts, CSS vars)
  const css = outdent`
    @import "@moetnavss/dashboard/src/index.css";
  `

  await writeFile(join(outDir, "app", "globals.css"), css)
}

async function writeNotFound(outDir: string) {
  // Custom not-found page prevents Next.js from using its default _error page
  // which imports <Html> from next/document and fails during static export.
  const notFound = outdent`
    export default function NotFound() {
      return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1>404 — Page Not Found</h1>
        </div>
      )
    }
  `
  await writeFile(join(outDir, "app", "not-found.tsx"), notFound)
}

async function writeErrorPage(outDir: string) {
  // Custom error boundary prevents Next.js from using its default _error page
  // which imports <Html> from next/document and fails during static export.
  const errorPage = outdent`
    "use client"

    export default function Error({ reset }: { error: Error; reset: () => void }) {
      return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1>Something went wrong</h1>
          <button onClick={() => reset()}>Try again</button>
        </div>
      )
    }
  `
  await writeFile(join(outDir, "app", "error.tsx"), errorPage)
}

async function writeEnvFile(
  outDir: string,
  backendUrl: string,
  storefrontUrl: string,
  options: BundlerOptions
) {
  const authType = process.env.ADMIN_AUTH_TYPE ?? ""
  const jwtKey = process.env.ADMIN_JWT_TOKEN_STORAGE_KEY ?? ""
  const maxUpload =
    options.maxUploadFileSize === Infinity
      ? "Infinity"
      : String(options.maxUploadFileSize ?? 1024 * 1024)

  const env = outdent`
    NEXT_PUBLIC_MEDUSA_BACKEND_URL=${backendUrl}
    NEXT_PUBLIC_MEDUSA_STOREFRONT_URL=${storefrontUrl}
    NEXT_PUBLIC_MEDUSA_BASE=${options.path}
    NEXT_PUBLIC_MEDUSA_AUTH_TYPE=${authType}
    NEXT_PUBLIC_MEDUSA_JWT_TOKEN_STORAGE_KEY=${jwtKey}
    NEXT_PUBLIC_MEDUSA_MAX_UPLOAD_FILE_SIZE=${maxUpload}
  `

  await writeFile(join(outDir, ".env.local"), env)
}
