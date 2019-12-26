
const webpack = require( 'webpack' );
const path = require( 'path' );
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.txt$/i,
        use: [
          'raw-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin( {
      template: './src/index.html',
      filename: './index.html',
      favicon: "./src/favicon.ico"
    } ),
    new webpack.DefinePlugin( {
      EDITOR_VERSION: JSON.stringify( require( '../package.json' ).version ),
    } ),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
