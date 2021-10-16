const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')


module.exports = {
	entry: {
		index: './src/js/index.js'
	},
	output: {
		filename: 'js/[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist/assets/'),
		publicPath: 'assets/', // dist/
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|jpeg|svg)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'imgs/'
				}
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.(scss|sass)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env'],
						plugins: ['transform-class-properties']
					}
				}
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: "fonts/[name].[ext]",
					},
				},
			}
		]

	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				'**/*',
				`${__dirname}/dist/**/*`
			]
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/imgs/', to: 'imgs/' }
			]
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		new HtmlWebpackPlugin({
			title: 'Home',
			template: './src/index.html',
			filename: '../index.html',
			chunks: ['index'],
			minify: false,
		})
	]
}
