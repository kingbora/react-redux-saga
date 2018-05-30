/**
 * Created by wenbo.kuang on 2018/5/30.
 */
const path = require('path');
const lib = require('../config/lib.dependencies');
const webpack = require('webpack');

const isDebug = process.env.NODE_ENV === 'development';

const publicPath = '../dll';

const outputPath = isDebug ? path.join(__dirname, `${publicPath}/debug`) : path.join(__dirname, `${publicPath}/min`);

const plugin = [
    new webpack.DllPlugin({
        /**
         * path
         * 定义manifest文件生成的位置
         * [name]的部分由entry的名字替换
         */
        path: path.join(outputPath, 'manifest.json'),
        /**
         * name
         * dll bundle 输出到那个全局变量上
         * 和output.library一样即可
         */
        name: '[name]'
    })
];

if (!isDebug) {
    plugin.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$', 'exports', 'require']
            },
            exclude: /\.min\.js$/,
            compress: { warnings: false },
            output: { comments: false }
        }),
        new webpack.ContextReplacementPlugin(
            /moment[\/\\]locale$/,
            /(en-gb|zh-cn).js/
        )
    );
}

module.exports = {
    devtool: '#source-map',
    entry: {
        lib
    },
    output: {
        path: outputPath,
        filename: isDebug ? '[name].js' : '[name].[hash:9].js',
        /**
         * output.library
         */
        library: '[name]'
    },
    plugins: plugin
};