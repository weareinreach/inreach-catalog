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
  }
};