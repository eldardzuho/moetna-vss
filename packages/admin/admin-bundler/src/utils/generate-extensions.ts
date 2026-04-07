import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { existsSync, readdirSync, statSync } from "node:fs"
import outdent from "outdent"

/**
 * Scans extension source directories and generates barrel files
 * that replace Vite's virtual modules (virtual:medusa/*).
 *
 * This replaces the @moetnavss/admin-vite-plugin by writing
 * actual TypeScript files instead of relying on virtual modules.
 *
 * Generated files:
 *   extensions/widgets.ts
 *   extensions/routes.ts
 *   extensions/forms.ts
 *   extensions/displays.ts
 *   extensions/menu-items.ts
 *   extensions/i18n.ts
 */
export async function generateExtensionModules(
  outDir: string,
  sources?: string[],
  plugins?: string[]
) {
  const extensionsDir = join(outDir, "extensions")
  await mkdir(extensionsDir, { recursive: true })

  const widgetImports: string[] = []
  const routeImports: string[] = []
  const formImports: string[] = []
  const displayImports: string[] = []
  const menuItemImports: string[] = []
  const i18nImports: string[] = []

  let counter = 0

  // Scan local extension sources
  if (sources) {
    for (const source of sources) {
      if (!existsSync(source)) continue

      // Widgets: source/widgets/**/*.tsx
      const widgetsDir = join(source, "widgets")
      if (existsSync(widgetsDir)) {
        for (const file of walkFiles(widgetsDir, [".tsx", ".ts", ".jsx", ".js"])) {
          const name = `widget_${counter++}`
          widgetImports.push(
            `import ${name} from "${file.replace(/\\/g, "/")}";\nexports.push(${name});`
          )
        }
      }

      // Routes: source/routes/**/page.tsx
      const routesDir = join(source, "routes")
      if (existsSync(routesDir)) {
        for (const file of walkFiles(routesDir, [".tsx", ".ts", ".jsx", ".js"])) {
          const name = `route_${counter++}`
          routeImports.push(
            `import ${name} from "${file.replace(/\\/g, "/")}";\nexports.push(${name});`
          )
        }
      }

      // Custom fields: source/custom-fields/**/*.tsx
      const customFieldsDir = join(source, "custom-fields")
      if (existsSync(customFieldsDir)) {
        for (const file of walkFiles(customFieldsDir, [".tsx", ".ts", ".jsx", ".js"])) {
          if (file.includes("form")) {
            const name = `form_${counter++}`
            formImports.push(
              `import ${name} from "${file.replace(/\\/g, "/")}";\nexports.push(${name});`
            )
          } else {
            const name = `display_${counter++}`
            displayImports.push(
              `import ${name} from "${file.replace(/\\/g, "/")}";\nexports.push(${name});`
            )
          }
        }
      }

      // i18n: source/i18n/**/*.json or *.ts
      const i18nDir = join(source, "i18n")
      if (existsSync(i18nDir)) {
        for (const file of walkFiles(i18nDir, [".json", ".ts", ".js"])) {
          const name = `i18n_${counter++}`
          i18nImports.push(
            `import ${name} from "${file.replace(/\\/g, "/")}";\nexports.push(${name});`
          )
        }
      }
    }
  }

  // Write barrel files — each must match the expected DashboardPlugin module shape
  await Promise.all([
    writeModuleFile(extensionsDir, "widgets", "widgets", widgetImports),
    writeModuleFile(extensionsDir, "routes", "routes", routeImports),
    writeModuleFile(extensionsDir, "forms", "customFields", formImports, true),
    writeModuleFile(extensionsDir, "displays", "displays", displayImports, true),
    writeModuleFile(extensionsDir, "menu-items", "menuItems", menuItemImports),
    writeModuleFile(extensionsDir, "i18n", "resources", i18nImports, true),
    writeLinksBarrelFile(extensionsDir),
  ])
}

/**
 * Writes a module file matching the DashboardPlugin module shape.
 *
 * Each module type has a specific structure:
 * - widgets:    { widgets: WidgetExtension[] }
 * - routes:     { routes: RouteExtension[] }
 * - forms:      { customFields: Record<string, ...> }
 * - displays:   { displays: Record<string, ...> }
 * - menu-items: { menuItems: MenuItemExtension[] }
 * - i18n:       { resources: Record<string, ...> }
 *
 * @param propName - The property name in the module object (e.g. "routes", "widgets")
 * @param isRecord - If true, the empty value is {} instead of []
 */
async function writeModuleFile(
  dir: string,
  fileName: string,
  propName: string,
  imports: string[],
  isRecord = false,
) {
  const emptyValue = isRecord ? "{}" : "[]"

  let content: string
  if (imports.length === 0) {
    content = outdent`
      // Auto-generated: no extensions found for ${fileName}
      const _extensions = { ${propName}: ${emptyValue} }
      export default _extensions
    `
  } else {
    content = outdent`
      // Auto-generated extension barrel for ${fileName}
      const items = []
      ${imports.join("\n")}
      const _extensions = { ${propName}: items }
      export default _extensions
    `
  }

  await writeFile(join(dir, `${fileName}.ts`), content)
}

/**
 * Writes the links barrel file. The links module exports a LinkModule object
 * with a `links` property mapping custom field models to their linked fields.
 * For now, we generate an empty links module since link discovery is not yet implemented.
 */
async function writeLinksBarrelFile(dir: string) {
  const content = outdent`
    // Auto-generated: empty links module
    const linkModule = { links: {} }
    export default linkModule
  `
  await writeFile(join(dir, "links.ts"), content)
}

/**
 * Recursively walks a directory and returns file paths matching extensions
 */
function walkFiles(dir: string, extensions: string[]): string[] {
  const results: string[] = []

  if (!existsSync(dir)) return results

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      results.push(...walkFiles(fullPath, extensions))
    } else if (extensions.some((ext) => entry.endsWith(ext))) {
      // Skip index files and test files
      if (entry === "index.ts" || entry.includes(".spec.") || entry.includes(".test.")) {
        continue
      }
      results.push(fullPath)
    }
  }

  return results
}
