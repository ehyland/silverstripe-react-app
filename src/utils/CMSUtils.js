import request from "superagent";
import config from "../config";
import debugLib from "debug";

const debug = debugLib("server");

const CMSUtils = {

    get(endpoint, query, done) {
        const url = `${config.cms.api.baseURL}${endpoint}`;
        debug("Sending GET request to %s", url, query);

        request.get(url)
            .query(query)
            .end((err, res) => {
                debug("Received response %s from %s", res && res.status, url);

                if (err) {
                    if (err.status) {
                        // Normalize statusCode vs. status
                        err.statusCode = err.status;
                    }

                    return done(err);
                }

                done(null, res.body);
            });
    }

};

export default CMSUtils;
