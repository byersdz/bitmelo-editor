
var merge = require( 'webpack-merge' );
var common = require( './webpack.config.common.js' );

module.exports = merge( common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
} );

