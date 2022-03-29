const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Terserplugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
});
