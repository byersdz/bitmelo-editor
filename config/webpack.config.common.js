
var path = require( 'path' );
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
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin( {
      template: './src/index.html',
      filename: './index.html'
    } )
  ],
  resolve: {
    alias: {
      Components: path.resolve(__dirname, '../src/components'),
      Containers: path.resolve(__dirname, '../src/containers'),
      State: path.resolve(__dirname, '../src/state'),
      Style: path.resolve(__dirname, '../src/style'),
      Utils: path.resolve(__dirname, '../src/utils')
    },
    extensions: ['.js', '.jsx']
  }
}
