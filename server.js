var express = require('express');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
//var spawn = require('child_process').spawn;
//var pianobar = spawn('pianoctl');
var routes = require('./routes/');
var app = require('express')();
var server = require('http').Server(express());
var io = require('socket.io')(server);

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
app.use(routes.setup(app));

//start the server up.


var server = app.listen(app.get('port'), app.get('ip'), function(){
	var addr = server.address();
	console.log("web control running at http://%s:%s",
			addr.address, addr.port);
})