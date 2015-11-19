import { get } from "../utils/CMSUtils";

// Fetchr service to load a page given an id.

export default {
    name: "cms",

    read(req, resource, {url = '/', getSiteData = false}, config, callback) {
        let query = {pageURL: url};
        if (getSiteData) {
            get('/data', query, callback);
        }else{
            get('/', query, callback);
        }
    }

};
