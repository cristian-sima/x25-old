'use strict'

var webpack = require('webpack')
var env = process.env.NODE_ENV

var config = {
  module: {
    loaders: [
      {
        test    : /\.jsx?$/u,
        use     : ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test : /\.scss$/u,
        use  : [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test : /\.css$/u,
        use  : [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/u,
        use  : "url-loader?limit=10000&minetype=application/font-woff",
      },
      {
        test : /\.jpe?g$|\.gif$|\.png$/u,
        use  : "url-loader",
      },
      {
        test : /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/u,
        use  : "file-loader",
      }
    ]
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
    ],
    modules: [
      "client",
      "node_modules",
    ],
  },
  output: {
    library: 'ReactPaginator',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("development"),
      },
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "BABEL_ENV": JSON.stringify("developmentTime"),
      },
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production"),
      },
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "BABEL_ENV": JSON.stringify("production"),
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ro/),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
    }),
  )
}

module.exports = config
