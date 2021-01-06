const webpack = require("webpack");
const config = require("./webpack.config.base");
const path = require("path");

config.mode = "development";

config.entry = path.resolve(__dirname + "/src/index.tsx");

config.module.rules = [
  ...config.module.rules,
  {
    test: /\.css$/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader:
          "css-loader",
      },
    ],
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader:
          "css-loader",
      },
      {
        loader: "sass-loader",
      },
    ],
  },
];

config.watch = true;

config.watchOptions = {
  aggregateTimeout: 300,
  poll: 1000,
  ignored: ["node_modules/**"],
};

config.devtool = "inline-source-map";

config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
