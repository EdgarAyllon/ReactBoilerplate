/**
 * Webpack 4.20 > config file
 * extract-text-webpack-plugin does not work with webpack 4.20 or above, use mini-css-extract-plugin instead.
 */
const path = require('path');
// Algorithm for better compression
const zopfli = require('@gfx/zopfli');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Compression gzip
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: {
        'bundle': [
            './src/index.js'
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `[name].[hash].js`,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new CompressionPlugin({
            compressionOptions: {
                numiterations: 1
            },
            algorithm( input, compressionOptions, callback){
                return zopfli.gzip(input, compressionOptions, callback);
            }
        })
    ],
    // Enable smart code splitting, extracts the vendor code if it gets larger than 30kB( before minification and gzip)
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    performance:{
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devServer:{
        disableHostCheck: true,
        compress: true,
        overlay: true,
        stats: 'errors-only',
        open: true,
        host: '0.0.0.0',
        port: 9000,
        hot: true,
        contentBase: './',
    }
};