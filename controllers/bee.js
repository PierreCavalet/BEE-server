module.exports.bee = Bee;

function Bee(id, user, location, time, content, up, down) {
    this.id = id;
    this.user = user;
    this.location = location;
    this.time = time;
    this.content = content;
    this.up = up;
    this.down = down;

    var that = this;

    // convert a Bee to a JSON Object
    this.toJSON = function() {
        return {
            id: that.id,
            user: that.user,
            location: that.location,
            time: that.time,
            content: that.content,
            up: that.up,
            down: that.down
        }
    }

    // persist the Bee in the database
    this.persist = function(db) {
        db.addBee(that);
    }
}

// send all the bees in the database through the socket
Bee.sendAllBees = function(socket, db) {
    db.sendAllBees(socket);
}
