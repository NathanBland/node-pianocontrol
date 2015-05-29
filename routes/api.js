var express = require("express");
var spawn = require('child_process').spawn;
var pianobar = spawn('pianoctl');
var server = require('http').Server(express());
var io = require('socket.io')(server);

exports.setup = function() {
	var users = 0;
	io.on('connection', function(socket) {
	    users += 1;
	    console.log("client connected");
	    socket.broadcast.emit('news', {
	        user: 'connected: ' + users
	    });
	    socket.on('disconnect', function() {
	        users -= 1;
	        console.log("client disconnected");
	        socket.broadcast.emit('news', {
	            user: 'disconnected'
	        });
	    });
	});
    var router = express.Router();
	router.get('/pause', function(req,res,next){
		pianobar.stdin.write("S\n");
		return res.json({
			status: 200
		});
	});
	router.get('/play', function(req,res,next){
		pianobar.stdin.write("P\n");
		return res.json({
			status: 200
		});
	});
	router.get('/skip', function(req,res,next){
		pianobar.stdin.write("n\n");
		return res.json({
			status: 200
		});
	});
	router.get('/up', function(req,res,next){
		pianobar.stdin.write("+\n");
		return res.json({
			status: 200
		});
	});
	router.get('/down', function(req,res,next){
		pianobar.stdin.write("-\n");
		return res.json({
			status: 200
		});
	});
	router.get('/tired', function(req,res,next){
		pianobar.stdin.write("t\n");
		return res.json({
			status: 200
		});
	});
	router.post('/power', function(req,res,next){
		return res.json({
			status: 200
		});
	});
	
	router.get('/watch', function(req,res,next){
		//console.log(req.query);
		params = req.query;
		console.log('Event! type:', params.type);
		console.log("song:",params.title,"artist:",params.artist);
		if (params.type == 'songlove'){
			console.log("YOU LOVE THAT SONG GOOD");
		}
		//console.log(params);
		/*for (idx in params){
			//console.log(idx,":",params[idx]);
			if (idx.toString().indexOf("station") > -1){
				//console.log(params[idx]);
				stationList[idx] = params[idx];
			}
		}*/
		return res.json({
			status: 200
		});
	});
 return router;
};