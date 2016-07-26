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
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js'],  // along the way, subsequent file(s) to be consumed by webpack
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/index.html'),
      filename: 'index.html',
      title: "Webpack Demo"
    })
  ]
};

var config;

var buildConfig = merge(
  common,
  parts.JSX(PATHS.app),
  parts.setupReactFlex(),  
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
  // parts.extractBundle({
  //   name: 'vendor',
  //   entries: Object.keys(pkg.dependencies)
  // }),
  parts.minify(),
  parts.extractCSS(PATHS.style),
  parts.purifyCSS([PATHS.app])
);

var devConfig = merge(
      common,
      parts.JSX(PATHS.app),
      parts.setupReactFlex(),
      // parts.JSON(),
      // parts.Fonts(PATHS.app),
      // parts.LESS(PATHS.app),
      // parts.Images(PATHS.app),
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

switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = buildConfig;
    break;
  case 'stats':
    config = buildConfig;
    break;
  default:
    config = devConfig;
}

module.exports = validate(config);