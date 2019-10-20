const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
	devtool: 'source-map',
	module: {
		rules: [
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
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
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
		)
	]
};
