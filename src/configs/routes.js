import {loadPageAction} from '../actions/PageActionCreators';
export default {
    // Get from CMS if no match found
    page: {
        path: '/*',
        method: 'get',
        handler: require('../components/containers/CMSPage'),
        label: 'Page',
        action: (context, payload, done) => {
            var url = payload.get('url');
            context.executeAction(loadPageAction, {url: url}, done);
        }
    }
};
