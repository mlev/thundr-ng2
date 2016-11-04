// TODO:
// 1. Clean
// 3. Tests
// 4. Bootstrap

var CopyWebpackPlugin = require("copy-webpack-plugin");
var FaviconsWebpackPlugin = require("favicons-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var path = require("path");
var _ = require("lodash");

var extensions = {
    fonts: '{css,eot,svg,ttf,woff,woff2,gif,png,jpg,jpeg}',
    images: '{png,jpg,jpeg,gif,webp,svg}',
    templates: '{html}'
};

function copyAssets(assetType, allowedExtensions) {
    var src = 'src/main/static/';
    return {
        context: src + assetType,
        from: '**/*.' + allowedExtensions,
        to: 'static/' + assetType
    };
}

function injectAssetsIntoLayoutTag() {
    // Use different template delimiters to prevent conflict with JSP tag
    _.templateSettings.interpolate = /{{=([\s\S]+?)}}/g;
    _.templateSettings.escape = /{{-([\s\S]+?)}}/g;
    _.templateSettings.evaluate = /{{([\s\S]+?)}}/g;

    return {
        alwaysWriteToDisk: true,
        template: 'src/main/webapp/WEB-INF/tags/layout.template.tag',
        filename: 'WEB-INF/tags/layout.tag',
        hash: true
    }
}

module.exports = {
    entry: './src/main/static/typescript/app.ts',
    output: {
        path: path.resolve(__dirname, "src/main/webapp"),
        publicPath: '/',
        filename: 'static/javascript/bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {test: /\.ts$/, enforce: 'pre', loader: "tslint"},
            {test: /\.less$/, loader: "style!css!less"},
            {test: /\.ts$/, loaders: ['ng-annotate', 'ts-loader']}
        ]
    },
    devServer: {
        contentBase: './src/main/webapp',
        proxy: {
            '!/static/**': {
                target: 'http://localhost:8081',
                secure: false
            }
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            copyAssets('fonts', extensions.fonts),
            copyAssets('images', extensions.images),
            copyAssets('templates', extensions.templates),

        ]),
        new FaviconsWebpackPlugin({
            logo: './src/main/static/images/favicon/original.png',
            prefix: 'static/images/favicon/',
            icons: {
                android: false,
                appleIcon: true,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: false,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: true
            }
        }),
        new HtmlWebpackPlugin(injectAssetsIntoLayoutTag()),
        new HtmlWebpackHarddiskPlugin()
    ]
};