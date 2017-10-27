const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [{
      test: /\.sass$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]
    }]
    // {
    //   test: /\.js$/,
    //   use: [{
    //     loader: "babel-loader",
    //     options: {
    //       presets: ["env"]
    //     }
    //   }]
    // }]
  }
};
