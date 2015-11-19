var path = require("path");
var webpack = require("webpack");

// Dev server host and port
const host = process.env.HOST || "0.0.0.0";
const port = (process.env.PORT + 1) || 3001;

module.exports = {
    devtool: "source-map",
    context: path.resolve(__dirname, "../"),
    entry: {
        main: [
            "webpack-dev-server/client?http://" + host + ":" + port,
            "webpack/hot/only-dev-server",
            "./src/client.js"
        ]
    },
    output: {
        path: path.resolve(__dirname, "../build"),
        publicPath: "http://" + host + ":" + port + "/public/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "../src"),
                loader: "react-hot!babel?cacheDirectory"
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, "../src"),
                loader: "style!css?sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true"
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
                BROWSER: JSON.stringify(true)
            }
        }),
        new webpack.NoErrorsPlugin()
    ],
    devServer: {
        host: host,
        port: port
    }
};
