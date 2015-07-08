var express = require("express");
var spawn = require('child_process').spawn;
var pianobar = '';//spawn('pianoctl');
var config = require("../config");
var time = require('time');
var YouTube = require('youtube-node');

exports.setup = function(app, io) {
	var router = express.Router();
	router.get('/pause', function(req,res,next){
		pianobar.stdin.write("S\n");
		return res.json({
			status: 200
		});
	});
	router.get('/station/:id', function(req,res,next){
		if (!req.params.id) {
			return res.json({
				status: 500
			});
		}
		console.log(req.params.id);
		io.currentStation = io.stations[req.params.id];
		pianobar.stdin.write("s"+parseInt(req.params.id)+"\n"); //may not need new line char.
		return res.redirect('/');

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
			if (pianobar) {
				pianobar.stdin.write("q");
				pianobar = ''
			}
		} else {
				pianobar = spawn('pianoctl');
				io.emit('usergetstations', io.stations);
		}
		return res.json({
			status: 200
		});
	});
	function getYouTube(song){
		var youTube = new YouTube();
		youTube.setKey(config.youtube);
		youTube.search(song.title, 1, function(err, result){
			if (err){
				console.warn(err);
				return res.json({
					status: 500
				});
			}
			else {
				var vidLink = 'https://youtube.com/watch?v='+result.items[0].id.videoId;
				return io.emit('songend',{
					"status": 200,
					"song": song,
					"link": vidLink,
					"title": result.items[0].snippet.title
				});
			}
		});
	}
	router.get('/watch', function(req,res,next){
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
			console.log(io.stations);
			io.emit('usergetstations', io.stations);
		}
		if (params.type === 'stationfetchplaylist') {
			io.currentStation = {name: params.stationName};
			io.emit('stationchange', io.currentStation);
		}
		if (params.type === 'songfinish') {
			var song = {artist: params.artist, album: params.album,
				 	title: params.title, duration: params.songDuration,
					rating: params.rating, coverArt: params.coverArt,
					endTime: time.time()};
			if (!io.songs) {
				io.songs = [song];
			} else {
				io.songs.push(song);
			}
			return getYouTube(song);
		}
		if (params.type ==='songstart'){

			io.song = {artist: params.artist, album: params.album,
				 	title: params.title, duration: params.songDuration,
					rating: params.rating, coverArt: params.coverArt,
					startTime: time.time(), currentTime: time.time()};
			io.emit('songstart', io.song);
		}
		if (params.type == 'songlove'){
			console.log("Do something with this later.");
		}
		return res.json({
			status: 200
		});
	});
 return router;
};
