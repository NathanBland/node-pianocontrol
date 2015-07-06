
var express = require('express');
exports.setup = function(app, io) {
    var router = express.Router();
    var api = require('./api');
    var routes = require('./routes');
    router.use(api.setup(app, io));
    router.use(routes.setup(app));
    return router;
};
