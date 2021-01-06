const webpack = require("webpack");
const config = require("./webpack.config.base");
const path = require("path");

config.entry = path.resolve(__dirname + "/src/index.tsx");

config.watch = true;

config.watchOptions = {
  aggregateTimeout: 300,
  poll: 1000,
};

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
          "css-loader?sourceMap&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]",
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
          "css-loader?sourceMap&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]",
      },
      {
        loader: "sass-loader?sourceMap",
      },
    ],
  },
];

config.devtool = "source-map";
config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
