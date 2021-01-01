const common = require('./webpack.config.js');

const config = {...common, ...{
  devtool: 'inline-source-map',
  mode: 'development',
  watch: true,
}};

module.exports = config;
