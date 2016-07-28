var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: './static',
    publicPath: '/static/',
    filename: 'build.js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, 'node_modules')]
  },
  resolveLoader: {
    fallback: [path.join(__dirname, 'node_modules')]
  },
  module: {
    // avoid webpack trying to shim process
    noParse: /es6-promise\.js$/,
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /vux.src.*?js$/,
        loader: 'babel'
      },
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel'
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      }
    ]
  },
  babel: {
    presets: ['es2015', 'stage-2'],
    plugins: ['transform-runtime']
  },
  devServer: {
    proxy: {
      '/api/quiz': {
        target: 'http://127.0.0.1:8081',
        rewrite: function(req) {
          req.url = req.url.replace(/^\/api/, '')
        }
      }
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
