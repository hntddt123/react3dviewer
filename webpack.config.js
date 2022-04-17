const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist/`,
    publicPath: '',
    assetModuleFilename: 'textures/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg|ico)$/,
        type: 'asset/inline'
      }
    ]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/HDMM.ico'
    }),
    new MiniCssExtractPlugin(),
  ],
};
