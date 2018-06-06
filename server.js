'use strict';

var http      = require('http');
var socketio  = require('socket.io');
var express   = require('express');
var bodyParser = require('body-parser');
var path      = require('path');
var fs        = require('fs');
var config    = require('./src/node-config').config;
var sys       = require('sys')
var exec      = require('child_process').exec;


// ===== INITIALISATION ======
var app = express();

var server = http.createServer(app);
var io = socketio.listen(server);

app.use(express.static(path.resolve(__dirname, config.public_dir)));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//server.listen(process.env.PORT || config.port, process.env.IP || "0.0.0.0", function(){
server.listen(process.env.PORT || config.port, process.env.IP || "127.0.0.1", function(){
	var addr = server.address();
  	console.log("server listening at", addr.address + ":" + addr.port);
});


// ===== exec ===========

function puts(error, stdout, stderr) { sys.puts(stdout) }
//exec("ls -la", puts); //debug test
var EXECPATH= "/Users/caveop/dev/git/voicecontrol/"

// ===== SOCKET IO ===========
io.on('connection', function (socket) {
	console.log("A client connected!");

	socket.on('disconnect', function(){
    	console.log('user disconnected');
  	});

	socket.on('message', function(data) {
		console.log(data);
		exec(EXECPATH+data.args, puts)
		// run any command here
		if(data.command == 'sayHello') {
			console.log('Run command on server: Hello!');
		}
		else if(data.command == 'runProgram') {
			console.log('Run command on server: run a program!');
		}
	});
});
