var express = require("express");
var spawn = require('child_process').spawn;
var pianobar = '';//spawn('pianoctl');

exports.setup = function(app, io) {
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
	router.get('/power/:action', function(req,res,next){
		console.log(req.params.action);
		if (req.params.action == 'off'){
			pianobar.stdin.write("q\n");
		} else {
			pianobar = spawn('pianoctl');
		}
		return res.json({
			status: 200
		});
	});
	router.get('/watch', function(req,res,next){
		//console.log(req.query);
		params = req.query; //TODO: rename all this to event.
		console.log('Event! type:', params.type);

		if (params.type === 'usergetstations') {
			io.stations = {};
			for(var index in params) {
		   if (params.hasOwnProperty(index)) {
				//console.log(index.indexOf("station"));
				if (index.indexOf("station") > -1){
					var attr = index.match(/(station)(\d+)/);
					if (attr != null){
						io.stations[attr[2]] = {id:attr[2],name: params[index]};
					}
				}
		   }
			}
			io.emit('usergetstations', io.stations);
		}
		if (params.type ==='songstart'){

			io.song = {artist: params.artist, album: params.album,
				 	title: params.title, duration: params.songDuration,
					rating: params.rating, coverArt: params.coverArt};
			io.emit('songstart', io.song);
		}
		//console.log('event params:', params);
		/*for(var index in params) {
		   if (params.hasOwnProperty(index)) {
				//console.log(index.indexOf("station"));
				if (index.indexOf("station") > -1){
					var attr = params[index];
					console.log(index+' is: '+attr);
				}
		   }
		}*/
		//console.log("song:",params.title,"artist:",params.artist);
		if (params.type == 'songlove'){
			console.log("Do something with this later.");
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
