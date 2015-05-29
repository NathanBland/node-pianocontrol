var express = require("express");
var ip = require("ip");
exports.setup = function() {
    var router = express.Router();
	router.get('/', function(req,res,next){
		var myIp = ip.address();
		console.log(myIp);
		res.render('index', {
			title: "Pianobar Control",
			ip: myIp
		});
	});
	return router;
}