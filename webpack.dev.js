/**
 * This file defines webpack configuration options that are used during development. It extends
 * configuration options defined in the webpack.common.js file.
 */
/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * Destructuring assignment syntax is used here to extract `cssLoaders` and `htmlLoaders` from the
 * object returned by `require`, all remaining configuration options are included in `common`.
 */
const { cssLoaders, htmlLoaders, ...common } = require('./webpack.common.js');

// Get the `plugins` array from `common`. This doesn't change the contents of `common`.
const { plugins } = common;

// Add the "style-loader" to the beginning of the `cssLoaders` array.
cssLoaders.unshift({
	loader: 'style-loader',
	options: {
		sourceMap: true,
	},
});

// Add HtmlWebpackPlugin to the `plugins` array to generate an index.html file.
plugins.push(new HtmlWebpackPlugin({ template: '!html-loader!./src/index.html' }));

/**
 * Merge `common` with additional options that are specific to the development environment and
 * export the resulting object.
 */
module.exports = merge(common, {
	mode: 'development',
	devServer: {
		contentBase: './src',
	},
	devtool: 'eval-source-map',
});