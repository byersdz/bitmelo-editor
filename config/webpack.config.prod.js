
var merge = require( 'webpack-merge' );
var common = require( './webpack.config.common.js' );

module.exports = merge( common, {
  mode: 'production',
  devtool: 'source-map'
} );
