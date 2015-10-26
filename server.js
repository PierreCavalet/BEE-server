var express = require('express');
var app = express();
var port = process.env.port || 1337;
var server = app.listen(port);
var io = require('socket.io')(server);
var db = require('./controllers/db.js').db;


io.sockets.on('connection', function (socket) {
    console.log('Un client est connecte !');

    // send a bees list on demand
    socket.on('askBeesList', function (data) {
      db.getAllBees(socket);
    });
});
