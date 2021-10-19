const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
	entry: {
		index: './src/js/index.js'
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist/assets/'),
		publicPath: 'assets/', // dist/
	},
	mode: 'development',
	devtool: 'source-map',
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
		new CopyWebpackPlugin({
			patterns: [
				{from: 'src/imgs/', to: 'imgs/'},
				{from: 'src/robots.txt', to: '../robots.txt'},
				{from: 'src/js/particles.json', to: 'js/particles.json'}
			]
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
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
