import {BaseStore} from 'fluxible/addons';
import immutable from 'immutable';
import actions from '../configs/actions';

class PageStore extends BaseStore {
    static storeName = 'PageStore';
    static handlers = {
        [actions.LOAD_SITE_DATA_SUCCESS]: 'handleReceiveSiteData',
        [actions.LOAD_PAGE_SUCCESS]: 'handleReceivePage',
        [actions.NAVIGATE_START]: 'handleUpdatePageURL'
    };

    constructor (dispatcher) {
        super(dispatcher);
        this.pages = immutable.Map({});
        this.currentPageURL = '/';
    }

    handleUpdatePageURL ({url}) {
        this.currentPageURL = this.parseURL(url);
        this.emitChange();
    }

    handleReceiveSiteData ({siteData}) {
        siteData.pages
            .filter(page => !this.pages.has(page.URL))
            .forEach(page => {
                this.pages = this.pages.set(
                    page.URL,
                    immutable.Map(page)
                )
            });

        this.emitChange();
    }

    handleReceivePage ({page, searchedURL}) {
        let url = page.URL || this.parseURL(searchedURL);
        this.pages = this.pages.set(url, immutable.Map(page).set('HasLoaded', true));
        this.emitChange();
    }

    parseURL (url = '/') {
        // Ensure starts with /
        if(!/^\//.test(url)){
            url = '/' + url;
        }

        // Ensure ends with /
        if(!/\/$/.test(url)){
            url += '/';
        }

        return url;
    }

    getCurrentPage () {
        return this.getPageForURL(this.currentPageURL);
    }

    getPageForURL (url = '/') {
        url = this.parseURL(url);
        let page = null;
        if (this.pages.has(url)) {
            page = this.pages.get(url);
        }else{
            page = immutable.Map({
                'ReactComponent': 'LoadingPage'
            });
        }
        return page;
    }

    getPages () {
        return this.pages;
    }

    getCurrentPageURL () {
        return this.currentPageURL;
    }

    // For sending state to the client
    dehydrate () {
        return {
            pages: this.pages.toJS(),
            currentPageURL: this.currentPageURL,
        };
    }

    // For rehydrating server state
    rehydrate (state) {
        this.pages = immutable.Map(state.pages).map(page => immutable.Map(page));
        this.currentPageURL = state.currentPageURL;
    }
}

export default PageStore;
