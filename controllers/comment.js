module.exports.comment = Comment;

function Comment(content, idUser, idBee, time) {
	this.content = content;
	this.idUser = idUser;
	this.idBee = idBee;
	this.time = time;

	var that = this;

	// convert a Comment to a JSON Object
	this.toJSON = function() {
		return {
			time: that.time,
			idUser: that.idUser,
			idBee: that.idBee,
			time: that.time
		}
	}

	// persist the Comment in the database
	this.persist = function(db) {
		db.addComment(that);
	}
}

Comment.sendComments(beeID, socket, db) {
	db.sendComments(beeID, socket);
}
