const webpack              = require("webpack");
const path                 = require("path");
const HtmlWebpackPlugin    = require("html-webpack-plugin");
const {InjectManifest}     = require('workbox-webpack-plugin');
const BrotliPlugin         = require('brotli-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin           = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
      withReport ? new BundleAnalyzerPlugin() : '',
      // new BrotliPlugin({
      //    asset: '[path].br[query]',
      //    test: /\.js$|\.css$|\.html$/,
      //    threshold: 10240,
      //    minRatio: 0.7
      // }),
      new CopyPlugin({
        patterns: [
          { from: 'public', to: './' }
        ],
      }),
      new InjectManifest({
        swSrc: "./src/sw.js",
        swDest: "sw.js"
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "./index.html"
      }), 
      new CleanWebpackPlugin()
      
    ],

    optimization: {
      minimizer: [

        new TerserPlugin({
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          cache: true,
          // sourceMap: true,
        }),
      ],
    },
    // devtool: 'source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
      port: 3000,
      historyApiFallback: true,
      host: 'localhost'
    }

};
