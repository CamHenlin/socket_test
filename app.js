var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var url= require('url');
var fs = require('fs');

// Http handler function
app.use(express.static(__dirname + '/public'));

// Web Socket Connection
io.on('connection', function (socket) {
	console.log('connect');
	// If we recieved a command from a client to start watering lets do so
	socket.on('ping', function(data) {
		console.log("ping");

		delay = data["duration"];

		// Set a timer for when we should stop watering
		setTimeout(function(){
				socket.emit("pong");
		}, delay*1000);

	});

});

server.listen(5000, function () {
 	console.log('Express server listening on port %d in %s mode', 5000, app.get('env'));
});