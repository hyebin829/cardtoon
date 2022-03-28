const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true, // 코드 최적화 옵션
            },
          },
        ],
      },
      {
        test: /\.(css|jsx)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // .png 확장자로 마치는 모든 파일
        loader: 'file-loader', // 파일 로더를 적용한다
        options: {
          name: '[name].[ext]?[hash]', // 파일명 형식
          publicPath: './dist', // 아웃풋 경로
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]',
          publicPath: './dist',
          limit: 5000, // 5kb 미만 파일만 data url로 처리
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'production',
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
  ],
};
