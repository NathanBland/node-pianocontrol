
var express = require('express');
exports.setup = function(app) {
    var router = express.Router();
    var api = require('./api');
    var routes = require('./routes');
    router.use(api.setup(app));
    router.use(routes.setup(app));
    return router;
};