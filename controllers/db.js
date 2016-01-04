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
		var id_user = 0;
		if(socket.user != 0) {
			id_user = socket.user.id;
		}

		var query = "(SELECT B.ID, B.user, B.location, B.time, B.content, SUM(R2.value) as score, R1.value"
			+ " FROM bee B, rate R1, rate R2"
			+ " WHERE R1.id_user = " + id_user + " AND R1.id_bee = B.ID AND R2.id_bee = B.ID"
			+ " GROUP BY B.ID"
			+ " HAVING score IS NOT NULL)"
			+ "	UNION"
			+ "	(SELECT B1.ID, B1.user, B1.location, B1.time, B1.content, SUM(R3.value) as score, 0"
			+ " FROM bee B1, rate R3"
			+ " WHERE R3.id_bee = B1.ID AND B1.ID NOT IN"
		        			+ " (SELECT B2.ID"
		        			+ " FROM bee B2, rate R2"
		        			+ " WHERE R2.id_user = " + id_user + " AND R2.id_bee = B2.ID)"
			+ " GROUP BY B1.ID"
			+ " HAVING score IS NOT NULL)"
			+ " UNION"
			+ " (SELECT B2.ID, B2.user, B2.location, B2.time, B2.content, 0 as score, 0"
			+ " FROM bee B2"
			+ " WHERE B2.ID NOT IN(SELECT id_bee FROM rate))";


		console.log(query);

    	// execute query
    	db.query(query, function select(error, results, fields) {
    		if (error) {
    		    console.log(error);
    			return;
    		}

    		// put each bee in a JSON array
    		var beesJSONArray = [];
			var beeJSON;
    		for (var i = 0; i < results.length; i++) {
				var bee = new Bee(results[i]['ID'], results[i]['user'],
					results[i]['location'],results[i]['time'],
					results[i]['content'], results[i]['score']);
				beeJSON = bee.toJSON();
				beeJSON.myScore = results[i]['value'];
				beesJSONArray.push(beeJSON);
    		}

    		// send bees as JSON array
    		socket.emit('beesList', beesJSONArray);
    	});
	}

	// add a bee in the database
	this.addBee = function(bee, sockets) {
    	var query = "INSERT INTO bee(user, location, time, content) "
    				+ "VALUES('" + bee.user + "', '" + bee.location + "', '"
    							+ bee.time + "', '" + bee.content + "') ";

    	db.query(query, function select(error, result, fields) {
    		if (error) {
    			console.log(error);
    			return;
    		}

			// send a message to the GCM to provide notifications
			gcmMessage();

			sockets.emit('newBee', {
				id: result.insertId,
	            user: bee.user,
	            location: bee.location,
	            time: bee.time,
	            content: bee.content,
	            score: 0
			});
    	});
	}


	//////////////////////////////////////
	// COMMENT MANAGEMENT
	/////////////////////////////////////

	// send all the bees in the database through the socket as a JSONArray
	this.sendComments = function(beeID, socket) {
    	var query = "SELECT C.content, U.account, C.id_bee, C.time"
			+ " FROM comment C, user U"
			+ " WHERE id_bee = " + beeID + " AND C.id_user = U.ID";
    	// execute query
    	db.query(query, function select(error, results, fields) {
    		if (error) {
        		console.log(error);
        		return;
    		}

    		// put each comment in a JSON array
    		var commentsJSONArray = [];
        	for (var i = 0; i < results.length; i++) {
        		var comment = new Comment(results[i]['content'],
					results[i]['account'], results[i]['id_bee'],
					results[i]['time']);
        		commentsJSONArray.push(comment.toJSON());
    		}

    		// send bees as JSON array
    		socket.emit('beeCommentsList', commentsJSONArray);
    	});
	}

	this.addComment = function(comment) {
    	var query = "INSERT INTO comment(content, id_user, id_bee, time) "
    				+ "VALUES('" + comment.content + "', '"
					+ comment.user + "', '" + comment.idBee
					+ "', NOW()) ";

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

	//////////////////////////////////////
	// USER MANAGEMENT
	/////////////////////////////////////

	// add a user in the database
	this.addUser = function(user, socket) {
    	var query = "INSERT INTO user(account, password) "
    				+ "VALUES('" + user.account + "', '"
					+ user.password + "') ";

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
    	var query = "SELECT ID"
    				+ " FROM user U"
    				+ " WHERE U.account = '" + userJSON.account + "'"
    				+ " AND U.password = '" + userJSON.password + "'";

    	db.query(query, function select(error, results, fields) {
    		if (error) {
        		console.log(error);
        		return;
    		}
    		if (results.length > 0) {
        		socket.user = new User(results[0]['ID'], userJSON.account, userJSON.password);
        		socket.emit("signInResult", 1);
    		}
    		else {
    		    socket.emit('signInResult', 0);
    		}
    	});
	}

	//////////////////////////////////////
	// RATE MANAGEMENT
	//////////////////////////////////////

	this.rateBee = function(id_user, id_bee, value) {
		var testQuery = "SELECT *"
						+ " FROM rate"
						+ " WHERE id_user = " + id_user
						+ " AND id_bee = " + id_bee;

		db.query(testQuery, function select(error, results, fields) {
			if (error)
				console.log(error);
			if(results.length > 0) {
				var updateQuery = "UPDATE rate"
							+ " SET value = " + value
							+ " WHERE id_user = " + id_user
							+ " AND id_bee = " + id_bee;

				db.query(updateQuery, function select(error, results, fields) {
					if(error)
						console.log(error);
				});
			} else {
				var insertQuery = "INSERT INTO rate(id_user, id_bee, value) "
							+ "VALUES (" + id_user + ", " + id_bee + ", "+ value + ") ";

				db.query(insertQuery, function select(error, results, fields) {
					if(error)
						console.log(error);
				});
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


	// gcm message
	function gcmMessage() {
		var message = new gcm.Message();
		message.addData('newBee', 'new BEE!');

		query = "SELECT token FROM token";

		db.query(query, function select(error, results, fields) {

			var regTokens = [];
			var sender = new gcm.Sender(config.api_key);

			for (var i = 0; i < results.length; i++) {
				regTokens.push(results[i]['token']);
			}
			console.log("Envoi du message au GCM");
			sender.send(message, { registrationTokens: regTokens }, function (err, response) {
				if(err) console.error(err);
				else    console.log(response);
			});

		});
	}
}
