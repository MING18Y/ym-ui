const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
      index: "./src/app.jsx"
  },
  output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [ 
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "YMUI-EXAMPLE-PAGE",
      lang: "zh-cmn-Hans",
      template: 'src/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
  output: {
    filename: "[name].[hash].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
