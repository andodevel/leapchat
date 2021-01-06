const webpack = require("webpack");
const config = require("./webpack.config.base");
const path = require("path");

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
