const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const copyBanner = require('./src/app/banner.js');

module.exports = {
	entry: {
		main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/app/entry-app-index.js']
	},
	output: {
		path: path.join(__dirname, 'dist/app'),
		publicPath: '/',
		filename: '[name].js'
	},
	mode: 'development',
	target: 'web',
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
				options: {
					emitWarning: true,
					failOnError: false,
					failOnWarning: false
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				// Loads the javacript into html template provided.
				// Entry point is set below in HtmlWebPackPlugin in Plugins
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						//options: { minimize: true }
					}
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [{
					loader: 'style-loader', // inject CSS to page
				}, {
					loader: 'css-loader', // translates CSS into CommonJS modules
				}, {
					loader: 'postcss-loader', // Run postcss actions
					options: {
						plugins: function () { // postcss plugins, can be exported to postcss.config.js
							return [
								require('autoprefixer')
							];
						}
					}
				}, {
					loader: 'sass-loader' // compiles Sass to CSS
				}]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader']
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebPackPlugin({
			title: "Project",
			template: "./src/app/html/index.html",
			filename: "./index.html",
			excludeChunks: [ 'server' ]
		}),
		new BrowserSyncPlugin(
			// BrowserSync options
			{
				// browse to http://localhost:3000/ during development
				host: 'localhost',
				port: 3000,
				// proxy the Webpack Dev Server endpoint
				// (which should be serving on http://localhost:3100/)
				// through BrowserSync
				proxy: 'http://localhost:8080/',
				files: [{
					match: [
						'**/**/*.html'
					],
					fn: function(event, file) {
						if (event === "change") {
							/*console.log('start engine');*/
							//copyBanner();
							const bs = require('browser-sync').get('bs-webpack-plugin');
							bs.reload();
						}
					}
				}]
			},
			// plugin options
			{
				// prevent BrowserSync from reloading the page
				// and let Webpack Dev Server take care of this
				reload: false
			}
		),
		new WebpackShellPlugin({
			onBuildStart: ['echo "Webpack Start fitriaman"'],
			onBuildEnd: ['echo "Webpack End fitriaman"']
		})
	]
};
