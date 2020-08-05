const path = require("path");
const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [new UglifyJSPlugin()],
});
