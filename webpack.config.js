const path = require("path");
module.exports = {
  resolve: {
    extensions: [".ts", ".js",".tsx"],
  }, 
  target: 'node',
  externals: /k6(\/.*)?/ ,
  mode: "development",
  entry: {
    LoadTest: "./src/setup.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/typescript"]],
              plugins: [
                "@babel/proposal-class-properties",
                "@babel/proposal-object-rest-spread",
              ],
            },
          }
        ],
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
          }
        ]
      }
    ],
  },
  devtool: 'source-map'
};
