var express = require('express');
var app = express();
var port = process.env.port || 1337;
var server = app.listen(port);
var io = require('socket.io')(server);


io.sockets.on('connection', function (socket) {
    console.log('Un client est connecte !');
    socket.on('askBeesList', function (data) {
        console.log("send bees");
        var beesList = [];
        for(var i=0; i<10; i++) {
          beesList.push({
            user: "Pierre",
            location: "Perpignan",
            time: "10H23",
            content: "Mon rêve le plus fou, c'est chez afflelou!",
            up: 10,
            down: 20
          });
        }
        socket.emit('beesList', beesList);
    });
});
