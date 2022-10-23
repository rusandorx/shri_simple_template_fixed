const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StatoscopePlugin = require('@statoscope/webpack-plugin').default
const LodashWebpackPlugin = require('lodash-webpack-plugin')

const config = {
  entry: {
    about: './src/pages/About.js',
    home: './src/pages/Home.js',
    main: {
      dependOn: ['about', 'home'],
      import: './src/index.js',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public', 'index.html'),
      favicon: './public/favicon.ico',
    }),
    new StatoscopePlugin({
      saveStatsTo: 'stats.json',
      saveOnlyStats: false,
      open: false,
    }),
    new LodashWebpackPlugin({
      coercions: true,
      exotics: true,
      memoizing: true,
      collections: true,
      paths: true
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }]],
          },
        },
        exclude: /(node_modules)/,
        resolve: { extensions: ['.js', '.jsx'] },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  target: 'web',
  resolve: {
    fallback: {
      'crypto': require.resolve('crypto'),
    },
    alias: {
      'crypto-browserify': path.resolve(__dirname, 'src/crypto-fallback.js'),
      'react-is': path.resolve(__dirname, 'node_modules/react-is/cjs/react-is.production.min.js')
    },
  },
  optimization: {
    minimize: true,
    emitOnErrors: true,
    concatenateModules: true,
    moduleIds: 'size',
    mergeDuplicateChunks: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async'
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true
  },
}

module.exports = config
