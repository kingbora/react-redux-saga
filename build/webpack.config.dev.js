/**
 * Created by wenbo.kuang on 2018/5/30.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const webpackServerConfig = require("../config/server.config");
const lib = require("../config/lib.dependencies");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const HappyThreadPool = HappyPack.ThreadPool({ size: 6 });

module.exports = {
    cache: true,
    devtool: '#source-map',
    entry: {
        index: [
            'react-hot-loader/patch',
            //开启React代码的模块热替换（HMR）
            `webpack-dev-server/client?http://${webpackServerConfig.host}:${webpackServerConfig.port}`,
            //为webpack-dev-server的环境打包代码
            //然后连接到指定服务器域名和端口
            'webpack/hot/only-dev-server',
            //为热替换（HMR）打包好代码
            //only- 意味着只有成功更新允许代码才会执行热替换（HMR）
            './src/index.js'
        ],
        vendor: lib
    },
    output: {
        filename: 'js/[name].[hash:12].js',
        path: path.join(__dirname, 'www'),
        publicPath: `http://${webpackServerConfig.host}:${webpackServerConfig.port}`,
        // 对于热替换（HMR）是必须的，让webpack知道在哪里载入热更新的模块
        chunkFilename: 'js/[name].[chunkhash].js',
        //从外部拉取资源
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: 'happypack/loader?id=jsx',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
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
                use: [
                    {
                        loader: 'bundle-loader',
                        options: {
                            name: 'app-[name]',
                            lazy: true
                        }
                    },
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    plugins: [
        //将第三方库单独打包
        new webpack.optimize.CommonsChunkPlugin({
            names: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: 'vendor'
        }),
        //开启全局的模块热替换
        new webpack.HotModuleReplacementPlugin(),
        //当模块热替换时在浏览器控制台输出对用户更友好的模块名字信息
        new webpack.NamedModulesPlugin(),

        new webpack.optimize.ModuleConcatenationPlugin(),

        new HappyPack({
            id: 'jsx',
            threadPool: HappyThreadPool,
            loaders: ['babel-loader']
        }),

        new webpack.ContextReplacementPlugin(
            /moment[\/\\]locale$/,
            /(en-gb|zh-cn).js/
        ),
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

        new OpenBrowserPlugin({ url: `http://${webpackServerConfig.host}:${webpackServerConfig.port}` })
    ]
};