const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

const DEFAULTS = {
  PORT: 8081,
  HOST: 'localhost'
};

exports.LESS = function(path) {
  return {
    module:{
      loaders:[
        {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
        }
      ]
    }
  };
};
exports.JSON = function() {
  return {
    module:{
      loaders:[
        {
        test: /\.json$/,
        loader: "json-loader"
        }
      ]
    }
  };
};

exports.JSX = function (path) {
  return {
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel?cacheDirectory'],
          include: path
        }
      ]
    }
  };
};

exports.devServer = function (options) {
  return {
    //This is purly to solve some wired issue on Windows, Ubuntu and Vagrant  
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: 1000
    // },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: DEFAULTS.HOST,
      port: DEFAULTS.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({ multiStep: true }),
      new OpenBrowserWebpackPlugin({
        url: 'http://localhost:' + DEFAULTS.PORT
      })
    ]
  };
};

exports.setupCSS = function (paths) {
  return {
    module: {
      loaders: [
        { test: /\.css$/, loaders: ['style', 'css'], include: paths,exclude: /flexboxgrid/ }
      ]
    }
  };
};

exports.setupReactFlex = function () {
  return {
    module: {
      loaders: [
        {
          test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
          // include: /flexboxgrid/
        }
      ]
    }
  };
}

exports.minify = function () {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          warnings: false,
          drop_console: true
        }
      })
    ]
  };
};


exports.setFreeVariable = function (key, value) {
  const env = {};
  env[key] = JSON.stringify(value);
  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};

exports.extractBundle = function (options) {
  const entry = {};
  entry[options.name] = options.entries;

  return {
    entry: entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  };
};

exports.clean = function (path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        root: process.cwd()
      })
    ]
  };
};

exports.extractCSS = function (paths) {
  return {
    module: {
      loaders: [
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css'), include: paths }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
};

exports.purifyCSS = function (paths) {
  return {
    plugins: [
      new PurifyCSSPlugin({
        basePath: process.cwd(),
        paths: paths
      })
    ]
  };
};

exports.Images = function (paths) {
  return {
    module: {
      loaders: [
        { test: /\.(jpg|png|jpeg)$/i, loader:'file-loader' , include: paths }
      ]
    }
  };
};
exports.Fonts = function (paths) {
  return {
    module: {
      loaders: [
        { test: /\.(eot|woff|woff2|ttf|svg)$/, loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]' }
      ]
    }
  };
};