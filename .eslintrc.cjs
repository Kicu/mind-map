module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import"],
  // settings: {
  //   "import/resolver": {
  //     typescript: {
  //       alwaysTryTypes: true,
  //     },
  //     "node": {
  //       "extensions": [".js", ".jsx", ".ts", ".tsx", ".css"]
  //     }
  //   },
  // },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
