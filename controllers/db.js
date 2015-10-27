var mysql = require("mysql");
var config = require("../config.json");
var Bee = require("./bee.js").bee;
var User = require("./user.js").user;

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
        var bee = new Bee(results[i]['user'], results[i]['location'],
          results[i]['time'], results[i]['content'], results[i]['up'],
          results[i]['down']);
        beesJSONArray.push(bee.toJSON());
      }

      // send bees as JSON array
      socket.emit('beesList', beesJSONArray);
    });
  }

  // add a bee in the database
  this.addBee = function(bee) {
    var query = "INSERT INTO bee(user, location, time, content, up, down) "
                + "VALUES('" + bee.user + "', '" + bee.location + "', '"
                            + bee.time + "', '" + bee.content + "', '"
                            + bee.up + "', '" + bee.down + "') ";

    db.query(query, function select(error, results, fields) {
        if (error) {
            console.log(error);
            return;
        }
    });
  }

  //////////////////////////////////////
  // USER MANAGEMENT
  /////////////////////////////////////

  // add a user in the database
  this.addUser = function(user) {
    var query = "INSERT INTO User(account, password) "
                + "VALUES('" + user.account + "', '" + user.password + "') ";

    db.query(query, function select(error, results, fields) {
        if (error) {
            console.log(error);
            return;
        }
    });
  }

  this.signIn = function (userJSON, socket) {
    var query = "SELECT account"
                    + " FROM User U"
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
}
