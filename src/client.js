import React from 'react';
import {render} from 'react-dom';
import debugLib from 'debug';
import app from './app';
import { createElementWithContext } from 'fluxible-addons-react';

const debug = debugLib('client');
const dehydratedState = window.App; // Sent from the server

debug('rehydrating app');
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.debug = debugLib;
    window.context = context;
    const mountNode = document.getElementById('app');

    debug('React Rendering');
    render(createElementWithContext(context), mountNode, () => {
        debug('React Rendered');
    });
});
