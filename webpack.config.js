const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
module.exports = {
  entry: './src/treeshaking-test.ts',
  mode: 'production',
  module: {
    rules: [
      // turn this on to see the difference
      // {
      //   test: /\.(j|t)sx?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         ['@babel/preset-env', {
      //           targets: "> 0.5%, last 2 versions, not IE < 11",
      //           corejs: {
      //             version: 3,
      //             proposals: true,
      //           },
      //         }]
      //       ]
      //     }
      //   }
      // },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: false,
    concatenateModules: true,
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        test: {
          test: /lib-modules/,
          name: 'bundle-lib-modules',
          priority: 101,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      __TEST__: true
    }),
    new HtmlWebpackPlugin(),
    new BundleAnalyzerPlugin({ generateStatsFile: true, analyzerMode: 'static', openAnalyzer: false }),
  ],
  output: {
    // filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
};
