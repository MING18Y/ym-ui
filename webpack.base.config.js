const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'YMUI-EXAMPLE-PAGE',
            lang: 'zh-cmn-Hans',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                }, {
                    loader: "less-loader",
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            }
        ]
    },
    output: {
        filename: "[name].[hash].bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },


}