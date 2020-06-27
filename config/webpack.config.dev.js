
const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const common = require( './webpack.config.common.js' );

module.exports = merge( common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 9001,
  },
  plugins: [
    new webpack.DefinePlugin( {
      IS_DESKTOP: JSON.stringify( false ),
      IS_DEV: JSON.stringify( true ),
    } ),
  ],
} );

