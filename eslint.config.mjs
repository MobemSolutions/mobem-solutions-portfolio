import nextConfig from "eslint-config-next"

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...nextConfig,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "sanity/**",
      "public/**",
      "refonte-ressources/**",
      "scripts/**",
      ".claude/**",
      "emails/**",
    ],
  },
  {
    rules: {
      // French-language site — apostrophes unavoidable in prose
      "react/no-unescaped-entities": "off",
      // React Compiler rules too aggressive for existing valid patterns
      // (setMounted, lazy init in useEffect, Math.random in useMemo)
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
    },
  },
]

export default config
