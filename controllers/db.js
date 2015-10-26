var mysql = require("mysql");
var config = require("../config.json");
var Bee = require("./bee.js").bee;

module.exports.db = new Db();

function Db() {
  var db = mysql.createConnection({
    host: "localhost",
    user: config.database_user,
    password: config.database_password,
    database: "bestexcuseever"
  });

  this.getAllBees = function(socket) {
    var request = "SELECT * FROM bee";
    db.query(request, function select(error, results, fields) {
      if (error) {
        console.log(error);
        return;
      }
      var beesList = [];
      for (var i = 0; i < results.length; i++) {
        var bee = new Bee(results[i]['user'], results[i]['location'],
          results[i]['time'], results[i]['content'], results[i]['up'],
          results[i]['down']);
        beesList.push(bee.toJSON());
      }
      console.log(beesList);
      socket.emit('beesList', beesList);
    });
  }
}
