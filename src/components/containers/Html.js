import React, {Component, PropTypes} from "react";
import path from "path";

let scripts = [];
let css = [];

if (process.env.NODE_ENV === "production") {
    const stats = require("../../../build/stats.json");
    scripts = stats.js;
    css = stats.css;
}
else {
    const config = require("../../../webpack/dev.config");
    scripts.push(`${config.output.publicPath}${config.output.filename}`);
}

class Html extends Component {
    render() {
        return (
            <html lang="en">
                <head>
                    <meta charSet="UTF-8"/>
                    <title>Document</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {css.map((file, key) => <link key={key} rel="stylesheet" href={file}/>)}
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                    <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                    {scripts.map((file, key) => <script key={key} src={file}></script>)}
                </body>
            </html>
        );
    }
}

export default Html;
