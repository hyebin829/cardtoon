module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "eslint-config-prettier",
    "plugin:react/recommended",
  ],
  plugins: ["import", "react-hooks", "prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
