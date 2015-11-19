import React, {Component, PropTypes} from "react";
import PageStore from '../../stores/PageStore';
import Header from '../includes/Header';

// Page templates
const pageComponents = {
    'ErrorPage': require('../pages/ErrorPage'),
    'LoadingPage': require('../pages/LoadingPage'),

    'Page': require('../pages/Page'),
    'HomePage': require('../pages/HomePage')
}

class CMSPage extends Component {

    static contextTypes = {
        getStore: React.PropTypes.func
    };

    getComponentForPage(page){
        if (pageComponents.hasOwnProperty(page.ReactComponent)) {
            return pageComponents[page.ReactComponent];
        }else{
            return pageComponents.Page;
        }
    }

    render() {
        let page = this.context.getStore(PageStore).getCurrentPage().toJS();
        let PageComponent = this.getComponentForPage(page);

        let className = `CMSPage--${page.ReactComponent.substring(0, 1).toLowerCase() + page.ReactComponent.substring(1)}`;

        return (
            <div className={className}>
                <Header {...this.props} />
                <PageComponent page={page} {...this.props} />
            </div>
        );
    }
}

export default CMSPage;
