var webpack = require("webpack");
var path = require("path");

module.exports = {
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
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      debug: true,
      minimize: (process.env.NODE_ENV === 'production'),
      compress: (process.env.NODE_ENV === 'production'),
      sourceMap: (process.env.NODE_ENV !== 'production'),
      comments: (process.env.NODE_ENV !== 'production')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};