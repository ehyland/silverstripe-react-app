import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import webpackConfig from "./dev.config";

const host = webpackConfig.devServer.host;
const port = webpackConfig.devServer.port;

var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(compiler, {
    contentBase: `http://${host}:${port}/`,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true
    }
});
server.listen(port, host, function() {
    console.log("Webpack development server listening on %s:%s", host, port);
});
