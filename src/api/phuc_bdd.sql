-- il faut exécuter chaque commande une à une, tout copier-coller ne fonctionnera pas

CREATE TABLE IF NOT EXISTS aliments (
  id int auto_increment,
  nom varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO aliments (nom) VALUES
('California Saumon Avocat'),
('Sushi Saumon'),
('Spring Avocat Cheese'),
('California Pacific'),
('Edamame/Salade de chou'),
('Maki Salmon Roll'),
('Spring Saumon Avocat'),
('Maki Cheese Avocat'),
('Sushi Thon'),
('California Thon Avocat'),
('California Thon Cuit Avocat'),
('Sando Chicken Katsu'),
('Sando Salmon Aburi'),
('Maki Salmon'),
('California Crevette'),
('California Chicken Katsu'),
('Spring tataki Saumon'),
('Signature Dragon Roll'),
('California French Touch'),
('California French salmon'),
('California Yellowtail Ponzu'),
("Signature Rock'n Roll"),
('Sushi Saumon Tsukudani');

CREATE TABLE IF NOT EXISTS box (
  id int primary key auto_increment,
  nom varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  pièces int DEFAULT NULL,
  prix float(15, 2) DEFAULT NULL,
  image varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  fav int DEFAULT NULL,
  stars float(15, 1) DEFAULT NULL
)

INSERT INTO box (nom, pièces, prix, image, fav, stars) VALUES
('Tasty Blend', 12, 12.50, 'tasty-blend', 1, 4.8),
('Amateur Mix', 18, 15.90, 'amateur-mix', 1, 4.5),
('Saumon Original', 11, 12.50, 'saumon-original', 0, 4.3),
('Salmon Lovers', 18, 15.90, 'salmon-lovers', 1, 3.9),
('Salmon Classic', 10, 15.90, 'salmon-classic', 0, 3.5),
('Master Mix', 12, 15.90, 'master-mix', 1, 4.6),
('Sunrise', 18, 15.90, 'sunrise', 0, 4.3),
('Sando Box Chicken Katsu', 13, 15.90, 'sando-box-chicken-katsu', 1, 4.8),
('Sando Box Salmon Aburi', 13, 15.90, 'sando-box-salmon-aburi', 0, 4.2),
('Super Salmon', 24, 19.90, 'super-salmon', 1, 4.6),
('California Dream', 24, 19.90, 'california-dream', 0, 4.3),
('Gourmet Mix', 22, 24.50, 'gourmet-mix', 0, 4.2),
('Fresh Mix', 22, 24.50, 'fresh-mix', 0, 4.6);

CREATE TABLE IF NOT EXISTS boxaliments (
  idBox int NOT NULL,
  idAliment int DEFAULT NULL,
  quantité int DEFAULT NULL,
  KEY idBox (idBox),
  KEY boxaliments_ibfk_2 (idAliment)
)

INSERT INTO boxaliments (idBox, idAliment, quantité) VALUES
(1, 1, 3),
(1, 2, 3),
(1, 3, 3),
(1, 4, 3),
(1, 5, 1),
(2, 6, 3),
(2, 7, 3),
(2, 8, 6),
(2, 1, 3),
(2, 5, 1),
(3, 1, 6),
(3, 2, 5),
(3, 5, 1),
(4, 1, 6),
(4, 7, 6),
(4, 2, 6),
(4, 5, 1),
(5, 2, 10),
(5, 5, 1),
(6, 2, 4),
(6, 9, 2),
(6, 10, 3),
(6, 1, 3),
(6, 5, 1),
(7, 6, 6),
(7, 1, 6),
(7, 5, 1),
(7, 11, 6),
(8, 12, 1),
(8, 6, 6),
(8, 1, 6),
(8, 11, 6),
(8, 5, 1),
(9, 13, 1),
(9, 1, 6),
(9, 11, 6),
(9, 5, 1),
(10, 1, 6),
(10, 6, 6),
(10, 14, 6),
(10, 7, 6),
(10, 5, 1),
(11, 1, 6),
(11, 15, 6),
(11, 11, 6),
(11, 16, 6),
(11, 5, 1),
(12, 17, 6),
(12, 18, 4),
(12, 19, 3),
(12, 20, 6),
(12, 21, 3),
(12, 5, 1),
(13, 22, 4),
(13, 6, 6),
(13, 4, 6),
(13, 2, 4),
(13, 23, 2),
(13, 5, 1);

CREATE TABLE IF NOT EXISTS boxsaveurs (
  idBox int NOT NULL,
  idSaveur int DEFAULT NULL,
  KEY idBox (idBox),
  KEY idSaveur (idSaveur)
)

INSERT INTO boxsaveurs (idBox, idSaveur) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 1),
(2, 2),
(2, 3),
(3, 1),
(3, 2),
(4, 4),
(4, 1),
(4, 2),
(5, 1),
(6, 1),
(6, 5),
(6, 2),
(7, 1),
(7, 5),
(7, 2),
(7, 3),
(8, 1),
(8, 6),
(8, 2),
(8, 3),
(9, 1),
(9, 5),
(9, 2),
(10, 4),
(10, 1),
(10, 2),
(10, 3),
(11, 7),
(11, 1),
(11, 5),
(11, 8),
(11, 6),
(11, 2),
(12, 4),
(12, 7),
(12, 1),
(12, 6),
(12, 2),
(12, 9),
(13, 7),
(13, 1),
(13, 5),
(13, 2),
(13, 3);

CREATE TABLE IF NOT EXISTS saveurs (
  id int primary key auto_increment,
  nom varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
)

INSERT INTO saveurs (nom) VALUES
('saumon'),
('avocat'),
('cheese'),
('coriande'),
('thon'),
('viande'),
('spicy'),
('crevette'),
('seriole lalandi');

ALTER TABLE boxaliments
  ADD CONSTRAINT boxaliments_ibfk_1 FOREIGN KEY (idBox) REFERENCES box (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT boxaliments_ibfk_2 FOREIGN KEY (idAliment) REFERENCES aliments (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE boxsaveurs
  ADD CONSTRAINT boxsaveurs_ibfk_1 FOREIGN KEY (idBox) REFERENCES box (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT boxsaveurs_ibfk_2 FOREIGN KEY (idSaveur) REFERENCES saveurs (id) ON DELETE CASCADE ON UPDATE CASCADE;