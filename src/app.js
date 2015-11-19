import React from 'react';
import Fluxible from 'fluxible';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import Application from './components/containers/Application';
import RouteStore from './stores/RouteStore';
import PageStore from './stores/PageStore';
import ApplicationStore from './stores/ApplicationStore';

let app = new Fluxible({
    component: Application,
    stores: [
        RouteStore,
        PageStore,
        ApplicationStore
    ]
});

app.plug(fetchrPlugin({xhrPath: '/api'}));

export default app;
