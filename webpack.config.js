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
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx"]
    },
	module: {
		rules: [
			// {
			// 	enforce: 'pre',
			// 	test: /\.jsx?$/,
			// 	loaders: ['eslint-loader'],
			// 	include: path.resolve(__dirname, 'src'),
			// 	exclude: /(node_modules|build)/,
			// },
			// {
			// 	test: /\.jsx?$/,
			// 	include: path.resolve(__dirname, 'src'),
			// 	exclude: /(node_modules|build)/,
			// 	use: {
			// 		loader: 'babel-loader',
			// 		options: {
			// 			presets: ['env'],
			// 		},
			// 	},
            // },
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
				exclude: /(node_modules|build)/,
				use: {
					loader: 'ts-loader',
				},
			},
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader'],
				exclude: /node_modules/,
			},
		],
	},
	externals: {
		react: 'commonjs react',
		'react-dom': 'commonjs react-dom',
	},
};