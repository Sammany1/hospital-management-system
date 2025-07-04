-- MySQL dump 10.13  Distrib 8.0.41, for macos15 (arm64)
--
-- Host: sql.freedb.tech    Database: freedb_hospital
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.22.04.1

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
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `payment_id` int DEFAULT NULL,
  `patient_id` int NOT NULL,
  `D_employee_id` int NOT NULL,
  `duration` int DEFAULT NULL,
  `date_time` datetime NOT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `patient_id` (`patient_id`),
  KEY `D_employee_id` (`D_employee_id`),
  KEY `payment_id` (`payment_id`),
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`),
  CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`D_employee_id`) REFERENCES `doctor` (`D_employee_id`),
  CONSTRAINT `appointment_ibfk_4` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `appointment_ibfk_5` FOREIGN KEY (`D_employee_id`) REFERENCES `doctor` (`D_employee_id`),
  CONSTRAINT `appointment_ibfk_6` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,57,54,17,30,'2025-01-14 00:00:00'),(2,25,187,18,66,'2024-08-13 00:00:00'),(3,59,15,10,70,'2025-05-08 00:00:00'),(4,63,186,19,71,'2025-02-04 00:00:00'),(5,224,52,3,92,'2024-11-19 00:00:00'),(6,39,143,14,65,'2025-05-24 00:00:00'),(7,216,54,6,57,'2024-08-19 00:00:00'),(8,51,24,17,35,'2024-07-20 00:00:00'),(9,59,15,10,56,'2025-04-28 00:00:00'),(10,41,3,10,66,'2024-08-15 00:00:00'),(11,242,128,13,42,'2025-04-27 00:00:00'),(12,140,158,12,106,'2024-12-01 00:00:00'),(13,246,54,12,115,'2024-10-12 00:00:00'),(14,50,110,5,113,'2024-06-06 00:00:00'),(15,22,44,20,105,'2024-12-21 00:00:00'),(16,51,24,16,117,'2024-07-14 00:00:00'),(17,155,95,2,61,'2025-05-31 00:00:00'),(18,245,39,2,64,'2024-07-11 00:00:00'),(19,270,63,7,75,'2024-08-11 00:00:00'),(20,254,25,5,35,'2025-05-13 00:00:00'),(21,40,7,19,79,'2024-10-04 00:00:00'),(22,207,40,10,47,'2024-07-24 00:00:00'),(23,123,199,1,44,'2024-11-13 00:00:00'),(24,202,110,18,58,'2025-03-15 00:00:00'),(25,140,158,6,57,'2024-12-04 00:00:00'),(26,51,24,1,119,'2024-07-21 00:00:00'),(27,5,156,12,102,'2024-11-28 00:00:00'),(28,283,121,14,65,'2024-10-27 00:00:00'),(29,155,95,10,59,'2025-05-26 00:00:00'),(30,289,87,20,106,'2024-08-23 00:00:00'),(31,198,113,1,52,'2025-03-30 00:00:00'),(32,224,52,10,57,'2024-11-20 00:00:00'),(33,281,166,5,46,'2025-05-30 00:00:00'),(34,209,38,9,38,'2025-03-06 00:00:00'),(35,270,63,11,71,'2024-08-13 00:00:00'),(36,194,92,6,63,'2024-12-07 00:00:00'),(37,24,151,1,31,'2025-04-21 00:00:00'),(38,276,69,5,31,'2024-12-02 00:00:00'),(39,155,95,6,68,'2025-05-27 00:00:00'),(40,67,9,17,118,'2025-03-01 00:00:00'),(41,247,191,2,65,'2024-06-20 00:00:00'),(42,50,110,17,119,'2024-06-13 00:00:00'),(43,4,192,13,32,'2025-05-28 00:00:00'),(44,209,38,16,102,'2025-03-14 00:00:00'),(45,39,143,5,35,'2025-05-21 00:00:00'),(46,293,193,1,40,'2024-10-14 00:00:00'),(47,123,199,6,58,'2024-11-15 00:00:00'),(48,140,158,8,114,'2024-12-02 00:00:00'),(49,28,87,17,40,'2024-08-31 00:00:00'),(50,198,113,5,31,'2025-04-04 00:00:00'),(51,220,126,7,81,'2025-01-18 00:00:00'),(52,132,190,9,37,'2024-10-27 00:00:00'),(53,242,128,8,104,'2025-04-29 00:00:00'),(54,22,44,8,119,'2024-12-28 00:00:00'),(55,254,25,4,102,'2025-05-11 00:00:00'),(56,41,3,18,61,'2024-08-08 00:00:00'),(57,35,122,14,50,'2024-06-06 00:00:00'),(58,285,108,17,41,'2025-01-24 00:00:00'),(59,140,158,18,56,'2024-12-07 00:00:00'),(60,47,6,9,118,'2024-08-25 00:00:00'),(61,251,189,20,105,'2025-02-04 00:00:00'),(62,174,41,12,105,'2024-08-06 00:00:00'),(63,63,186,1,40,'2025-02-05 00:00:00'),(64,225,51,20,106,'2024-10-22 00:00:00'),(65,220,126,13,118,'2025-01-07 00:00:00'),(66,168,199,12,102,'2024-08-11 00:00:00'),(67,254,25,16,104,'2025-05-15 00:00:00'),(68,29,63,3,95,'2024-09-24 00:00:00'),(69,246,54,14,56,'2024-10-05 00:00:00'),(70,254,25,14,60,'2025-05-13 00:00:00'),(71,285,108,15,78,'2025-01-31 00:00:00'),(72,119,2,18,55,'2024-07-15 00:00:00'),(73,248,199,4,110,'2025-03-13 00:00:00'),(74,246,54,10,68,'2024-10-08 00:00:00'),(75,247,191,15,95,'2024-06-15 00:00:00'),(76,18,5,19,87,'2024-09-08 00:00:00'),(77,24,151,15,90,'2025-04-21 00:00:00'),(78,40,7,3,64,'2024-09-29 00:00:00'),(79,108,47,2,50,'2025-05-13 00:00:00'),(80,224,52,9,40,'2024-11-22 00:00:00'),(81,108,47,15,78,'2025-05-07 00:00:00'),(82,4,192,6,62,'2025-06-05 00:00:00'),(83,123,199,3,86,'2024-11-14 00:00:00'),(84,5,156,2,68,'2024-12-06 00:00:00'),(85,5,156,9,38,'2024-11-26 00:00:00'),(86,3,126,9,118,'2024-09-12 00:00:00'),(87,181,159,9,32,'2025-03-08 00:00:00'),(88,55,50,11,93,'2025-02-23 00:00:00'),(89,59,15,15,86,'2025-05-11 00:00:00'),(90,119,2,18,51,'2024-07-12 00:00:00'),(91,22,44,2,63,'2024-12-26 00:00:00'),(92,96,176,3,89,'2024-10-04 00:00:00'),(93,198,113,17,117,'2025-04-04 00:00:00'),(94,50,110,1,50,'2024-06-19 00:00:00'),(95,10,61,17,118,'2025-04-27 00:00:00'),(96,24,151,3,80,'2025-04-26 00:00:00'),(97,289,87,1,118,'2024-08-31 00:00:00'),(98,109,199,10,72,'2024-08-15 00:00:00'),(99,4,192,5,49,'2025-05-28 00:00:00'),(100,112,99,8,106,'2025-04-10 00:00:00'),(101,220,126,13,46,'2025-01-06 00:00:00'),(102,108,47,9,51,'2025-05-11 00:00:00'),(103,270,63,7,65,'2024-08-03 00:00:00'),(104,119,2,18,72,'2024-07-13 00:00:00'),(105,123,199,7,92,'2024-11-10 00:00:00'),(106,59,15,2,56,'2025-05-01 00:00:00'),(107,25,187,6,64,'2024-08-09 00:00:00'),(108,168,199,13,119,'2024-08-09 00:00:00'),(109,174,41,18,61,'2024-08-01 00:00:00'),(110,35,122,7,79,'2024-06-15 00:00:00'),(111,35,122,20,90,'2024-06-10 00:00:00'),(112,224,52,6,52,'2024-11-25 00:00:00'),(113,43,91,11,85,'2025-01-23 00:00:00'),(114,57,54,20,111,'2025-01-13 00:00:00'),(115,109,199,8,94,'2024-08-10 00:00:00'),(116,293,193,8,110,'2024-10-12 00:00:00'),(117,224,52,11,73,'2024-12-01 00:00:00'),(118,39,143,20,111,'2025-05-19 00:00:00'),(119,27,94,10,69,'2025-06-10 00:00:00'),(120,254,25,1,30,'2025-05-04 00:00:00'),(121,202,110,2,59,'2025-03-20 00:00:00'),(122,283,121,6,69,'2024-10-19 00:00:00'),(123,242,128,20,97,'2025-04-28 00:00:00'),(124,59,15,16,97,'2025-05-04 00:00:00'),(125,24,151,17,39,'2025-04-20 00:00:00'),(126,254,25,17,34,'2025-05-15 00:00:00'),(127,251,189,4,103,'2025-02-07 00:00:00'),(128,296,26,11,76,'2024-07-09 00:00:00'),(129,247,191,4,117,'2024-06-14 00:00:00'),(130,207,40,18,55,'2024-07-27 00:00:00'),(131,47,6,16,117,'2024-08-22 00:00:00'),(132,240,64,14,55,'2025-04-10 00:00:00'),(133,174,41,2,71,'2024-07-31 00:00:00'),(134,187,116,19,75,'2024-09-29 00:00:00'),(135,175,123,20,115,'2024-12-27 00:00:00'),(136,251,189,5,40,'2025-02-12 00:00:00'),(137,25,187,17,35,'2024-08-20 00:00:00'),(138,202,110,9,119,'2025-03-25 00:00:00'),(139,63,186,19,88,'2025-02-03 00:00:00'),(140,41,3,1,114,'2024-08-16 00:00:00'),(141,246,54,5,38,'2024-10-10 00:00:00'),(142,246,54,2,52,'2024-09-30 00:00:00'),(143,123,199,8,97,'2024-11-13 00:00:00'),(144,207,40,5,35,'2024-07-25 00:00:00'),(145,132,190,11,86,'2024-11-01 00:00:00'),(146,116,163,17,43,'2024-06-12 00:00:00'),(147,108,47,4,95,'2025-05-02 00:00:00'),(148,41,3,2,57,'2024-08-11 00:00:00'),(149,48,98,9,43,'2024-11-17 00:00:00'),(150,240,64,18,49,'2025-04-11 00:00:00'),(151,285,108,20,96,'2025-02-03 00:00:00'),(152,51,24,20,96,'2024-07-19 00:00:00'),(153,248,199,17,115,'2025-03-05 00:00:00'),(154,225,51,19,96,'2024-10-29 00:00:00'),(155,247,191,18,58,'2024-06-23 00:00:00'),(156,3,126,3,80,'2024-09-09 00:00:00'),(157,24,151,1,40,'2025-04-27 00:00:00'),(158,225,51,17,117,'2024-10-24 00:00:00'),(159,202,110,11,86,'2025-03-22 00:00:00'),(160,43,91,12,104,'2025-01-23 00:00:00'),(161,248,199,5,36,'2025-03-09 00:00:00'),(162,237,53,4,109,'2024-11-02 00:00:00'),(163,248,199,10,70,'2025-03-10 00:00:00'),(164,293,193,8,112,'2024-10-13 00:00:00'),(165,123,199,16,106,'2024-11-16 00:00:00'),(166,119,2,6,55,'2024-07-13 00:00:00'),(167,128,111,3,78,'2024-07-10 00:00:00'),(168,59,15,18,50,'2025-05-06 00:00:00'),(169,119,2,9,43,'2024-07-10 00:00:00'),(170,242,128,3,80,'2025-04-22 00:00:00'),(171,293,193,11,77,'2024-10-09 00:00:00'),(172,47,6,15,77,'2024-08-22 00:00:00'),(173,202,110,19,94,'2025-03-25 00:00:00'),(174,123,199,11,70,'2024-11-13 00:00:00'),(175,251,189,13,32,'2025-02-04 00:00:00'),(176,198,113,2,53,'2025-03-30 00:00:00'),(177,108,47,1,43,'2025-05-08 00:00:00'),(178,85,20,1,47,'2024-11-21 00:00:00'),(179,28,87,9,117,'2024-09-07 00:00:00'),(180,248,199,3,71,'2025-02-28 00:00:00'),(181,285,108,9,46,'2025-01-31 00:00:00'),(182,281,166,10,48,'2025-06-06 00:00:00'),(183,15,32,11,81,'2024-09-03 00:00:00'),(184,116,163,16,106,'2024-06-22 00:00:00'),(185,285,108,17,39,'2025-01-23 00:00:00'),(186,281,166,8,113,'2025-06-03 00:00:00'),(187,174,41,4,96,'2024-08-03 00:00:00'),(188,41,3,12,96,'2024-08-07 00:00:00'),(189,10,61,5,35,'2025-04-30 00:00:00'),(190,93,183,9,39,'2024-11-03 00:00:00'),(191,55,50,16,100,'2025-02-20 00:00:00'),(192,119,2,18,63,'2024-07-06 00:00:00'),(193,85,20,8,105,'2024-11-10 00:00:00'),(194,175,123,18,55,'2024-12-28 00:00:00'),(195,296,26,10,68,'2024-07-18 00:00:00'),(196,54,190,11,88,'2024-11-27 00:00:00'),(197,55,50,19,84,'2025-02-14 00:00:00'),(198,30,28,10,60,'2025-03-02 00:00:00'),(199,295,199,14,68,'2024-10-27 00:00:00'),(200,245,39,20,110,'2024-07-09 00:00:00'),(201,NULL,201,101,30,'2025-06-01 10:53:00');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `demployee_qualification`
--

DROP TABLE IF EXISTS `demployee_qualification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `demployee_qualification` (
  `D_employee_id` int NOT NULL,
  `qualification` varchar(100) NOT NULL,
  PRIMARY KEY (`D_employee_id`,`qualification`),
  CONSTRAINT `DEmployee_qualification_ibfk_1` FOREIGN KEY (`D_employee_id`) REFERENCES `doctor` (`D_employee_id`),
  CONSTRAINT `DEmployee_qualification_ibfk_2` FOREIGN KEY (`D_employee_id`) REFERENCES `doctor` (`D_employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `demployee_qualification`
--

LOCK TABLES `demployee_qualification` WRITE;
/*!40000 ALTER TABLE `demployee_qualification` DISABLE KEYS */;
INSERT INTO `demployee_qualification` VALUES (1,'Board Certified'),(1,'MD - Neurology'),(2,'Board Certified'),(2,'MD - Pediatrics'),(3,'Board Certified'),(3,'MD - Surgery'),(3,'Teaching Excellence'),(4,'Board Certified'),(4,'MD - Emergency Medicine'),(5,'Board Certified'),(5,'MD - Cardiology'),(6,'Board Certified'),(6,'MD - Neurology'),(6,'Research Award'),(7,'Board Certified'),(7,'MD - Pediatrics'),(8,'Board Certified'),(8,'MD - Surgery'),(9,'Board Certified'),(9,'MD - Emergency Medicine'),(9,'PhD'),(10,'Board Certified'),(10,'MD - Cardiology'),(11,'Board Certified'),(11,'MD - Neurology'),(12,'Board Certified'),(12,'Fellowship'),(12,'MD - Pediatrics'),(13,'Board Certified'),(13,'MD - Surgery'),(14,'Board Certified'),(14,'MD - Emergency Medicine'),(15,'Board Certified'),(15,'MD - Cardiology'),(15,'Teaching Excellence'),(16,'Board Certified'),(16,'MD - Neurology'),(17,'Board Certified'),(17,'MD - Pediatrics'),(18,'Board Certified'),(18,'MD - Surgery'),(18,'Research Award'),(19,'Board Certified'),(19,'MD - Emergency Medicine'),(20,'Board Certified'),(20,'MD - Cardiology');
/*!40000 ALTER TABLE `demployee_qualification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `head_doctor_id` int DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Emergency','555-0101','Emergency department providing specialized care',10),(2,'Cardiology','555-0102','Cardiology department providing specialized care',1),(3,'Pediatrics','555-0103','Pediatrics department providing specialized care',2),(4,'Radiology','555-0104','Radiology department providing specialized care',3),(5,'Surgery','555-0105','Surgery department providing specialized care',4),(6,'ICU','555-0106','ICU department providing specialized care',5),(7,'Maternity','555-0107','Maternity department providing specialized care',6),(8,'Dialysis','555-0108','Dialysis department providing specialized care',7),(9,'Neurology','555-0109','Neurology department providing specialized care',8),(10,'Oncology','555-0110','Oncology department providing specialized care',9);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dialysisroom`
--

DROP TABLE IF EXISTS `dialysisroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dialysisroom` (
  `Dis_room_id` int NOT NULL,
  `no_of_machines_available` int NOT NULL,
  PRIMARY KEY (`Dis_room_id`),
  CONSTRAINT `dialysisRoom_ibfk_1` FOREIGN KEY (`Dis_room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `dialysisRoom_ibfk_2` FOREIGN KEY (`Dis_room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dialysisroom`
--

LOCK TABLES `dialysisroom` WRITE;
/*!40000 ALTER TABLE `dialysisroom` DISABLE KEYS */;
INSERT INTO `dialysisroom` VALUES (12,1),(20,4),(28,3),(36,1),(44,1),(52,5),(60,3),(68,4),(76,1),(84,2),(92,6),(100,6);
/*!40000 ALTER TABLE `dialysisroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `D_employee_id` int NOT NULL,
  `specialization` varchar(100) NOT NULL,
  PRIMARY KEY (`D_employee_id`),
  CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`D_employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `doctor_ibfk_2` FOREIGN KEY (`D_employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'Neurology'),(2,'Pediatrics'),(3,'Surgery'),(4,'Emergency Medicine'),(5,'Cardiology'),(6,'Neurology'),(7,'Pediatrics'),(8,'Surgery'),(9,'Emergency Medicine'),(10,'Cardiology'),(11,'Neurology'),(12,'Pediatrics'),(13,'Surgery'),(14,'Emergency Medicine'),(15,'Cardiology'),(16,'Neurology'),(17,'Pediatrics'),(18,'Surgery'),(19,'Emergency Medicine'),(20,'Cardiology'),(101,'Surgery');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emergencyroom`
--

DROP TABLE IF EXISTS `emergencyroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emergencyroom` (
  `Eme_room_id` int NOT NULL,
  `severity_level` varchar(50) NOT NULL,
  PRIMARY KEY (`Eme_room_id`),
  CONSTRAINT `emergencyRoom_ibfk_1` FOREIGN KEY (`Eme_room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `emergencyRoom_ibfk_2` FOREIGN KEY (`Eme_room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergencyroom`
--

LOCK TABLES `emergencyroom` WRITE;
/*!40000 ALTER TABLE `emergencyroom` DISABLE KEYS */;
INSERT INTO `emergencyroom` VALUES (14,'Minor'),(22,'Moderate'),(30,'Critical'),(38,'Minor'),(46,'Moderate'),(54,'Critical'),(62,'Minor'),(70,'Moderate'),(78,'Critical'),(86,'Minor'),(94,'Moderate'),(102,'Critical');
/*!40000 ALTER TABLE `emergencyroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `sex` enum('Male','Female') NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `start_working_date` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `hiring_date` date NOT NULL,
  `employee_type` varchar(50) NOT NULL,
  `postal_code_id` int NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `postal_code_id` (`postal_code_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`postal_code_id`) REFERENCES `postalcode` (`postal_code_id`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Female','Sarah','Johnson','555-1001','1973-05-30',159214.00,'2021-09-21','sarah.johnson1@hospital.com','2021-08-29','Doctor',10002,2),(2,'Male','Michael','Williams','555-1002','1970-05-30',177620.00,'2022-06-24','michael.williams2@hospital.com','2022-05-07','Doctor',10003,3),(3,'Female','Emily','Brown','555-1003','1974-05-30',147437.00,'2017-11-05','emily.brown3@hospital.com','2017-11-05','Doctor',10004,4),(4,'Male','David','Davis','555-1004','1980-05-30',143746.00,'2015-12-26','david.davis4@hospital.com','2017-02-24','Doctor',10005,5),(5,'Female','Jennifer','Miller','555-1005','1988-05-30',122772.00,'2022-10-08','jennifer.miller5@hospital.com','2023-03-24','Doctor',10006,6),(6,'Male','Lisa','Wilson','555-1006','1988-05-30',187607.00,'2022-03-03','lisa.wilson6@hospital.com','2024-07-15','Doctor',10007,7),(7,'Female','Robert','Moore','555-1007','1982-05-30',124619.00,'2016-06-14','robert.moore7@hospital.com','2022-04-28','Doctor',10008,8),(8,'Male','Maria','Taylor','555-1008','1966-05-30',148236.00,'2023-06-13','maria.taylor8@hospital.com','2016-03-04','Doctor',10009,9),(9,'Female','Susan','Anderson','555-1009','1999-05-30',151006.00,'2017-01-01','susan.anderson9@hospital.com','2024-12-20','Doctor',10010,10),(10,'Male','James','Thomas','555-1010','1973-05-30',148045.00,'2018-10-14','james.thomas10@hospital.com','2022-10-11','Doctor',10011,1),(11,'Female','William','Jackson','555-1011','1987-05-30',188222.00,'2022-08-20','william.jackson11@hospital.com','2017-02-09','Doctor',10012,2),(12,'Male','George','White','555-1012','1988-05-30',128689.00,'2019-08-04','george.white12@hospital.com','2019-07-18','Doctor',10013,3),(13,'Female','Charles','Harris','555-1013','1993-05-30',134588.00,'2021-12-18','charles.harris13@hospital.com','2023-08-18','Doctor',10014,4),(14,'Male','Patricia','Martin','555-1014','1966-05-30',179937.00,'2023-08-29','patricia.martin14@hospital.com','2019-02-15','Doctor',10015,5),(15,'Female','Joseph','Garcia','555-1015','1976-05-30',137047.00,'2023-05-13','joseph.garcia15@hospital.com','2021-07-24','Doctor',10016,6),(16,'Male','Linda','Martinez','555-1016','1988-05-30',152400.00,'2024-07-12','linda.martinez16@hospital.com','2023-02-24','Doctor',10017,7),(17,'Female','Barbara','Rodriguez','555-1017','1966-05-30',172426.00,'2018-08-28','barbara.rodriguez17@hospital.com','2021-04-10','Doctor',10018,8),(18,'Male','Daniel','Lewis','555-1018','1999-05-30',197710.00,'2018-02-17','daniel.lewis18@hospital.com','2018-02-17','Doctor',10019,9),(19,'Female','Elizabeth','Lee','555-1019','1982-05-30',128071.00,'2024-02-02','elizabeth.lee19@hospital.com','2021-10-26','Doctor',10020,10),(20,'Male','John','Smith','555-1020','1984-05-30',193854.00,'2021-04-07','john.smith20@hospital.com','2022-05-15','Doctor',10021,1),(21,'Female','Sarah','Johnson','555-1021','1989-05-30',64351.00,'2019-11-07','sarah.johnson21@hospital.com','2021-12-07','Nurse',10022,2),(22,'Male','Michael','Williams','555-1022','1998-05-30',59263.00,'2022-02-04','michael.williams22@hospital.com','2018-01-29','Nurse',10023,3),(23,'Female','Emily','Brown','555-1023','1974-05-30',54884.00,'2017-06-17','emily.brown23@hospital.com','2020-07-08','Nurse',10024,4),(24,'Male','David','Davis','555-1024','1998-05-30',75118.00,'2025-05-20','david.davis24@hospital.com','2020-05-24','Nurse',10025,5),(25,'Female','Jennifer','Miller','555-1025','1980-05-30',50090.00,'2020-04-26','jennifer.miller25@hospital.com','2020-01-09','Nurse',10026,6),(26,'Male','Lisa','Wilson','555-1026','1994-05-30',56552.00,'2019-07-07','lisa.wilson26@hospital.com','2022-06-13','Nurse',10027,7),(27,'Female','Robert','Moore','555-1027','1972-05-30',70124.00,'2023-03-28','robert.moore27@hospital.com','2024-08-28','Nurse',10028,8),(28,'Male','Maria','Taylor','555-1028','1972-05-30',61917.00,'2017-04-19','maria.taylor28@hospital.com','2016-09-26','Nurse',10029,9),(29,'Female','Susan','Anderson','555-1029','1964-05-30',77600.00,'2016-07-25','susan.anderson29@hospital.com','2018-09-30','Nurse',10030,10),(30,'Male','James','Thomas','555-1030','1973-05-30',61798.00,'2016-02-14','james.thomas30@hospital.com','2020-09-20','Nurse',10031,1),(31,'Female','William','Jackson','555-1031','1978-05-30',61334.00,'2023-03-29','william.jackson31@hospital.com','2015-11-17','Nurse',10032,2),(32,'Male','George','White','555-1032','1996-05-30',71873.00,'2022-07-05','george.white32@hospital.com','2022-10-05','Nurse',10033,3),(33,'Female','Charles','Harris','555-1033','1982-05-30',64411.00,'2025-01-19','charles.harris33@hospital.com','2018-01-10','Nurse',10034,4),(34,'Male','Patricia','Martin','555-1034','1977-05-30',71566.00,'2017-02-02','patricia.martin34@hospital.com','2025-05-04','Nurse',10035,5),(35,'Female','Joseph','Garcia','555-1035','1979-05-30',69963.00,'2018-04-07','joseph.garcia35@hospital.com','2019-08-15','Nurse',10036,6),(36,'Male','Linda','Martinez','555-1036','1970-05-30',50656.00,'2016-11-20','linda.martinez36@hospital.com','2023-06-01','Nurse',10037,7),(37,'Female','Barbara','Rodriguez','555-1037','1983-05-30',67988.00,'2018-08-19','barbara.rodriguez37@hospital.com','2019-06-23','Nurse',10038,8),(38,'Male','Daniel','Lewis','555-1038','1963-05-30',76752.00,'2018-11-15','daniel.lewis38@hospital.com','2019-06-15','Nurse',10039,9),(39,'Female','Elizabeth','Lee','555-1039','2000-05-30',59057.00,'2020-11-11','elizabeth.lee39@hospital.com','2021-09-16','Nurse',10040,10),(40,'Male','John','Smith','555-1040','1981-05-30',59744.00,'2023-10-17','john.smith40@hospital.com','2017-01-22','Nurse',10041,1),(41,'Female','Sarah','Johnson','555-1041','1973-05-30',78664.00,'2018-06-02','sarah.johnson41@hospital.com','2019-02-02','Nurse',10042,2),(42,'Male','Michael','Williams','555-1042','1998-05-30',62667.00,'2016-03-24','michael.williams42@hospital.com','2022-02-18','Nurse',10043,3),(43,'Female','Emily','Brown','555-1043','1965-05-30',63004.00,'2020-03-31','emily.brown43@hospital.com','2022-07-31','Nurse',10044,4),(44,'Male','David','Davis','555-1044','1966-05-30',64491.00,'2017-04-06','david.davis44@hospital.com','2019-02-21','Nurse',10045,5),(45,'Female','Jennifer','Miller','555-1045','1973-05-30',67345.00,'2017-04-10','jennifer.miller45@hospital.com','2022-01-18','Nurse',10046,6),(46,'Male','Lisa','Wilson','555-1046','1991-05-30',55798.00,'2022-12-20','lisa.wilson46@hospital.com','2018-12-30','Nurse',10047,7),(47,'Female','Robert','Moore','555-1047','1981-05-30',63855.00,'2016-08-27','robert.moore47@hospital.com','2015-06-18','Nurse',10048,8),(48,'Male','Maria','Taylor','555-1048','1987-05-30',72866.00,'2017-10-20','maria.taylor48@hospital.com','2020-03-17','Nurse',10049,9),(49,'Female','Susan','Anderson','555-1049','1988-05-30',51023.00,'2023-04-15','susan.anderson49@hospital.com','2015-10-22','Nurse',10050,10),(50,'Male','James','Thomas','555-1050','1994-05-30',78744.00,'2022-07-23','james.thomas50@hospital.com','2019-11-19','Nurse',10001,1),(51,'Female','William','Jackson','555-1051','1964-05-30',67205.00,'2018-04-17','william.jackson51@hospital.com','2016-06-11','Technician',10002,2),(52,'Male','George','White','555-1052','1987-05-30',46370.00,'2023-02-25','george.white52@hospital.com','2015-10-04','Technician',10003,3),(53,'Female','Charles','Harris','555-1053','1994-05-30',66562.00,'2016-11-09','charles.harris53@hospital.com','2018-06-30','Technician',10004,4),(54,'Male','Patricia','Martin','555-1054','1965-05-30',54723.00,'2022-10-05','patricia.martin54@hospital.com','2023-10-24','Technician',10005,5),(55,'Female','Joseph','Garcia','555-1055','2000-05-30',58571.00,'2018-06-01','joseph.garcia55@hospital.com','2016-09-10','Technician',10006,6),(56,'Male','Linda','Martinez','555-1056','1990-05-30',62312.00,'2018-08-27','linda.martinez56@hospital.com','2022-05-15','Technician',10007,7),(57,'Female','Barbara','Rodriguez','555-1057','1981-05-30',58806.00,'2022-08-06','barbara.rodriguez57@hospital.com','2017-11-21','Technician',10008,8),(58,'Male','Daniel','Lewis','555-1058','1964-05-30',53325.00,'2016-04-25','daniel.lewis58@hospital.com','2019-11-23','Technician',10009,9),(59,'Female','Elizabeth','Lee','555-1059','1999-05-30',57387.00,'2021-07-21','elizabeth.lee59@hospital.com','2020-12-20','Technician',10010,10),(60,'Male','John','Smith','555-1060','1998-05-30',69667.00,'2018-01-02','john.smith60@hospital.com','2017-12-13','Technician',10011,1),(61,'Female','Sarah','Johnson','555-1061','1980-05-30',52639.00,'2025-05-29','sarah.johnson61@hospital.com','2024-07-21','Technician',10012,2),(62,'Male','Michael','Williams','555-1062','1983-05-30',67099.00,'2024-01-25','michael.williams62@hospital.com','2025-03-12','Technician',10013,3),(63,'Female','Emily','Brown','555-1063','1972-05-30',56489.00,'2023-08-02','emily.brown63@hospital.com','2020-01-24','Technician',10014,4),(64,'Male','David','Davis','555-1064','1995-05-30',45843.00,'2017-07-26','david.davis64@hospital.com','2017-03-07','Technician',10015,5),(65,'Female','Jennifer','Miller','555-1065','1970-05-30',53628.00,'2021-01-20','jennifer.miller65@hospital.com','2023-12-17','Technician',10016,6),(66,'Male','Lisa','Wilson','555-1066','1984-05-30',44822.00,'2025-03-20','lisa.wilson66@hospital.com','2024-01-28','Security',10017,7),(67,'Female','Robert','Moore','555-1067','1976-05-30',44767.00,'2021-03-05','robert.moore67@hospital.com','2023-09-30','Security',10018,8),(68,'Male','Maria','Taylor','555-1068','1978-05-30',39632.00,'2016-10-31','maria.taylor68@hospital.com','2021-09-30','Security',10019,9),(69,'Female','Susan','Anderson','555-1069','1990-05-30',37792.00,'2023-10-27','susan.anderson69@hospital.com','2023-01-13','Security',10020,10),(70,'Male','James','Thomas','555-1070','1972-05-30',47708.00,'2024-06-02','james.thomas70@hospital.com','2015-11-15','Security',10021,1),(71,'Female','William','Jackson','555-1071','1981-05-30',42680.00,'2024-01-25','william.jackson71@hospital.com','2024-01-16','Security',10022,2),(72,'Male','George','White','555-1072','1989-05-30',49949.00,'2024-01-11','george.white72@hospital.com','2018-05-24','Security',10023,3),(73,'Female','Charles','Harris','555-1073','1997-05-30',40611.00,'2019-08-06','charles.harris73@hospital.com','2017-07-18','Security',10024,4),(74,'Male','Patricia','Martin','555-1074','1993-05-30',43871.00,'2021-07-25','patricia.martin74@hospital.com','2023-11-25','Security',10025,5),(75,'Female','Joseph','Garcia','555-1075','1976-05-30',43325.00,'2015-09-22','joseph.garcia75@hospital.com','2023-08-05','Security',10026,6),(76,'Male','Linda','Martinez','555-1076','2000-05-30',34633.00,'2022-04-20','linda.martinez76@hospital.com','2023-10-02','Housekeeping',10027,7),(77,'Female','Barbara','Rodriguez','555-1077','1965-05-30',39869.00,'2022-12-24','barbara.rodriguez77@hospital.com','2022-11-07','Housekeeping',10028,8),(78,'Male','Daniel','Lewis','555-1078','1978-05-30',39882.00,'2022-07-19','daniel.lewis78@hospital.com','2020-09-21','Housekeeping',10029,9),(79,'Female','Elizabeth','Lee','555-1079','1981-05-30',30196.00,'2018-12-30','elizabeth.lee79@hospital.com','2023-11-27','Housekeeping',10030,10),(80,'Male','John','Smith','555-1080','1967-05-30',36878.00,'2015-11-14','john.smith80@hospital.com','2018-04-20','Housekeeping',10031,1),(81,'Female','Sarah','Johnson','555-1081','1973-05-30',33331.00,'2019-07-27','sarah.johnson81@hospital.com','2016-03-05','Housekeeping',10032,2),(82,'Male','Michael','Williams','555-1082','1966-05-30',35644.00,'2023-03-21','michael.williams82@hospital.com','2021-05-15','Housekeeping',10033,3),(83,'Female','Emily','Brown','555-1083','1986-05-30',36066.00,'2016-01-04','emily.brown83@hospital.com','2016-07-25','Housekeeping',10034,4),(84,'Male','David','Davis','555-1084','1976-05-30',33615.00,'2015-06-13','david.davis84@hospital.com','2016-05-30','Housekeeping',10035,5),(85,'Female','Jennifer','Miller','555-1085','1980-05-30',38585.00,'2017-11-07','jennifer.miller85@hospital.com','2023-05-06','Housekeeping',10036,6),(86,'Male','Lisa','Wilson','555-1086','1970-05-30',38067.00,'2018-02-22','lisa.wilson86@hospital.com','2025-03-07','Receptionist',10037,7),(87,'Female','Robert','Moore','555-1087','1963-05-30',44025.00,'2023-05-11','robert.moore87@hospital.com','2023-03-10','Receptionist',10038,8),(88,'Male','Maria','Taylor','555-1088','1981-05-30',47247.00,'2019-07-02','maria.taylor88@hospital.com','2020-04-28','Receptionist',10039,9),(89,'Female','Susan','Anderson','555-1089','1970-05-30',39881.00,'2022-04-06','susan.anderson89@hospital.com','2019-05-31','Receptionist',10040,10),(90,'Male','James','Thomas','555-1090','1998-05-30',42175.00,'2023-03-04','james.thomas90@hospital.com','2018-07-24','Receptionist',10041,1),(91,'Female','William','Jackson','555-1091','1970-05-30',45840.00,'2021-12-15','william.jackson91@hospital.com','2019-10-23','Receptionist',10042,2),(92,'Male','George','White','555-1092','1970-05-30',37214.00,'2021-01-04','george.white92@hospital.com','2017-10-29','Receptionist',10043,3),(93,'Female','Charles','Harris','555-1093','1982-05-30',36404.00,'2024-12-15','charles.harris93@hospital.com','2015-12-10','Receptionist',10044,4),(94,'Male','Patricia','Martin','555-1094','1976-05-30',37465.00,'2025-03-29','patricia.martin94@hospital.com','2019-06-27','Receptionist',10045,5),(95,'Female','Joseph','Garcia','555-1095','1964-05-30',46852.00,'2023-04-28','joseph.garcia95@hospital.com','2018-08-30','Receptionist',10046,6),(96,'Male','Linda','Martinez','555-1096','1971-05-30',45824.00,'2021-10-27','linda.martinez96@hospital.com','2019-02-06','Receptionist',10047,7),(97,'Female','Barbara','Rodriguez','555-1097','1997-05-30',42573.00,'2022-07-26','barbara.rodriguez97@hospital.com','2016-04-29','Receptionist',10048,8),(98,'Male','Daniel','Lewis','555-1098','1973-05-30',45975.00,'2019-08-03','daniel.lewis98@hospital.com','2018-03-23','Receptionist',10049,9),(99,'Female','Elizabeth','Lee','555-1099','1967-05-30',36217.00,'2016-10-17','elizabeth.lee99@hospital.com','2024-09-23','Receptionist',10050,10),(100,'Male','John','Smith','555-1100','1970-05-30',43505.00,'2019-09-12','john.smith100@hospital.com','2023-10-28','Receptionist',10001,1),(101,'Male','abdo','alsammany','1234','2025-06-01',2.00,'2025-06-01','smsm@nu.edu','2025-06-01','Doctor',10051,2);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_area_assigned`
--

DROP TABLE IF EXISTS `employee_area_assigned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_area_assigned` (
  `HK_employee_id` int NOT NULL,
  `area_assigned` varchar(100) NOT NULL,
  PRIMARY KEY (`HK_employee_id`,`area_assigned`),
  CONSTRAINT `employee_area_assigned_ibfk_1` FOREIGN KEY (`HK_employee_id`) REFERENCES `housekeeping_staff` (`HK_employee_id`),
  CONSTRAINT `employee_area_assigned_ibfk_2` FOREIGN KEY (`HK_employee_id`) REFERENCES `housekeeping_staff` (`HK_employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_area_assigned`
--

LOCK TABLES `employee_area_assigned` WRITE;
/*!40000 ALTER TABLE `employee_area_assigned` DISABLE KEYS */;
INSERT INTO `employee_area_assigned` VALUES (76,'ICU'),(77,'Surgical Wing'),(78,'Cafeteria'),(78,'Patient Rooms'),(79,'Public Areas'),(80,'Emergency Dept'),(81,'Cafeteria'),(81,'ICU'),(82,'Surgical Wing'),(83,'Patient Rooms'),(84,'Cafeteria'),(84,'Public Areas'),(85,'Emergency Dept');
/*!40000 ALTER TABLE `employee_area_assigned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_equipment_expertise`
--

DROP TABLE IF EXISTS `employee_equipment_expertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_equipment_expertise` (
  `T_employee_id` int NOT NULL,
  `equipment_expertise` varchar(100) NOT NULL,
  PRIMARY KEY (`T_employee_id`,`equipment_expertise`),
  CONSTRAINT `employee_equipment_expertise_ibfk_1` FOREIGN KEY (`T_employee_id`) REFERENCES `technician` (`T_employee_id`),
  CONSTRAINT `employee_equipment_expertise_ibfk_2` FOREIGN KEY (`T_employee_id`) REFERENCES `technician` (`T_employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_equipment_expertise`
--

LOCK TABLES `employee_equipment_expertise` WRITE;
/*!40000 ALTER TABLE `employee_equipment_expertise` DISABLE KEYS */;
INSERT INTO `employee_equipment_expertise` VALUES (51,'Mobile CT'),(51,'Samsung Ultrasound'),(52,'GE X-Ray Machine'),(53,'Siemens CT Scanner'),(54,'Philips MRI Scanner'),(54,'Portable X-Ray'),(55,'Samsung Ultrasound'),(56,'GE X-Ray Machine'),(57,'Doppler Ultrasound'),(57,'Siemens CT Scanner'),(58,'Philips MRI Scanner'),(59,'Samsung Ultrasound'),(60,'3T MRI'),(60,'GE X-Ray Machine'),(61,'Siemens CT Scanner'),(62,'Philips MRI Scanner'),(63,'Mobile CT'),(63,'Samsung Ultrasound'),(64,'GE X-Ray Machine'),(65,'Siemens CT Scanner');
/*!40000 ALTER TABLE `employee_equipment_expertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_tech_area`
--

DROP TABLE IF EXISTS `employee_tech_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_tech_area` (
  `T_employee_id` int NOT NULL,
  `tech_area` varchar(100) NOT NULL,
  PRIMARY KEY (`T_employee_id`,`tech_area`),
  CONSTRAINT `employee_tech_area_ibfk_1` FOREIGN KEY (`T_employee_id`) REFERENCES `technician` (`T_employee_id`),
  CONSTRAINT `employee_tech_area_ibfk_2` FOREIGN KEY (`T_employee_id`) REFERENCES `technician` (`T_employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_tech_area`
--

LOCK TABLES `employee_tech_area` WRITE;
/*!40000 ALTER TABLE `employee_tech_area` DISABLE KEYS */;
INSERT INTO `employee_tech_area` VALUES (51,'Ultrasound'),(52,'X-Ray'),(53,'CT Scan'),(54,'MRI'),(55,'Ultrasound'),(56,'X-Ray'),(57,'CT Scan'),(58,'MRI'),(59,'Ultrasound'),(60,'X-Ray'),(61,'CT Scan'),(62,'MRI'),(63,'Ultrasound'),(64,'X-Ray'),(65,'CT Scan');
/*!40000 ALTER TABLE `employee_tech_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `housekeeping_staff`
--

DROP TABLE IF EXISTS `housekeeping_staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `housekeeping_staff` (
  `HK_employee_id` int NOT NULL,
  PRIMARY KEY (`HK_employee_id`),
  CONSTRAINT `housekeeping_staff_ibfk_1` FOREIGN KEY (`HK_employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `housekeeping_staff`
--

LOCK TABLES `housekeeping_staff` WRITE;
/*!40000 ALTER TABLE `housekeeping_staff` DISABLE KEYS */;
INSERT INTO `housekeeping_staff` VALUES (76),(77),(78),(79),(80),(81),(82),(83),(84),(85);
/*!40000 ALTER TABLE `housekeeping_staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `icuroom`
--

DROP TABLE IF EXISTS `icuroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `icuroom` (
  `ICU_room_id` int NOT NULL,
  PRIMARY KEY (`ICU_room_id`),
  CONSTRAINT `ICURoom_ibfk_1` FOREIGN KEY (`ICU_room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `ICURoom_ibfk_2` FOREIGN KEY (`ICU_room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `icuroom`
--

LOCK TABLES `icuroom` WRITE;
/*!40000 ALTER TABLE `icuroom` DISABLE KEYS */;
INSERT INTO `icuroom` VALUES (2),(8),(16),(24),(32),(40),(48),(56),(64),(72),(80),(88),(96),(104);
/*!40000 ALTER TABLE `icuroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `isolationroom`
--

DROP TABLE IF EXISTS `isolationroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `isolationroom` (
  `Iso_room_id` int NOT NULL,
  `infection_level` varchar(50) NOT NULL,
  PRIMARY KEY (`Iso_room_id`),
  CONSTRAINT `isolationRoom_ibfk_1` FOREIGN KEY (`Iso_room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `isolationRoom_ibfk_2` FOREIGN KEY (`Iso_room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `isolationroom`
--

LOCK TABLES `isolationroom` WRITE;
/*!40000 ALTER TABLE `isolationroom` DISABLE KEYS */;
INSERT INTO `isolationroom` VALUES (13,'Medium'),(21,'High'),(29,'Low'),(37,'Medium'),(45,'High'),(53,'Low'),(61,'Medium'),(69,'High'),(77,'Low'),(85,'Medium'),(93,'High'),(101,'Low');
/*!40000 ALTER TABLE `isolationroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maternityroom`
--

DROP TABLE IF EXISTS `maternityroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maternityroom` (
  `Mat_room_id` int NOT NULL,
  PRIMARY KEY (`Mat_room_id`),
  CONSTRAINT `maternityRoom_ibfk_1` FOREIGN KEY (`Mat_room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `maternityRoom_ibfk_2` FOREIGN KEY (`Mat_room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maternityroom`
--

LOCK TABLES `maternityroom` WRITE;
/*!40000 ALTER TABLE `maternityroom` DISABLE KEYS */;
INSERT INTO `maternityroom` VALUES (5),(11),(19),(27),(35),(43),(51),(59),(67),(75),(83),(91),(99);
/*!40000 ALTER TABLE `maternityroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nemployee_ward_assigned`
--

DROP TABLE IF EXISTS `nemployee_ward_assigned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nemployee_ward_assigned` (
  `N_employee_id` int NOT NULL,
  `ward_assigned` varchar(50) NOT NULL,
  PRIMARY KEY (`N_employee_id`,`ward_assigned`),
  CONSTRAINT `Nemployee_ward_assigned_ibfk_1` FOREIGN KEY (`N_employee_id`) REFERENCES `nurse` (`N_employee_id`),
  CONSTRAINT `Nemployee_ward_assigned_ibfk_2` FOREIGN KEY (`N_employee_id`) REFERENCES `nurse` (`N_employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nemployee_ward_assigned`
--

LOCK TABLES `nemployee_ward_assigned` WRITE;
/*!40000 ALTER TABLE `nemployee_ward_assigned` DISABLE KEYS */;
INSERT INTO `nemployee_ward_assigned` VALUES (21,'Surgical'),(22,'Cardiac'),(23,'Maternity'),(24,'ICU'),(24,'Surgical'),(25,'Emergency'),(26,'Pediatric'),(27,'Surgical'),(28,'Cardiac'),(28,'Emergency'),(29,'Maternity'),(30,'ICU'),(31,'Emergency'),(32,'Maternity'),(32,'Pediatric'),(33,'Surgical'),(34,'Cardiac'),(35,'Maternity'),(36,'ICU'),(36,'Surgical'),(37,'Emergency'),(38,'Pediatric'),(39,'Surgical'),(40,'Cardiac'),(40,'Emergency'),(41,'Maternity'),(42,'ICU'),(43,'Emergency'),(44,'Maternity'),(44,'Pediatric'),(45,'Surgical'),(46,'Cardiac'),(47,'Maternity'),(48,'ICU'),(48,'Surgical'),(49,'Emergency'),(50,'Pediatric');
/*!40000 ALTER TABLE `nemployee_ward_assigned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nurse`
--

DROP TABLE IF EXISTS `nurse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nurse` (
  `N_employee_id` int NOT NULL,
  PRIMARY KEY (`N_employee_id`),
  CONSTRAINT `nurse_ibfk_1` FOREIGN KEY (`N_employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `nurse_ibfk_2` FOREIGN KEY (`N_employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurse`
--

LOCK TABLES `nurse` WRITE;
/*!40000 ALTER TABLE `nurse` DISABLE KEYS */;
INSERT INTO `nurse` VALUES (21),(22),(23),(24),(25),(26),(27),(28),(29),(30),(31),(32),(33),(34),(35),(36),(37),(38),(39),(40),(41),(42),(43),(44),(45),(46),(47),(48),(49),(50);
/*!40000 ALTER TABLE `nurse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `occurs_in`
--

DROP TABLE IF EXISTS `occurs_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `occurs_in` (
  `room_id` int NOT NULL DEFAULT '0',
  `treatment_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`treatment_id`,`room_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `occurs_in_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `occurs_in_ibfk_2` FOREIGN KEY (`treatment_id`) REFERENCES `treatment` (`treatment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `occurs_in`
--

LOCK TABLES `occurs_in` WRITE;
/*!40000 ALTER TABLE `occurs_in` DISABLE KEYS */;
INSERT INTO `occurs_in` VALUES (1,6),(1,16),(2,17),(3,18),(4,1),(4,2),(4,19),(5,20),(6,10),(6,21),(7,8),(7,17),(7,19),(7,22),(8,23),(9,24),(10,3),(10,25),(11,26),(12,27),(13,28),(14,16),(14,29),(15,11),(15,30),(16,31),(17,7),(17,32),(18,4),(18,33),(19,34),(20,10),(20,35),(21,36),(22,18),(22,37),(23,17),(23,20),(23,38),(24,39),(25,40),(26,5),(26,41),(27,42),(28,43),(29,44),(30,45),(31,16),(33,7),(34,1),(34,3),(34,5),(38,13),(38,15),(39,15),(39,19),(41,7),(42,4),(46,20),(47,8),(47,9),(54,6),(55,8),(58,1),(58,2),(62,15),(63,6),(63,9),(63,14),(70,12),(71,18),(78,14),(78,19),(79,12),(86,13),(86,16),(87,18),(90,2),(90,3),(92,10),(95,11),(95,17),(95,20),(102,9),(102,11),(102,12),(102,13),(103,14),(106,4),(106,5);
/*!40000 ALTER TABLE `occurs_in` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operationroom`
--

DROP TABLE IF EXISTS `operationroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operationroom` (
  `OP_room_id` int NOT NULL,
  `is_sterile` tinyint(1) NOT NULL,
  PRIMARY KEY (`OP_room_id`),
  CONSTRAINT `operationRoom_ibfk_1` FOREIGN KEY (`OP_room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `operationRoom_ibfk_2` FOREIGN KEY (`OP_room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operationroom`
--

LOCK TABLES `operationroom` WRITE;
/*!40000 ALTER TABLE `operationroom` DISABLE KEYS */;
INSERT INTO `operationroom` VALUES (3,1),(9,1),(17,1),(25,1),(33,1),(41,1),(49,1),(57,1),(65,1),(73,1),(81,1),(89,1),(97,1),(105,1);
/*!40000 ALTER TABLE `operationroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `sex` enum('Male','Female') NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `postal_code_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`patient_id`),
  KEY `postal_code_id` (`postal_code_id`),
  CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`postal_code_id`) REFERENCES `postalcode` (`postal_code_id`),
  CONSTRAINT `patient_ibfk_2` FOREIGN KEY (`postal_code_id`) REFERENCES `postalcode` (`postal_code_id`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'Female','Oliver','Thompson','2018-12-14','555-2001',10002,'oliver.thompson1@email.com'),(2,'Male','Sophia','Garcia','1950-02-22','555-2002',10003,'sophia.garcia2@email.com'),(3,'Female','Noah','Martinez','1996-12-27','555-2003',10004,'noah.martinez3@email.com'),(4,'Male','Ava','Robinson','1944-10-31','555-2004',10005,'ava.robinson4@email.com'),(5,'Female','Liam','Clark','1954-03-09','555-2005',10006,'liam.clark5@email.com'),(6,'Male','Isabella','Rodriguez','1993-02-26','555-2006',10007,'isabella.rodriguez6@email.com'),(7,'Female','Mason','Lewis','1995-09-06','555-2007',10008,'mason.lewis7@email.com'),(8,'Male','Mia','Lee','1973-07-07','555-2008',10009,'mia.lee8@email.com'),(9,'Female','Ethan','Walker','2019-05-24','555-2009',10010,'ethan.walker9@email.com'),(10,'Male','Charlotte','Hall','1986-09-26','555-2010',10011,'charlotte.hall10@email.com'),(11,'Female','Jacob','Allen','2014-05-11','555-2011',10012,'jacob.allen11@email.com'),(12,'Male','Amelia','Young','2004-01-14','555-2012',10013,'amelia.young12@email.com'),(13,'Female','Lucas','King','1951-09-12','555-2013',10014,'lucas.king13@email.com'),(14,'Male','Harper','Wright','1967-05-15','555-2014',10015,'harper.wright14@email.com'),(15,'Female','Alexander','Lopez','1956-05-05','555-2015',10016,'alexander.lopez15@email.com'),(16,'Male','Evelyn','Hill','2018-06-21','555-2016',10017,'evelyn.hill16@email.com'),(17,'Female','Benjamin','Scott','1951-07-04','555-2017',10018,'benjamin.scott17@email.com'),(18,'Male','Abigail','Green','2005-03-28','555-2018',10019,'abigail.green18@email.com'),(19,'Female','Henry','Adams','1981-12-29','555-2019',10020,'henry.adams19@email.com'),(20,'Male','Emma','Wilson','1950-12-23','555-2020',10021,'emma.wilson20@email.com'),(21,'Female','Oliver','Thompson','1947-10-06','555-2021',10022,'oliver.thompson21@email.com'),(22,'Male','Sophia','Garcia','2024-09-30','555-2022',10023,'sophia.garcia22@email.com'),(23,'Female','Noah','Martinez','2008-08-16','555-2023',10024,'noah.martinez23@email.com'),(24,'Male','Ava','Robinson','1943-06-23','555-2024',10025,'ava.robinson24@email.com'),(25,'Female','Liam','Clark','1994-08-18','555-2025',10026,'liam.clark25@email.com'),(26,'Male','Isabella','Rodriguez','1953-01-13','555-2026',10027,'isabella.rodriguez26@email.com'),(27,'Female','Mason','Lewis','2002-04-16','555-2027',10028,'mason.lewis27@email.com'),(28,'Male','Mia','Lee','1962-08-27','555-2028',10029,'mia.lee28@email.com'),(29,'Female','Ethan','Walker','1945-04-07','555-2029',10030,'ethan.walker29@email.com'),(30,'Male','Charlotte','Hall','1977-03-22','555-2030',10031,'charlotte.hall30@email.com'),(31,'Female','Jacob','Allen','2024-11-26','555-2031',10032,'jacob.allen31@email.com'),(32,'Male','Amelia','Young','2003-03-01','555-2032',10033,'amelia.young32@email.com'),(33,'Female','Lucas','King','1997-11-01','555-2033',10034,'lucas.king33@email.com'),(34,'Male','Harper','Wright','1954-04-11','555-2034',10035,'harper.wright34@email.com'),(35,'Female','Alexander','Lopez','1998-11-10','555-2035',10036,'alexander.lopez35@email.com'),(36,'Male','Evelyn','Hill','2023-12-06','555-2036',10037,'evelyn.hill36@email.com'),(37,'Female','Benjamin','Scott','2015-07-09','555-2037',10038,'benjamin.scott37@email.com'),(38,'Male','Abigail','Green','1980-05-25','555-2038',10039,'abigail.green38@email.com'),(39,'Female','Henry','Adams','1994-04-16','555-2039',10040,'henry.adams39@email.com'),(40,'Male','Emma','Wilson','2004-11-02','555-2040',10041,'emma.wilson40@email.com'),(41,'Female','Oliver','Thompson','2015-12-01','555-2041',10042,'oliver.thompson41@email.com'),(42,'Male','Sophia','Garcia','1957-07-08','555-2042',10043,'sophia.garcia42@email.com'),(43,'Female','Noah','Martinez','1960-10-30','555-2043',10044,'noah.martinez43@email.com'),(44,'Male','Ava','Robinson','1988-04-28','555-2044',10045,'ava.robinson44@email.com'),(45,'Female','Liam','Clark','1951-08-01','555-2045',10046,'liam.clark45@email.com'),(46,'Male','Isabella','Rodriguez','2013-12-07','555-2046',10047,'isabella.rodriguez46@email.com'),(47,'Female','Mason','Lewis','2025-03-26','555-2047',10048,'mason.lewis47@email.com'),(48,'Male','Mia','Lee','1976-10-28','555-2048',10049,'mia.lee48@email.com'),(49,'Female','Ethan','Walker','1947-04-12','555-2049',10050,'ethan.walker49@email.com'),(50,'Male','Charlotte','Hall','1944-10-12','555-2050',10001,'charlotte.hall50@email.com'),(51,'Female','Jacob','Allen','2020-12-04','555-2051',10002,'jacob.allen51@email.com'),(52,'Male','Amelia','Young','1998-06-22','555-2052',10003,'amelia.young52@email.com'),(53,'Female','Lucas','King','1986-04-22','555-2053',10004,'lucas.king53@email.com'),(54,'Male','Harper','Wright','1992-11-03','555-2054',10005,'harper.wright54@email.com'),(55,'Female','Alexander','Lopez','1979-11-13','555-2055',10006,'alexander.lopez55@email.com'),(56,'Male','Evelyn','Hill','1977-07-15','555-2056',10007,'evelyn.hill56@email.com'),(57,'Female','Benjamin','Scott','2004-10-23','555-2057',10008,'benjamin.scott57@email.com'),(58,'Male','Abigail','Green','1983-11-24','555-2058',10009,'abigail.green58@email.com'),(59,'Female','Henry','Adams','1961-10-09','555-2059',10010,'henry.adams59@email.com'),(60,'Male','Emma','Wilson','1996-01-11','555-2060',10011,'emma.wilson60@email.com'),(61,'Female','Oliver','Thompson','1987-04-11','555-2061',10012,'oliver.thompson61@email.com'),(62,'Male','Sophia','Garcia','2005-01-08','555-2062',10013,'sophia.garcia62@email.com'),(63,'Female','Noah','Martinez','1955-09-25','555-2063',10014,'noah.martinez63@email.com'),(64,'Male','Ava','Robinson','1984-08-02','555-2064',10015,'ava.robinson64@email.com'),(65,'Female','Liam','Clark','1948-03-10','555-2065',10016,'liam.clark65@email.com'),(66,'Male','Isabella','Rodriguez','2008-03-07','555-2066',10017,'isabella.rodriguez66@email.com'),(67,'Female','Mason','Lewis','2006-08-30','555-2067',10018,'mason.lewis67@email.com'),(68,'Male','Mia','Lee','1983-05-08','555-2068',10019,'mia.lee68@email.com'),(69,'Female','Ethan','Walker','1953-06-24','555-2069',10020,'ethan.walker69@email.com'),(70,'Male','Charlotte','Hall','1956-03-17','555-2070',10021,'charlotte.hall70@email.com'),(71,'Female','Jacob','Allen','1977-05-03','555-2071',10022,'jacob.allen71@email.com'),(72,'Male','Amelia','Young','1992-08-21','555-2072',10023,'amelia.young72@email.com'),(73,'Female','Lucas','King','2005-10-11','555-2073',10024,'lucas.king73@email.com'),(74,'Male','Harper','Wright','1943-06-05','555-2074',10025,'harper.wright74@email.com'),(75,'Female','Alexander','Lopez','2002-12-03','555-2075',10026,'alexander.lopez75@email.com'),(76,'Male','Evelyn','Hill','1994-08-25','555-2076',10027,'evelyn.hill76@email.com'),(77,'Female','Benjamin','Scott','2021-03-16','555-2077',10028,'benjamin.scott77@email.com'),(78,'Male','Abigail','Green','2014-07-12','555-2078',10029,'abigail.green78@email.com'),(79,'Female','Henry','Adams','1983-08-12','555-2079',10030,'henry.adams79@email.com'),(80,'Male','Emma','Wilson','2013-05-04','555-2080',10031,'emma.wilson80@email.com'),(81,'Female','Oliver','Thompson','2008-04-23','555-2081',10032,'oliver.thompson81@email.com'),(82,'Male','Sophia','Garcia','1976-02-12','555-2082',10033,'sophia.garcia82@email.com'),(83,'Female','Noah','Martinez','1994-07-06','555-2083',10034,'noah.martinez83@email.com'),(84,'Male','Ava','Robinson','2018-10-17','555-2084',10035,'ava.robinson84@email.com'),(85,'Female','Liam','Clark','2002-11-21','555-2085',10036,'liam.clark85@email.com'),(86,'Male','Isabella','Rodriguez','2014-10-17','555-2086',10037,'isabella.rodriguez86@email.com'),(87,'Female','Mason','Lewis','1957-10-01','555-2087',10038,'mason.lewis87@email.com'),(88,'Male','Mia','Lee','1965-05-13','555-2088',10039,'mia.lee88@email.com'),(89,'Female','Ethan','Walker','2010-04-18','555-2089',10040,'ethan.walker89@email.com'),(90,'Male','Charlotte','Hall','1965-09-13','555-2090',10041,'charlotte.hall90@email.com'),(91,'Female','Jacob','Allen','2018-08-11','555-2091',10042,'jacob.allen91@email.com'),(92,'Male','Amelia','Young','2006-04-09','555-2092',10043,'amelia.young92@email.com'),(93,'Female','Lucas','King','1950-02-07','555-2093',10044,'lucas.king93@email.com'),(94,'Male','Harper','Wright','1952-09-12','555-2094',10045,'harper.wright94@email.com'),(95,'Female','Alexander','Lopez','1969-11-27','555-2095',10046,'alexander.lopez95@email.com'),(96,'Male','Evelyn','Hill','1966-01-11','555-2096',10047,'evelyn.hill96@email.com'),(97,'Female','Benjamin','Scott','1977-02-23','555-2097',10048,'benjamin.scott97@email.com'),(98,'Male','Abigail','Green','1962-03-29','555-2098',10049,'abigail.green98@email.com'),(99,'Female','Henry','Adams','2018-08-13','555-2099',10050,'henry.adams99@email.com'),(100,'Male','Emma','Wilson','2016-09-02','555-2100',10001,'emma.wilson100@email.com'),(101,'Female','Oliver','Thompson','2002-02-04','555-2101',10002,'oliver.thompson101@email.com'),(102,'Male','Sophia','Garcia','2017-03-10','555-2102',10003,'sophia.garcia102@email.com'),(103,'Female','Noah','Martinez','1972-02-09','555-2103',10004,'noah.martinez103@email.com'),(104,'Male','Ava','Robinson','1947-11-01','555-2104',10005,'ava.robinson104@email.com'),(105,'Female','Liam','Clark','1961-09-13','555-2105',10006,'liam.clark105@email.com'),(106,'Male','Isabella','Rodriguez','2021-09-25','555-2106',10007,'isabella.rodriguez106@email.com'),(107,'Female','Mason','Lewis','1951-09-30','555-2107',10008,'mason.lewis107@email.com'),(108,'Male','Mia','Lee','1996-08-30','555-2108',10009,'mia.lee108@email.com'),(109,'Female','Ethan','Walker','2020-07-09','555-2109',10010,'ethan.walker109@email.com'),(110,'Male','Charlotte','Hall','2005-01-27','555-2110',10011,'charlotte.hall110@email.com'),(111,'Female','Jacob','Allen','2020-07-11','555-2111',10012,'jacob.allen111@email.com'),(112,'Male','Amelia','Young','1979-11-14','555-2112',10013,'amelia.young112@email.com'),(113,'Female','Lucas','King','1976-08-14','555-2113',10014,'lucas.king113@email.com'),(114,'Male','Harper','Wright','2000-03-18','555-2114',10015,'harper.wright114@email.com'),(115,'Female','Alexander','Lopez','1963-08-26','555-2115',10016,'alexander.lopez115@email.com'),(116,'Male','Evelyn','Hill','1956-06-24','555-2116',10017,'evelyn.hill116@email.com'),(117,'Female','Benjamin','Scott','1948-03-04','555-2117',10018,'benjamin.scott117@email.com'),(118,'Male','Abigail','Green','2010-04-15','555-2118',10019,'abigail.green118@email.com'),(119,'Female','Henry','Adams','2017-03-25','555-2119',10020,'henry.adams119@email.com'),(120,'Male','Emma','Wilson','1947-09-29','555-2120',10021,'emma.wilson120@email.com'),(121,'Female','Oliver','Thompson','1990-02-28','555-2121',10022,'oliver.thompson121@email.com'),(122,'Male','Sophia','Garcia','2000-01-07','555-2122',10023,'sophia.garcia122@email.com'),(123,'Female','Noah','Martinez','2004-03-12','555-2123',10024,'noah.martinez123@email.com'),(124,'Male','Ava','Robinson','1995-07-07','555-2124',10025,'ava.robinson124@email.com'),(125,'Female','Liam','Clark','2021-09-14','555-2125',10026,'liam.clark125@email.com'),(126,'Male','Isabella','Rodriguez','2014-06-04','555-2126',10027,'isabella.rodriguez126@email.com'),(127,'Female','Mason','Lewis','1981-08-09','555-2127',10028,'mason.lewis127@email.com'),(128,'Male','Mia','Lee','2003-08-13','555-2128',10029,'mia.lee128@email.com'),(129,'Female','Ethan','Walker','1965-09-13','555-2129',10030,'ethan.walker129@email.com'),(130,'Male','Charlotte','Hall','1956-07-12','555-2130',10031,'charlotte.hall130@email.com'),(131,'Female','Jacob','Allen','2024-05-25','555-2131',10032,'jacob.allen131@email.com'),(132,'Male','Amelia','Young','1980-08-02','555-2132',10033,'amelia.young132@email.com'),(133,'Female','Lucas','King','1968-08-08','555-2133',10034,'lucas.king133@email.com'),(134,'Male','Harper','Wright','1957-12-20','555-2134',10035,'harper.wright134@email.com'),(135,'Female','Alexander','Lopez','2022-11-25','555-2135',10036,'alexander.lopez135@email.com'),(136,'Male','Evelyn','Hill','1968-10-08','555-2136',10037,'evelyn.hill136@email.com'),(137,'Female','Benjamin','Scott','1996-02-23','555-2137',10038,'benjamin.scott137@email.com'),(138,'Male','Abigail','Green','1966-11-16','555-2138',10039,'abigail.green138@email.com'),(139,'Female','Henry','Adams','1984-10-18','555-2139',10040,'henry.adams139@email.com'),(140,'Male','Emma','Wilson','1997-12-10','555-2140',10041,'emma.wilson140@email.com'),(141,'Female','Oliver','Thompson','2009-11-29','555-2141',10042,'oliver.thompson141@email.com'),(142,'Male','Sophia','Garcia','1948-03-06','555-2142',10043,'sophia.garcia142@email.com'),(143,'Female','Noah','Martinez','2014-04-17','555-2143',10044,'noah.martinez143@email.com'),(144,'Male','Ava','Robinson','1955-02-10','555-2144',10045,'ava.robinson144@email.com'),(145,'Female','Liam','Clark','1953-08-31','555-2145',10046,'liam.clark145@email.com'),(146,'Male','Isabella','Rodriguez','1959-09-21','555-2146',10047,'isabella.rodriguez146@email.com'),(147,'Female','Mason','Lewis','1994-05-04','555-2147',10048,'mason.lewis147@email.com'),(148,'Male','Mia','Lee','1984-12-23','555-2148',10049,'mia.lee148@email.com'),(149,'Female','Ethan','Walker','1998-08-07','555-2149',10050,'ethan.walker149@email.com'),(150,'Male','Charlotte','Hall','2012-08-25','555-2150',10001,'charlotte.hall150@email.com'),(151,'Female','Jacob','Allen','1959-11-27','555-2151',10002,'jacob.allen151@email.com'),(152,'Male','Amelia','Young','1982-07-28','555-2152',10003,'amelia.young152@email.com'),(153,'Female','Lucas','King','2007-09-24','555-2153',10004,'lucas.king153@email.com'),(154,'Male','Harper','Wright','1983-05-19','555-2154',10005,'harper.wright154@email.com'),(155,'Female','Alexander','Lopez','1950-06-10','555-2155',10006,'alexander.lopez155@email.com'),(156,'Male','Evelyn','Hill','2023-01-19','555-2156',10007,'evelyn.hill156@email.com'),(157,'Female','Benjamin','Scott','1992-02-10','555-2157',10008,'benjamin.scott157@email.com'),(158,'Male','Abigail','Green','1948-02-17','555-2158',10009,'abigail.green158@email.com'),(159,'Female','Henry','Adams','1985-04-24','555-2159',10010,'henry.adams159@email.com'),(160,'Male','Emma','Wilson','1974-08-15','555-2160',10011,'emma.wilson160@email.com'),(161,'Female','Oliver','Thompson','1973-11-20','555-2161',10012,'oliver.thompson161@email.com'),(162,'Male','Sophia','Garcia','2002-04-20','555-2162',10013,'sophia.garcia162@email.com'),(163,'Female','Noah','Martinez','1982-04-18','555-2163',10014,'noah.martinez163@email.com'),(164,'Male','Ava','Robinson','1961-04-16','555-2164',10015,'ava.robinson164@email.com'),(165,'Female','Liam','Clark','1998-06-07','555-2165',10016,'liam.clark165@email.com'),(166,'Male','Isabella','Rodriguez','2000-09-25','555-2166',10017,'isabella.rodriguez166@email.com'),(167,'Female','Mason','Lewis','1982-12-22','555-2167',10018,'mason.lewis167@email.com'),(168,'Male','Mia','Lee','1969-05-19','555-2168',10019,'mia.lee168@email.com'),(169,'Female','Ethan','Walker','1954-09-16','555-2169',10020,'ethan.walker169@email.com'),(170,'Male','Charlotte','Hall','2004-04-06','555-2170',10021,'charlotte.hall170@email.com'),(171,'Female','Jacob','Allen','1967-07-03','555-2171',10022,'jacob.allen171@email.com'),(172,'Male','Amelia','Young','1963-08-01','555-2172',10023,'amelia.young172@email.com'),(173,'Female','Lucas','King','1972-02-18','555-2173',10024,'lucas.king173@email.com'),(174,'Male','Harper','Wright','1944-06-29','555-2174',10025,'harper.wright174@email.com'),(175,'Female','Alexander','Lopez','1944-12-09','555-2175',10026,'alexander.lopez175@email.com'),(176,'Male','Evelyn','Hill','1947-12-09','555-2176',10027,'evelyn.hill176@email.com'),(177,'Female','Benjamin','Scott','1961-08-03','555-2177',10028,'benjamin.scott177@email.com'),(178,'Male','Abigail','Green','2020-11-11','555-2178',10029,'abigail.green178@email.com'),(179,'Female','Henry','Adams','1947-09-21','555-2179',10030,'henry.adams179@email.com'),(180,'Male','Emma','Wilson','1979-02-26','555-2180',10031,'emma.wilson180@email.com'),(181,'Female','Oliver','Thompson','1945-01-22','555-2181',10032,'oliver.thompson181@email.com'),(182,'Male','Sophia','Garcia','2008-10-30','555-2182',10033,'sophia.garcia182@email.com'),(183,'Female','Noah','Martinez','2019-04-18','555-2183',10034,'noah.martinez183@email.com'),(184,'Male','Ava','Robinson','1962-06-05','555-2184',10035,'ava.robinson184@email.com'),(185,'Female','Liam','Clark','1975-03-29','555-2185',10036,'liam.clark185@email.com'),(186,'Male','Isabella','Rodriguez','1963-07-06','555-2186',10037,'isabella.rodriguez186@email.com'),(187,'Female','Mason','Lewis','1948-07-23','555-2187',10038,'mason.lewis187@email.com'),(188,'Male','Mia','Lee','1991-02-15','555-2188',10039,'mia.lee188@email.com'),(189,'Female','Ethan','Walker','2002-05-23','555-2189',10040,'ethan.walker189@email.com'),(190,'Male','Charlotte','Hall','2013-03-06','555-2190',10041,'charlotte.hall190@email.com'),(191,'Female','Jacob','Allen','1951-02-28','555-2191',10042,'jacob.allen191@email.com'),(192,'Male','Amelia','Young','2019-05-26','555-2192',10043,'amelia.young192@email.com'),(193,'Female','Lucas','King','1971-09-12','555-2193',10044,'lucas.king193@email.com'),(194,'Male','Harper','Wright','2021-04-12','555-2194',10045,'harper.wright194@email.com'),(195,'Female','Alexander','Lopez','2001-08-16','555-2195',10046,'alexander.lopez195@email.com'),(196,'Male','Evelyn','Hill','2001-01-04','555-2196',10047,'evelyn.hill196@email.com'),(197,'Female','Benjamin','Scott','1974-10-09','555-2197',10048,'benjamin.scott197@email.com'),(198,'Male','Abigail','Green','2009-09-04','555-2198',10049,'abigail.green198@email.com'),(199,'Female','Henry','Adams','2016-07-11','555-2199',10050,'henry.adams199@email.com'),(200,'Male','Emma','Wilson','1946-01-20','555-2200',10001,'emma.wilson200@email.com'),(201,'Male','abdo','alsammany','2003-09-05','1243',10001,'smsm@nu.edu'),(202,'Male','Ahmed','Mohamed','2000-01-01','1234',10052,'Ahmed@nu.edu.eg');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `payment_date` date NOT NULL,
  `amount_paid` decimal(10,2) NOT NULL,
  `payment_method` enum('Cash','Credit Card','Insurance','Other') NOT NULL,
  `transaction_reference` varchar(100) DEFAULT NULL,
  `payment_status` enum('Pending','Completed','Failed','Refunded') NOT NULL,
  `patient_id` int NOT NULL,
  `R_employee_id` int DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `patient_id` (`patient_id`),
  KEY `R_employee_id` (`R_employee_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`R_employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `payment_ibfk_3` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `payment_ibfk_4` FOREIGN KEY (`R_employee_id`) REFERENCES `receptionist` (`R_employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'2024-06-08',1384.00,'Credit Card','TRX000001','Refunded',184,94),(2,'2025-03-15',1488.00,'Other','TRX000002','Refunded',101,95),(3,'2024-09-02',3863.00,'Insurance','TRX000003','Completed',126,97),(4,'2025-05-23',3903.00,'Insurance','TRX000004','Completed',192,93),(5,'2024-11-23',828.00,'Cash','TRX000005','Completed',156,93),(6,'2025-03-30',1822.00,'Cash','TRX000006','Pending',108,94),(7,'2025-01-31',4419.00,'Credit Card','TRX000007','Pending',109,91),(8,'2025-03-04',494.00,'Insurance','TRX000008','Pending',134,99),(9,'2024-10-30',930.00,'Cash','TRX000009','Refunded',62,98),(10,'2025-04-20',763.00,'Credit Card','TRX000010','Completed',61,96),(11,'2024-08-29',2949.00,'Insurance','TRX000011','Pending',89,93),(12,'2025-05-09',4448.00,'Cash','TRX000012','Pending',137,96),(13,'2024-12-17',872.00,'Credit Card','TRX000013','Failed',185,96),(14,'2024-08-30',3292.00,'Other','TRX000014','Refunded',35,92),(15,'2024-08-29',2085.00,'Insurance','TRX000015','Completed',32,91),(16,'2024-12-20',392.00,'Other','TRX000016','Failed',75,99),(17,'2025-01-07',1416.00,'Cash','TRX000017','Refunded',200,91),(18,'2024-09-02',3409.00,'Cash','TRX000018','Completed',5,97),(19,'2024-10-18',4437.00,'Credit Card','TRX000019','Refunded',162,93),(20,'2024-06-26',1238.00,'Credit Card','TRX000020','Pending',79,96),(21,'2025-02-25',1244.00,'Credit Card','TRX000021','Pending',146,87),(22,'2024-12-17',4463.00,'Cash','TRX000022','Completed',44,96),(23,'2024-06-08',3627.00,'Insurance','TRX000023','Refunded',122,91),(24,'2025-04-19',2169.00,'Insurance','TRX000024','Completed',151,95),(25,'2024-08-08',1119.00,'Insurance','TRX000025','Completed',187,95),(26,'2024-12-30',861.00,'Insurance','TRX000026','Pending',196,94),(27,'2025-05-30',1344.00,'Cash','TRX000027','Completed',94,86),(28,'2024-08-29',3415.00,'Cash','TRX000028','Completed',87,88),(29,'2024-09-21',4352.00,'Cash','TRX000029','Completed',63,92),(30,'2025-02-26',4947.00,'Cash','TRX000030','Completed',28,90),(31,'2024-06-15',4900.00,'Other','TRX000031','Refunded',9,99),(32,'2024-12-11',3002.00,'Credit Card','TRX000032','Refunded',52,86),(33,'2024-12-21',468.00,'Cash','TRX000033','Pending',181,93),(34,'2024-09-16',429.00,'Cash','TRX000034','Refunded',190,100),(35,'2024-06-03',362.00,'Credit Card','TRX000035','Completed',122,88),(36,'2024-06-17',1570.00,'Insurance','TRX000036','Pending',19,99),(37,'2025-02-20',3231.00,'Credit Card','TRX000037','Failed',110,95),(38,'2024-11-22',3641.00,'Other','TRX000038','Refunded',189,91),(39,'2025-05-11',794.00,'Insurance','TRX000039','Completed',143,97),(40,'2024-09-20',927.00,'Other','TRX000040','Completed',7,91),(41,'2024-08-06',4776.00,'Cash','TRX000041','Completed',3,86),(42,'2025-03-13',4676.00,'Other','TRX000042','Refunded',167,91),(43,'2025-01-16',3717.00,'Insurance','TRX000043','Completed',91,87),(44,'2025-05-24',4417.00,'Credit Card','TRX000044','Failed',160,98),(45,'2024-08-09',2657.00,'Cash','TRX000045','Pending',75,92),(46,'2024-07-14',1016.00,'Credit Card','TRX000046','Refunded',110,87),(47,'2024-08-15',3585.00,'Cash','TRX000047','Completed',6,96),(48,'2024-11-10',2993.00,'Cash','TRX000048','Completed',98,87),(49,'2025-04-12',1652.00,'Cash','TRX000049','Refunded',141,86),(50,'2024-06-05',4445.00,'Credit Card','TRX000050','Completed',110,96),(51,'2024-07-07',1906.00,'Cash','TRX000051','Completed',24,87),(52,'2025-03-11',3867.00,'Cash','TRX000052','Completed',15,93),(53,'2025-01-04',2268.00,'Other','TRX000053','Failed',150,88),(54,'2024-11-17',1110.00,'Credit Card','TRX000054','Completed',190,92),(55,'2025-02-10',1211.00,'Cash','TRX000055','Completed',50,87),(56,'2024-07-16',5069.00,'Credit Card','TRX000056','Refunded',154,94),(57,'2025-01-05',1970.00,'Insurance','TRX000057','Completed',54,94),(58,'2025-05-26',1962.00,'Other','TRX000058','Pending',111,97),(59,'2025-04-27',1163.00,'Other','TRX000059','Completed',15,93),(60,'2025-02-06',297.00,'Credit Card','TRX000060','Pending',41,92),(61,'2024-11-25',1520.00,'Other','TRX000061','Failed',42,90),(62,'2024-06-11',4552.00,'Insurance','TRX000062','Pending',129,86),(63,'2025-01-28',2682.00,'Insurance','TRX000063','Completed',186,95),(64,'2024-12-27',1064.00,'Insurance','TRX000064','Refunded',82,91),(65,'2024-11-23',2806.00,'Cash','TRX000065','Pending',51,98),(66,'2025-01-06',2525.00,'Cash','TRX000066','Failed',5,99),(67,'2025-02-21',3829.00,'Other','TRX000067','Completed',9,88),(68,'2024-11-13',1688.00,'Other','TRX000068','Refunded',52,98),(69,'2025-02-23',4625.00,'Insurance','TRX000069','Refunded',100,96),(70,'2024-07-06',2421.00,'Insurance','TRX000070','Failed',136,90),(71,'2025-02-06',3835.00,'Other','TRX000071','Refunded',91,100),(72,'2025-01-23',4740.00,'Insurance','TRX000072','Pending',12,97),(73,'2024-08-28',2200.00,'Other','TRX000073','Refunded',19,96),(74,'2025-03-21',4555.00,'Other','TRX000074','Failed',169,88),(75,'2025-03-22',2706.00,'Cash','TRX000075','Failed',179,95),(76,'2024-10-13',934.00,'Other','TRX000076','Pending',64,99),(77,'2024-12-02',4082.00,'Insurance','TRX000077','Pending',35,92),(78,'2024-09-06',1628.00,'Credit Card','TRX000078','Refunded',161,96),(79,'2025-03-04',152.00,'Credit Card','TRX000079','Failed',31,99),(80,'2024-06-18',609.00,'Insurance','TRX000080','Refunded',195,99),(81,'2024-11-03',900.00,'Cash','TRX000081','Refunded',104,96),(82,'2025-05-05',976.00,'Insurance','TRX000082','Refunded',5,96),(83,'2024-12-09',1280.00,'Other','TRX000083','Pending',46,98),(84,'2024-12-25',3495.00,'Cash','TRX000084','Failed',48,95),(85,'2024-11-09',4134.00,'Credit Card','TRX000085','Completed',20,88),(86,'2024-11-29',198.00,'Insurance','TRX000086','Refunded',188,98),(87,'2025-01-08',2228.00,'Other','TRX000087','Failed',153,89),(88,'2024-08-03',2373.00,'Other','TRX000088','Failed',162,87),(89,'2025-04-23',1084.00,'Insurance','TRX000089','Refunded',198,93),(90,'2024-09-20',4421.00,'Cash','TRX000090','Failed',84,88),(91,'2024-09-21',4496.00,'Credit Card','TRX000091','Pending',26,94),(92,'2024-12-09',3328.00,'Other','TRX000092','Pending',31,92),(93,'2024-10-30',3537.00,'Insurance','TRX000093','Completed',183,91),(94,'2025-04-18',2468.00,'Cash','TRX000094','Failed',48,89),(95,'2025-01-03',1816.00,'Insurance','TRX000095','Failed',3,94),(96,'2024-09-21',4114.00,'Other','TRX000096','Completed',176,91),(97,'2025-04-22',2514.00,'Cash','TRX000097','Pending',189,94),(98,'2025-05-11',2783.00,'Insurance','TRX000098','Refunded',85,87),(99,'2025-01-27',1766.00,'Insurance','TRX000099','Pending',50,93),(100,'2024-07-09',4465.00,'Insurance','TRX000100','Refunded',29,88),(101,'2024-11-29',4788.00,'Cash','TRX000101','Pending',28,89),(102,'2024-07-04',3806.00,'Other','TRX000102','Failed',114,96),(103,'2024-07-10',1581.00,'Other','TRX000103','Pending',84,94),(104,'2024-10-27',1321.00,'Credit Card','TRX000104','Failed',65,100),(105,'2025-05-25',514.00,'Credit Card','TRX000105','Failed',195,86),(106,'2025-04-19',2878.00,'Credit Card','TRX000106','Failed',41,93),(107,'2024-06-12',1491.00,'Credit Card','TRX000107','Failed',154,99),(108,'2025-04-29',4095.00,'Insurance','TRX000108','Completed',47,90),(109,'2024-08-02',1183.00,'Insurance','TRX000109','Completed',199,99),(110,'2025-01-01',2191.00,'Other','TRX000110','Pending',141,91),(111,'2024-10-21',116.00,'Cash','TRX000111','Refunded',52,91),(112,'2025-04-08',2941.00,'Credit Card','TRX000112','Completed',99,92),(113,'2024-10-03',115.00,'Cash','TRX000113','Pending',195,89),(114,'2025-04-23',4571.00,'Cash','TRX000114','Pending',47,96),(115,'2024-07-02',2060.00,'Cash','TRX000115','Refunded',22,95),(116,'2024-06-08',4642.00,'Insurance','TRX000116','Completed',163,87),(117,'2024-06-29',1994.00,'Cash','TRX000117','Failed',83,91),(118,'2024-11-04',3910.00,'Cash','TRX000118','Pending',167,93),(119,'2024-07-03',569.00,'Insurance','TRX000119','Completed',2,96),(120,'2024-12-31',122.00,'Other','TRX000120','Refunded',37,89),(121,'2024-12-17',3377.00,'Other','TRX000121','Failed',90,90),(122,'2025-03-19',454.00,'Other','TRX000122','Failed',120,90),(123,'2024-11-03',298.00,'Credit Card','TRX000123','Completed',199,87),(124,'2024-11-08',2404.00,'Insurance','TRX000124','Refunded',5,97),(125,'2024-08-25',2650.00,'Credit Card','TRX000125','Refunded',30,91),(126,'2024-12-21',453.00,'Cash','TRX000126','Refunded',132,92),(127,'2025-03-16',3733.00,'Cash','TRX000127','Refunded',74,89),(128,'2024-07-05',4632.00,'Other','TRX000128','Completed',111,94),(129,'2025-05-18',2891.00,'Insurance','TRX000129','Refunded',162,96),(130,'2025-04-15',2571.00,'Cash','TRX000130','Pending',151,96),(131,'2025-01-07',3976.00,'Insurance','TRX000131','Pending',147,88),(132,'2024-10-24',2704.00,'Other','TRX000132','Completed',190,90),(133,'2024-08-23',4464.00,'Cash','TRX000133','Failed',39,100),(134,'2025-03-26',269.00,'Insurance','TRX000134','Pending',89,100),(135,'2024-09-28',1874.00,'Other','TRX000135','Refunded',97,88),(136,'2025-02-18',4907.00,'Other','TRX000136','Refunded',182,95),(137,'2024-11-07',4237.00,'Credit Card','TRX000137','Refunded',127,97),(138,'2024-07-17',550.00,'Other','TRX000138','Refunded',38,87),(139,'2024-06-22',2087.00,'Cash','TRX000139','Failed',159,100),(140,'2024-11-24',3298.00,'Insurance','TRX000140','Completed',158,99),(141,'2025-05-16',2914.00,'Insurance','TRX000141','Refunded',165,97),(142,'2024-12-27',4001.00,'Insurance','TRX000142','Refunded',31,91),(143,'2025-03-13',443.00,'Insurance','TRX000143','Completed',81,87),(144,'2025-01-18',2433.00,'Cash','TRX000144','Refunded',87,95),(145,'2024-06-15',4285.00,'Credit Card','TRX000145','Pending',69,94),(146,'2024-09-15',4508.00,'Credit Card','TRX000146','Refunded',53,98),(147,'2025-02-03',757.00,'Insurance','TRX000147','Pending',91,100),(148,'2025-02-03',4034.00,'Other','TRX000148','Failed',138,98),(149,'2025-02-22',3792.00,'Other','TRX000149','Pending',105,99),(150,'2024-06-27',4761.00,'Other','TRX000150','Failed',90,91),(151,'2024-11-02',3688.00,'Other','TRX000151','Pending',61,100),(152,'2024-07-02',3440.00,'Insurance','TRX000152','Pending',67,94),(153,'2024-08-06',2035.00,'Credit Card','TRX000153','Completed',12,91),(154,'2024-10-21',4947.00,'Cash','TRX000154','Pending',14,95),(155,'2025-05-23',929.00,'Other','TRX000155','Completed',95,90),(156,'2025-05-18',1616.00,'Credit Card','TRX000156','Pending',102,87),(157,'2024-07-03',1554.00,'Insurance','TRX000157','Refunded',123,97),(158,'2025-04-30',414.00,'Cash','TRX000158','Pending',104,88),(159,'2025-03-02',3820.00,'Other','TRX000159','Failed',110,95),(160,'2024-11-21',3651.00,'Other','TRX000160','Refunded',8,97),(161,'2024-08-08',3601.00,'Cash','TRX000161','Completed',12,93),(162,'2024-12-21',3249.00,'Other','TRX000162','Completed',172,93),(163,'2024-08-01',3581.00,'Other','TRX000163','Refunded',104,99),(164,'2024-07-17',3568.00,'Other','TRX000164','Pending',98,97),(165,'2024-11-22',1154.00,'Credit Card','TRX000165','Refunded',148,88),(166,'2024-11-08',1712.00,'Other','TRX000166','Failed',176,88),(167,'2025-03-29',2007.00,'Credit Card','TRX000167','Refunded',172,99),(168,'2024-08-06',2299.00,'Other','TRX000168','Completed',199,95),(169,'2025-05-16',2045.00,'Other','TRX000169','Refunded',77,100),(170,'2024-08-19',4818.00,'Credit Card','TRX000170','Pending',43,98),(171,'2024-10-26',2263.00,'Credit Card','TRX000171','Failed',181,96),(172,'2024-09-20',2189.00,'Cash','TRX000172','Refunded',20,100),(173,'2024-09-25',2143.00,'Cash','TRX000173','Refunded',21,86),(174,'2024-07-30',533.00,'Other','TRX000174','Completed',41,98),(175,'2024-12-16',4229.00,'Other','TRX000175','Completed',123,99),(176,'2024-09-12',4269.00,'Cash','TRX000176','Failed',26,96),(177,'2025-03-25',3944.00,'Credit Card','TRX000177','Pending',8,95),(178,'2025-05-26',1016.00,'Other','TRX000178','Refunded',134,97),(179,'2024-08-25',2858.00,'Credit Card','TRX000179','Failed',17,90),(180,'2025-02-03',3363.00,'Credit Card','TRX000180','Failed',1,89),(181,'2025-02-23',2903.00,'Cash','TRX000181','Completed',159,99),(182,'2025-05-26',2197.00,'Cash','TRX000182','Pending',21,91),(183,'2025-01-12',4550.00,'Credit Card','TRX000183','Refunded',89,94),(184,'2024-10-26',1178.00,'Credit Card','TRX000184','Refunded',74,90),(185,'2025-02-20',2776.00,'Other','TRX000185','Failed',184,93),(186,'2024-09-27',4625.00,'Insurance','TRX000186','Refunded',130,96),(187,'2024-09-17',1665.00,'Credit Card','TRX000187','Completed',116,96),(188,'2024-09-01',3250.00,'Other','TRX000188','Failed',170,87),(189,'2024-07-26',5029.00,'Credit Card','TRX000189','Pending',187,94),(190,'2025-04-20',4152.00,'Insurance','TRX000190','Pending',144,87),(191,'2025-03-26',3562.00,'Other','TRX000191','Failed',194,89),(192,'2025-04-26',4440.00,'Cash','TRX000192','Failed',53,89),(193,'2024-12-19',2546.00,'Cash','TRX000193','Pending',16,88),(194,'2024-12-06',5009.00,'Credit Card','TRX000194','Completed',92,88),(195,'2024-11-13',955.00,'Cash','TRX000195','Failed',61,96),(196,'2024-08-30',2886.00,'Insurance','TRX000196','Pending',84,87),(197,'2025-04-07',2538.00,'Cash','TRX000197','Failed',139,98),(198,'2025-03-28',1680.00,'Cash','TRX000198','Completed',113,97),(199,'2025-03-23',3149.00,'Credit Card','TRX000199','Failed',111,100),(200,'2025-04-05',4473.00,'Other','TRX000200','Refunded',2,88),(201,'2024-06-22',640.00,'Insurance','TRX000201','Completed',82,87),(202,'2025-03-14',4074.00,'Credit Card','TRX000202','Completed',110,97),(203,'2025-01-21',1950.00,'Other','TRX000203','Refunded',164,94),(204,'2025-01-05',1511.00,'Cash','TRX000204','Pending',111,86),(205,'2024-11-28',2225.00,'Insurance','TRX000205','Refunded',30,91),(206,'2025-02-11',2277.00,'Credit Card','TRX000206','Pending',163,95),(207,'2024-07-15',2048.00,'Credit Card','TRX000207','Completed',40,96),(208,'2024-07-23',1117.00,'Credit Card','TRX000208','Failed',194,98),(209,'2025-03-03',3740.00,'Other','TRX000209','Completed',38,97),(210,'2025-01-22',2122.00,'Other','TRX000210','Failed',56,92),(211,'2024-11-29',644.00,'Cash','TRX000211','Refunded',57,97),(212,'2024-06-01',3456.00,'Credit Card','TRX000212','Refunded',15,98),(213,'2025-04-28',4396.00,'Cash','TRX000213','Failed',147,100),(214,'2024-10-14',1309.00,'Credit Card','TRX000214','Refunded',127,91),(215,'2025-04-30',1256.00,'Other','TRX000215','Refunded',73,91),(216,'2024-08-09',4543.00,'Cash','TRX000216','Completed',54,100),(217,'2024-07-12',3083.00,'Credit Card','TRX000217','Refunded',91,94),(218,'2024-11-06',418.00,'Insurance','TRX000218','Refunded',179,94),(219,'2025-02-27',2680.00,'Other','TRX000219','Failed',51,95),(220,'2025-01-05',624.00,'Credit Card','TRX000220','Completed',126,88),(221,'2024-06-10',1845.00,'Other','TRX000221','Pending',199,96),(222,'2025-01-06',4874.00,'Insurance','TRX000222','Pending',120,97),(223,'2025-04-22',1053.00,'Insurance','TRX000223','Failed',13,94),(224,'2024-11-18',162.00,'Credit Card','TRX000224','Completed',52,90),(225,'2024-10-17',1362.00,'Credit Card','TRX000225','Completed',51,91),(226,'2025-04-28',1816.00,'Credit Card','TRX000226','Pending',131,96),(227,'2024-12-28',443.00,'Cash','TRX000227','Pending',166,93),(228,'2024-06-01',2544.00,'Credit Card','TRX000228','Refunded',145,88),(229,'2024-10-15',3296.00,'Credit Card','TRX000229','Failed',124,99),(230,'2024-08-15',923.00,'Credit Card','TRX000230','Refunded',98,88),(231,'2025-03-17',3196.00,'Credit Card','TRX000231','Failed',72,87),(232,'2025-01-05',3657.00,'Credit Card','TRX000232','Failed',64,94),(233,'2024-08-21',1270.00,'Other','TRX000233','Failed',29,87),(234,'2025-05-10',5053.00,'Other','TRX000234','Refunded',87,90),(235,'2025-04-20',3685.00,'Cash','TRX000235','Pending',148,92),(236,'2024-08-15',3850.00,'Credit Card','TRX000236','Failed',11,91),(237,'2024-10-21',4955.00,'Cash','TRX000237','Completed',53,93),(238,'2024-10-13',3606.00,'Insurance','TRX000238','Refunded',9,90),(239,'2025-02-14',3035.00,'Cash','TRX000239','Failed',156,87),(240,'2025-04-03',2559.00,'Other','TRX000240','Completed',64,89),(241,'2025-04-15',5011.00,'Insurance','TRX000241','Failed',10,86),(242,'2025-04-15',2411.00,'Other','TRX000242','Completed',128,90),(243,'2024-09-24',2326.00,'Cash','TRX000243','Failed',87,91),(244,'2024-11-01',3853.00,'Cash','TRX000244','Refunded',65,100),(245,'2024-07-01',3283.00,'Credit Card','TRX000245','Completed',39,86),(246,'2024-09-28',1129.00,'Cash','TRX000246','Completed',54,100),(247,'2024-06-09',114.00,'Cash','TRX000247','Completed',191,92),(248,'2025-02-27',141.00,'Credit Card','TRX000248','Completed',199,98),(249,'2025-01-29',519.00,'Credit Card','TRX000249','Refunded',188,88),(250,'2025-05-12',3804.00,'Insurance','TRX000250','Failed',193,89),(251,'2025-01-30',4718.00,'Insurance','TRX000251','Completed',189,95),(252,'2025-03-11',1500.00,'Insurance','TRX000252','Refunded',5,94),(253,'2024-08-25',673.00,'Credit Card','TRX000253','Pending',123,97),(254,'2025-05-03',206.00,'Other','TRX000254','Completed',25,94),(255,'2025-01-09',1538.00,'Credit Card','TRX000255','Failed',139,100),(256,'2024-09-20',3078.00,'Other','TRX000256','Failed',196,96),(257,'2024-12-23',837.00,'Credit Card','TRX000257','Failed',79,97),(258,'2024-11-25',1813.00,'Cash','TRX000258','Refunded',170,94),(259,'2024-12-25',1934.00,'Insurance','TRX000259','Failed',106,97),(260,'2025-04-25',1471.00,'Cash','TRX000260','Failed',143,97),(261,'2024-08-18',2887.00,'Credit Card','TRX000261','Failed',76,89),(262,'2025-03-27',594.00,'Other','TRX000262','Failed',147,87),(263,'2025-03-14',4163.00,'Credit Card','TRX000263','Failed',56,89),(264,'2025-01-18',597.00,'Credit Card','TRX000264','Failed',104,91),(265,'2025-03-29',4196.00,'Insurance','TRX000265','Completed',107,90),(266,'2024-07-11',2814.00,'Cash','TRX000266','Failed',6,89),(267,'2025-05-07',3278.00,'Other','TRX000267','Pending',18,92),(268,'2024-07-22',111.00,'Credit Card','TRX000268','Pending',155,88),(269,'2024-10-02',3659.00,'Insurance','TRX000269','Refunded',22,89),(270,'2024-08-02',2302.00,'Insurance','TRX000270','Completed',63,96),(271,'2024-12-26',661.00,'Credit Card','TRX000271','Pending',108,92),(272,'2024-09-20',460.00,'Credit Card','TRX000272','Pending',46,93),(273,'2024-09-03',1282.00,'Other','TRX000273','Pending',156,93),(274,'2025-04-26',136.00,'Other','TRX000274','Refunded',105,91),(275,'2025-04-09',3497.00,'Other','TRX000275','Refunded',45,95),(276,'2024-11-25',3313.00,'Insurance','TRX000276','Completed',69,90),(277,'2024-12-31',1084.00,'Insurance','TRX000277','Pending',91,98),(278,'2024-07-14',4357.00,'Insurance','TRX000278','Failed',183,99),(279,'2024-09-13',4558.00,'Credit Card','TRX000279','Refunded',147,98),(280,'2025-05-10',3722.00,'Credit Card','TRX000280','Pending',23,90),(281,'2025-05-27',1337.00,'Cash','TRX000281','Completed',166,90),(282,'2024-07-06',3445.00,'Insurance','TRX000282','Pending',26,86),(283,'2024-10-14',727.00,'Insurance','TRX000283','Completed',121,99),(284,'2024-08-31',5064.00,'Insurance','TRX000284','Failed',20,93),(285,'2025-01-22',926.00,'Other','TRX000285','Completed',108,94),(286,'2025-02-15',3552.00,'Insurance','TRX000286','Refunded',137,96),(287,'2024-10-18',4491.00,'Insurance','TRX000287','Pending',171,100),(288,'2025-02-03',3400.00,'Credit Card','TRX000288','Refunded',147,91),(289,'2024-08-18',3737.00,'Credit Card','TRX000289','Completed',87,91),(290,'2024-10-15',4938.00,'Other','TRX000290','Refunded',149,99),(291,'2025-01-04',1255.00,'Other','TRX000291','Pending',90,86),(292,'2024-06-19',2919.00,'Other','TRX000292','Pending',5,94),(293,'2024-10-07',3073.00,'Cash','TRX000293','Completed',193,94),(294,'2024-06-17',399.00,'Credit Card','TRX000294','Pending',154,97),(295,'2024-10-25',3329.00,'Credit Card','TRX000295','Completed',199,88),(296,'2024-07-08',4845.00,'Cash','TRX000296','Completed',26,89),(297,'2024-07-10',3486.00,'Insurance','TRX000297','Failed',142,98),(298,'2024-06-10',2062.00,'Cash','TRX000298','Pending',55,87),(299,'2024-09-03',1866.00,'Insurance','TRX000299','Failed',172,88),(300,'2025-01-25',952.00,'Other','TRX000300','Failed',90,93);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postalcode`
--

DROP TABLE IF EXISTS `postalcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postalcode` (
  `postal_code_id` int NOT NULL AUTO_INCREMENT,
  `street_name` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `state_or_province` varchar(50) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `Latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  PRIMARY KEY (`postal_code_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10053 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postalcode`
--

LOCK TABLES `postalcode` WRITE;
/*!40000 ALTER TABLE `postalcode` DISABLE KEYS */;
INSERT INTO `postalcode` VALUES (10001,'Street 1','USA','New York','Buffalo',41.552323,-74.711458),(10002,'Street 2','USA','New York','Rochester',41.666942,-74.118914),(10003,'Street 3','USA','New York','Albany',40.285803,-74.802241),(10004,'Street 4','USA','New York','Syracuse',41.012583,-73.118362),(10005,'Street 5','USA','New York','New York City',41.251640,-74.974711),(10006,'Street 6','USA','New York','Buffalo',41.252722,-73.400256),(10007,'Street 7','USA','New York','Rochester',41.121752,-74.778469),(10008,'Street 8','USA','New York','Albany',40.623598,-73.134604),(10009,'Street 9','USA','New York','Syracuse',40.337385,-73.497260),(10010,'Street 10','USA','New York','New York City',41.382744,-73.182501),(10011,'Street 11','USA','New York','Buffalo',39.820466,-73.938170),(10012,'Street 12','USA','New York','Rochester',40.728954,-73.128722),(10013,'Street 13','USA','New York','Albany',40.050728,-74.948192),(10014,'Street 14','USA','New York','Syracuse',40.988057,-74.803141),(10015,'Street 15','USA','New York','New York City',40.901324,-73.671957),(10016,'Street 16','USA','New York','Buffalo',40.817441,-73.484920),(10017,'Street 17','USA','New York','Rochester',40.004275,-74.111866),(10018,'Street 18','USA','New York','Albany',41.309046,-73.707173),(10019,'Street 19','USA','New York','Syracuse',41.418199,-74.375485),(10020,'Street 20','USA','New York','New York City',39.749177,-74.715659),(10021,'Street 21','USA','New York','Buffalo',41.055375,-73.164149),(10022,'Street 22','USA','New York','Rochester',40.894331,-74.623897),(10023,'Street 23','USA','New York','Albany',40.078719,-74.322711),(10024,'Street 24','USA','New York','Syracuse',40.031485,-73.462441),(10025,'Street 25','USA','New York','New York City',40.474538,-73.827983),(10026,'Street 26','USA','New York','Buffalo',41.317668,-74.515708),(10027,'Street 27','USA','New York','Rochester',41.349653,-74.292610),(10028,'Street 28','USA','New York','Albany',40.369191,-73.864217),(10029,'Street 29','USA','New York','Syracuse',41.452545,-73.732623),(10030,'Street 30','USA','New York','New York City',40.860447,-73.087895),(10031,'Street 31','USA','New York','Buffalo',39.860383,-74.022400),(10032,'Street 32','USA','New York','Rochester',40.188053,-73.580535),(10033,'Street 33','USA','New York','Albany',41.414367,-74.774563),(10034,'Street 34','USA','New York','Syracuse',39.765287,-73.437879),(10035,'Street 35','USA','New York','New York City',41.395945,-73.294636),(10036,'Street 36','USA','New York','Buffalo',41.220185,-74.603169),(10037,'Street 37','USA','New York','Rochester',41.204800,-74.754493),(10038,'Street 38','USA','New York','Albany',40.494336,-73.852840),(10039,'Street 39','USA','New York','Syracuse',41.133993,-73.359518),(10040,'Street 40','USA','New York','New York City',41.681633,-74.101283),(10041,'Street 41','USA','New York','Buffalo',40.329889,-74.634706),(10042,'Street 42','USA','New York','Rochester',39.718003,-74.093869),(10043,'Street 43','USA','New York','Albany',40.257847,-73.017158),(10044,'Street 44','USA','New York','Syracuse',40.021871,-73.427172),(10045,'Street 45','USA','New York','New York City',40.679726,-74.907854),(10046,'Street 46','USA','New York','Buffalo',41.302753,-73.350675),(10047,'Street 47','USA','New York','Rochester',41.219566,-74.438143),(10048,'Street 48','USA','New York','Albany',40.031785,-73.114647),(10049,'Street 49','USA','New York','Syracuse',40.212613,-74.180995),(10050,'Street 50','USA','New York','New York City',40.338386,-74.353084),(10051,'1','e',NULL,'c',NULL,NULL),(10052,'1','Egypt',NULL,'Cairo',NULL,NULL);
/*!40000 ALTER TABLE `postalcode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `radiologyroom`
--

DROP TABLE IF EXISTS `radiologyroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `radiologyroom` (
  `Rad_room_id` int NOT NULL,
  `has_shield` tinyint(1) NOT NULL,
  `imaging_type` varchar(100) NOT NULL,
  PRIMARY KEY (`Rad_room_id`),
  CONSTRAINT `radiologyRoom_ibfk_1` FOREIGN KEY (`Rad_room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `radiologyRoom_ibfk_2` FOREIGN KEY (`Rad_room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `radiologyroom`
--

LOCK TABLES `radiologyroom` WRITE;
/*!40000 ALTER TABLE `radiologyroom` DISABLE KEYS */;
INSERT INTO `radiologyroom` VALUES (4,1,'X-Ray'),(10,1,'X-Ray'),(18,1,'X-Ray'),(26,1,'X-Ray'),(34,1,'X-Ray'),(42,1,'X-Ray'),(50,1,'X-Ray'),(58,1,'X-Ray'),(66,1,'X-Ray'),(74,1,'X-Ray'),(82,1,'X-Ray'),(90,1,'X-Ray'),(98,1,'X-Ray'),(106,1,'X-Ray');
/*!40000 ALTER TABLE `radiologyroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receptionist`
--

DROP TABLE IF EXISTS `receptionist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receptionist` (
  `R_employee_id` int NOT NULL,
  PRIMARY KEY (`R_employee_id`),
  CONSTRAINT `receptionist_ibfk_1` FOREIGN KEY (`R_employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receptionist`
--

LOCK TABLES `receptionist` WRITE;
/*!40000 ALTER TABLE `receptionist` DISABLE KEYS */;
INSERT INTO `receptionist` VALUES (86),(87),(88),(89),(90),(91),(92),(93),(94),(95),(96),(97),(98),(99),(100);
/*!40000 ALTER TABLE `receptionist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receptionists_language`
--

DROP TABLE IF EXISTS `receptionists_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receptionists_language` (
  `R_employee_id` int NOT NULL,
  `language_spoken` varchar(100) NOT NULL,
  PRIMARY KEY (`R_employee_id`,`language_spoken`),
  CONSTRAINT `Receptionists_language_ibfk_1` FOREIGN KEY (`R_employee_id`) REFERENCES `receptionist` (`R_employee_id`),
  CONSTRAINT `Receptionists_language_ibfk_2` FOREIGN KEY (`R_employee_id`) REFERENCES `receptionist` (`R_employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receptionists_language`
--

LOCK TABLES `receptionists_language` WRITE;
/*!40000 ALTER TABLE `receptionists_language` DISABLE KEYS */;
INSERT INTO `receptionists_language` VALUES (86,'English'),(86,'Mandarin'),(87,'English'),(88,'English'),(88,'Spanish'),(89,'English'),(90,'English'),(90,'Hindi'),(90,'Mandarin'),(91,'English'),(92,'English'),(92,'Spanish'),(93,'English'),(94,'English'),(94,'Mandarin'),(95,'English'),(95,'Portuguese'),(96,'English'),(96,'Spanish'),(97,'English'),(98,'English'),(98,'Mandarin'),(99,'English'),(100,'English'),(100,'Russian'),(100,'Spanish');
/*!40000 ALTER TABLE `receptionists_language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recoveryroom`
--

DROP TABLE IF EXISTS `recoveryroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recoveryroom` (
  `Rec_room_id` int NOT NULL,
  `no_of_beds_available` int NOT NULL,
  PRIMARY KEY (`Rec_room_id`),
  CONSTRAINT `recoveryRoom_ibfk_1` FOREIGN KEY (`Rec_room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `recoveryRoom_ibfk_2` FOREIGN KEY (`Rec_room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recoveryroom`
--

LOCK TABLES `recoveryroom` WRITE;
/*!40000 ALTER TABLE `recoveryroom` DISABLE KEYS */;
INSERT INTO `recoveryroom` VALUES (1,2),(7,1),(15,1),(23,1),(31,3),(39,2),(47,2),(55,1),(63,2),(71,3),(79,1),(87,4),(95,1),(103,1);
/*!40000 ALTER TABLE `recoveryroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refund`
--

DROP TABLE IF EXISTS `refund`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refund` (
  `refund_id` int NOT NULL AUTO_INCREMENT,
  `R_employee_id` int DEFAULT NULL,
  `appointment_id` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `method` varchar(50) DEFAULT NULL,
  `status` enum('Pending','Approved','Processed','Rejected') DEFAULT NULL,
  PRIMARY KEY (`refund_id`),
  KEY `R_employee_id` (`R_employee_id`),
  KEY `appointment_id` (`appointment_id`),
  CONSTRAINT `refund_ibfk_1` FOREIGN KEY (`R_employee_id`) REFERENCES `receptionist` (`R_employee_id`),
  CONSTRAINT `refund_ibfk_2` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refund`
--

LOCK TABLES `refund` WRITE;
/*!40000 ALTER TABLE `refund` DISABLE KEYS */;
INSERT INTO `refund` VALUES (1,95,99,2027.80,'Doctor unavailable','Insurance','Processed'),(2,92,22,2042.98,'Insurance coverage issue','Credit Card','Rejected'),(3,91,142,945.08,'Doctor unavailable','Cash','Rejected'),(4,94,86,3323.92,'Insurance coverage issue','Insurance','Processed'),(5,99,72,401.84,'Doctor unavailable','Insurance','Rejected'),(6,98,136,2825.84,'Doctor unavailable','Insurance','Processed'),(7,91,122,607.25,'Doctor unavailable','Insurance','Processed'),(8,99,64,1038.43,'Insurance coverage issue','Credit Card','Rejected'),(9,94,145,2512.70,'Duplicate payment','Other','Approved'),(10,94,124,1009.49,'Appointment cancelled by patient','Other','Rejected'),(11,93,171,2280.84,'Insurance coverage issue','Cash','Pending'),(12,94,80,155.63,'Insurance coverage issue','Credit Card','Approved'),(13,88,75,105.64,'Duplicate payment','Cash','Pending'),(14,88,168,1044.72,'Doctor unavailable','Other','Pending'),(15,99,53,1568.58,'Insurance coverage issue','Other','Processed'),(16,95,182,694.52,'Doctor unavailable','Cash','Approved'),(17,88,75,108.74,'Insurance coverage issue','Cash','Pending'),(18,98,56,2985.92,'Duplicate payment','Cash','Rejected'),(19,94,196,1003.71,'Doctor unavailable','Credit Card','Approved'),(20,98,16,1190.56,'Duplicate payment','Cash','Processed'),(21,92,150,1250.75,'Insurance coverage issue','Credit Card','Processed'),(22,95,160,723.10,'Doctor unavailable','Cash','Processed'),(23,98,147,1850.95,'Insurance coverage issue','Insurance','Rejected'),(24,99,155,2475.00,'Doctor unavailable','Credit Card','Processed'),(25,94,151,1392.58,'Doctor unavailable','Insurance','Rejected'),(26,92,158,209.99,'Insurance coverage issue','Cash','Processed'),(27,98,166,3749.10,'Insurance coverage issue','Credit Card','Rejected'),(28,94,172,687.25,'Doctor unavailable','Insurance','Processed'),(29,95,177,353.12,'Doctor unavailable','Credit Card','Processed'),(30,91,181,1082.55,'Insurance coverage issue','Insurance','Rejected');
/*!40000 ALTER TABLE `refund` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_number` varchar(20) NOT NULL,
  `status` varchar(50) NOT NULL,
  `capacity` int DEFAULT NULL,
  `room_type` varchar(50) NOT NULL,
  `price_per_day` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`room_id`),
  UNIQUE KEY `unq_room_number` (`room_number`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  CONSTRAINT `room_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Rec-00101','Available',4,'Recovery',200.00,NULL,2),(2,'ICU-00102','Maintenance',1,'ICU',1000.00,NULL,6),(3,'Ope-104','Occupied',1,'Operation',2000.00,NULL,5),(4,'Rad-105','Maintenance',1,'Radiology',800.00,NULL,4),(5,'Mat-103','Maintenance',2,'Maternity',400.00,NULL,7),(6,'Dia-006','Available',6,'Dialysis',300.00,NULL,8),(7,'Rec-001','Available',4,'Recovery',200.00,NULL,2),(8,'ICU-002','Occupied',1,'ICU',1000.00,NULL,6),(9,'Ope-003','Occupied',1,'Operation',2000.00,NULL,5),(10,'Rad-004','Occupied',1,'Radiology',800.00,NULL,4),(11,'Mat-005','Occupied',2,'Maternity',400.00,NULL,7),(12,'Dia-00100','Maintenance',6,'Dialysis',300.00,NULL,8),(13,'Iso-007','Available',1,'Isolation',600.00,NULL,1),(14,'Eme-008','Maintenance',1,'Emergency',500.00,NULL,1),(15,'Rec-009','Occupied',4,'Recovery',200.00,NULL,2),(16,'ICU-010','Available',1,'ICU',1000.00,NULL,6),(17,'Ope-011','Available',1,'Operation',2000.00,NULL,5),(18,'Rad-012','Occupied',1,'Radiology',800.00,NULL,4),(19,'Mat-013','Available',2,'Maternity',400.00,NULL,7),(20,'Dia-014','Maintenance',6,'Dialysis',300.00,NULL,8),(21,'Iso-015','Occupied',1,'Isolation',600.00,NULL,1),(22,'Eme-016','Maintenance',1,'Emergency',500.00,NULL,1),(23,'Rec-017','Occupied',4,'Recovery',200.00,NULL,2),(24,'ICU-018','Maintenance',1,'ICU',1000.00,NULL,6),(25,'Ope-019','Occupied',1,'Operation',2000.00,NULL,5),(26,'Rad-020','Occupied',1,'Radiology',800.00,NULL,4),(27,'Mat-021','Available',2,'Maternity',400.00,NULL,7),(28,'Dia-022','Maintenance',6,'Dialysis',300.00,NULL,8),(29,'Iso-023','Available',1,'Isolation',600.00,NULL,1),(30,'Eme-024','Available',1,'Emergency',500.00,NULL,1),(31,'Rec-025','Occupied',4,'Recovery',200.00,NULL,2),(32,'ICU-026','Occupied',1,'ICU',1000.00,NULL,6),(33,'Ope-027','Occupied',1,'Operation',2000.00,NULL,5),(34,'Rad-028','Available',1,'Radiology',800.00,NULL,4),(35,'Mat-029','Maintenance',2,'Maternity',400.00,NULL,7),(36,'Dia-030','Occupied',6,'Dialysis',300.00,NULL,8),(37,'Iso-031','Occupied',1,'Isolation',600.00,NULL,1),(38,'Eme-032','Occupied',1,'Emergency',500.00,NULL,1),(39,'Rec-033','Available',4,'Recovery',200.00,NULL,2),(40,'ICU-034','Available',1,'ICU',1000.00,NULL,6),(41,'Ope-035','Maintenance',1,'Operation',2000.00,NULL,5),(42,'Rad-036','Available',1,'Radiology',800.00,NULL,4),(43,'Mat-037','Occupied',2,'Maternity',400.00,NULL,7),(44,'Dia-038','Available',6,'Dialysis',300.00,NULL,8),(45,'Iso-039','Maintenance',1,'Isolation',600.00,NULL,1),(46,'Eme-040','Maintenance',1,'Emergency',500.00,NULL,1),(47,'Rec-041','Maintenance',4,'Recovery',200.00,NULL,2),(48,'ICU-042','Occupied',1,'ICU',1000.00,NULL,6),(49,'Ope-043','Available',1,'Operation',2000.00,NULL,5),(50,'Rad-044','Maintenance',1,'Radiology',800.00,NULL,4),(51,'Mat-045','Available',2,'Maternity',400.00,NULL,7),(52,'Dia-046','Maintenance',6,'Dialysis',300.00,NULL,8),(53,'Iso-047','Available',1,'Isolation',600.00,NULL,1),(54,'Eme-048','Available',1,'Emergency',500.00,NULL,1),(55,'Rec-049','Maintenance',4,'Recovery',200.00,NULL,2),(56,'ICU-050','Occupied',1,'ICU',1000.00,NULL,6),(57,'Ope-051','Maintenance',1,'Operation',2000.00,NULL,5),(58,'Rad-052','Occupied',1,'Radiology',800.00,NULL,4),(59,'Mat-053','Maintenance',2,'Maternity',400.00,NULL,7),(60,'Dia-054','Maintenance',6,'Dialysis',300.00,NULL,8),(61,'Iso-055','Occupied',1,'Isolation',600.00,NULL,1),(62,'Eme-056','Occupied',1,'Emergency',500.00,NULL,1),(63,'Rec-057','Maintenance',4,'Recovery',200.00,NULL,2),(64,'ICU-058','Available',1,'ICU',1000.00,NULL,6),(65,'Ope-059','Available',1,'Operation',2000.00,NULL,5),(66,'Rad-060','Maintenance',1,'Radiology',800.00,NULL,4),(67,'Mat-061','Maintenance',2,'Maternity',400.00,NULL,7),(68,'Dia-062','Occupied',6,'Dialysis',300.00,NULL,8),(69,'Iso-063','Maintenance',1,'Isolation',600.00,NULL,1),(70,'Eme-064','Available',1,'Emergency',500.00,NULL,1),(71,'Rec-065','Occupied',4,'Recovery',200.00,NULL,2),(72,'ICU-066','Available',1,'ICU',1000.00,NULL,6),(73,'Ope-067','Maintenance',1,'Operation',2000.00,NULL,5),(74,'Rad-068','Available',1,'Radiology',800.00,NULL,4),(75,'Mat-069','Available',2,'Maternity',400.00,NULL,7),(76,'Dia-070','Occupied',6,'Dialysis',300.00,NULL,8),(77,'Iso-071','Occupied',1,'Isolation',600.00,NULL,1),(78,'Eme-072','Available',1,'Emergency',500.00,NULL,1),(79,'Rec-073','Occupied',4,'Recovery',200.00,NULL,2),(80,'ICU-074','Available',1,'ICU',1000.00,NULL,6),(81,'Ope-075','Occupied',1,'Operation',2000.00,NULL,5),(82,'Rad-076','Occupied',1,'Radiology',800.00,NULL,4),(83,'Mat-077','Occupied',2,'Maternity',400.00,NULL,7),(84,'Dia-078','Maintenance',6,'Dialysis',300.00,NULL,8),(85,'Iso-079','Available',1,'Isolation',600.00,NULL,1),(86,'Eme-080','Occupied',1,'Emergency',500.00,NULL,1),(87,'Rec-081','Available',4,'Recovery',200.00,NULL,2),(88,'ICU-082','Maintenance',1,'ICU',1000.00,NULL,6),(89,'Ope-083','Occupied',1,'Operation',2000.00,NULL,5),(90,'Rad-084','Maintenance',1,'Radiology',800.00,NULL,4),(91,'Mat-085','Occupied',2,'Maternity',400.00,NULL,7),(92,'Dia-086','Available',6,'Dialysis',300.00,NULL,8),(93,'Iso-087','Occupied',1,'Isolation',600.00,NULL,1),(94,'Eme-088','Occupied',1,'Emergency',500.00,NULL,1),(95,'Rec-089','Maintenance',4,'Recovery',200.00,NULL,2),(96,'ICU-090','Maintenance',1,'ICU',1000.00,NULL,6),(97,'Ope-091','Maintenance',1,'Operation',2000.00,NULL,5),(98,'Rad-092','Occupied',1,'Radiology',800.00,NULL,4),(99,'Mat-093','Available',2,'Maternity',400.00,NULL,7),(100,'Dia-094','Occupied',6,'Dialysis',300.00,NULL,8),(101,'Iso-095','Occupied',1,'Isolation',600.00,NULL,1),(102,'Eme-096','Occupied',1,'Emergency',500.00,NULL,1),(103,'Rec-097','Available',4,'Recovery',200.00,NULL,2),(104,'ICU-098','Available',1,'ICU',1000.00,NULL,6),(105,'Ope-099','Occupied',1,'Operation',2000.00,NULL,5),(106,'Rad-100','Occupied',1,'Radiology',800.00,NULL,4);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_itemcontained`
--

DROP TABLE IF EXISTS `room_itemcontained`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_itemcontained` (
  `room_id` int NOT NULL DEFAULT '0',
  `item_name` varchar(100) NOT NULL DEFAULT '',
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`room_id`,`item_name`),
  CONSTRAINT `Room_ItemContained_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_itemcontained`
--

LOCK TABLES `room_itemcontained` WRITE;
/*!40000 ALTER TABLE `room_itemcontained` DISABLE KEYS */;
INSERT INTO `room_itemcontained` VALUES (1,'Medical Cart',2),(1,'Monitor',1),(1,'Oxygen Tank',2),(1,'Wheelchair',2),(2,'BP Monitor',2),(2,'Medical Cart',1),(2,'Oxygen Tank',1),(2,'Thermometer',1),(2,'Wheelchair',3),(3,'Medical Cart',1),(3,'Wheelchair',3),(4,'BP Monitor',3),(4,'Medical Cart',3),(4,'Thermometer',3),(5,'BP Monitor',1),(5,'Defibrillator',1),(5,'Thermometer',1),(6,'Defibrillator',2),(6,'Thermometer',2),(7,'Defibrillator',1),(7,'Hospital Bed',2),(7,'IV Stand',3),(7,'Ventilator',3),(8,'Hospital Bed',2),(8,'IV Stand',3),(8,'Monitor',3),(8,'Ventilator',3),(9,'Hospital Bed',1),(9,'IV Stand',3),(9,'Monitor',1),(9,'Oxygen Tank',3),(9,'Wheelchair',3),(10,'IV Stand',3),(10,'Monitor',2),(10,'Oxygen Tank',1),(10,'Wheelchair',2),(11,'Medical Cart',1),(11,'Monitor',1),(11,'Oxygen Tank',2),(11,'Wheelchair',1),(12,'BP Monitor',2),(12,'Medical Cart',2),(12,'Oxygen Tank',3),(12,'Wheelchair',2),(13,'BP Monitor',3),(13,'Medical Cart',1),(13,'Thermometer',2),(13,'Wheelchair',3),(14,'BP Monitor',1),(14,'Defibrillator',1),(14,'Medical Cart',3),(14,'Thermometer',2),(15,'BP Monitor',3),(15,'Defibrillator',1),(15,'Thermometer',2),(16,'Defibrillator',3),(16,'Thermometer',2),(16,'Ventilator',2),(17,'Defibrillator',3),(17,'Ventilator',1),(18,'Hospital Bed',3),(18,'Ventilator',1),(19,'Hospital Bed',2),(19,'IV Stand',2),(20,'IV Stand',1),(20,'Monitor',2),(20,'Oxygen Tank',3),(21,'Medical Cart',2),(21,'Monitor',1),(21,'Oxygen Tank',1),(21,'Wheelchair',2),(22,'BP Monitor',1),(22,'Medical Cart',3),(22,'Oxygen Tank',3),(22,'Thermometer',2),(22,'Wheelchair',3),(23,'BP Monitor',2),(23,'Defibrillator',2),(23,'Medical Cart',3),(23,'Thermometer',1),(23,'Wheelchair',3),(24,'BP Monitor',3),(24,'Defibrillator',1),(24,'Medical Cart',1),(24,'Thermometer',3),(25,'BP Monitor',2),(25,'Thermometer',1),(26,'Defibrillator',1),(26,'Thermometer',3),(26,'Ventilator',3),(27,'Defibrillator',1),(27,'Hospital Bed',1),(27,'Ventilator',2),(28,'Hospital Bed',1),(28,'IV Stand',2),(28,'Ventilator',3),(29,'Hospital Bed',2),(29,'IV Stand',2),(29,'Monitor',3),(29,'Oxygen Tank',1),(30,'IV Stand',2),(30,'Medical Cart',3),(30,'Monitor',2),(30,'Oxygen Tank',3),(30,'Wheelchair',1),(31,'Monitor',3),(31,'Oxygen Tank',1),(31,'Wheelchair',1),(32,'Oxygen Tank',3),(32,'Wheelchair',3),(33,'Medical Cart',2),(33,'Wheelchair',2),(34,'BP Monitor',1),(34,'Defibrillator',3),(34,'Medical Cart',3),(34,'Thermometer',3),(35,'BP Monitor',3),(35,'Defibrillator',3),(35,'Thermometer',3),(36,'Defibrillator',1),(36,'Thermometer',3),(36,'Ventilator',1),(37,'Defibrillator',1),(37,'Ventilator',2),(38,'Hospital Bed',2),(38,'Ventilator',1),(39,'Hospital Bed',3),(39,'IV Stand',1),(40,'IV Stand',2),(40,'Monitor',1),(40,'Oxygen Tank',2),(40,'Wheelchair',1),(41,'Monitor',1),(41,'Oxygen Tank',1),(41,'Wheelchair',2),(42,'BP Monitor',2),(42,'Medical Cart',1),(42,'Oxygen Tank',1),(42,'Thermometer',2),(42,'Wheelchair',1),(43,'BP Monitor',3),(43,'Medical Cart',1),(43,'Thermometer',3),(43,'Wheelchair',2),(44,'BP Monitor',2),(44,'Defibrillator',3),(44,'Medical Cart',1),(44,'Thermometer',2),(45,'BP Monitor',3),(45,'Thermometer',2),(46,'Defibrillator',3),(46,'Hospital Bed',1),(46,'Thermometer',2),(46,'Ventilator',3),(47,'Defibrillator',2),(47,'Ventilator',3),(48,'Hospital Bed',2),(48,'IV Stand',3),(48,'Ventilator',1),(49,'Hospital Bed',2),(49,'IV Stand',3),(49,'Monitor',1),(49,'Oxygen Tank',2),(49,'Wheelchair',2),(50,'IV Stand',3),(50,'Monitor',2),(50,'Oxygen Tank',3),(50,'Wheelchair',3),(51,'Medical Cart',3),(51,'Monitor',1),(51,'Oxygen Tank',2),(51,'Wheelchair',2),(52,'Medical Cart',2),(52,'Oxygen Tank',1),(52,'Wheelchair',1),(53,'Medical Cart',3),(53,'Wheelchair',3),(54,'BP Monitor',1),(54,'Medical Cart',3),(54,'Thermometer',3),(55,'BP Monitor',3),(55,'Defibrillator',3),(55,'Hospital Bed',1),(55,'Thermometer',3),(55,'Ventilator',2),(56,'Defibrillator',3),(56,'Thermometer',2),(57,'Defibrillator',3),(57,'Ventilator',2),(58,'Hospital Bed',1),(58,'Ventilator',3),(59,'Hospital Bed',2),(59,'IV Stand',1),(59,'Monitor',2),(60,'IV Stand',2),(60,'Monitor',2),(61,'Medical Cart',2),(61,'Monitor',1),(61,'Oxygen Tank',3),(61,'Wheelchair',1),(62,'Medical Cart',1),(62,'Oxygen Tank',2),(62,'Wheelchair',1),(63,'BP Monitor',3),(63,'Medical Cart',1),(63,'Thermometer',2),(63,'Wheelchair',3),(64,'BP Monitor',2),(64,'Defibrillator',1),(64,'Medical Cart',1),(64,'Thermometer',2),(65,'BP Monitor',2),(65,'Defibrillator',3),(65,'Thermometer',3),(65,'Ventilator',1),(66,'Defibrillator',2),(66,'Hospital Bed',2),(66,'IV Stand',1),(66,'Thermometer',1),(66,'Ventilator',3),(67,'Defibrillator',1),(67,'Ventilator',3),(68,'Hospital Bed',3),(68,'IV Stand',2),(68,'Ventilator',2),(69,'Hospital Bed',3),(69,'IV Stand',2),(69,'Monitor',3),(69,'Oxygen Tank',3),(70,'IV Stand',2),(70,'Monitor',2),(70,'Oxygen Tank',1),(70,'Wheelchair',1),(71,'Monitor',1),(71,'Oxygen Tank',2),(72,'BP Monitor',1),(72,'Medical Cart',1),(72,'Oxygen Tank',3),(72,'Wheelchair',1),(73,'BP Monitor',2),(73,'Medical Cart',2),(73,'Thermometer',2),(73,'Wheelchair',3),(74,'BP Monitor',1),(74,'Medical Cart',2),(74,'Thermometer',1),(75,'BP Monitor',3),(75,'Defibrillator',3),(75,'Thermometer',2),(76,'Defibrillator',2),(76,'Hospital Bed',2),(76,'Thermometer',2),(76,'Ventilator',3),(77,'Defibrillator',3),(77,'Ventilator',2),(78,'Hospital Bed',2),(78,'Ventilator',1),(79,'Hospital Bed',1),(79,'IV Stand',2),(79,'Monitor',3),(80,'IV Stand',2),(80,'Medical Cart',3),(80,'Monitor',1),(80,'Oxygen Tank',1),(80,'Wheelchair',3),(81,'Medical Cart',2),(81,'Monitor',2),(81,'Oxygen Tank',1),(81,'Wheelchair',1),(82,'BP Monitor',3),(82,'Medical Cart',2),(82,'Oxygen Tank',1),(82,'Thermometer',1),(82,'Wheelchair',2),(83,'BP Monitor',3),(83,'Medical Cart',3),(83,'Wheelchair',1),(84,'BP Monitor',2),(84,'Defibrillator',1),(84,'Medical Cart',3),(84,'Thermometer',2),(85,'BP Monitor',1),(85,'Defibrillator',3),(85,'Thermometer',2),(86,'Defibrillator',3),(86,'Thermometer',3),(87,'Defibrillator',3),(87,'Ventilator',3),(88,'Hospital Bed',1),(88,'Ventilator',2),(89,'Hospital Bed',2),(89,'IV Stand',2),(89,'Monitor',2),(89,'Oxygen Tank',2),(90,'IV Stand',1),(90,'Monitor',3),(91,'Medical Cart',1),(91,'Monitor',1),(91,'Oxygen Tank',2),(91,'Wheelchair',2),(92,'Medical Cart',1),(92,'Oxygen Tank',1),(92,'Wheelchair',1),(93,'BP Monitor',3),(93,'Medical Cart',1),(93,'Wheelchair',1),(94,'BP Monitor',2),(94,'Defibrillator',3),(94,'Medical Cart',1),(94,'Thermometer',2),(95,'BP Monitor',2),(95,'Defibrillator',2),(95,'Hospital Bed',3),(95,'Thermometer',2),(95,'Ventilator',2),(96,'Defibrillator',3),(96,'Thermometer',2),(97,'Defibrillator',3),(97,'Hospital Bed',1),(97,'Ventilator',2),(98,'Hospital Bed',1),(98,'Ventilator',1),(99,'Hospital Bed',3),(99,'IV Stand',3),(99,'Monitor',1),(100,'IV Stand',3),(100,'Monitor',3),(101,'Monitor',2),(101,'Oxygen Tank',1),(101,'Wheelchair',2),(102,'Oxygen Tank',1),(102,'Wheelchair',2),(103,'BP Monitor',3),(103,'Defibrillator',3),(103,'Medical Cart',2),(103,'Thermometer',3),(103,'Wheelchair',3),(104,'BP Monitor',2),(104,'Medical Cart',2),(105,'BP Monitor',1),(105,'Defibrillator',2),(105,'Thermometer',3),(106,'Defibrillator',3),(106,'Hospital Bed',3),(106,'Thermometer',2),(106,'Ventilator',1);
/*!40000 ALTER TABLE `room_itemcontained` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `security`
--

DROP TABLE IF EXISTS `security`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `security` (
  `S_employee_id` int NOT NULL,
  `clearance_level` varchar(50) DEFAULT NULL,
  `badge_number` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`S_employee_id`),
  CONSTRAINT `security_ibfk_1` FOREIGN KEY (`S_employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `security`
--

LOCK TABLES `security` WRITE;
/*!40000 ALTER TABLE `security` DISABLE KEYS */;
INSERT INTO `security` VALUES (66,'2','SEC066'),(67,'3','SEC067'),(68,'4','SEC068'),(69,'5','SEC069'),(70,'1','SEC070'),(71,'2','SEC071'),(72,'3','SEC072'),(73,'4','SEC073'),(74,'5','SEC074'),(75,'1','SEC075');
/*!40000 ALTER TABLE `security` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `take_care_of`
--

DROP TABLE IF EXISTS `take_care_of`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `take_care_of` (
  `N_employee_id` int NOT NULL,
  `patient_id` int NOT NULL,
  PRIMARY KEY (`N_employee_id`,`patient_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `take_care_of_ibfk_1` FOREIGN KEY (`N_employee_id`) REFERENCES `nurse` (`N_employee_id`),
  CONSTRAINT `take_care_of_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `take_care_of_ibfk_3` FOREIGN KEY (`N_employee_id`) REFERENCES `nurse` (`N_employee_id`),
  CONSTRAINT `take_care_of_ibfk_4` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `take_care_of`
--

LOCK TABLES `take_care_of` WRITE;
/*!40000 ALTER TABLE `take_care_of` DISABLE KEYS */;
INSERT INTO `take_care_of` VALUES (42,1),(31,2),(32,2),(42,2),(48,2),(34,3),(34,4),(45,4),(48,5),(26,6),(23,7),(30,7),(47,7),(21,8),(32,8),(40,8),(50,8),(46,9),(47,9),(33,10),(36,14),(32,15),(45,15),(40,18),(25,20),(35,21),(37,21),(41,22),(25,23),(28,23),(32,23),(34,26),(43,26),(48,26),(37,27),(35,29),(37,29),(46,30),(34,31),(43,31),(31,33),(39,33),(31,36),(35,36),(21,37),(35,39),(38,39),(49,39),(34,40),(50,40),(25,41),(23,42),(24,43),(41,44),(38,45),(31,46),(24,48),(26,49),(28,49),(22,51),(39,51),(27,52),(25,55),(44,55),(44,56),(28,61),(29,61),(41,61),(42,61),(47,62),(30,63),(35,64),(25,65),(49,65),(27,72),(43,72),(44,72),(23,75),(40,76),(41,76),(49,76),(36,77),(34,81),(46,82),(22,83),(35,84),(37,86),(21,87),(23,93),(31,93),(40,93),(40,94),(41,94),(43,94),(24,96),(34,96),(25,97),(27,97),(38,98),(23,100),(34,101),(36,101),(30,103),(36,104),(49,106),(35,108),(43,108),(37,110),(43,111),(42,116),(38,117),(26,118),(27,118),(28,119),(43,119),(34,120),(45,121),(46,121),(23,122),(33,123),(28,124),(31,124),(33,124),(48,130),(29,131),(33,131),(42,131),(46,131),(33,133),(24,134),(32,135),(24,136),(33,136),(33,138),(39,138),(41,139),(44,139),(47,139),(40,141),(22,142),(37,142),(38,142),(29,143),(30,144),(41,144),(45,146),(21,147),(30,147),(35,147),(46,147),(29,148),(36,150),(30,151),(45,151),(50,151),(36,152),(42,153),(50,156),(26,158),(30,159),(38,159),(48,159),(38,160),(21,162),(27,162),(50,163),(35,165),(43,166),(49,166),(22,167),(34,167),(39,168),(27,169),(27,170),(41,170),(24,171),(41,172),(24,173),(44,174),(49,174),(45,175),(22,177),(27,177),(45,177),(43,178),(45,179),(31,184),(49,184),(30,185),(37,185),(42,185),(27,186),(47,187),(50,188),(48,189),(29,192),(29,193),(40,193),(26,194),(44,195),(33,196),(36,196),(39,197),(47,197),(38,198),(41,198),(45,199),(47,199),(36,200);
/*!40000 ALTER TABLE `take_care_of` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technician`
--

DROP TABLE IF EXISTS `technician`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technician` (
  `T_employee_id` int NOT NULL,
  PRIMARY KEY (`T_employee_id`),
  CONSTRAINT `technician_ibfk_1` FOREIGN KEY (`T_employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technician`
--

LOCK TABLES `technician` WRITE;
/*!40000 ALTER TABLE `technician` DISABLE KEYS */;
INSERT INTO `technician` VALUES (51),(52),(53),(54),(55),(56),(57),(58),(59),(60),(61),(62),(63),(64),(65);
/*!40000 ALTER TABLE `technician` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment`
--

DROP TABLE IF EXISTS `treatment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatment` (
  `treatment_id` int NOT NULL AUTO_INCREMENT,
  `cost` decimal(10,2) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `category` varchar(20) NOT NULL,
  `specilization_required` varchar(100) DEFAULT NULL,
  `treatment_minutes` int DEFAULT NULL,
  PRIMARY KEY (`treatment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment`
--

LOCK TABLES `treatment` WRITE;
/*!40000 ALTER TABLE `treatment` DISABLE KEYS */;
INSERT INTO `treatment` VALUES (1,303.00,'Blood Test','Blood Test procedure for diagnostic or therapeutic purposes','Diagnostic',NULL,43),(2,373.00,'X-Ray','X-Ray procedure for diagnostic or therapeutic purposes','Diagnostic',NULL,30),(3,1614.00,'MRI Scan','MRI Scan procedure for diagnostic or therapeutic purposes','Diagnostic',NULL,51),(4,943.00,'CT Scan','CT Scan procedure for diagnostic or therapeutic purposes','Diagnostic',NULL,40),(5,516.00,'Ultrasound','Ultrasound procedure for diagnostic or therapeutic purposes','Diagnostic',NULL,40),(6,86.00,'ECG','ECG procedure for diagnostic or therapeutic purposes','Preventive','Cardiology',43),(7,24526.00,'Surgery','Surgery procedure for diagnostic or therapeutic purposes','Therapeutic','Surgery',351),(8,22957.00,'Chemotherapy','Chemotherapy procedure for diagnostic or therapeutic purposes','Therapeutic','Oncology',251),(9,186.00,'Physical Therapy','Physical Therapy procedure for diagnostic or therapeutic purposes','Therapeutic',NULL,41),(10,1287.00,'Dialysis','Dialysis procedure for diagnostic or therapeutic purposes','Therapeutic','Nephrology',267),(11,233.00,'Vaccination','Vaccination procedure for diagnostic or therapeutic purposes','Preventive',NULL,44),(12,112.00,'Consultation','Consultation procedure for diagnostic or therapeutic purposes','Preventive',NULL,45),(13,77.00,'Emergency Care','Emergency Care procedure for diagnostic or therapeutic purposes','Preventive',NULL,24),(14,509.00,'Dental Cleaning','Dental Cleaning procedure for diagnostic or therapeutic purposes','Preventive',NULL,57),(15,530.00,'Eye Examination','Eye Examination procedure for diagnostic or therapeutic purposes','Preventive',NULL,58),(16,542.00,'Allergy Test','Allergy Test procedure for diagnostic or therapeutic purposes','Preventive',NULL,15),(17,86.00,'Biopsy','Biopsy procedure for diagnostic or therapeutic purposes','Preventive',NULL,30),(18,2614.00,'Endoscopy','Endoscopy procedure for diagnostic or therapeutic purposes','Preventive',NULL,43),(19,2679.00,'Colonoscopy','Colonoscopy procedure for diagnostic or therapeutic purposes','Preventive',NULL,55),(20,446.00,'Mammogram','Mammogram procedure for diagnostic or therapeutic purposes','Preventive','Cardiology',27),(21,0.00,'sleep','just sleep','Therapy','None',1800),(22,1200.00,'CT Scan','Computed Tomography scan for diagnostic imaging','Diagnostic','Radiology',25),(23,750.00,'Ultrasound','Ultrasound procedure for imaging soft tissues','Diagnostic','Radiology',20),(24,3000.00,'Chemotherapy','Chemotherapy session for cancer treatment','Therapy','Oncology',90),(25,1500.00,'Physical Therapy','Physical therapy session for rehabilitation','Rehabilitative','Physiotherapy',60),(26,950.00,'MRI','Magnetic Resonance Imaging for soft tissue and bone analysis','Diagnostic','Radiology',45),(27,105.00,'Blood Test','Routine blood testing for diagnostics and monitoring','Diagnostic',NULL,10),(28,200.00,'X-Ray','Standard X-ray imaging procedure','Diagnostic','Radiology',15),(29,250.00,'ECG','Electrocardiogram test for heart activity','Diagnostic','Cardiology',15),(30,350.00,'EEG','Electroencephalogram test for brain activity','Diagnostic','Neurology',30),(31,1300.00,'Dialysis','Kidney dialysis procedure','Therapy','Nephrology',240),(32,1800.00,'Angiography','Imaging technique for blood vessels','Diagnostic','Cardiology',60),(33,200.00,'Urine Analysis','Analysis of urine for diagnostics','Diagnostic',NULL,10),(34,550.00,'Pap Smear','Cervical cancer screening test','Preventive','Gynecology',15),(35,800.00,'Vaccination','Routine vaccination procedure','Preventive',NULL,5),(36,900.00,'Stress Test','Cardiac stress testing','Diagnostic','Cardiology',40),(37,1100.00,'Bone Density Test','Checking bone health and osteoporosis','Diagnostic',NULL,20),(38,700.00,'IV Therapy','Intravenous therapy for fluids or medicine','Therapy',NULL,40),(39,300.00,'Wound Dressing','Dressing and cleaning wounds','Therapy',NULL,20),(40,150.00,'Stitch Removal','Removal of medical stitches','Therapy',NULL,15),(41,350.00,'Physician Consultation','Doctor consultation for diagnosis or advice','Consultation','Physician',20),(42,200.00,'Oxygen Therapy','Supplemental oxygen for patient care','Therapy','Pulmonology',60),(43,5000.00,'Surgical Procedure - Minor','Minor surgical intervention','Surgery',NULL,45),(44,9000.00,'Surgical Procedure - Major','Major surgical intervention','Surgery',NULL,180),(45,180.00,'Hearing Test','Audiometry for hearing evaluation','Diagnostic','Audiology',20),(46,480.00,'Vision Test','Eye examination for vision and eye health','Diagnostic','Ophthalmology',15),(47,70.00,'Glucose Test','Blood sugar testing','Diagnostic',NULL,10),(48,600.00,'Flu Shot','Influenza vaccination','Preventive',NULL,5),(49,2200.00,'Laser Therapy','Therapeutic laser treatment for tissues','Therapy',NULL,30),(50,1600.00,'Occupational Therapy','Therapeutic intervention for daily living skills','Rehabilitative','Occupational Therapy',60),(51,3200.00,'Radiation Therapy','Therapeutic radiation treatment for cancer','Therapy','Oncology',40);
/*!40000 ALTER TABLE `treatment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_assignment`
--

DROP TABLE IF EXISTS `treatment_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatment_assignment` (
  `assignment_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `D_employee_id` int NOT NULL,
  `treatment_id` int NOT NULL,
  `status` varchar(50) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  PRIMARY KEY (`assignment_id`),
  KEY `patient_id` (`patient_id`),
  KEY `D_employee_id` (`D_employee_id`),
  KEY `treatment_id` (`treatment_id`),
  CONSTRAINT `treatment_assignment_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `treatment_assignment_ibfk_2` FOREIGN KEY (`D_employee_id`) REFERENCES `doctor` (`D_employee_id`),
  CONSTRAINT `treatment_assignment_ibfk_3` FOREIGN KEY (`treatment_id`) REFERENCES `treatment` (`treatment_id`),
  CONSTRAINT `treatment_assignment_ibfk_4` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `treatment_assignment_ibfk_5` FOREIGN KEY (`D_employee_id`) REFERENCES `doctor` (`D_employee_id`),
  CONSTRAINT `treatment_assignment_ibfk_6` FOREIGN KEY (`treatment_id`) REFERENCES `treatment` (`treatment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_assignment`
--

LOCK TABLES `treatment_assignment` WRITE;
/*!40000 ALTER TABLE `treatment_assignment` DISABLE KEYS */;
INSERT INTO `treatment_assignment` VALUES (1,92,12,11,'Cancelled',4749.00),(2,188,19,14,'Cancelled',3583.00),(3,45,1,9,'Cancelled',3965.00),(4,174,1,10,'In Progress',5088.00),(5,32,16,10,'Scheduled',4119.00),(6,173,19,19,'Scheduled',1104.00),(7,197,7,12,'Cancelled',694.00),(8,138,2,6,'In Progress',2669.00),(9,145,2,4,'Completed',5015.00),(10,160,1,16,'Completed',1198.00),(11,1,8,17,'Cancelled',1440.00),(12,106,17,13,'Completed',4684.00),(13,186,18,14,'Completed',2204.00),(14,9,19,12,'Scheduled',4588.00),(15,17,15,8,'Completed',4805.00),(16,182,15,17,'Scheduled',4822.00),(17,86,7,6,'In Progress',2271.00),(18,162,15,6,'Scheduled',985.00),(19,53,16,3,'Scheduled',3648.00),(20,186,11,15,'Scheduled',3738.00),(21,14,4,13,'Completed',4566.00),(22,168,11,2,'Cancelled',3452.00),(23,7,4,14,'Cancelled',4277.00),(24,47,14,12,'Cancelled',2657.00),(25,10,15,8,'Completed',2128.00),(26,188,10,12,'In Progress',899.00),(27,140,1,20,'Cancelled',1432.00),(28,163,6,19,'Cancelled',757.00),(29,65,5,4,'Scheduled',812.00),(30,68,6,6,'Completed',1378.00),(31,85,8,10,'In Progress',2952.00),(32,125,8,3,'In Progress',2223.00),(33,16,3,7,'In Progress',4758.00),(34,95,12,8,'In Progress',621.00),(35,153,11,5,'Completed',1699.00),(36,163,2,1,'Cancelled',2289.00),(37,92,20,10,'In Progress',321.00),(38,146,11,7,'Scheduled',4260.00),(39,132,16,20,'Completed',3502.00),(40,167,3,3,'Scheduled',3371.00),(41,135,9,1,'Cancelled',3042.00),(42,26,18,20,'Scheduled',340.00),(43,138,6,9,'In Progress',4988.00),(44,26,15,3,'Completed',2603.00),(45,151,6,1,'In Progress',4435.00),(46,32,4,9,'Completed',2097.00),(47,84,18,5,'In Progress',3436.00),(48,184,12,3,'Cancelled',1413.00),(49,104,17,10,'Cancelled',1964.00),(50,197,16,1,'Cancelled',384.00),(51,153,13,20,'Cancelled',1176.00),(52,127,11,15,'Cancelled',4044.00),(53,199,12,1,'In Progress',1460.00),(54,116,2,13,'Cancelled',3730.00),(55,174,3,3,'In Progress',4628.00),(56,146,19,10,'Completed',1689.00),(57,192,17,6,'Cancelled',4370.00),(58,88,13,18,'In Progress',2435.00),(59,20,2,4,'Completed',2663.00),(60,147,3,9,'Cancelled',4177.00),(61,119,11,16,'In Progress',1257.00),(62,49,11,17,'Completed',1565.00),(63,166,5,16,'Scheduled',917.00),(64,108,4,8,'Scheduled',4545.00),(65,176,15,19,'Completed',3788.00),(66,36,14,17,'Scheduled',607.00),(67,32,10,20,'In Progress',1738.00),(68,53,7,19,'Completed',4096.00),(69,98,1,16,'Completed',1929.00),(70,123,20,19,'Cancelled',1690.00),(71,23,13,14,'Completed',1111.00),(72,8,12,17,'In Progress',659.00),(73,126,17,3,'In Progress',133.00),(74,36,18,17,'In Progress',3902.00),(75,99,4,8,'In Progress',846.00),(76,69,6,5,'In Progress',2718.00),(77,55,16,2,'Scheduled',1311.00),(78,182,17,7,'In Progress',1432.00),(79,113,1,8,'Cancelled',1020.00),(80,65,2,8,'Completed',4105.00),(81,58,1,7,'Completed',4895.00),(82,200,3,12,'Completed',4584.00),(83,184,18,14,'Cancelled',237.00),(84,133,5,4,'Scheduled',2710.00),(85,194,6,9,'In Progress',2887.00),(86,135,14,8,'Cancelled',2511.00),(87,122,13,4,'Scheduled',4899.00),(88,100,13,11,'Cancelled',3188.00),(89,113,20,2,'Completed',4254.00),(90,56,18,13,'In Progress',2167.00),(91,139,5,1,'In Progress',880.00),(92,91,16,12,'In Progress',3106.00),(93,128,8,20,'Cancelled',466.00),(94,189,10,12,'Completed',4409.00),(95,144,1,18,'In Progress',2768.00),(96,68,2,9,'Cancelled',3622.00),(97,34,15,2,'In Progress',1665.00),(98,122,2,13,'Cancelled',4067.00),(99,27,6,20,'Scheduled',1586.00),(100,72,18,9,'In Progress',3879.00),(101,115,12,5,'In Progress',3648.00),(102,152,14,2,'In Progress',1260.00),(103,64,19,12,'Scheduled',3809.00),(104,92,2,19,'Completed',4536.00),(105,160,7,6,'In Progress',3265.00),(106,66,15,16,'Completed',1714.00),(107,14,8,13,'Scheduled',1512.00),(108,64,15,15,'In Progress',1215.00),(109,130,12,19,'Cancelled',1620.00),(110,23,14,20,'Cancelled',1344.00),(111,153,2,2,'Scheduled',1428.00),(112,13,11,8,'In Progress',2399.00),(113,72,9,1,'Cancelled',4540.00),(114,20,17,16,'In Progress',342.00),(115,161,18,18,'Cancelled',4220.00),(116,83,12,15,'Cancelled',3345.00),(117,199,1,2,'Scheduled',454.00),(118,124,18,12,'Scheduled',4986.00),(119,101,12,8,'Scheduled',2099.00),(120,141,7,11,'Completed',1392.00),(121,126,8,19,'Completed',576.00),(122,148,9,17,'Cancelled',3681.00),(123,20,7,8,'Cancelled',1534.00),(124,157,2,20,'Completed',529.00),(125,132,1,5,'Cancelled',113.00),(126,48,4,5,'Completed',252.00),(127,108,12,8,'Scheduled',1347.00),(128,6,8,17,'Scheduled',3441.00),(129,47,4,3,'Scheduled',277.00),(130,191,14,10,'In Progress',510.00),(131,109,10,14,'Cancelled',2648.00),(132,175,17,11,'Scheduled',4738.00),(133,72,1,19,'Completed',3224.00),(134,12,9,19,'In Progress',1347.00),(135,3,7,11,'Cancelled',835.00),(136,96,19,6,'In Progress',2483.00),(137,10,17,18,'Scheduled',2058.00),(138,187,10,12,'Completed',4646.00),(139,187,19,18,'Completed',697.00),(140,193,9,8,'In Progress',981.00),(141,106,3,20,'Completed',5081.00),(142,42,1,13,'Cancelled',3882.00),(143,6,18,6,'Completed',3388.00),(144,46,4,4,'In Progress',1225.00),(145,16,15,8,'Completed',1881.00),(146,140,9,1,'Cancelled',4483.00),(147,9,12,16,'Scheduled',2986.00),(148,65,18,9,'Completed',2217.00),(149,95,3,2,'Scheduled',1612.00),(150,37,1,10,'In Progress',1686.00),(151,110,16,6,'Scheduled',2177.00),(152,185,8,1,'Scheduled',3294.00),(153,145,14,7,'In Progress',2186.00),(154,135,3,12,'Completed',829.00),(155,196,10,7,'In Progress',4193.00),(156,195,9,4,'Completed',1399.00),(157,132,11,11,'Scheduled',1829.00),(158,31,15,3,'In Progress',4832.00),(159,70,18,9,'In Progress',4970.00),(160,104,14,17,'Scheduled',4806.00),(161,93,10,1,'Cancelled',3504.00),(162,24,11,8,'Scheduled',3364.00),(163,168,5,13,'Completed',3593.00),(164,183,10,13,'Cancelled',4872.00),(165,90,8,10,'In Progress',934.00),(166,174,17,11,'Scheduled',1891.00),(167,44,1,8,'Cancelled',4688.00),(168,38,4,8,'In Progress',2940.00),(169,163,8,7,'Completed',506.00),(170,111,11,19,'Scheduled',4515.00),(171,199,7,13,'Scheduled',4359.00),(172,167,12,10,'Completed',5092.00),(173,180,10,15,'Scheduled',4035.00),(174,71,8,19,'In Progress',2294.00),(175,173,20,9,'Scheduled',5014.00),(176,159,1,13,'Scheduled',165.00),(177,102,11,1,'Completed',2546.00),(178,190,6,10,'Completed',3429.00),(179,92,7,3,'Completed',1280.00),(180,3,8,16,'Cancelled',2947.00),(181,103,18,15,'Scheduled',2807.00),(182,49,12,4,'Scheduled',2385.00),(183,134,20,17,'Scheduled',3280.00),(184,104,14,17,'Scheduled',257.00),(185,171,4,6,'Cancelled',4145.00),(186,49,16,4,'In Progress',3895.00),(187,93,1,17,'Cancelled',1059.00),(188,38,8,6,'In Progress',3206.00),(189,46,6,15,'Cancelled',3975.00),(190,100,4,8,'In Progress',1688.00),(191,151,17,16,'Completed',1599.00),(192,179,12,3,'Cancelled',617.00),(193,171,20,5,'In Progress',4643.00),(194,113,2,15,'In Progress',370.00),(195,181,7,1,'Cancelled',4937.00),(196,170,7,4,'Cancelled',4162.00),(197,90,16,13,'Cancelled',1339.00),(198,146,18,6,'Cancelled',821.00),(199,60,1,7,'Completed',3049.00),(200,81,6,1,'In Progress',916.00),(201,89,15,6,'In Progress',2890.00),(202,187,20,2,'Completed',2637.00),(203,171,16,4,'Completed',115.00),(204,173,7,20,'Cancelled',1845.00),(205,44,1,12,'Cancelled',753.00),(206,65,5,4,'Scheduled',609.00),(207,33,11,2,'Completed',2559.00),(208,55,18,13,'Completed',3595.00),(209,185,11,17,'Completed',3483.00),(210,93,6,1,'In Progress',1755.00),(211,163,2,18,'Scheduled',323.00),(212,170,3,1,'Completed',2678.00),(213,91,15,6,'Scheduled',4545.00),(214,9,11,11,'Scheduled',391.00),(215,174,4,6,'Completed',4831.00),(216,103,15,2,'Scheduled',3564.00),(217,186,11,20,'Scheduled',4804.00),(218,42,5,10,'Cancelled',2857.00),(219,67,1,1,'Scheduled',3955.00),(220,65,6,10,'Completed',2103.00),(221,57,5,5,'In Progress',2683.00),(222,58,18,13,'In Progress',4530.00),(223,83,8,15,'Completed',1978.00),(224,64,10,9,'Completed',3870.00),(225,199,15,12,'Completed',4762.00),(226,95,12,8,'Scheduled',457.00),(227,125,18,13,'In Progress',4790.00),(228,127,8,18,'In Progress',1492.00),(229,44,5,12,'Scheduled',4914.00),(230,81,3,9,'Cancelled',2898.00),(231,98,16,7,'In Progress',2606.00),(232,130,15,15,'Completed',1917.00),(233,51,4,3,'Scheduled',2379.00),(234,150,8,12,'Completed',5036.00),(235,147,14,6,'In Progress',2760.00),(236,172,14,18,'In Progress',4667.00),(237,129,10,10,'Cancelled',743.00),(238,185,5,7,'Cancelled',4477.00),(239,94,15,4,'Completed',263.00),(240,8,2,7,'In Progress',2297.00),(241,78,13,19,'Cancelled',1341.00),(242,163,7,3,'Cancelled',2000.00),(243,124,19,18,'Completed',2179.00),(244,45,18,13,'Completed',579.00),(245,136,2,10,'Cancelled',2722.00),(246,139,18,7,'Scheduled',970.00),(247,153,6,3,'Cancelled',2360.00),(248,195,11,12,'In Progress',2384.00),(249,190,8,1,'Scheduled',5065.00),(250,184,13,7,'Cancelled',4442.00);
/*!40000 ALTER TABLE `treatment_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_assignment_note`
--

DROP TABLE IF EXISTS `treatment_assignment_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatment_assignment_note` (
  `note_id` int NOT NULL AUTO_INCREMENT,
  `assignment_id` int NOT NULL,
  `note` text NOT NULL,
  PRIMARY KEY (`note_id`),
  KEY `assignment_id` (`assignment_id`),
  CONSTRAINT `treatment_assignment_note_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `treatment_assignment` (`assignment_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_assignment_note`
--

LOCK TABLES `treatment_assignment_note` WRITE;
/*!40000 ALTER TABLE `treatment_assignment_note` DISABLE KEYS */;
INSERT INTO `treatment_assignment_note` VALUES (1,108,'Additional tests required. Scheduled for next week.'),(2,204,'Patient shows improvement. Recommend continuing current protocol.'),(3,148,'Mild side effects observed. Adjusted medication dosage.'),(4,231,'Mild side effects observed. Adjusted medication dosage.'),(5,44,'Treatment completed successfully. Follow-up scheduled.'),(6,246,'Patient responded well to treatment. Continue monitoring.'),(7,28,'Patient shows improvement. Recommend continuing current protocol.'),(8,67,'Patient shows improvement. Recommend continuing current protocol.'),(9,15,'Patient responded well to treatment. Continue monitoring.'),(10,184,'Patient shows improvement. Recommend continuing current protocol.'),(11,95,'Mild side effects observed. Adjusted medication dosage.'),(12,153,'Additional tests required. Scheduled for next week.'),(13,41,'Patient responded well to treatment. Continue monitoring.'),(14,147,'Mild side effects observed. Adjusted medication dosage.'),(15,168,'Mild side effects observed. Adjusted medication dosage.'),(16,117,'Treatment completed successfully. Follow-up scheduled.'),(17,199,'Additional tests required. Scheduled for next week.'),(18,229,'Treatment completed successfully. Follow-up scheduled.'),(19,57,'Patient responded well to treatment. Continue monitoring.'),(20,8,'Treatment completed successfully. Follow-up scheduled.'),(21,142,'Treatment completed successfully. Follow-up scheduled.'),(22,111,'Mild side effects observed. Adjusted medication dosage.'),(23,79,'Treatment completed successfully. Follow-up scheduled.'),(24,245,'Additional tests required. Scheduled for next week.'),(25,200,'Additional tests required. Scheduled for next week.'),(26,80,'Patient responded well to treatment. Continue monitoring.'),(27,211,'Patient responded well to treatment. Continue monitoring.'),(28,45,'Patient shows improvement. Recommend continuing current protocol.'),(29,202,'Patient shows improvement. Recommend continuing current protocol.'),(30,180,'Patient responded well to treatment. Continue monitoring.'),(31,102,'Treatment completed successfully. Follow-up scheduled.'),(32,54,'Treatment completed successfully. Follow-up scheduled.'),(33,114,'Patient shows improvement. Recommend continuing current protocol.'),(34,166,'Treatment completed successfully. Follow-up scheduled.'),(35,133,'Patient responded well to treatment. Continue monitoring.'),(36,20,'Mild side effects observed. Adjusted medication dosage.'),(37,179,'Mild side effects observed. Adjusted medication dosage.'),(38,223,'Treatment completed successfully. Follow-up scheduled.'),(39,125,'Mild side effects observed. Adjusted medication dosage.'),(40,117,'Patient shows improvement. Recommend continuing current protocol.'),(41,97,'Additional tests required. Scheduled for next week.'),(42,26,'Patient responded well to treatment. Continue monitoring.'),(43,111,'Mild side effects observed. Adjusted medication dosage.'),(44,118,'Patient responded well to treatment. Continue monitoring.'),(45,246,'Additional tests required. Scheduled for next week.'),(46,100,'Mild side effects observed. Adjusted medication dosage.'),(47,182,'Patient responded well to treatment. Continue monitoring.'),(48,53,'Patient responded well to treatment. Continue monitoring.'),(49,120,'Additional tests required. Scheduled for next week.'),(50,38,'Additional tests required. Scheduled for next week.'),(51,147,'Patient responded well to treatment. Continue monitoring.'),(52,201,'Additional tests required. Scheduled for next week.'),(53,241,'Mild side effects observed. Adjusted medication dosage.'),(54,16,'Additional tests required. Scheduled for next week.'),(55,125,'Mild side effects observed. Adjusted medication dosage.'),(56,220,'Treatment completed successfully. Follow-up scheduled.'),(57,46,'Additional tests required. Scheduled for next week.'),(58,137,'Patient responded well to treatment. Continue monitoring.'),(59,183,'Patient shows improvement. Recommend continuing current protocol.'),(60,242,'Patient shows improvement. Recommend continuing current protocol.'),(61,205,'Additional tests required. Scheduled for next week.'),(62,203,'Mild side effects observed. Adjusted medication dosage.'),(63,17,'Mild side effects observed. Adjusted medication dosage.'),(64,231,'Treatment completed successfully. Follow-up scheduled.'),(65,242,'Mild side effects observed. Adjusted medication dosage.'),(66,18,'Patient shows improvement. Recommend continuing current protocol.'),(67,159,'Additional tests required. Scheduled for next week.'),(68,111,'Mild side effects observed. Adjusted medication dosage.'),(69,166,'Mild side effects observed. Adjusted medication dosage.'),(70,159,'Patient responded well to treatment. Continue monitoring.'),(71,25,'Additional tests required. Scheduled for next week.'),(72,43,'Patient responded well to treatment. Continue monitoring.'),(73,80,'Treatment completed successfully. Follow-up scheduled.'),(74,137,'Additional tests required. Scheduled for next week.'),(75,128,'Patient responded well to treatment. Continue monitoring.'),(76,200,'Treatment completed successfully. Follow-up scheduled.'),(77,138,'Treatment completed successfully. Follow-up scheduled.'),(78,70,'Additional tests required. Scheduled for next week.'),(79,75,'Treatment completed successfully. Follow-up scheduled.'),(80,41,'Mild side effects observed. Adjusted medication dosage.'),(81,95,'Patient responded well to treatment. Continue monitoring.'),(82,176,'Mild side effects observed. Adjusted medication dosage.'),(83,241,'Treatment completed successfully. Follow-up scheduled.'),(84,247,'Treatment completed successfully. Follow-up scheduled.'),(85,18,'Mild side effects observed. Adjusted medication dosage.'),(86,119,'Patient shows improvement. Recommend continuing current protocol.'),(87,99,'Patient responded well to treatment. Continue monitoring.'),(88,56,'Treatment completed successfully. Follow-up scheduled.'),(89,163,'Patient shows improvement. Recommend continuing current protocol.'),(90,94,'Mild side effects observed. Adjusted medication dosage.'),(91,64,'Patient responded well to treatment. Continue monitoring.'),(92,121,'Patient responded well to treatment. Continue monitoring.'),(93,214,'Mild side effects observed. Adjusted medication dosage.'),(94,214,'Treatment completed successfully. Follow-up scheduled.'),(95,145,'Additional tests required. Scheduled for next week.'),(96,67,'Mild side effects observed. Adjusted medication dosage.'),(97,209,'Patient responded well to treatment. Continue monitoring.'),(98,116,'Patient shows improvement. Recommend continuing current protocol.'),(99,73,'Additional tests required. Scheduled for next week.'),(100,86,'Patient shows improvement. Recommend continuing current protocol.'),(101,214,'Patient shows improvement. Recommend continuing current protocol.'),(102,38,'Additional tests required. Scheduled for next week.'),(103,40,'Additional tests required. Scheduled for next week.'),(104,157,'Patient responded well to treatment. Continue monitoring.'),(105,120,'Patient responded well to treatment. Continue monitoring.'),(106,112,'Patient responded well to treatment. Continue monitoring.'),(107,53,'Patient shows improvement. Recommend continuing current protocol.'),(108,248,'Additional tests required. Scheduled for next week.'),(109,235,'Patient responded well to treatment. Continue monitoring.'),(110,225,'Patient responded well to treatment. Continue monitoring.'),(111,147,'Patient responded well to treatment. Continue monitoring.'),(112,26,'Patient shows improvement. Recommend continuing current protocol.'),(113,170,'Patient responded well to treatment. Continue monitoring.'),(114,239,'Patient shows improvement. Recommend continuing current protocol.'),(115,11,'Mild side effects observed. Adjusted medication dosage.'),(116,51,'Patient responded well to treatment. Continue monitoring.'),(117,120,'Additional tests required. Scheduled for next week.'),(118,65,'Additional tests required. Scheduled for next week.'),(119,153,'Treatment completed successfully. Follow-up scheduled.'),(120,64,'Patient shows improvement. Recommend continuing current protocol.'),(121,89,'Treatment completed successfully. Follow-up scheduled.'),(122,109,'Treatment completed successfully. Follow-up scheduled.'),(123,8,'Patient shows improvement. Recommend continuing current protocol.'),(124,161,'Patient responded well to treatment. Continue monitoring.'),(125,241,'Patient shows improvement. Recommend continuing current protocol.'),(126,126,'Treatment completed successfully. Follow-up scheduled.'),(127,228,'Patient responded well to treatment. Continue monitoring.'),(128,197,'Mild side effects observed. Adjusted medication dosage.'),(129,186,'Patient responded well to treatment. Continue monitoring.'),(130,250,'Patient shows improvement. Recommend continuing current protocol.'),(131,71,'Patient responded well to treatment. Continue monitoring.'),(132,87,'Mild side effects observed. Adjusted medication dosage.'),(133,13,'Patient responded well to treatment. Continue monitoring.'),(134,207,'Patient responded well to treatment. Continue monitoring.'),(135,54,'Treatment completed successfully. Follow-up scheduled.'),(136,169,'Treatment completed successfully. Follow-up scheduled.'),(137,224,'Additional tests required. Scheduled for next week.'),(138,229,'Treatment completed successfully. Follow-up scheduled.'),(139,82,'Patient responded well to treatment. Continue monitoring.'),(140,237,'Treatment completed successfully. Follow-up scheduled.'),(141,14,'Additional tests required. Scheduled for next week.'),(142,136,'Mild side effects observed. Adjusted medication dosage.'),(143,206,'Patient shows improvement. Recommend continuing current protocol.'),(144,192,'Patient responded well to treatment. Continue monitoring.'),(145,27,'Patient shows improvement. Recommend continuing current protocol.'),(146,39,'Treatment completed successfully. Follow-up scheduled.'),(147,242,'Mild side effects observed. Adjusted medication dosage.'),(148,1,'Additional tests required. Scheduled for next week.'),(149,79,'Patient responded well to treatment. Continue monitoring.'),(150,232,'Mild side effects observed. Adjusted medication dosage.'),(151,192,'Treatment completed successfully. Follow-up scheduled.'),(152,63,'Mild side effects observed. Adjusted medication dosage.'),(153,212,'Mild side effects observed. Adjusted medication dosage.'),(154,203,'Mild side effects observed. Adjusted medication dosage.'),(155,191,'Mild side effects observed. Adjusted medication dosage.'),(156,43,'Patient responded well to treatment. Continue monitoring.'),(157,101,'Treatment completed successfully. Follow-up scheduled.'),(158,20,'Mild side effects observed. Adjusted medication dosage.'),(159,213,'Patient shows improvement. Recommend continuing current protocol.'),(160,115,'Treatment completed successfully. Follow-up scheduled.'),(161,16,'Patient responded well to treatment. Continue monitoring.'),(162,17,'Patient responded well to treatment. Continue monitoring.'),(163,177,'Patient responded well to treatment. Continue monitoring.'),(164,195,'Additional tests required. Scheduled for next week.'),(165,120,'Additional tests required. Scheduled for next week.'),(166,21,'Treatment completed successfully. Follow-up scheduled.'),(167,65,'Additional tests required. Scheduled for next week.'),(168,34,'Treatment completed successfully. Follow-up scheduled.'),(169,62,'Additional tests required. Scheduled for next week.'),(170,108,'Treatment completed successfully. Follow-up scheduled.'),(171,242,'Additional tests required. Scheduled for next week.'),(172,130,'Mild side effects observed. Adjusted medication dosage.'),(173,38,'Patient shows improvement. Recommend continuing current protocol.'),(174,48,'Treatment completed successfully. Follow-up scheduled.'),(175,73,'Mild side effects observed. Adjusted medication dosage.');
/*!40000 ALTER TABLE `treatment_assignment_note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatmentschedule`
--

DROP TABLE IF EXISTS `treatmentschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatmentschedule` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `assignment_id` int DEFAULT NULL,
  `start_date_time` datetime DEFAULT NULL,
  `end_date_time` datetime DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `room_id` (`room_id`),
  KEY `assignment_id` (`assignment_id`),
  CONSTRAINT `treatmentSchedule_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `treatmentSchedule_ibfk_2` FOREIGN KEY (`assignment_id`) REFERENCES `treatment_assignment` (`assignment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatmentschedule`
--

LOCK TABLES `treatmentschedule` WRITE;
/*!40000 ALTER TABLE `treatmentschedule` DISABLE KEYS */;
INSERT INTO `treatmentschedule` VALUES (1,42,239,'2025-06-15 09:34:30','2025-06-17 10:14:30'),(2,70,229,'2025-06-24 09:34:30','2025-06-06 10:19:30'),(3,42,84,'2025-06-05 09:34:30','2025-06-28 10:14:30'),(4,17,81,'2025-06-06 09:34:30','2025-06-05 15:25:30'),(5,7,145,'2025-06-12 09:34:30','2025-06-04 13:45:30'),(6,1,215,'2025-06-04 09:34:30','2025-06-24 10:17:30'),(7,70,94,'2025-06-19 09:34:30','2025-06-05 10:19:30'),(8,39,232,'2025-06-17 09:34:30','2025-06-26 10:32:30'),(9,70,138,'2025-06-16 09:34:30','2025-06-20 10:19:30'),(10,17,38,'2025-06-06 09:34:30','2025-06-27 15:25:30'),(11,1,30,'2025-06-12 09:34:30','2025-06-24 10:17:30'),(12,70,118,'2025-06-25 09:34:30','2025-06-27 10:19:30'),(13,34,219,'2025-06-12 09:34:30','2025-06-21 10:17:30'),(14,7,80,'2025-06-13 09:34:30','2025-06-21 13:45:30'),(15,87,139,'2025-06-04 09:34:30','2025-06-04 10:17:30'),(16,6,172,'2025-06-11 09:34:30','2025-06-11 14:01:30'),(17,34,233,'2025-06-16 09:34:30','2025-06-05 10:25:30'),(18,17,199,'2025-06-12 09:34:30','2025-06-15 15:25:30'),(19,87,137,'2025-06-19 09:34:30','2025-06-18 10:17:30'),(20,7,170,'2025-06-22 09:34:30','2025-06-01 10:29:30'),(21,6,5,'2025-06-06 09:34:30','2025-06-15 14:01:30'),(22,39,181,'2025-06-22 09:34:30','2025-06-03 10:32:30'),(23,7,68,'2025-06-27 09:34:30','2025-06-28 10:29:30'),(24,42,9,'2025-06-25 09:34:30','2025-06-14 10:14:30'),(25,17,169,'2025-06-26 09:34:30','2025-06-16 15:25:30'),(26,39,223,'2025-06-04 09:34:30','2025-06-26 10:32:30'),(27,42,87,'2025-06-17 09:34:30','2025-06-02 10:14:30'),(28,7,25,'2025-06-03 09:34:30','2025-06-23 13:45:30'),(29,34,152,'2025-06-21 09:34:30','2025-06-24 10:17:30'),(30,42,206,'2025-06-18 09:34:30','2025-06-04 10:14:30'),(31,7,119,'2025-06-13 09:34:30','2025-06-11 13:45:30'),(32,34,212,'2025-06-20 09:34:30','2025-06-12 10:17:30'),(33,87,211,'2025-06-08 09:34:30','2025-06-12 10:17:30'),(34,87,243,'2025-06-12 09:34:30','2025-06-04 10:17:30'),(35,34,126,'2025-06-14 09:34:30','2025-06-11 10:14:30'),(36,7,66,'2025-06-22 09:34:30','2025-06-23 10:04:30'),(37,34,129,'2025-06-18 09:34:30','2025-06-02 10:25:30'),(38,7,121,'2025-06-10 09:34:30','2025-06-22 10:29:30'),(39,42,203,'2025-06-06 09:34:30','2025-05-30 10:14:30'),(40,17,246,'2025-06-09 09:34:30','2025-06-15 15:25:30'),(41,34,249,'2025-06-22 09:34:30','2025-06-18 10:17:30'),(42,70,82,'2025-06-15 09:34:30','2025-06-15 10:19:30'),(43,42,59,'2025-06-10 09:34:30','2025-06-17 10:14:30'),(44,70,225,'2025-06-09 09:34:30','2025-06-11 10:19:30'),(45,7,226,'2025-06-07 09:34:30','2025-05-30 13:45:30'),(46,42,182,'2025-05-31 09:34:30','2025-06-26 10:14:30'),(47,6,220,'2025-06-05 09:34:30','2025-06-20 14:01:30'),(48,78,71,'2025-06-24 09:34:30','2025-06-18 10:31:30'),(49,34,35,'2025-06-21 09:34:30','2025-06-02 10:14:30'),(50,7,183,'2025-06-27 09:34:30','2025-06-02 10:04:30'),(51,7,162,'2025-06-07 09:34:30','2025-06-18 13:45:30'),(52,7,64,'2025-06-12 09:34:30','2025-06-14 13:45:30'),(53,1,18,'2025-06-17 09:34:30','2025-06-11 10:17:30'),(54,34,179,'2025-06-16 09:34:30','2025-06-05 10:25:30'),(55,7,6,'2025-06-12 09:34:30','2025-06-10 10:29:30'),(56,7,65,'2025-06-27 09:34:30','2025-06-23 10:29:30'),(57,7,16,'2025-06-12 09:34:30','2025-06-11 10:04:30'),(58,7,160,'2025-06-02 09:34:30','2025-06-16 10:04:30'),(59,7,15,'2025-06-19 09:34:30','2025-06-13 13:45:30'),(60,70,234,'2025-06-16 09:34:30','2025-06-26 10:19:30'),(61,7,127,'2025-05-31 09:34:30','2025-06-06 13:45:30'),(62,34,44,'2025-06-26 09:34:30','2025-06-11 10:25:30'),(63,7,128,'2025-06-02 09:34:30','2025-06-10 10:04:30'),(64,7,209,'2025-06-03 09:34:30','2025-06-15 10:04:30'),(65,7,62,'2025-06-10 09:34:30','2025-06-20 10:04:30'),(66,42,156,'2025-06-10 09:34:30','2025-06-20 10:14:30'),(67,1,213,'2025-06-19 09:34:30','2025-05-30 10:17:30'),(68,7,184,'2025-06-16 09:34:30','2025-06-13 10:04:30'),(69,39,20,'2025-06-04 09:34:30','2025-06-12 10:32:30'),(70,7,133,'2025-06-18 09:34:30','2025-06-24 10:29:30'),(71,39,173,'2025-06-18 09:34:30','2025-06-24 10:32:30'),(72,1,151,'2025-06-18 09:34:30','2025-06-21 10:17:30'),(73,6,178,'2025-06-26 09:34:30','2025-05-31 14:01:30'),(74,70,154,'2025-06-02 09:34:30','2025-06-27 10:19:30'),(75,78,13,'2025-06-16 09:34:30','2025-06-06 10:31:30'),(76,34,177,'2025-06-27 09:34:30','2025-05-31 10:17:30'),(77,1,143,'2025-06-28 09:34:30','2025-06-03 10:17:30'),(78,34,40,'2025-06-22 09:34:30','2025-06-05 10:25:30'),(79,34,19,'2025-06-19 09:34:30','2025-06-16 10:25:30'),(80,6,56,'2025-05-30 09:34:30','2025-06-06 14:01:30'),(81,70,14,'2025-06-23 09:34:30','2025-06-04 10:19:30'),(82,7,104,'2025-06-27 09:34:30','2025-06-24 10:29:30'),(83,70,103,'2025-06-08 09:34:30','2025-06-17 10:19:30'),(84,42,29,'2025-06-10 09:34:30','2025-06-26 10:14:30');
/*!40000 ALTER TABLE `treatmentschedule` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-04 19:56:18
