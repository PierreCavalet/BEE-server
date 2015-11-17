module.exports.user = User;

function User(account, password) {
    this.account = account;
    this.password = password;

    var that = this;

    // persist the user in the database
    this.persist = function (db, socket) {
        db.addUser(that, socket);
    }
}

// user sign in
User.signIn = function (userJSON, socket, db) {
    db.signIn(userJSON, socket);
}
