import actions from '../configs/actions';
import ApplicationStore from '../stores/ApplicationStore';

export default {

    loadPageAction(context, {url}, done) {

        let getSiteData = !context.getStore(ApplicationStore).hasRecievedSiteData();

        context.service.read('cms', {url: url, getSiteData: getSiteData},
            (err, data) => {
                if (err) {
                    return done(err);
                }

                // Dispatch Page Data
                if (typeof data.page === typeof {}) {
                    context.dispatch(actions.LOAD_PAGE_SUCCESS, {
                        page: data.page,
                        searchedURL: url
                    });
                }

                // Dispatch Site Data
                if (typeof data.siteData === typeof {}) {
                    context.dispatch(actions.LOAD_SITE_DATA_SUCCESS, {
                        siteData: data.siteData
                    });
                }

                done();
            }
        );
    }
}
