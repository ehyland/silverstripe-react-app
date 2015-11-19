/**
 * Server entry point
 */

// If NODE_ENV isn't set to dev, set it as production
process.env.NODE_ENV = (process.env.NODE_ENV === "development") ?
    "development" : "production";

// ES6 & JSX support
require("babel/register");

// Prevent issues with libraries using this var (see http://tinyurl.com/pcockwk)
delete process.env.BROWSER;

// Require the express server
require("./src/server");

// If dev, start webpack dev server
if (process.env.NODE_ENV === "development") {
    require("./webpack/server");
}
