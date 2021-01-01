const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/client/index.html',
  filename: './index.html',
  favicon: './src/client/images/favicon.ico',
});

module.exports = {
  entry: {
    entry: './src/client/App.tsx',
  },
  // watch: true,
  module: {
    rules: [
      {
        test: /\.(ts|js|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {name: './images/[name].[ext]'},
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'App.js',
    path: path.resolve(__dirname, 'dist/client'),
  },
  plugins: [htmlPlugin],
};
