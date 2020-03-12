const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "production",
  target: "node",
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    libraryTarget: "commonjs",
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-transform-classes", { loose: true }],
              ["@babel/plugin-transform-destructuring", { loose: true }],
              ["@babel/plugin-transform-spread", { loose: true }],
              ["@babel/plugin-proposal-object-rest-spread"],
              ["@babel/plugin-syntax-dynamic-import"],
              ["@babel/plugin-syntax-import-meta"]
            ]
          }
        }
      }
    ]
  }
};
