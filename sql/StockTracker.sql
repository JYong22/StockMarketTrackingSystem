-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: stock
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `stockOwned`
--

DROP TABLE IF EXISTS `stockOwned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stockOwned` (
  `idstockOwned` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `stockName` varchar(45) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`idstockOwned`),
  KEY `name_idx` (`username`),
  CONSTRAINT `user` FOREIGN KEY (`username`) REFERENCES `Users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockOwned`
--

LOCK TABLES `stockOwned` WRITE;
/*!40000 ALTER TABLE `stockOwned` DISABLE KEYS */;
INSERT INTO `stockOwned` VALUES (1,'johnson','MSFT',10),(2,'johnson','TSLA',5);
/*!40000 ALTER TABLE `stockOwned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription` (
  `idsuscription` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `stock` varchar(45) NOT NULL,
  PRIMARY KEY (`idsuscription`),
  KEY `user_idx` (`username`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `Users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription`
--

LOCK TABLES `subscription` WRITE;
/*!40000 ALTER TABLE `subscription` DISABLE KEYS */;
INSERT INTO `subscription` VALUES (1,'johnson','AMZN'),(2,'johnson','AAPL'),(4,'johnson','MSFT'),(11,'johnson','FB');
/*!40000 ALTER TABLE `subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `username` varchar(45) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('happy','$2b$10$ye7TtrCJe4TINnd4tfE//OZ/4UfCUk8qSY96oA/2SGmFeCBJvkQ6S'),('hello','$2b$10$ygXJiVDhP76qrCaOut9h3.q/CJDkhzkYnpqpRrU.btvIHx9sF.CBu'),('heyJohnson','$2b$10$1Jc/oohCbw9UJd0mrhvIKOLEBz1FjJByUq8E8Egj40vJxmIQRFwd.'),('johncena','$2b$10$uuivPR4CWnur5Xqkim/wsOH6eW14RVpjFZ9fdtnsxJy0LMraQP3Ju'),('johncenaa','$2b$10$t5./6m.lDU5swb7wYVasVeB5zzTytqXpKhCTTpAoErdWFu1h4GlpG'),('johnson','$2b$10$R8rkQznhpQluj3jnIcwwAu/T0H2Vs/oi80eUMBfZXbogFD7.HpT5y'),('johnson11','$2b$10$gqHrsP/iQR9ymAFC82XdvO8MQduAfjvm7gbZ00LoH2pd5mjniQA1m'),('johnson111','$2b$10$zwDF.N1Vvw9eM9O1JHEOUeeEt5PSjaF7MNCyouRTlONmoLipUurQu'),('lol','$2b$10$yOcViVPmIVi5kHV6Px28GeVFNTZHPPqEivMvoI.AXzq1zYc9ETKlK');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Wallet`
--

DROP TABLE IF EXISTS `Wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Wallet` (
  `username` varchar(45) NOT NULL,
  `balance` int NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  CONSTRAINT `name` FOREIGN KEY (`username`) REFERENCES `Users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Wallet`
--

LOCK TABLES `Wallet` WRITE;
/*!40000 ALTER TABLE `Wallet` DISABLE KEYS */;
INSERT INTO `Wallet` VALUES ('happy',0),('hello',0),('heyJohnson',0),('johncena',0),('johncenaa',0),('johnson',1318),('johnson11',0),('johnson111',0),('lol',0);
/*!40000 ALTER TABLE `Wallet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-07 19:02:25
