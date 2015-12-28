var mysql = require("mysql");
var gcm = require('node-gcm');
var config = require("../config.json");
var Bee = require("./bee.js").bee;
var User = require("./user.js").user;
var Comment = require("./comment.js").comment;

module.exports.db = new Db();

function Db() {
	// connection to the database
	var db = mysql.createConnection({
    	host: "localhost",
    	user: config.database_user,
    	password: config.database_password,
    	database: "bestexcuseever"
	});

	//////////////////////////////////////
	// BEE MANAGEMENT
	/////////////////////////////////////

	// send all the bees in the database through the socket as a JSONArray
	this.sendAllBees = function(socket) {
    	var query = "SELECT * FROM bee";
    	// execute query
    	db.query(query, function select(error, results, fields) {
    		if (error) {
    		    console.log(error);
    			return;
    		}

    		// put each bee in a JSON array
    		var beesJSONArray = [];
    		for (var i = 0; i < results.length; i++) {
            	var bee = new Bee(results[i]['ID'], results[i]['user'],
                    results[i]['location'],results[i]['time'],
                    results[i]['content'], results[i]['up'],
                    results[i]['down']);
            	beesJSONArray.push(bee.toJSON());
    		}

    		// send bees as JSON array
    		socket.emit('beesList', beesJSONArray);
    	});
	}

	// add a bee in the database
	this.addBee = function(bee, sockets) {
    	var query = "INSERT INTO bee(user, location, time, content, up, down) "
    				+ "VALUES('" + bee.user + "', '" + bee.location + "', '"
    							+ bee.time + "', '" + bee.content + "', '"
    							+ bee.up + "', '" + bee.down + "') ";

    	db.query(query, function select(error, results, fields) {
    		if (error) {
    			console.log(error);
    			return;
    		}

			// gcm message
			var message = new gcm.Message();
			message.addData('key1', 'msg1');
			var regTokens = ['YOUR_REG_TOKEN_HERE'];
			var sender = new gcm.Sender(config.api_key);

			sender.send(message, { registrationTokens: regTokens }, function (err, response) {
			    if(err) console.error(err);
			    else    console.log(response);
			});

			// provisoire le temps de remplir tous les champs de la bee
			sockets.emit('newBee', {
				id: 0,
	            user: bee.user,
	            location: "nowhere",
	            time: "timing perfect",
	            content: bee.content,
	            up: 0,
	            down: 0
			});
    	});
	}


	//////////////////////////////////////
	// COMMENT MANAGEMENT
	/////////////////////////////////////

	// send all the bees in the database through the socket as a JSONArray
	this.sendComments = function(beeID, socket) {
    	var query = "SELECT C.content, U.account, C.id_bee, C.time FROM comment C, user U WHERE id_bee = " + beeID + " AND C.id_user = U.ID";
    	// execute query
    	db.query(query, function select(error, results, fields) {
    		if (error) {
        		console.log(error);
        		return;
    		}

    		// put each comment in a JSON array
    		var commentsJSONArray = [];
        	for (var i = 0; i < results.length; i++) {
        		var comment = new Comment(results[i]['content'], results[i]['account'],
        			results[i]['id_bee'], results[i]['time']);
        		commentsJSONArray.push(comment.toJSON());
    		}

    		// send bees as JSON array
    		socket.emit('beeCommentsList', commentsJSONArray);
    	});
	}

	//////////////////////////////////////
	// USER MANAGEMENT
	/////////////////////////////////////

	// add a user in the database
	this.addUser = function(user, socket) {
    	var query = "INSERT INTO user(account, password) "
    				+ "VALUES('" + user.account + "', '" + user.password + "') ";

    	db.query(query, function select(error, results, fields) {
    		if (error) {
    			socket.emit('signUpResult', 0);
    			console.log(error);
    			return;
    		}
    		else {
    			socket.emit('signUpResult', 1);
    		}
    	});
	}

	this.signIn = function (userJSON, socket) {
    	var query = "SELECT account"
    				+ " FROM user U"
    				+ " WHERE U.account = '" + userJSON.account + "'"
    				+ " AND U.password = '" + userJSON.password + "'";

    	db.query(query, function select(error, results, fields) {
    		if (error) {
        		console.log(error);
        		return;
    		}
    		if (results.length > 0) {
        		socket.user = new User(userJSON.account, userJSON.password);
        		socket.emit("signInResult", 1);
    		}
    		else {
    		    socket.emit('signInResult', 0);
    		}
    	});
	}

	//////////////////////////////////////
	// TOKEN MANAGEMENT
	//////////////////////////////////////

	this.registerToken = function(token) {
		var query = "INSERT INTO token(token) "
					+ "VALUES ('" + token + "') ";

		db.query(query, function select(error, results, fields) {
			if(error)
				console.log(error);
		});
	}
}
