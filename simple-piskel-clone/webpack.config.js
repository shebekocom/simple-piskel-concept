const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  let minimizer = [];
  if (isProd) {
    minimizer = [new UglifyJsPlugin({}), new OptimizeCSSAssetsPlugin({})];
  }
  return minimizer;
};

const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const babelOptions = preset => {
  const opts = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      template: './html/index.html',
      filename: 'index.html',
      minify: isProd,
    }),
    new HtmlWebpackPlugin({
      template: './html/createsprite.html',
      filename: 'createsprite.html',
      minify: isProd,
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/favicon/favicon.ico'),
        to: path.resolve(__dirname, 'dist/assets/favicon'),
      },
      {
        from: path.resolve(__dirname, 'src/modules/libraries/gif.js'),
        to: path.resolve(__dirname, 'dist/libraries/gif.js'),
      },
      {
        from: path.resolve(__dirname, 'src/modules/libraries/gif.worker.js'),
        to: path.resolve(__dirname, 'dist/libraries/gif.worker.js'),
      },
    ]),
    new CleanWebpackPlugin(),
  ];
  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    index: ['@babel/polyfill', './index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 4200,
  },
  optimization: {
    minimizer: optimization(),
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(svg|jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/img',
              useRelativePath: true,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/fonts',
              useRelativePath: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { attrs: [':data-src'] },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript'),
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react'),
        },
      },
    ],
  },
};
