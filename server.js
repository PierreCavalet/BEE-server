var express = require('express');
var app = express();
var port = process.env.port || 1337;
var server = app.listen(port);
var io = require('socket.io')(server);
var Bee = require("./controllers/bee.js").bee;


io.sockets.on('connection', function (socket) {
    console.log('Un client est connecte !');

    // send a bees list on demand
    socket.on('askBeesList', function (data) {
        console.log("send bees");
        var beesList = [];
        for(var i=0; i<10; i++) {
          var bee = new Bee("Pierre", "location", "10H23",
           "Mon rêve le plus fou, c'est chez afflelou!", 10, 20);
          beesList.push(bee.toJSON());
        }
        socket.emit('beesList', beesList);
    });

});
