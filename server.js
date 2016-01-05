var express = require('express');
var app = express();
var port = process.env.port || 1337;
var server = app.listen(port);
var io = require('socket.io')(server);
var Bee = require('./controllers/bee.js').bee;
var User = require('./controllers/user.js').user;
var db = require("./controllers/db.js").db;
var Comment = require("./controllers/comment.js").comment;

// sockets handler
io.sockets.on('connection', function (socket) {

    console.log('Un client est connecte !');
    // the user is not connected
    socket.user = 0;

    // register the user token to enable push notifications
    socket.on('enableNotifications', function (token) {
        console.log('new token : ' + token);
        db.registerToken(token);
    });

    // send a bees list through the socket as JSONArray
    socket.on('askBeesList', function () {
        Bee.sendAllBees(socket, db);
    });

    // send comments of a bee through the socket as JSONArray
    socket.on('askBeeComments', function (beeID) {
        Comment.sendComments(beeID, socket, db);
    });

    // receive a like as JSONObject
    socket.on('rateBee', function(likeJSON) {
        if(socket.user != 0) {
            db.rateBee(socket.user.id, likeJSON.bee_id, likeJSON.rate);
        }
    });

    // receive a bee as JSONObject to create a bee
    socket.on('sendBee', function (beeJSON) {
        var bee = new Bee(0, beeJSON.user, beeJSON.location, beeJSON.time,
        beeJSON.content, 0);
        bee.persist(db, io.sockets);
    });

    // receive a comment as JSONObject to create a comment
    socket.on('sendComments', function(commentJSON) {
        if(socket.user != 0) {
            var comment = new Comment(commentJSON.content, socket.user.id, commentJSON.idbee);
            comment.persist(db);
        }
    })

    // receive a user as a JSONObject to create a user
    socket.on('signUp', function (userJSON) {
        var user = new User(0, userJSON.account, userJSON.password);
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
