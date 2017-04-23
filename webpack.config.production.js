'use strict';

var webpack = require('webpack');
var config = require('./webpack.config.base.js');

var SaveAssetsJson = require('assets-webpack-plugin');

config.bail = true;
config.profile = false;

config.output = {
  path: __dirname + '/client/dist',
  pathinfo: true,
  publicPath: '/client/dist/',
  filename: 'bundle.[hash].min.js'
};

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compress: {
      warnings: false,
      screw_ie8: true
    },
    sourcemap: false
  }),
  new SaveAssetsJson({
    path: process.cwd(),
    filename: 'assets.json'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
]);

config.module.rules = config.module.rules.concat([
  {test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /node_modules/}
]);

module.exports = config;
