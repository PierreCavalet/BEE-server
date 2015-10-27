module.exports.user = User;

function User(account, password) {
  this.account = account;
  this.password = password;

  var that = this;

  // persist the user in the database
  this.persist = function (db) {
    db.addUser(that);
  }
}

// user sign in
User.signIn = function (userJSON, socket, db) {
  db.signIn(userJSON, socket);
}
