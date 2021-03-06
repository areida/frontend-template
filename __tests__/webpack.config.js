var Webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpack       = require('html-webpack-plugin');
var WebpackError      = require('webpack-error-notification');

var environment = 'development';
var config      = {
    entry   : [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:9001',
        './tests.js'
    ],
    plugins : [
        new ExtractTextPlugin('app.css'),
        new HtmlWebpack({template : './index.html'}),
        new Webpack.DefinePlugin({
            __BACKEND__     : process.env.BACKEND,
            __ENVIRONMENT__ : '\''+environment+'\''
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new WebpackError(process.platform)
    ],
    reactLoaders : ['react-hot', 'jsx?insertPragma=React.DOM'],
    sassOptions  : (
        '?outputStyle=' + (environment === 'production' ? 'compressed' : 'nested') +
        '&includePaths[]=' + __dirname + '/node_modules'
    )
};

module.exports = {
    name   : 'test bundle',
    entry  : config.entry,
    output : {
        filename : 'tests.js',
        path     : __dirname + '/build'
    },
    module : {
        preLoaders : [
            {
                test    : /\.js?/,
                loader  : 'jshint-loader',
                exclude : /node_modules/
            },
            {
                test    : /\.jsx?/,
                loader  : 'jsxhint-loader',
                exclude : /node_modules/
            }
        ],
        loaders : [
            {
                test   : /\.(ico|jpg|png)$/,
                loader : 'file-loader',
                query  : {name : '[path][name].[ext]'}
            },
            {
                test   : /(favicon|mocha|sinon)\.js$/,
                loader : 'file-loader',
                query  : {name : '[name].js'}
            },
            {
                test    : /\.jsx$/,
                loaders : config.reactLoaders,
                exclude : /node_modules/
            },
            {
                test   : /\.json$/,
                loader : 'json-loader'
            },
            {
                test   : /\.css$/,
                loader : 'style!css'
            },
            {
                test   : /\.scss$/,
                loader : ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!sass-loader' + config.sassOptions
                )
            }
        ]
    },
    plugins : config.plugins,
    resolve : {
        extensions : ['', '.css', '.js', '.json', '.jsx', '.scss', '.webpack.js', '.web.js']
    },
    devtool : '#inline-source-map',
};
