
const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const common = require( './webpack.config.common.js' );
const path = require( 'path' );

module.exports = merge( common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../electron/react-build')
  },
  plugins: [
    new webpack.DefinePlugin( {
      IS_DESKTOP: JSON.stringify( true ),
      IS_DEV: JSON.stringify( false ),
    } ),
  ],
} );
