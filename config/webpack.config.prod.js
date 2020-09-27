
const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const common = require( './webpack.config.common.js' );

module.exports = merge( common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin( {
      IS_DESKTOP: JSON.stringify( false ),
      IS_DEV: JSON.stringify( false ),
    } ),
  ],
} );
