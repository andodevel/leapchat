"use strict";

const path = require("path");
const webpack = require("webpack");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const audio = require("./src/constants/audio");
const emoji = require("./src/constants/emoji");

const outputFolder = "build";

const isProductionBuild = process.env.NODE_ENV === "production";

const config = {
  mode: isProductionBuild ? "production" : "development",
  entry: path.resolve(__dirname + "/src/index.tsx"),
  context: __dirname,
  output: {
    path: path.resolve(__dirname, outputFolder),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: isProductionBuild
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
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
        test: /\.(mp3|wav)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|svg|gif|woff2?|ttf|otf|eot)$/,
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

if (isProductionBuild) {
  config.devtool = "source-map";
  config.module.rules[0].use[0].options = {
    hmr: false,
  };
  config.plugins.push(new CleanWebpackPlugin());
  config.plugins.push(
    new MiniCSSExtractPlugin({
      filename: "bundle.css",
    })
  );
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/index.html", to: "index.html" },
        {
          from: "src/static/audio",
          to: audio.AUDIO_PATH,
        },
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
      "/api/": {
        target: "ws://localhost:8080",
        ws: true,
      },
    },
  };
  config.devtool = "inline-source-map";
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
