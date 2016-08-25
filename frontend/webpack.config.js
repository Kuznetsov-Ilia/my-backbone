const DEBUG = process.env.NODE_ENV === 'development';
const TEST = process.env.NODE_ENV === 'test';
const PROD = process.env.NODE_ENV === 'production';
const webpack = require('webpack');
const postcssPlugins = require('./postcss.config.js');
var config = {
  entry: {
    //inline: './app/inline.js',
    app: './app/index.js',
    //admin: './admin/index.js'
  },
  debug: DEBUG,
  devtool: 'eval',
  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: `http://localhost:3000/`
    //publicPath: `/`
  },
  plugins: [
    new webpack.DefinePlugin({ DEBUG, TEST, PROD }),// imported in production conf
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.xml', '.html', '.xhtml', '.styl', '.css'],
    modulesDirectories: ['node_modules'],
    packageMains: ['webpack', 'browser', 'web', 'style', 'main'],// this is important if, like SUIT CSS, you specify a `style` property in the package.json
    packageAlias: 'browser'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      //exclude: 'node_modules'
      include: /app|admin/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.xhtml$/,
      loaders: ['babel-loader', 'my-vanga/plugins/webpack']
    }, {
      test: /\.css$/,// POPED in production!!! MUST BE LAST!!
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path][local]&context=./app!postcss-loader'//&localIdentName=[path][name][local]---[hash:base64:5]
    }]
  },
  postcss: postcssPlugins
};

module.exports = config;
