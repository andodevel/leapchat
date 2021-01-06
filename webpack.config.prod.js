const webpack = require("webpack");
const config = require("./webpack.config.base");
const path = require("path");

config.mode = "production";

config.entry = {
  main: path.resolve(__dirname + "/src/index.tsx"),
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

config.plugins = [
  ...config.plugins,
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production"),
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ["manifest"],
  }),
];

module.exports = config;
