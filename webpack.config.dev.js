const webpack                 = require("webpack");
const path                    = require("path");



module.exports = {
    entry: {
      main: "./src/index.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
        test: /\.css$/,
          use: [
            "style-loader", 
            { loader: "css-loader", options: { import: true } }
          ]       
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.mp3$/,
           loader: 'file-loader',
            options: {
              name: 'audio/[name].[ext]',
           }
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ]
    },
    // target: 'node',
    resolve: {
      extensions: ['*', '.js', '.jsx', '.css']
    },
    output: {
      filename: '[name].bundle.js',
      path: __dirname + '/dist',
      publicPath: '/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      
    ],

    devServer: {
      contentBase: './dist',
      hot: true,
      port: 3000,
      historyApiFallback: true,
      host: 'localhost'
    }

};
