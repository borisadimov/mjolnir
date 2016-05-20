var path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = (targetDir) => {
  return {
    entry: path.join(targetDir, 'index.js'),
    output: {
      path: path.join(targetDir, 'Build'),
      filename: 'bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            // https://github.com/babel/babel-loader/issues/166#issuecomment-160866946
            presets: [
              'babel-preset-es2015',
              'babel-preset-react'
            ].map(require.resolve)
          }
        },
        { test: /\.html$/,  loader: "html" },
        { test: /\.jade$/,  loader: "jade" },
        { test: /\.css$/,   loader: "style-loader!css-loader!postcss-loader" },
        { test: /\.coffee$/, loader: 'coffee-loader' },
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: require.resolve(path.join(targetDir, 'app', 'templates', 'index.jade'))
      })
    ],
    resolve: {
      root: [
        path.resolve(targetDir)
      ],
      extensions: ['', '.js', '.json', '.coffee', 'jade', 'css']
    }
  }
}
