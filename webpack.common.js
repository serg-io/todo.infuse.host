/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Webpack loaders for CSS files.
const cssLoaders = [{
	loader: 'css-loader',
	options: { sourceMap: true },
}];

// Webpack loaders for HTML files.
const htmlLoaders = ['infuse-loader'];

/**
 * This is the webpack configuration object contains options that are common in both environments:
 * development and production. Note that `cssLoaders` and `htmlLoaders` are in two places in this
 * object: at the root of the object and in the `rules` array, which makes it easier to access them
 * in the development and production configuration files (see webpack.dev.js and webpack.prod.js).
 */
module.exports = {
	cssLoaders,
	htmlLoaders,
	context: __dirname,
	/**
	 * The file that defines the <todo-app> custom element is the entry point of the application.
	 */
	entry: './src/TodoApp.js',
	module: {
		rules: [{
			test: /\.css$/,
			use: cssLoaders,
		}, {
			test: /\.html$/,
			use: htmlLoaders,
		}],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle-[contenthash].js',
	},
	/**
	 * The CleanWebpackPlugin is used here to remove the dist directory every time webpack runs.
	 * Additional plugins are added to this array in both: development and production.
	 */
	plugins: [
		new CleanWebpackPlugin(['dist']),
	],
};