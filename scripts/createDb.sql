CREATE DATABASE  IF NOT EXISTS `disneydb`;
USE `disneydb`;


-- Estructura de tabla para la tabla `charactermovie`
--

DROP TABLE IF EXISTS `charactermovie`;
CREATE TABLE `charactermovie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `characterId` int NOT NULL,
  `movieId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a0c50e9c-593c-4adc-a039-8108eb5c2f57` (`movieId`),
  KEY `FK_d0064d66-d35b-4062-9143-478aca2b3764` (`characterId`),
  CONSTRAINT `FK_a0c50e9c-593c-4adc-a039-8108eb5c2f57` FOREIGN KEY (`movieId`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d0064d66-d35b-4062-9143-478aca2b3764` FOREIGN KEY (`characterId`) REFERENCES `characters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `charactermovie`
--

LOCK TABLES `charactermovie` WRITE;
INSERT INTO `charactermovie` VALUES (1,1,2),(2,2,1),(3,3,1),(4,4,1),(5,5,1),(6,6,1),(12,8,8),(13,10,8),(14,9,8),(15,11,8),(16,12,8),(17,8,9),(18,10,10),(19,13,11),(20,14,11),(21,15,12);
UNLOCK TABLES;

--
-- Estructura de tabla para los `caracteres` de la tabla
--

DROP TABLE IF EXISTS `characters`;
CREATE TABLE `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` tinyint NOT NULL,
  `weight` int NOT NULL,
  `history` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Vaciado de datos para los `caracteres` de la tabla
--

LOCK TABLES `characters` WRITE;
INSERT INTO `characters` VALUES (1,'Emma_Stone.jpg','Emma Stone',32,52,'Comenzó su carrera apareciendo en obras teatrales en el Valley Youth Theatre de Phoenix como Las aventuras de Alicia en el país de las maravillas y Joseph and the Amazing Technicolor Dreamcoat,1​ y debutó en televisión en The New Partridge Family (2005), sin embargo, solo se produjo un episodio piloto.5​ Su primer papel en cine se dio en la comedia de Greg Mottola Superbad (2007), junto a Michael Cera y Jonah Hill.6​ Obtuvo reconocimiento por sus trabajos posteriores en producciones como easy A (2010) y The Help (2011) en las cuales fue protagonista y que determinaron excelentes críticas para la actriz.'),(2,'Rayo_McQueen.png','Rayo McQueen',30,300,'Rayo McQueen tiene un diseño basado en los vehiculos Ford Mustang de NASCAR, con influencias del diseño de Mazda Miata y Dodge Viper. El recibe un trabajo de pintura similar al Chevrolet Corvette C1, modelo 2006.'),(3,'Mate.png','Mate',50,500,'Mate es una grúa oxidada que ha vivido en Radiador Springs toda su vida. Le gusta hacer travesuras, especialmente volcar tractores. También le gusta conducir del revés, pues es un esperto en ello. Sueña con montar en un helicóptero de Dinoco. Lo que más teme es a la \"luz fantasma\".'),(4,'SallyCarrera.png','Sally Carrera',35,200,'Ella es la dueña del motel \"El Cono Amigo\", y fiscal de Radiador Springs, de la que Rayo McQueen se enamora. Tras que McQueen destrozara accidentalmente la calle del pueblo y todos quisieran expulsarle, ella es la primera en pensar que se merece una segunda oportunidad'),(5,'Doc_Hudson.png','Doc Hudson Hornet',70,500,'Doc fue el juez y médico de Radiador Springs. Cuando Rayo McQueen llega al pueblo, él quiere que se marche inmediatamente, ya que no le gustan los coches de carreras. Mientras está en el pueblo, Rayo descubre que Doc era antiguamente el campeón de carreras Hudson Hornet, pero se retiró tras sufrir un accidente'),(6,'Sheriff_Cars.png','Sheriff',80,700,'Es el sheriff de Radiador Springs. Se encarga de la seguridad del pueblo, dedicandose a perseguir a coches que corren a demasiada velocidad.'),(8,'img-1632781968163.png','Robert Downey, Jr',56,90,'Robert John Downey Jr. (Nueva York, 4 de abril de 1965) es un actor, actor de voz, productor y cantante estadounidense. Inició su carrera como actor a temprana edad apareciendo en varios filmes dirigidos por su padre, Robert Downey Sr., y en su infancia estudió actuación en varias academias de Nueva York. Se mudó con su padre a California, pero abandonó sus estudios para enfocarse completamente en su carrera.'),(9,'img-1633058789786.png','Hulk',102,300,'es un personaje ficticio, un superhéroe que aparece en los cómics estadounidenses publicados por la editorial Marvel Comics. El personaje fue creado por los escritores Stan Lee y Jack Kirby '),(10,'img-1633059990940.png','Captain America',90,120,'El Capitán América, cuyo nombre real es Steven \"Steve\" Grant Rogers, es un superhéroe ficticio que aparece en los cómics estadounidenses publicados por Marvel Comics. Creado por los historietistas Joe Simon y Jack Kirby, el personaje apareció por primera vez en Captain America Comics #1 '),(11,'img-1633060861955.webp','Natasha Romanoff',56,59,'es una superheroína ficticia que aparece en los cómics estadounidenses publicados por Marvel Comics'),(12,'img-1633061133416.jpg','Thor',70,90,'es el dios del trueno y fuerza en la mitología nórdica y germánica. Su papel es complejo ya que tenía influencia en áreas muy diferentes, tales como el clima, las cosechas, la protección, la consagración, la justicia, las lidias, los viajes y las batallas'),(13,'img-1633074448034.jpg','dory',3,5,'dory es un pez con poca memoria'),(14,'img-1633074533730.jpg','marlin',5,7,'marlin es el papa de nemo'),(15,'img-1633074793882.png','Olaf',2,30,'olaf es un muñeco de nieve');
UNLOCK TABLES;

--
-- Estructura de tabla para la tabla `géneros`
--

DROP TABLE IF EXISTS `genders`;
CREATE TABLE `genders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Vaciado de datos para la tabla "géneros"
--

LOCK TABLES `genders` WRITE;
INSERT INTO `genders` VALUES (1,'animacion','animacion.jpg'),(2,'drama','drama.jpg'),(5,'accion','accion.jpg'),(6,'romance','romance.jpg');
UNLOCK TABLES;

--
-- Estructura de tabla para `películas` de tabla
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `creationDate` date NOT NULL,
  `rating` tinyint unsigned NOT NULL,
  `genderId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d120b35a-7e85-4fed-a760-45a585b819ec` (`genderId`),
  CONSTRAINT `FK_d120b35a-7e85-4fed-a760-45a585b819ec` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Vaciado de datos para `películas` de tabla
--

LOCK TABLES `movies` WRITE;
INSERT INTO `movies` VALUES (1,'Cars.jpg','Cars','2006-06-09',4,1),(2,'Cruella.jpg','Cruella','2021-05-28',4,2),(8,'img-1632635562835.png','The Avengers','2012-04-14',5,1),(9,'img-1633073955456.jpg','Iron Man','2008-04-14',3,5),(10,'img-1633074126157.jpg','Captain America: The First Avenger','2011-10-23',5,5),(11,'img-1633074314448.jpg','Buscando a Nemo','2002-02-13',2,1),(12,'img-1633074728025.jpg','Frozen','2013-06-19',5,6);
UNLOCK TABLES;

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Vaciado de datos para la tabla `usuarios`
--

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (2,'josealbeiro@gmail.com','$2a$12$QNH1xD22S5IJUeGWiY.0LehVkwvbGkEPftajVaoTvzV.JZBvRDjq.'),(14,'manuelvalenzuelatr@gmail.com','$2a$12$gLcMC9iKHOknqDACBTvv4ODLNPyWxYkUe0tqPMD./B5XPKGUvKxlu');
UNLOCK TABLES;

