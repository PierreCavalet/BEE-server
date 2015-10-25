var express = require('express');
var app = express();
var port = process.env.port || 1337;
var server = app.listen(port);
var io = require('socket.io')(server);

setInterval(function () {
    io.sockets.emit('message', "test");
}, 3000);

io.sockets.on('connection', function (socket) {
    console.log('Un client est connecte !');
    socket.on('test', function (data) {
        console.log("test: " + data);
    });
});
