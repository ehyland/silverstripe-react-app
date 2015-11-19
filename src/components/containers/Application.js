import React, {Component} from 'react';
import {connectToStores, provideContext} from 'fluxible-addons-react';
import {handleHistory} from 'fluxible-router';

if (process.env.BROWSER === true) {
    require("../../styles/main.scss");
}

@provideContext
@handleHistory({enableScroll: false})
@connectToStores(['RouteStore', 'PageStore', 'ApplicationStore'], (context) => ({
    pages: context.getStore('PageStore').getPages().toList().toJS(),
    siteConfig: context.getStore('ApplicationStore').getSiteConfig().toJS(),
    currentPageURL: context.getStore('PageStore').getCurrentPageURL()
}))
class Application extends Component {

    static contextTypes = {
        getStore: React.PropTypes.func,
        executeAction: React.PropTypes.func
    };

    render() {
        var Handler = this.props.currentRoute.get('handler');
        //render content
        return (
            <Handler {...this.props} />
        );
    }
}

export default Application;
