-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: evaluacionesdb
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `autenticacion`
--

DROP TABLE IF EXISTS `autenticacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autenticacion` (
  `id` int NOT NULL,
  `usuario` varchar(20) DEFAULT NULL,
  `contraseña` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autenticacion`
--

LOCK TABLES `autenticacion` WRITE;
/*!40000 ALTER TABLE `autenticacion` DISABLE KEYS */;
INSERT INTO `autenticacion` VALUES (34,'lauritaaxd','$2b$05$ntvjucRQ1S9vWtli/51afODltiop/3XQsnc.VgRHxuVcYNJnLzENO'),(35,'pepeaxd','$2b$05$JkECKRDK3xbDLMZ6F7ueneSOma7vQHcDG48/YXgoP3lexK/4sB5re'),(36,'pabloleon','$2b$05$38f1u8we2XHjfcIWKC9By.VIAs9/lsLlbUFXGXtsoBLxlSIC32ely');
/*!40000 ALTER TABLE `autenticacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `estado` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `estado` (`estado`),
  CONSTRAINT `categorias_ibfk_1` FOREIGN KEY (`estado`) REFERENCES `estado_categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Lácteos','Productos derivados de la leche',1),(2,'Carnes','Productos cárnicos procesados y frescos',1),(3,'Pruebasss','Prueba borrables',1),(4,'Alimentos frescos','Productos sin procesar',1),(5,'Alimentos procesados','Productos con algún tipo de procesamiento',1),(6,'Conservas','Alimentos en conserva',1),(7,'Congelados','Alimentos conservados por congelación',1),(8,'Bebidas','Productos líquidos para consumo',1);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criterios_evaluacion`
--

DROP TABLE IF EXISTS `criterios_evaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `criterios_evaluacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `id_tipo` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tipo` (`id_tipo`),
  CONSTRAINT `criterios_evaluacion_ibfk_1` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_criterio` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criterios_evaluacion`
--

LOCK TABLES `criterios_evaluacion` WRITE;
/*!40000 ALTER TABLE `criterios_evaluacion` DISABLE KEYS */;
INSERT INTO `criterios_evaluacion` VALUES (1,'Olor','El olor debe ser característico y no desagradable',1),(2,'Análisis de Salmonella','No debe haber presencia de Salmonella',2),(3,'Etiquetado nutricional','Debe cumplir con la normativa de etiquetado',3);
/*!40000 ALTER TABLE `criterios_evaluacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_categorias`
--

DROP TABLE IF EXISTS `estado_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_categorias`
--

LOCK TABLES `estado_categorias` WRITE;
/*!40000 ALTER TABLE `estado_categorias` DISABLE KEYS */;
INSERT INTO `estado_categorias` VALUES (1,'Vigente','Categoría en uso'),(2,'Obsoleta','Categoría en desuso');
/*!40000 ALTER TABLE `estado_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_partida`
--

DROP TABLE IF EXISTS `estado_partida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_partida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_partida`
--

LOCK TABLES `estado_partida` WRITE;
/*!40000 ALTER TABLE `estado_partida` DISABLE KEYS */;
INSERT INTO `estado_partida` VALUES (1,'Activa','Partida vigente'),(2,'Inactiva','Partida obsoleta');
/*!40000 ALTER TABLE `estado_partida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_producto`
--

DROP TABLE IF EXISTS `estado_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_producto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_producto`
--

LOCK TABLES `estado_producto` WRITE;
/*!40000 ALTER TABLE `estado_producto` DISABLE KEYS */;
INSERT INTO `estado_producto` VALUES (1,'Aprobado','Producto apto para consumo'),(2,'Rechazado','Producto no apto'),(3,'En evaluación','Producto en proceso de revisión');
/*!40000 ALTER TABLE `estado_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_resultados`
--

DROP TABLE IF EXISTS `estado_resultados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_resultados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_resultados`
--

LOCK TABLES `estado_resultados` WRITE;
/*!40000 ALTER TABLE `estado_resultados` DISABLE KEYS */;
INSERT INTO `estado_resultados` VALUES (1,'Válido','Resultado verificado y aceptado'),(2,'Requiere revisión','Resultado pendiente de verificación');
/*!40000 ALTER TABLE `estado_resultados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_usuario`
--

DROP TABLE IF EXISTS `estado_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_usuario`
--

LOCK TABLES `estado_usuario` WRITE;
/*!40000 ALTER TABLE `estado_usuario` DISABLE KEYS */;
INSERT INTO `estado_usuario` VALUES (1,'Activo','Usuario con acceso al sistema'),(2,'Inactivo','Usuario deshabilitado temporalmente'),(3,'Suspendido','Usuario bloqueado por actividad sospechosa');
/*!40000 ALTER TABLE `estado_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluaciones`
--

DROP TABLE IF EXISTS `evaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_producto` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_tipo_evaluacion` int DEFAULT NULL,
  `fecha_evaluacion` date DEFAULT NULL,
  `observaciones` text,
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_tipo_evaluacion` (`id_tipo_evaluacion`),
  CONSTRAINT `evaluaciones_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `evaluaciones_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `evaluaciones_ibfk_3` FOREIGN KEY (`id_tipo_evaluacion`) REFERENCES `tipo_evaluacion` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluaciones`
--

LOCK TABLES `evaluaciones` WRITE;
/*!40000 ALTER TABLE `evaluaciones` DISABLE KEYS */;
INSERT INTO `evaluaciones` VALUES (14,1,34,1,'2025-04-10','Producto en buen estado'),(15,2,35,3,'2025-04-12','Etiquetado conforme a la normativa'),(16,3,36,2,'2025-04-13','Se tomaron muestras para análisis'),(17,2,36,2,'2025-04-22','Es un tipo de carne rara.'),(18,9,36,3,'2025-04-22','Tiene buen valor nutricional.'),(19,10,36,2,'2025-04-22','Prueba1'),(20,10,36,3,'2025-04-22','Prueba2');
/*!40000 ALTER TABLE `evaluaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_acciones`
--

DROP TABLE IF EXISTS `historial_acciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_acciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `descripcion` text,
  `fecha_hora` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `historial_acciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_acciones`
--

LOCK TABLES `historial_acciones` WRITE;
/*!40000 ALTER TABLE `historial_acciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial_acciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'Argentina','País de origen del producto'),(2,'Chile','Exportador regional de alimentos'),(3,'México','Estados Unidos Mexicanos'),(4,'Colombia','República de Colombia'),(5,'España','Reino de España');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partidas_arancelarias`
--

DROP TABLE IF EXISTS `partidas_arancelarias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partidas_arancelarias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` text,
  `estado` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `estado` (`estado`),
  CONSTRAINT `partidas_arancelarias_ibfk_1` FOREIGN KEY (`estado`) REFERENCES `estado_partida` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partidas_arancelarias`
--

LOCK TABLES `partidas_arancelarias` WRITE;
/*!40000 ALTER TABLE `partidas_arancelarias` DISABLE KEYS */;
INSERT INTO `partidas_arancelarias` VALUES (1,'0401 - Leche y nata sin concentrar',1),(2,'0201 - Carne de bovino fresca o refrigerada',1),(3,'1001 - Cereales y derivados',1),(4,'2002 - Frutas y verduras',1),(5,'3003 - Productos lácteos',1),(6,'4004 - Carnes y derivados',1),(7,'5005 - Pescados y mariscos',1);
/*!40000 ALTER TABLE `partidas_arancelarias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `marca` varchar(100) DEFAULT NULL,
  `id_subcategoria` int DEFAULT NULL,
  `id_pais` int DEFAULT NULL,
  `id_partida` int DEFAULT NULL,
  `id_estado` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_subcategoria` (`id_subcategoria`),
  KEY `id_pais` (`id_pais`),
  KEY `id_partida` (`id_partida`),
  KEY `id_estado` (`id_estado`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_subcategoria`) REFERENCES `subcategorias` (`id`) ON DELETE CASCADE,
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id`) ON DELETE CASCADE,
  CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`id_partida`) REFERENCES `partidas_arancelarias` (`id`) ON DELETE CASCADE,
  CONSTRAINT `productos_ibfk_4` FOREIGN KEY (`id_estado`) REFERENCES `estado_producto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Leche Pasteurizada 1L','La Vaquita',1,1,1,3),(2,'Carne Molida Premium','Carnes Sur',2,2,2,3),(3,'Manzanas Gala','FrutiMax',9,1,4,1),(4,'Cereal de maíz','NutriCereal',11,3,3,1),(5,'Leche condensada','LácteosDelValle',12,2,5,1),(6,'Carne molida congelada','CarnesPremium',13,4,6,2),(7,'Refresco de cola','RefrescoDelSur',14,5,NULL,1),(8,'Cereal de Chocolate','Nesquik',11,1,3,1),(9,'Galleta','Maria',11,5,3,1),(10,'Productoprueba','prueba',11,2,2,1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultados_evaluacion`
--

DROP TABLE IF EXISTS `resultados_evaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultados_evaluacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_evaluacion` int DEFAULT NULL,
  `id_criterio` int DEFAULT NULL,
  `cumple` tinyint(1) DEFAULT NULL,
  `observaciones` text,
  `estado` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_evaluacion` (`id_evaluacion`),
  KEY `id_criterio` (`id_criterio`),
  KEY `estado` (`estado`),
  CONSTRAINT `resultados_evaluacion_ibfk_1` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `resultados_evaluacion_ibfk_2` FOREIGN KEY (`id_criterio`) REFERENCES `criterios_evaluacion` (`id`) ON DELETE CASCADE,
  CONSTRAINT `resultados_evaluacion_ibfk_3` FOREIGN KEY (`estado`) REFERENCES `estado_resultados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultados_evaluacion`
--

LOCK TABLES `resultados_evaluacion` WRITE;
/*!40000 ALTER TABLE `resultados_evaluacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `resultados_evaluacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(100) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Administrador','Acceso total al sistema'),(2,'Inspector','Encargado de realizar evaluaciones'),(3,'Analista','Encargado de revisar y validar los resultados');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategorias`
--

DROP TABLE IF EXISTS `subcategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_categoria` int DEFAULT NULL,
  `id_partida` int DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `nivel_riesgo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categoria` (`id_categoria`),
  KEY `id_partida` (`id_partida`),
  CONSTRAINT `subcategorias_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`) ON DELETE CASCADE,
  CONSTRAINT `subcategorias_ibfk_2` FOREIGN KEY (`id_partida`) REFERENCES `partidas_arancelarias` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategorias`
--

LOCK TABLES `subcategorias` WRITE;
/*!40000 ALTER TABLE `subcategorias` DISABLE KEYS */;
INSERT INTO `subcategorias` VALUES (1,1,1,'Leche entera pasteurizada','Leche líquida tratada térmicamente','Medio'),(2,2,2,'Carne molida de res','Carne de res molida para consumo directo','Alto'),(9,4,4,'Frutas tropicales','Frutas de clima tropical','Bajo'),(10,4,4,'Verduras de hoja','Vegetales de hoja verde','Medio'),(11,5,3,'Cereales para desayuno','Productos procesados a base de cereales','Bajo'),(12,6,5,'Leche condensada','Leche procesada con azúcar','Bajo'),(13,7,6,'Carnes congeladas','Productos cárnicos conservados por congelación','Alto'),(14,8,NULL,'Bebidas carbonatadas','Bebidas con gas','Bajo');
/*!40000 ALTER TABLE `subcategorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_criterio`
--

DROP TABLE IF EXISTS `tipo_criterio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_criterio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_criterio` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_criterio`
--

LOCK TABLES `tipo_criterio` WRITE;
/*!40000 ALTER TABLE `tipo_criterio` DISABLE KEYS */;
INSERT INTO `tipo_criterio` VALUES (1,'Organoléptico'),(2,'Laboratorio'),(3,'Documental');
/*!40000 ALTER TABLE `tipo_criterio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_evaluacion`
--

DROP TABLE IF EXISTS `tipo_evaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_evaluacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_tipo_evaluacion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_evaluacion`
--

LOCK TABLES `tipo_evaluacion` WRITE;
/*!40000 ALTER TABLE `tipo_evaluacion` DISABLE KEYS */;
INSERT INTO `tipo_evaluacion` VALUES (1,'Sensorial'),(2,'Microbiológica'),(3,'Nutricional');
/*!40000 ALTER TABLE `tipo_evaluacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  `estado` int DEFAULT NULL,
  `id_rol` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_rol` (`id_rol`),
  KEY `estado` (`estado`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`estado`) REFERENCES `estado_usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (34,'Laura','Gómez','laura@example.com','5551234567',NULL,1,2),(35,'Pepa','Guzman pepo','pepe100@example.com','5551234567',NULL,1,2),(36,'Pablo','Leon','Pabloleon@example.com','5551244234',NULL,1,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-22 22:29:54
