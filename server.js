var express = require('express');
var app = express();
var port = process.env.port || 1337;
var server = app.listen(port);
var io = require('socket.io')(server);
var Bee = require('./controllers/bee.js').bee;
var User = require('./controllers/user.js').user;
var db = require("./controllers/db.js").db;

// sockets handler
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecte !');
    // the user is not connected
    socket.user = 0;

    // send a bees list through the socket as JSONArray
    socket.on('askBeesList', function () {
      Bee.sendAllBees(socket, db);
    });

    // send comments of a bee through the socket as JSONArray
    socket.on('askBeeComments', function (beeID) {
      Comment.sendComments(beeID, socket, db);
    });

    // receive a bee as JSONObject to create a bee
    socket.on('sendBee', function (beeJSON) {
      var bee = new Bee(0, beeJSON.user, beeJSON.location, beeJSON.time,
        beeJSON.content, beeJSON.up, beeJSON.down);
      bee.persist(db);
    });

    // receive a user as a JSONObject to create a user
    socket.on('signUp', function (userJSON) {
      var user = new User(userJSON.account, userJSON.password);
      user.persist(db, socket);
    });

    // receive a user as a JSONObject to sign in a user
    socket.on('signIn', function (userJSON) {
      User.signIn(userJSON, socket, db);
    });

    // receive a event to sign out the user
    socket.on('signOut', function () {
      socket.user = 0;
    });
});
