'use strict'

const path = require("path");
const webpack = require("webpack");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const emoji = require("./src/constants/emoji");

const OUTPUT_FOLDER = "dist";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const config = {
  mode: IS_PRODUCTION ? "production" : "development",
  entry: path.resolve(__dirname + "/src/index.jsx"),
  context: __dirname,
  output: {
    path: path.resolve(__dirname, OUTPUT_FOLDER),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: IS_PRODUCTION
              ? MiniCSSExtractPlugin.loader
              : "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|woff2?|ttf|otf|eot|svg|gif|mp3|wav)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js"],
  },
  plugins: [new webpack.EnvironmentPlugin(["NODE_ENV"])],
};

if (process.env.NODE_ENV === "production") {
  config.devtool = "inline-source-map";
  config.plugins.push(new CleanWebpackPlugin());
  config.plugins.push(
    new HtmlWebpackPlugin({
      title: "LeapChat",
      template: "src/index.ejs",
    })
  );
  config.plugins.push(
    new MiniCSSExtractPlugin({
      filename: "bundle.css",
    })
  );
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "node_modules/emoji-datasource-apple/img/apple/64",
          to: emoji.EMOJI_APPLE_64_PATH,
        },
        {
          from: "node_modules/emoji-datasource-apple/img/apple/sheets/64.png",
          to: emoji.EMOJI_APPLE_64_SHEET,
        },
        {
          from: "src/static/js/emoji-fixed.js",
          to: "../node_modules/emoji-js/lib/emoji.js",
        },
      ],
    })
  );
} else {
  config.devServer = {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: "./src",
    port: 8000,
    publicPath: "/",
    proxy: {
      "/be": {
        target: "http://localhost:8080",
        pathRewrite: {
          "^/be/api": "",
        },
      },
    },
  };
  config.devtool = "inline-source-map";
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
