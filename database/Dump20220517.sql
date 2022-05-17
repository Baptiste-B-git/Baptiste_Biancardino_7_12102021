-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: database_development
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserId` int NOT NULL,
  `messageId` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (114,112,'190','Le soleil couchant est un artiste de génie.','2022-05-17 13:36:49','2022-05-17 13:36:49'),(117,28,'190','Magnifique !','2022-05-17 14:00:46','2022-05-17 14:00:46'),(118,28,'191','L\'expression a des frontières, la pensée n\'en a pas.','2022-05-17 14:03:26','2022-05-17 14:03:26'),(120,25,'192','J\'adore le Japon.','2022-05-17 14:05:09','2022-05-17 14:05:09'),(123,168,'194','Je projette d\'inviter ma famille au chalet pendant l\'été.','2022-05-17 14:34:03','2022-05-17 14:34:03'),(124,168,'192','Le paradis tropical...','2022-05-17 14:36:51','2022-05-17 14:36:51'),(127,112,'194','Il y a pire ','2022-05-17 14:46:16','2022-05-17 14:46:16'),(129,170,'194','Jolie vue !','2022-05-17 14:52:48','2022-05-17 14:52:48');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserId` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_ibfk_1` (`UserId`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (190,168,'Monet disait que la sagesse, c\'est de se lever et se coucher avec le soleil.',NULL,'http://localhost:5000/images/coucher_de_soleil.png1652793990916.png','2022-05-17 13:26:30','2022-05-17 14:30:39'),(191,112,'Citation du jour : “La seule chose qu\'on est sûr de ne pas réussir est celle qu\'on ne tente pas.”',NULL,NULL,'2022-05-17 13:45:09','2022-05-17 14:42:39'),(192,28,'Mes vacances à Okinawa !',NULL,'http://localhost:5000/images/Okinawa.jpeg1652795809729.jpg','2022-05-17 13:56:49','2022-05-17 13:56:49'),(194,25,'Voici une photo de mon voyage. PS: Je ne suis pas en vacances mais au travail :)',NULL,'http://localhost:5000/images/chalet.jpg1652797658409.jpg','2022-05-17 14:27:38','2022-05-17 14:27:38');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20211015083455-create-user.js'),('20211015084200-create-message.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (25,'eric@gmail.com','Eric','$2b$10$otuJcF.Gi2a4VRTkj5PZgObXga2TKqP58ys4NPWqdeCcECeaMvN1G',0,'2022-01-12 14:04:02','2022-01-12 14:04:02'),(28,'lorie@gmail.com','Lorie','$2b$10$Pem7UKkQ2MMqi8fSXVwFk.h5OKFSm9WecYoEB7jaUtBFvpJNtN4Ji',NULL,'2022-01-20 13:32:47','2022-01-20 13:32:47'),(112,'pierre@gmail.com','Pierre','$2b$10$EpU5gicXz5XcJ2V5ySJs2utdhEH8BX45C6pXF5vhlJF2HV2vsFLQW',NULL,'2022-05-04 13:33:32','2022-05-04 13:33:32'),(168,'marie@gmail.com','Marie','$2b$10$hGKIg5li.IioJzUoUIzQeeap0XTto4vpXjgEB6bcUj5Ljjfedd6Xi',NULL,'2022-05-17 13:21:17','2022-05-17 13:21:17'),(170,'stephanie@gmail.com','Stephanie','$2b$10$7PLnSxbBEJIDShYJzsNKrOD712iYg8lQxXTfW92als.kHLZF9oeBm',NULL,'2022-05-17 14:52:25','2022-05-17 14:52:25');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-17 16:57:24
