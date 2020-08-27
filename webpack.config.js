const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { InjectManifest } = require('workbox-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin           = require('copy-webpack-plugin');

const withReport = process.env.npm_config_withReport;

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
      filename: '[name].bundle.js',
      path: __dirname + '/dist',
      publicPath: '/'
    },
    plugins: [
      // withReport ? new BundleAnalyzerPlugin() : '',
      new webpack.HotModuleReplacementPlugin(),
      // new BrotliPlugin({
      //    asset: '[path].br[query]',
      //    test: /\.js$|\.css$|\.html$/,
      //    threshold: 10240,
      //    minRatio: 0.7
      // }),
      // new CopyPlugin({
      //   patterns: [
      //     { from: 'public', to: './' }
      //   ],
      // }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "./index.html"
      }), 
      // new InjectManifest({
      //   swSrc: './src/src-sw.js'
      // })
    ],
    devServer: {
      contentBase: './dist',
      hot: true,
      port: 3000,
      historyApiFallback: true,
      host: '192.168.1.7'
    }

};
