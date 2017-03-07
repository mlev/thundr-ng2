const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const path = require("path");
const process = require("process");
const webpack = require("webpack");

const basic = {
    ts: "src/main/typescript",
    assets: "src/main/static",
    webapp: "src/main/webapp",
    dist: "src/main/webapp/static"
};

const extensions = {
    fonts: "{css,eot,svg,ttf,woff,woff2,gif,png,jpg,jpeg}",
    images: "{png,jpg,jpeg,gif,webp,svg}",
    templates: "html"
};

function pathTo (folder) {
    return path.resolve(__dirname, folder);
}

module.exports = () => {

    const isDevServer = !!process.argv.find((v) => v.indexOf('webpack-dev-server') !== -1);
    console.log("Running From DevServer: ", isDevServer);

    function copyAssets (assetType, allowedExtensions) {
        const src = pathTo(basic.assets);
        return {
            context: src + "/" + assetType,
            from: "**/*." + allowedExtensions,
            to: "static/" + assetType
        };
    }

    function injectAssetsIntoLayoutTag () {
        const tagsFolder = pathTo(basic.webapp) + "/WEB-INF/tags";
        return {
            alwaysWriteToDisk: isDevServer,
            template: tagsFolder + "/layout.template.tag",
            filename: tagsFolder + "/layout.tag",
            hash: true
        }
    }

    return {
        entry: pathTo(basic.ts) + "/main.ts",
        output: {
            path: pathTo(basic.webapp),
            publicPath: "/",
            filename: 'static/[name].js',
            chunkFilename: '[name]-[chunkhash].js',
        },
        resolve: {
            extensions: [".ts", ".js"]
        },
        module: {
            rules: [
                {test: /\.ts$/, enforce: "pre", loader: "tslint-loader"},
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        "css-loader?importLoaders=1",
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [require('autoprefixer')];
                                }
                            }
                        },
                        "sass-loader"
                    ]
                },
                {test: /\.ts$/, use: ["ng-annotate-loader", "ts-loader"]},
                {test: /\.tag$/, loader: "raw-loader"},
                {
                    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    loader: "file-loader?name=./static/fonts/[hash].[ext]"
                }
            ]
        },
        devServer: {
            contentBase: basic.webapp,
            proxy: {
                "!/static/**": {
                    target: "http://localhost:8081",
                    secure: false
                }
            }
        },
        plugins: [
            createSeparateVendorChunk(),
            fixWebpackWarningForAngular(),
            new CopyWebpackPlugin([
                copyAssets("fonts", extensions.fonts),
                copyAssets("images", extensions.images),
                copyAssets("templates", extensions.templates)
            ]),
            new FaviconsWebpackPlugin({
                logo: pathTo(basic.assets) + "/images/favicon/original.png",
                prefix: "static/images/favicon/",
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
            // Disable for now as slows down build a lot - need to add just for prod
            // new webpack.optimize.UglifyJsPlugin()
        ]
    }
};

function fixWebpackWarningForAngular() {
    // For https://github.com/angular/angular/issues/11580
    return new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        path.resolve(__dirname, 'doesnotexist/')
    );
}

function createSeparateVendorChunk() {
    return new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: ({resource}) => /node_modules/.test(resource),
    });
}
