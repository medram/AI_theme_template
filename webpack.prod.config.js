const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')


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
	optimization: {
		minimizer: [new TerserWebpackPlugin(), new OptimizeCssAssetsPlugin()]
	},
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
			},
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader'
			}
		]

	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			_: "underscore"
		}),
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
				{from: 'src/imgs/', to: 'imgs/'},
				{from: 'src/robots.txt', to: '../robots.txt'},
				{from: 'src/js/particles.json', to: 'js/particles.json'},
				{from: 'src/js/headers_particles.json', to: 'js/headers_particles.json'}
			]
		}),
		new HtmlWebpackPlugin({
			title: 'Home',
			template: './src/index.hbs',
			filename: '../index.html',
			chunks: ['index'],
			minify: false,
		}),
		new HtmlWebpackPlugin({
			title: 'About',
			template: './src/about.hbs',
			filename: '../about.html',
			chunks: ['index'],
			minify: false
		}),
		new HtmlWebpackPlugin({
			title: 'Privacy Policy',
			template: './src/privacy.hbs',
			filename: '../privacy.html',
			chunks: ['index'],
			minify: false
		}),
		new HtmlWebpackPlugin({
			title: 'Terms of Use',
			template: './src/terms-of-use.hbs',
			filename: '../terms-of-use.html',
			chunks: ['index'],
			minify: false
		}),
		new HtmlWebpackPlugin({
			title: 'FAQ',
			template: './src/faq.hbs',
			filename: '../faq.html',
			chunks: ['index'],
			minify: false
		})
	]
}
