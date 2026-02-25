/** @type {import("eslint").Linter.Config} */
export default {
  extends: ["next/core-web-vitals", "./base.js"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
