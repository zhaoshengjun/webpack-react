const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./config/webpack.parts');
const pkg = require('./package.json');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};


const common = {
  entry: {
    app: path.join(PATHS.app, 'app.js')
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/index.html'),
      filename: 'index.html',
      title: "Webpack Demo"
    })
  ],
  node: {
    fs: false,
    net: false,
    tls: false
  }
};

var config;

switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      parts.JSX(PATHS.app),
      parts.JSON(),
      parts.Fonts(PATHS.app),
      parts.LESS(PATHS.app),
      parts.Images(PATHS.app),
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable('process.env.NODE_ENV', 'production'),
      parts.extractBundle({
        name: 'vendor',
        entries: Object.keys(pkg.dependencies)
      }),
      parts.minify(),
      parts.extractCSS(PATHS.style),
      parts.purifyCSS([PATHS.app])
    );
    break;
  case 'stats':
    config = merge(
      common,
      parts.JSX(PATHS.app),
      parts.Images(PATHS.app),
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable('process.env.NODE_ENV', 'production'),
      parts.extractBundle({
        name: 'vendor',
        entries: Object.keys(pkg.dependencies)
      }),
      parts.minify(),
      parts.extractCSS(PATHS.style),
      parts.purifyCSS([PATHS.app])
    );
    break;
  default:
    config = merge(
      common,
      parts.JSX(PATHS.app),
      parts.JSON(),
      parts.Fonts(PATHS.app),
      parts.LESS(PATHS.app),
      parts.Images(PATHS.app),
      {
        devtool: 'eval-source-map'
      },
      parts.setupCSS(PATHS.style),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      }),
      parts.open
    );
}

module.exports = validate(config);