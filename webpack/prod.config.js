var path = require("path");
var webpack = require("webpack");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: "source-map",
    context: path.resolve(__dirname, "../"),
    entry: {
        main: ["./src/client.js"]
    },
    output: {
        path: path.resolve(__dirname, "../build"),
        publicPath: "/public/",
        filename: "[name].[hash].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel"
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, "../src"),
                loader: ExtractTextPlugin.extract("style", "css?sourceMap!autoprefixer?browsers=last 2 version!sass?sourceMap")
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                BROWSER: JSON.stringify(true)
            }
        }),
        new StatsWriterPlugin({
            filename: "stats.json",
            transform: function(data){
                var js = [];
                var css = [];

                data.assetsByChunkName.main.forEach(function(file){
                    if (/\.js$/.test(file)) {
                        js.push("/public/" + file);
                    }else if(/\.css$/.test(file)){
                        css.push("/public/" + file);
                    }
                });
                return JSON.stringify({
                    js: js,
                    css: css
                });
            }
        })
    ]
};
