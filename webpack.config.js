const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js', // desde este archivo inicia la compilacion
    output: {
        path: path.resolve(__dirname, 'dist'), // esta la carpeta donde se va a poner lo compilado
        filename: 'bundle.js', // asi se llama el archivo al momento de compilarse
    },
    resolve: {
        extensions: ['.js', '.jsx'], // las extensiones con las que va a trabajar o va a compilar
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@styles': path.resolve(__dirname, 'src/styles/')
        }
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, // excluiar archivos que estes en la carpta node_modules
                use: {
                    loader: 'babel-loader', // babel para hacer nuestro codigo entendible para navegadores viejos
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './public/index.html',
                filename: './index.html'
            }
        ),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin(),
    ],
    // configracion de el servidor local
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ],
    }
}
