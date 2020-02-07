var paths = require('./build/paths');
var argv = require('yargs').argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


var isProduction = process.env.NODE_ENV === 'production';
if (argv.production) {
    isProduction = true;
}

/**
 * Webpack configuration
 * Run using "webpack" or "gulp build"
 */
module.exports = {
    // Path to the js entry point (source).
    entry: {
        rijkshuisstijl: __dirname + '/' + paths.jsEntry,
        compat: __dirname + '/' + paths.compatEntry,
    },

    // Path to the bundles.
    output: {
        path: __dirname + '/' + paths.jsDir, // directory
        filename: '[name].js', // file
        chunkFilename: '[name].bundle.js',
        publicPath: '/static/rijkshuisstijl/bundles/',
    },

    // Use --production to optimize output.
    mode: isProduction ? 'production' : 'development',

    // Add babel (see .babelrc for settings)
    plugins: [
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                test: /.js?$/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {url: false},},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader', options: {sassOptions: {style: 'compressed'}, sourceMap: argv.sourcemap},},
                ],
            },
        ]
    },

    // Use --sourcemap to generate sourcemap.
    devtool: argv.sourcemap ? 'sourcemap' : false,
}
