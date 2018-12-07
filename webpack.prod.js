/**
 * This file defines webpack configuration options that are used in production. It extends
 * configuration options defined in the webpack.common.js file.
 */
/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * Destructuring assignment syntax is used here to extract `cssLoaders` and `htmlLoaders` from the
 * object returned by `require`, all remaining configuration options are included in `common`.
 */
const { cssLoaders, htmlLoaders, ...common } = require('./webpack.common.js');

// Get the `plugins` array from `common`. This doesn't change the contents of `common`.
const { plugins } = common;

// Add the "mini-css-extract-plugin" loader to the beginning of the `cssLoaders` array.
cssLoaders.unshift(MiniCssExtractPlugin.loader);

// Add "extract-loader" and "html-loader" to the end of the `htmlLoaders` array.
htmlLoaders.push('extract-loader', {
	loader: 'html-loader',
	options: { minimize: true },
});

// Add the following plugins.
plugins.push(
	// Generates a minimized version of index.html.
	new HtmlWebpackPlugin({ template: '!html-loader?minimize=true!./src/index.html' }),
	// Extracts all CSS into a seperate file.
	new MiniCssExtractPlugin({ filename: 'bundle-[contenthash].css' }),
	// Compresses all generated files.
	new CompressionPlugin({ filename: '[path]' }),
);

/**
 * Merge `common` with additional options that are specific to the production environment and
 * export the resulting object.
 */
module.exports = merge(common, {
	mode: 'production',
	optimization: {
		minimizer: [
			// Plugin to minimize CSS code.
			new OptimizeCSSAssetsPlugin(),
			// Plugin to minimize Javascript code.
			new TerserPlugin(),
		],
	},
});