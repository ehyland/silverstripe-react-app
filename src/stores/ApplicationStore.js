import {BaseStore} from 'fluxible/addons';
import immutable from 'immutable';
import actions from '../configs/actions';

class ApplicationStore extends BaseStore {
    static storeName = 'ApplicationStore';
    static handlers = {
        [actions.LOAD_SITE_DATA_SUCCESS]: 'handleReceiveSiteData'
    };

    constructor (dispatcher) {
        super(dispatcher);
        this.siteDataRecieved = false;
        this.siteConfig = immutable.Map({});
    }

    handleReceiveSiteData ({siteData}) {
        this.siteDataRecieved = true;
        this.siteConfig = immutable.Map(siteData.siteConfig);
        this.emitChange();
    }

    getSiteConfig(){
        return this.siteConfig;
    }

    hasRecievedSiteData() {
        return this.siteDataRecieved;
    }

    // For sending state to the client
    dehydrate () {
        return {
            siteDataRecieved: this.siteDataRecieved,
            siteConfig: this.siteConfig.toJS()
        };
    }

    // For rehydrating server state
    rehydrate (state) {
        this.siteDataRecieved = state.siteDataRecieved,
        this.siteConfig = immutable.Map(state.siteConfig);
    }
}

export default ApplicationStore;
