var express = require('express');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
//var spawn = require('child_process').spawn;
var http = require('http');
var time = require('time');



var app = require('express')();
var io = require('socket.io')();
app.io = io;
var routes = require('./routes/');

var users = 0;
//maybe do socket events here?
io.song = {};
io.stations = {};
io.currentStation = {};
io.on('connection', function(socket) {
    users += 1;
    console.log("client connected");
    socket.broadcast.emit('news', {
        user: 'connected: ' + users
    });
    io.song.currentTime = time.time();
    socket.emit('usergetstations', io.stations);
    socket.emit('songstart', io.song);
    socket.emit('stationchange', io.currentStation);
    socket.emit('songhistory', io.songs);
    socket.on('disconnect', function() {
        users -= 1;
        console.log("client disconnected");
        socket.broadcast.emit('news', {
            user: 'disconnected'
        });
    });
});

//use nunjucks because awesome.
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});

// basic app config.
app.set('port', process.env.PORT || 1337);
app.set('ip', process.env.IP || '0.0.0.0');

//static folder for things like css
app.use(express.static('public'));

//make user input safe
app.use(bodyParser.json({
    type: '*/json'
}));
app.use(bodyParser.urlencoded({ //parse submitted data using bodyParser
    extended: false
}));

//routes
app.use(routes.setup(app, io));

//start the server up.
var server = http.createServer(app).listen('1337');

io.attach(server);
