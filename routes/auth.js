var fs = require('fs');
var express = require('express');
module.exports = function(){
    var router = express.Router();
    
    router.post("/setAuth", function(req, res, next){
        var user = req.body;
        var config = "password = %s\n";
        config += "username = %s\n";
        config += "event_command = %s";
        fs.writeFileSync("~/.config/pianobar/config", util.format(config, user.password, user.username, __dirname);
    }

    return router;
}
