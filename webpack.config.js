const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const argv = require('yargs').argv;
const paths = require('./build/paths');


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
        'rh-js': __dirname + '/' + paths.jsEntry,
        'rh-css': __dirname + '/' + paths.sassEntry,
        'rh-css-print-l': __dirname + '/' + paths.sassEntryPrintLandscape,
        'rh-css-print-p': __dirname + '/' + paths.sassEntryPrintPortrait,
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

    // Add plugins and loaders (see .babelrc for babel settings).
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
                    {loader: 'css-loader', options: {url: false, sourceMap: argv.sourcemap},},
                    {loader: 'postcss-loader', options: {sourceMap: argv.sourcemap}},
                    {loader: 'sass-loader', options: {sassOptions: {comments: false, style: 'compressed'}, sourceMap: argv.sourcemap},},
                ],
            },
        ]
    },

    // Use --sourcemap to generate sourcemap.
    devtool: argv.sourcemap ? 'sourcemap' : false,
};
