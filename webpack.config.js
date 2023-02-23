const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './frontend/src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: '/',
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.handlebars$/, loader: 'handlebars-loader' },
            { test: /\.(png|jpg)$/, type: 'asset/resource' },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html'
        })
    ],
    devServer: {
        proxy: {
            '/api': 'http://127.0.0.1:3002'
        },
        historyApiFallback: true,
    }
};