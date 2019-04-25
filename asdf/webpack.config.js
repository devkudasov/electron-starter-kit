const path = require('path');
const Html = require('html-webpack-plugin');

const htmlOptions = {
    title: 'Electron Starter Kit'
}

const generalConfig = {
    node: {
        __dirname: true
    },
    mode: process.env.ENV || 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    }
}

const mainProcessConfig = {
    target: 'electron-main',
    entry: { main: './src/main.ts' },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    }
}

const renderProcessConfig = {
    target: 'electron-renderer',
    entry: {
      ui: './src/ui/app.ts',
    },
    output: {
      path: path.resolve(__dirname, 'public', 'ui'),
      filename: 'bundle.js'
    },
    plugins: [
        new Html(htmlOptions)
    ]
}

module.exports = [
    Object.assign({}, generalConfig, mainProcessConfig),
    Object.assign({}, generalConfig, renderProcessConfig)
];