const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const argv = require('yargs').argv;
const paths = require('./build/paths');


let isProduction = process.env.NODE_ENV === 'production';
if (argv.production) {
    isProduction = true;
}

const entrypoints = {
        'rh-js': __dirname + '/' + paths.jsEntry,
        'rh-css': __dirname + '/' + paths.sassEntry,
        'rh-css-print-l': __dirname + '/' + paths.sassEntryPrintLandscape,
        'rh-css-print-p': __dirname + '/' + paths.sassEntryPrintPortrait,
};


const specificEntryPoints = fs.readdirSync('rijkshuisstijl/sass/components', {withFileTypes: true})  // Read files and directories in components.
    .filter((fileOrDirectory) => fileOrDirectory.isDirectory())  // Keep only directories.
    .map((directory) => fs.readdirSync('rijkshuisstijl/sass/components/'+directory.name)  // Read component directories.
        .filter((file)=>!file.match(/^_/))  // Excludes files starting with "_" (_all.scss or files for internal use).
        .map((componentFile) => ({  // Turn into to webpack entry.
            [`rh-${directory.name}-${componentFile.replace('.scss', '')}`]: path.resolve(`rijkshuisstijl/sass/components/${directory.name}/${componentFile}`)
        }))
    )
    .reduce((acc,value)=>{return [...acc, ...value]}, [])  // Turn array of array objects into array of objects.
    .reduce((acc, value) => {acc[Object.keys(value)[0]] = Object.values(value)[0]; return acc;}, {})  // Turn array ob objects into object.

Object.assign(entrypoints, specificEntryPoints);


/**
 * Webpack configuration
 * Run using "webpack" or "gulp build"
 */
module.exports = {
    // Path to the js entry point (source).
    entry: entrypoints,

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
    devtool: argv.sourcemap ? 'source-map' : false,
};
