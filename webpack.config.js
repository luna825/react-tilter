var path = require('path')
var webpack = require('webpack')


var config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/',
    path.resolve(__dirname, 'src/index.js')
  ],
  output:{
    path:path.resolve(__dirname,'public','assets'),
    filename:'bundle.js',
    publicPath:'/assets/'
  },
  module:{
    loaders:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        query:{
          presets:['react', 'es2015', 'stage-0']
        }
      },
      {test: /\.(jpe?g|png|gif|svg)$/, loader: 'url?limit=1024&name=img/[name].[ext]'},
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = config