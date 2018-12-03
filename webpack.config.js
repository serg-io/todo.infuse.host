const path = require('path');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
	context: __dirname,
	devServer: {
		contentBase: [dist],
	},
	entry: './js/TodoApp.js',
	mode: 'development',
	module: {
		rules: [{
			test: /\.html$/,
			use: ['infuse-loader'],
		}],
	},
	output: {
		path: dist,
		filename: 'bundle.js',
	},
};