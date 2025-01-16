const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const withReport = process.env.npm_config_withReport;

module.exports = {
  mode: "production", // Change to "development" for local builds
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS to separate files
          {
            loader: "css-loader",
            options: { importLoaders: 1, sourceMap: true },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
        options: {
          name: "audio/[name].[ext]",
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".css", ".scss"],
  },
  output: {
    filename: "[name].[contenthash].bundle.js", // Add contenthash for cache busting
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    ...(withReport ? [new BundleAnalyzerPlugin()] : []),
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "./" }],
    }),
    new InjectManifest({
      swSrc: "./src/sw.js",
      swDest: "sw.js",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // Add contenthash for cache busting
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all", // Enable code splitting
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true, // Remove console logs in production
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    hot: true,
    port: 3000,
    historyApiFallback: true,
    host: "localhost",
    open: true, // Automatically open the browser
  },
  devtool: "source-map",
};
