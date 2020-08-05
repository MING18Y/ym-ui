const {merge} = require('webpack-merge');
const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    compress: true,
    hot: true,
  }
});
