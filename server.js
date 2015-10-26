var express = require('express');
var app = express();
var port = process.env.port || 1337;
var server = app.listen(port);
var io = require('socket.io')(server);
var Bee = require('./controllers/bee.js').bee;

// sockets handler
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecte !');

    // send a bees list through the socket as JSONArray
    socket.on('askBeesList', function () {
      Bee.sendAllBees(socket);
    });

    // receive a bee from a client as JSONObject
    socket.on('sendBee', function (beeJSON) {
      var bee = new Bee(beeJSON.user, beeJSON.location, beeJSON.time,
        beeJSON.content, beeJSON.up, beeJSON.down);
      bee.persist();
    });
});
