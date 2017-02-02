var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require("copy-webpack-plugin");
var FaviconsWebpackPlugin = require("favicons-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var path = require("path");

var extensions = {
    fonts: '{css,eot,svg,ttf,woff,woff2,gif,png,jpg,jpeg}',
    images: '{png,jpg,jpeg,gif,webp,svg}',
    templates: 'html'
};

module.exports = function () {

    const isDevServer = !!process.argv.find((v) => v.indexOf('webpack-dev-server') !== -1);
    console.log("Running From DevServer: ", isDevServer);

    function copyAssets(assetType, allowedExtensions) {
        var src = './src/main/static/';
        return {
            context: src + assetType,
            from: '**/*.' + allowedExtensions,
            to: 'static/' + assetType
        };
    }

    function injectAssetsIntoLayoutTag() {
        var tagsFolder = path.resolve(__dirname, "src/main/webapp/WEB-INF/tags");
        return {
            alwaysWriteToDisk: isDevServer,
            template: tagsFolder + '/layout.template.tag',
            filename: tagsFolder + '/layout.tag',
            hash: true
        }
    }

    return {
        entry: './src/main/static/typescript/app.ts',
        output: {
            path: path.resolve(__dirname, "src/main/webapp"),
            publicPath: '/',
            filename: 'static/javascript/bundle.js'
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {test: /\.ts$/, enforce: 'pre', loader: "tslint"},
                {test: /\.less$/, loader: "style!css!less"},
                {test: /\.ts$/, loaders: ['ng-annotate', 'ts-loader']},
                {test: /\.tag$/, loader: "raw"},
                {test: /\.woff/, loader: "file"},
                {test: /\.woff2/, loader: "file"},
                {test: /\.ttf$/, loader: "file"},
                {test: /\.eot$/, loader: "file"},
                {test: /\.svg$/, loader: "file"}
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
            new CleanWebpackPlugin(['./src/main/webapp/static']),
            new CopyWebpackPlugin([
                copyAssets('fonts', extensions.fonts),
                copyAssets('images', extensions.images),
                copyAssets('templates', extensions.templates)
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
    }
};