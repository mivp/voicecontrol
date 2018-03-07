'use strict';

var http      = require('http');
var socketio  = require('socket.io');
var express   = require('express');
var bodyParser = require('body-parser');
var path      = require('path');
var fs        = require('fs');
var config    = require('./src/node-config').config;

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
