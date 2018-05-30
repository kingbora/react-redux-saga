/**
 * Created by wenbo.kuang on 2018/5/30.
 */
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundlePlugin = require("webpack-bundle-analyzer");
const autoprefixer = require("autoprefixer");
const lib = require('../config/lib.dependencies');

const BundleAnalyzerPlugin = BundlePlugin.BundleAnalyzerPlugin;

module.exports = {
    cache: true,
    devtool: false,
    entry: {
        index: [
            './src/index.js'
        ],
        vendor: lib
    },
    output: {
        filename: 'js/[name].[hash:12].js',
        path: path.join(__dirname, 'www'),
        publicPath: '/www/',
        chunkFilename: 'js/[name].[chunkhash].js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: [
                    'babel-loader?cacheDirectory'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    return [
                                        autoprefixer
                                    ];
                                }
                            }
                        }
                    ]
                }),
                exclude: /node_modules/
            },
            {
                test: /favicon\.png$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]?[hash]'
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'link:href']
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                exclude: /favicon\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /\.bundle\.js$/,
                include: /(src)/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'bundle-loader',
                    options: {
                        name: 'app-[name]',
                        lazy: true
                    }
                }, {
                    loader: 'babel-loader'
                }]
            }
        ],
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: 'manifest',
            chunks: 'vendor'
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        new webpack.optimize.ModuleConcatenationPlugin(),


        new HtmlWebpackPlugin({
            template: './src/index.html',
            hash: false,
            filename: 'index.html',
            inject: 'body',
            chunks: ['manifest', 'vendor', 'index'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),

        // 配置打包后的样式文件名称
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css',
            allChunks: true,
            disable: false
        }),

        // 可视化分析工具
        new BundleAnalyzerPlugin()
    ]
};