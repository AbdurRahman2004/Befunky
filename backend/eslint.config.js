import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node, // Use Node.js environment
      },
    },
    rules: {
      // add any custom rules here if needed
    },
  },
]);
