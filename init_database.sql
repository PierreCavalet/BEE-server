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
"Je fais un texte long parce que j'ai besoin de tester si les petites cartes que j'ai faite se remplissent correctement. Si ce n'est pas le cas je serais très deçu ... quelle tristesse. Cette petite histoire ne sert pas à grand chose mais je suis content de l'avoir écrite. Alors je vomi. J'espere pour vous que vous comprennez. Si ce n'est pas le cas, je vous suggère d'agrandir votre culture mes amis. Mon texte n'était pas assez long alors je rajoute une petite phrase tranquille tavu. Je pense meme qu'une deuxieme ça sera pas du luxe tavubis. tavubis ça sonne trop ejip sien wewe. Franchement jsuis trop toutankamoN. Adieu ou à bientôt, peu importe à présent. Ce monde n'existe pas.", 10, 20);

INSERT INTO bee(user, location, time, content, up, down)
VALUES ("Nicolas", "location", "2015-04-02 10:00:00",
"Je rêve de soleil parce que je trouve ça beau.", 30, 2);

INSERT INTO bee(user, location, time, content, up, down)
VALUES ("Pierre", "Perpignan", "2015-04-02 08:49:43",
"Mon rêve le plus fou, c'est chez afflelou!", 10, 20);

INSERT INTO bee(user, location, time, content, up, down)
VALUES ("Pierre", "Perpignan", "2015-04-02 08:49:43",
"Mon rêve le plus fou, c'est chez afflelou!", 10, 20);

INSERT INTO bee(user, location, time, content, up, down)
VALUES ("Pierre", "Perpignan", "2015-04-02 08:49:43",
"Mon rêve le plus fou, c'est chez afflelou!", 10, 20);

INSERT INTO bee(user, location, time, content, up, down)
VALUES ("Pierre", "Perpignan", "2015-04-02 08:49:43",
"Mon rêve le plus fou, c'est chez afflelou!", 10, 20);



CREATE TABLE user (
    ID int NOT NULL AUTO_INCREMENT,
    account varchar(30),
    password varchar(30),
    PRIMARY KEY(ID)
);

INSERT INTO user(account, password)
VALUES ("Pierre", "Pierre");

INSERT INTO user(account, password)
VALUES ("Nicolas", "Nicolas");


CREATE TABLE comment (
    content text,
    id_user int,
    id_bee int,
    time datetime
);

INSERT INTO comment(content, id_user, id_bee, time)
VALUES("le petit commentaire de pierre", 1, 1, "2015-04-02 18:00:00");

INSERT INTO comment(content, id_user, id_bee, time)
VALUES("le petit commentaire de pierre 2", 1, 1, "2015-04-02 19:00:00");

INSERT INTO comment(content, id_user, id_bee, time)
VALUES("le petit commentaire de pierre 3", 1, 1, "2015-04-02 20:00:00");

INSERT INTO comment(content, id_user, id_bee, time)
VALUES("le petit commentaire de pierre 4", 1, 1, "2015-04-02 21:00:00");

INSERT INTO comment(content, id_user, id_bee, time)
VALUES("le petit commentaire de pierre 5", 1, 1, "2015-04-02 22:00:00");

INSERT INTO comment(content, id_user, id_bee, time)
VALUES("le petit commentaire de pierre 6", 1, 1, "2015-04-02 23:00:00");
