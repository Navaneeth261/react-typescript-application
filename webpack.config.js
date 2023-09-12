const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: ["./src/index.tsx"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.module\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg|eot|ttf|woff|woff2)$/i,
        type: "asset",
        generator: {
          filename: "assets/[hash][ext][query]",
        },
      },
    ],
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
      inject: true,
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
  devServer: {
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
