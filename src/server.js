import path from "path";
import express from "express";
import favicon from 'serve-favicon';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/server';
import app from './app';
import HtmlComponent from './components/containers/Html';
import {createElementWithContext} from 'fluxible-addons-react';

const debug = debugLib('server');
const server = express();

const faviconDir = path.resolve(__dirname, '../favicon.ico');
const publicDir = path.resolve(__dirname, '../build');

server.use(favicon(faviconDir));
server.use('/public', express.static(publicDir));

const fetchr = app.getPlugin("FetchrPlugin");
fetchr.registerService(require("./services/cms"));

// Use the fetchr middleware (will enable requests from /api)

server.use(fetchr.getXhrPath(), fetchr.getMiddleware());

server.use((req, res, next) => {
    const context = app.createContext();

    debug('Executing navigate action');
    Promise.all([
        // context.executeAction(loadSiteDataWithPageAction, { url: req.url }),
        context.executeAction(navigateAction, { url: req.url })
    ])
    .then(()=>{
        debug('Exposing context state');
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        const html = ReactDOM.renderToStaticMarkup(React.createElement(HtmlComponent, {
            state: exposed,
            markup: ReactDOM.renderToString(createElementWithContext(context)),
            context: context.getComponentContext()
        }));

        debug('Sending markup');
        res.send("<!DOCTYPE html>" + html);
    })
    .catch(err => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }
    });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('Listening on port ' + port)
});
