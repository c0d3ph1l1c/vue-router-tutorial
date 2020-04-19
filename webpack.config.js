const path = require('path');
const sections = require('./sections.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[contentHash].js',
        chunkFilename: 'chunk/[name]-[contentHash].js'
    },
    devServer: {
        index: 'index.html'
    },
    plugins: [],
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
};

sections.forEach(section => {
    module.exports.entry[section] = `./src/js/${section}.js`;
    module.exports.plugins.push(new HTMLWebpackPlugin({
        filename: `${section}.html`,
        template: `./src/${section}.html`,
        chunks: [section]
    }));
});