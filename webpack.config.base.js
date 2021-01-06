const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const emoji = require("./src/constants/emoji");

const outputFolder = "build";

module.exports = {
  context: __dirname,
  output: {
    path: path.resolve(__dirname, outputFolder),
    filename: "[name]_[chunkhash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
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
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", "ts", "tsx", ".css", ".scss", ".json"],
    modules: ["node_modules"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "LeapChat",
      template: "./src/index-template.ejs",
    }),
    new MiniCssExtractPlugin(),
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
    }),
  ],
};
