import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import pluginJest from "eslint-plugin-jest";
import importSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

const eslintConfig = [
  {
    ignores: [".next/"],
  },
  ...nextVitals,
  ...nextTs,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    plugins: {
      "@next": nextPlugin,
      "simple-import-sort": importSort,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.{test.js,test.ts,test.tsx}", "jest.setup.js"],
    ...pluginJest.configs["flat/recommended"],
  },
  {
    files: ["jest.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["next-env.d.ts"],
    rules: {
      // It's rare to need a /// triple-slash reference outside of auto-generated code...
      // https://typescript-eslint.io/rules/triple-slash-reference/
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];

export default eslintConfig;
