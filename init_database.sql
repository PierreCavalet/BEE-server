DROP DATABASE bestexcuseever;
CREATE DATABASE bestexcuseever;

use bestexcuseever;

CREATE TABLE bee (
    ID int NOT NULL AUTO_INCREMENT,
    user varchar(30),
    location varchar(30),
    time datetime,
    content text,
    PRIMARY KEY(ID)
);

INSERT INTO bee(user, location, time, content)
VALUES ("Michel", "Montpellier, France", "2015-09-10 08:49:43",
"Aujourd'hui, ma colocataire a trouvé la meilleure excuse que j'ai jamais entendue pour ne pas faire la vaisselle, a savoir que mon chat dort dans l'évier. Après dispute et vérification : en effet, mon chat dort dans l'évier. Best Excuse Ever.");

INSERT INTO bee(user, location, time, content)
VALUES ("Nicolas", "Paris, France", "2015-09-08 10:00:03",
"Aujourd'hui, j'ai utilisé mon excuse du moment : \"Je ne peux pas, j'ai une heure de conduite.\" Sauf que cette fois, c'était destiné à mon moniteur d'auto-école, qui, à cause d'un désistement dans l'heure, me demandait si j'avais une disponibilité. Best Excuse Ever.");

INSERT INTO bee(user, location, time, content)
VALUES ("Mélanie", "Perpignan", "2015-07-03 08:49:43",
"Aujourd'hui, excuse de mon fils concernant sa copine : \"C'est une amie qui avait perdu ses clés. Vu qu'elle ne voulait pas froisser ses fringues, et moi non plus, on s'est foutus à poil et on a dormi dans le même lit pour ne pas avoir froid...\" Maintenant, c'est sûr, il me prend vraiment pour un con. Best Excuse Ever.");



CREATE TABLE user (
    ID int NOT NULL AUTO_INCREMENT,
    account varchar(30) UNIQUE,
    password varchar(30),
    PRIMARY KEY(ID)
);

INSERT INTO user(account, password)
VALUES ("Pierre", "Pierre");

INSERT INTO user(account, password)
VALUES ("Nicolas", "Nicolas");

INSERT INTO user(account, password)
VALUES ("Michel", "Michel");

CREATE TABLE token (
    token varchar(255) UNIQUE
);


CREATE TABLE comment (
    content text,
    id_user int,
    id_bee int,
    time datetime
);



INSERT INTO comment(content, id_user, id_bee, time)
VALUES("Toujours une bonne excuse pour ne pas faire la vaisselle lol", 2, 1, "2015-09-10 18:40:40");

INSERT INTO comment(content, id_user, id_bee, time)
VALUES("moi osi jé un cha", 3, 1, "2015-09-10 10:49:40");

INSERT INTO comment(content, id_user, id_bee, time)
VALUES("bravo!", 1, 2, "2015-09-08 10:30:03");

INSERT INTO comment(content, id_user, id_bee, time)
VALUES("c'est du propre", 3, 2, "2015-09-08 11:20:03");

INSERT INTO comment(content, id_user, id_bee, time)
VALUES("les jeunes ne savent plus quoi inventer de nos jours ...", 2, 3, "2015-07-03 08:55:43");

INSERT INTO comment(content, id_user, id_bee, time)
VALUES("AAAAAAAAAAAAIGHT", 1, 3, "2015-07-03 09:48:52");
