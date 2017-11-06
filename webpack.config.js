var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack");
var path = require("path");
var express = require('express');

var config = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname+'/public/js',
    publicPath: '/js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    },{
        test: /\.s?css$/,
        loader: (process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract('css-loader?minimize!sass-loader') : 'style-loader!css-loader!sass-loader'),
    },{
    test: /\.(jpg|png|svg)$/,
    loader: 'url-loader',
    },{
      test: /\.json$/, 
      loader: 'json-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'OD_API_ENV': JSON.stringify(typeof process.env.OD_API_ENV !== "undefined" ? process.env.OD_API_ENV : process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin('../css/style.css', {
      allChunks: true
    }),
    new webpack.NormalModuleReplacementPlugin(
       /\/iconv-loader$/, 'node-noop'
   )
  ],
  devServer: {
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    //publicPath: '/js/',
    before(app) {
      var apiRoutes = require('./api/routes');
      apiRoutes(app);
    }
  }
};

if(process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      debug: true,
      minimize: (process.env.NODE_ENV === 'production'),
      compress: (process.env.NODE_ENV === 'production'),
      sourceMap: (process.env.NODE_ENV !== 'production'),
      comments: (process.env.NODE_ENV !== 'production')
    })
  );
}

module.exports = config;