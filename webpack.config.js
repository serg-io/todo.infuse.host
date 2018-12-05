const path = require('path');

module.exports = {
	context: __dirname,
	devServer: {
		contentBase: [path.resolve(__dirname, 'src')],
	},
	entry: './src/TodoApp.js',
	mode: 'development',
	module: {
		rules: [{
			test: /\.html$/,
			use: ['infuse-loader'],
		}],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
};