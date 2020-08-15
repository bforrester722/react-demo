const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", 
          { loader: "css-loader", options: { import: true } }, 
          "postcss-loader"
        ]       
      },
      {
        test: /\.mp3$/,
         loader: 'file-loader',
          options: {
            name: 'audio/[name].[ext]',
         }
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
     // require("postcss-import")
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3000,
    historyApiFallback: true,
     host: '192.168.1.7'

  }
};
