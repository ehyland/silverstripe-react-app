/**
 * Merges common config with enviroment specific config
 */

import merge from "lodash.merge";
import commonConfig from "./configs/common.config";

// Get env config file name
let envConfigFile = (process.env.NODE_ENV === "development") ?
    "dev.config" : "prod.config";

// Merge in env config
let config = merge(
    require("./configs/common.config"),
    require("./configs/" + envConfigFile)
);

console.log(config);

export default config;
