
var merge = require( 'webpack-merge' );
var common = require( './webpack.config.common.js' );
const path = require( 'path' );

module.exports = merge( common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../electron/react-build')
  },
} );
