DROP DATABASE bestexcuseever;
CREATE DATABASE bestexcuseever;

use bestexcuseever;

CREATE TABLE bee (
  user varchar(30),
  location varchar(30),
  time datetime,
  content text,
  up int,
  down int
);

INSERT INTO bee(user, location, time, content, up, down)
VALUES ("Pierre", "Perpignan", "2015-04-02 08:49:43",
 "Mon rêve le plus fou, c'est chez afflelou!", 10, 20);

 INSERT INTO bee(user, location, time, content, up, down)
 VALUES ("Nicolas", "location", "2015-04-02 10:00:00",
  "Je rêve de soleil parce que je trouve ça beau.", 30, 2);

CREATE TABLE User (
  account varchar(30),
  password varchar(30)
);

INSERT INTO User(account, password)
VALUES ("Pierre", "Pierre");

INSERT INTO User(account, password)
VALUES ("Nicolas", "Nicolas");
