DROP DATABASE bestexcuseever;
CREATE DATABASE bestexcuseever;

use bestexcuseever;

CREATE TABLE bee (
    ID int NOT NULL AUTO_INCREMENT,
    user varchar(30),
    location varchar(30),
    time datetime,
    content text,
    up int,
    down int,
    PRIMARY KEY(ID)
);

INSERT INTO bee(user, location, time, content, up, down)
VALUES ("Pierre", "Perpignan", "2015-04-02 08:49:43",
"Mon rêve le plus fou, c'est chez afflelou!", 10, 20);

INSERT INTO bee(user, location, time, content, up, down)
VALUES ("Nicolas", "location", "2015-04-02 10:00:00",
"Je rêve de soleil parce que je trouve ça beau.", 30, 2);


CREATE TABLE user (
    ID int NOT NULL AUTO_INCREMENT,
    account varchar(30),
    password varchar(30),
    PRIMARY KEY(ID)
);

INSERT INTO User(account, password)
VALUES ("Pierre", "Pierre");

INSERT INTO User(account, password)
VALUES ("Nicolas", "Nicolas");


CREATE TABLE comment {
    content text,
    id_user int,
    id_bee int,
    time datetime
}

INSERT INTO comment(content, id_user, id_bee, time)
VALUES("le petit commentaire de pierre", 1, 1, "2015-04-02 18:00:00");
