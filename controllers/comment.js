module.exports.comment = Comment;

function Comment(content, user, idBee, time) {
	this.content = content;
	this.user = user;
	this.idBee = idBee;
	this.time = time;

	var that = this;

	// convert a Comment to a JSON Object
	this.toJSON = function() {
		return {
			time: that.time,
			user: that.user,
			idBee: that.idBee,
			time: that.time
		}
	}

	// persist the Comment in the database
	this.persist = function(db) {
		db.addComment(that);
	}
}

Comment.sendComments = function(beeID, socket, db) {
	db.sendComments(beeID, socket);
}
