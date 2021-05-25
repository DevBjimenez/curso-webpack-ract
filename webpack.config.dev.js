const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js', // desde este archivo inicia la compilacion
    output: {
        path: path.resolve(__dirname, 'dist'), // esta la carpeta donde se va a poner lo compilado
        filename: 'bundle.js', // asi se llama el archivo al momento de compilarse
    },
    resolve: {
        extensions: ['.js', '.jsx'] // las extensiones con las que va a trabajar o va a compilar
    },
    mode: 'development',
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
        })
    ],
    // configracion de el servidor local
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // carpeta en la que va a buscar el arvhico a correr
        compress: true,
        port: 3006 // puerto donde va a correr localmente
    }
}
