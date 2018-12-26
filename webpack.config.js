const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    contentBase: 'build',
    historyApiFallback: true,
    port: 3000
  },
  entry: './public/index.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html'
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js']
  }
};
