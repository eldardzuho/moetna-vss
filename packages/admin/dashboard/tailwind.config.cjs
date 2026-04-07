const path = require("path")

// get the path of the dependency "@moetnavss/ui"
const medusaUI = path.join(
  path.dirname(require.resolve("@moetnavss/ui")),
  "**/*.{js,jsx,ts,tsx}"
)

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@moetnavss/ui-preset")],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", medusaUI],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
}
