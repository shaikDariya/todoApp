/* eslint-disable */
const { override, addWebpackAlias } = require("customize-cra");
const { paths } = require("react-app-rewired");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, `${paths.appSrc}`),
  })
);
