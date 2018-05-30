/**
 * Created by wenbo.kuang on 2018/5/30.
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const isDebug = process.env.NODE_ENV === 'development';

const config = isDebug ? require("../build/webpack.config.dev") : require("../build/webpack.config.prod");

const server = new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    publicPath: config.output.publicPath,
});

module.exports = server;