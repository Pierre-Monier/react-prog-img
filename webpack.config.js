const webpack = require('webpack');
const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
		libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: [".ts", ".tsx"]
    },
	module: {
		rules: [
            {
				test: /\.tsx?$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules|build|__tests__)/,
				use: {
					loader: 'ts-loader',
				},
			},
            {
				test: /\.ts?$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules|build|__tests__)/,
				use: {
					loader: 'ts-loader',
				},
			},
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader'],
				exclude: /(node_modules|__tests__)/,
			},
		],
	},
	externals: {
		react: 'commonjs react',
		'react-dom': 'commonjs react-dom',
	},
};