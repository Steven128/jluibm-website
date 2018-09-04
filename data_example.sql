-- MySQL dump 10.13  Distrib 5.7.21, for Linux (i686)
--
-- Host: localhost    Database: JLUIBMclub
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `activity_id` varchar(30) NOT NULL COMMENT '活动ID',
  `activity_name` varchar(30) NOT NULL COMMENT '活动名',
  `setBy` varchar(10) NOT NULL COMMENT '创办活动的组',
  `place` varchar(50) NOT NULL COMMENT '活动地点',
  `time` varchar(30) NOT NULL COMMENT '活动举办时间',
  `remarks` text NOT NULL COMMENT '备注',
  `longitude` varchar(20) DEFAULT NULL COMMENT '签到地点经度',
  `latitude` varchar(20) DEFAULT NULL COMMENT '签到地点纬度',
  `state` varchar(8) NOT NULL COMMENT '活动状态，inactive（未开始） active（正在签到） finished（已完成签到）',
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES ('act_alg_180317_01','蓝桥杯培训','algorithm','李四光534','2018/03/17 evening','无','','','finished'),('act_cpp_180608_01','测试','cpp','李四光534','2018/06/08 morning','','','','inactive'),('act_oth_180407_01','新生见面会','other','李四光534','2018/04/07 evening','无','','','finished');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_sign`
--

DROP TABLE IF EXISTS `activity_sign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity_sign` (
  `submitTime` varchar(20) NOT NULL COMMENT '签到时间',
  `number` varchar(8) NOT NULL COMMENT '学号',
  `longitude` varchar(20) DEFAULT NULL COMMENT '签到地点经度',
  `latitude` varchar(20) DEFAULT NULL COMMENT '签到地点纬度',
  `activity_id` varchar(30) NOT NULL COMMENT '活动ID',
  KEY `activity_id` (`activity_id`),
  KEY `number` (`number`),
  CONSTRAINT `activity_sign_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`),
  CONSTRAINT `activity_sign_ibfk_2` FOREIGN KEY (`number`) REFERENCES `member` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动 蓝桥杯培训 签到表，表名对应activity_id';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_sign`
--

LOCK TABLES `activity_sign` WRITE;
/*!40000 ALTER TABLE `activity_sign` DISABLE KEYS */;
INSERT INTO `activity_sign` VALUES ('18:11:25','55170117','1.4211262333333','0.73047183333333','act_alg_180317_01'),('18:14:43','55170222','1.42106175','0.73037826666667','act_alg_180317_01'),('18:12:07','55170225','1.4211409','0.73036345','act_alg_180317_01'),('18:11:31','55170228','1.4211409','0.73036345','act_alg_180317_01'),('18:14:18','55170412','1.4211262333333','0.73047183333333','act_alg_180317_01'),('18:14:09','55170519','1.421041','0.73041156666667','act_alg_180317_01'),('18:14:06','55170608','1.421041','0.73041156666667','act_alg_180317_01'),('18:11:36','55170626','1.421041','0.73041156666667','act_alg_180317_01'),('18:14:40','55170705','1.421041','0.73041156666667','act_alg_180317_01'),('18:14:21','55170707','1.421041','0.73041156666667','act_alg_180317_01'),('18:14:35','55171013','1.421041','0.73041156666667','act_alg_180317_01'),('18:12:01','55171026','1.421041','0.73041156666667','act_alg_180317_01'),('14:34:09','55160208','1.4214324666667','0.7303819','act_cpp_180608_01'),('19:44:23','19171125','1.4211409','0.73036345','act_oth_180407_01'),('19:42:55','21172703','1.421041','0.73041156666667','act_oth_180407_01'),('19:42:48','23170618','1.4211425666667','0.73041041666667','act_oth_180407_01'),('19:43:12','29170224','1.42106175','0.73037826666667','act_oth_180407_01'),('19:44:06','55150116','1.42106175','0.73037826666667','act_oth_180407_01'),('19:44:00','55150911','1.4211262333333','0.73047183333333','act_oth_180407_01'),('19:43:01','55161109','1.421041','0.73041156666667','act_oth_180407_01'),('19:44:07','55170423','1.4211409','0.73036345','act_oth_180407_01'),('19:43:42','55170509','1.4211409','0.73036345','act_oth_180407_01'),('19:44:01','55170518','1.4211409','0.73036345','act_oth_180407_01'),('19:43:50','55170604','1.4211409','0.73036345','act_oth_180407_01'),('19:44:33','55170704','1.4211409','0.73036345','act_oth_180407_01'),('19:43:13','55170714','1.4211409','0.73036345','act_oth_180407_01'),('19:46:52','55170811','1.4211262333333','0.73047183333333','act_oth_180407_01'),('19:42:51','55171011','1.4211425666667','0.73041041666667','act_oth_180407_01'),('19:42:59','55171013','1.4211409','0.73036345','act_oth_180407_01'),('19:43:28','55171022','1.4211409','0.73036345','act_oth_180407_01'),('19:42:59','55171025','1.4211425666667','0.73041041666667','act_oth_180407_01'),('19:42:54','55171026','1.4212843666667','0.73039598333333','act_oth_180407_01'),('19:43:40','55171029','1.4211409','0.73036345','act_oth_180407_01'),('19:44:16','55171031','1.4211409','0.73036345','act_oth_180407_01'),('19:44:29','55171033','0','0','act_oth_180407_01'),('19:46:41','55171101','1.4211409','0.73036345','act_oth_180407_01'),('19:43:52','55171105','0','0','act_oth_180407_01'),('19:42:50','55171118','1.4211409','0.73036345','act_oth_180407_01'),('19:43:07','55171119','1.4211409','0.73036345','act_oth_180407_01'),('19:44:45','55171120','1.4211409','0.73036345','act_oth_180407_01'),('19:42:50','55171131','1.4211425666667','0.73041041666667','act_oth_180407_01');
/*!40000 ALTER TABLE `activity_sign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `algorithm_group`
--

DROP TABLE IF EXISTS `algorithm_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `algorithm_group` (
  `isLeader` tinyint(1) NOT NULL DEFAULT '0' COMMENT '成员类型，1为组长，0为普通组员',
  `number` varchar(8) NOT NULL COMMENT '学号',
  PRIMARY KEY (`number`),
  CONSTRAINT `algorithm_group_ibfk_1` FOREIGN KEY (`number`) REFERENCES `member` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='算法组组员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `algorithm_group`
--

LOCK TABLES `algorithm_group` WRITE;
/*!40000 ALTER TABLE `algorithm_group` DISABLE KEYS */;
INSERT INTO `algorithm_group` VALUES (0,'10170234'),(0,'10170330'),(0,'10170428'),(0,'10170431'),(0,'10170432'),(0,'20170930'),(0,'21160607'),(0,'21160806'),(0,'21172435'),(0,'21172601'),(0,'21172614'),(0,'21172703'),(0,'55150116'),(0,'55150911'),(1,'55160117'),(1,'55160121'),(1,'55160208'),(0,'55160236'),(1,'55160712'),(0,'55160831'),(0,'55170102'),(0,'55170117'),(0,'55170119'),(0,'55170120'),(0,'55170222'),(0,'55170225'),(0,'55170307'),(0,'55170328'),(0,'55170509'),(0,'55170519'),(0,'55170529'),(0,'55170531'),(0,'55170604'),(0,'55170608'),(0,'55170704'),(0,'55170707'),(0,'55170811'),(0,'55171011'),(0,'55171025'),(0,'55171026'),(0,'55171101'),(0,'55171105'),(0,'55171114'),(0,'55171115'),(0,'55171118'),(0,'55171119'),(0,'55171120'),(0,'55171201'),(0,'70170222');
/*!40000 ALTER TABLE `algorithm_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cpp_group`
--

DROP TABLE IF EXISTS `cpp_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cpp_group` (
  `isLeader` tinyint(1) NOT NULL DEFAULT '0' COMMENT '成员类型，1为组长，0为普通组员',
  `number` varchar(8) NOT NULL COMMENT '学号',
  PRIMARY KEY (`number`),
  CONSTRAINT `cpp_group_ibfk_1` FOREIGN KEY (`number`) REFERENCES `member` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='C/C++组组员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cpp_group`
--

LOCK TABLES `cpp_group` WRITE;
/*!40000 ALTER TABLE `cpp_group` DISABLE KEYS */;
INSERT INTO `cpp_group` VALUES (0,'10170234'),(0,'10170429'),(0,'10170432'),(0,'10170434'),(0,'19170223'),(0,'21160607'),(0,'21172406'),(0,'21172435'),(0,'21172601'),(0,'21172703'),(0,'23170109'),(0,'29170224'),(0,'55150911'),(1,'55160208'),(0,'55160236'),(1,'55160519'),(1,'55160712'),(0,'55160831'),(1,'55161013'),(0,'55161109'),(0,'55170119'),(0,'55170225'),(0,'55170228'),(0,'55170307'),(0,'55170412'),(0,'55170422'),(0,'55170423'),(0,'55170509'),(0,'55170510'),(0,'55170518'),(0,'55170608'),(0,'55170707'),(0,'55170802'),(0,'55170816'),(0,'55170833'),(0,'55171003'),(0,'55171011'),(0,'55171017'),(0,'55171022'),(0,'55171026'),(0,'55171029'),(0,'55171033'),(0,'55171101'),(0,'55171102'),(0,'55171105'),(0,'55171110'),(0,'55171118'),(0,'55171120'),(0,'55171131');
/*!40000 ALTER TABLE `cpp_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enroll`
--

DROP TABLE IF EXISTS `enroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enroll` (
  `enroll_id` varchar(30) NOT NULL COMMENT '报名表ID',
  `activity_name` varchar(30) NOT NULL COMMENT '活动名',
  `quantity` int(11) NOT NULL COMMENT '报名人数限制',
  `hold` varchar(100) NOT NULL COMMENT '举办社团名称（用逗号隔 开）',
  `remarks` text COMMENT '备注',
  `state` tinyint(1) DEFAULT '0' COMMENT '活动报名状态，0为未开放报名，1 为报名期间，2为已结束报名',
  `date` date NOT NULL COMMENT '活动举办时间',
  PRIMARY KEY (`enroll_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动报名表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enroll`
--

LOCK TABLES `enroll` WRITE;
/*!40000 ALTER TABLE `enroll` DISABLE KEYS */;
INSERT INTO `enroll` VALUES ('enr_160606','测试用例',50,'IBM俱乐部','',1,'2016-06-06'),('enr_180501','PS培训',60,'IBM俱乐部,吉大科协','',1,'2018-05-01');
/*!40000 ALTER TABLE `enroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enroll_join`
--

DROP TABLE IF EXISTS `enroll_join`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enroll_join` (
  `submitTime` datetime NOT NULL COMMENT '报名时间',
  `name` varchar(20) NOT NULL COMMENT '姓名',
  `number` varchar(8) NOT NULL COMMENT '学号',
  `college` varchar(100) NOT NULL COMMENT '学院',
  `gender` varchar(6) NOT NULL COMMENT '性别，男为male，女为female',
  `grade` tinyint(1) NOT NULL COMMENT '年级，数字代表几年级',
  `qq` varchar(15) NOT NULL COMMENT 'QQ号码',
  `comeFrom` varchar(50) NOT NULL COMMENT '来自哪个社团',
  `enroll_id` varchar(30) NOT NULL COMMENT '报名表ID',
  KEY `enroll_id` (`enroll_id`),
  CONSTRAINT `enroll_join_ibfk_1` FOREIGN KEY (`enroll_id`) REFERENCES `enroll` (`enroll_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动 。。。 报名表，记录报名信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enroll_join`
--

LOCK TABLES `enroll_join` WRITE;
/*!40000 ALTER TABLE `enroll_join` DISABLE KEYS */;
/*!40000 ALTER TABLE `enroll_join` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `java_group`
--

DROP TABLE IF EXISTS `java_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `java_group` (
  `isLeader` tinyint(1) NOT NULL DEFAULT '0' COMMENT '成员类型，1为组长，0为普通组员',
  `number` varchar(8) NOT NULL COMMENT '学号',
  PRIMARY KEY (`number`),
  CONSTRAINT `java_group_ibfk_1` FOREIGN KEY (`number`) REFERENCES `member` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Java组组员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `java_group`
--

LOCK TABLES `java_group` WRITE;
/*!40000 ALTER TABLE `java_group` DISABLE KEYS */;
INSERT INTO `java_group` VALUES (0,'19171125'),(0,'20170930'),(0,'21172721'),(0,'23170618'),(0,'55150116'),(1,'55160208'),(0,'55160236'),(1,'55160712'),(0,'55160831'),(0,'55170119'),(0,'55170120'),(0,'55170222'),(0,'55170225'),(0,'55170328'),(0,'55170505'),(0,'55170507'),(0,'55170510'),(0,'55170626'),(0,'55170705'),(0,'55170707'),(0,'55170816'),(0,'55170833'),(0,'55171013'),(0,'55171022'),(0,'55171114'),(0,'70170222');
/*!40000 ALTER TABLE `java_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `join_date`
--

DROP TABLE IF EXISTS `join_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `join_date` (
  `date` date NOT NULL COMMENT '注册时间',
  `number` varchar(8) NOT NULL COMMENT '学号',
  PRIMARY KEY (`number`),
  CONSTRAINT `join_date_ibfk_1` FOREIGN KEY (`number`) REFERENCES `member` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='报名表，记录报名时填写表单的数据，不再更新数据';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `join_date`
--

LOCK TABLES `join_date` WRITE;
/*!40000 ALTER TABLE `join_date` DISABLE KEYS */;
INSERT INTO `join_date` VALUES ('2018-03-25','08170417'),('2018-03-25','10170234'),('2018-03-24','10170330'),('2018-03-24','10170428'),('2018-03-25','10170429'),('2018-03-25','10170431'),('2018-03-25','10170432'),('2018-03-25','10170434'),('2018-03-25','10170524'),('2018-03-26','19170223'),('2018-03-25','19171125'),('2018-03-25','20170930'),('2018-03-14','21160607'),('2018-03-17','21160806'),('2018-03-14','21172406'),('2018-04-01','21172435'),('2018-03-25','21172601'),('2018-03-25','21172614'),('2018-03-19','21172703'),('2018-04-18','21172721'),('2018-03-25','23170109'),('2018-03-25','23170618'),('2018-03-25','24170835'),('2018-03-25','29170224'),('2018-03-23','55150116'),('2018-04-07','55150911'),('2018-03-14','55160117'),('2018-03-10','55160121'),('2018-03-07','55160208'),('2018-06-05','55160236'),('2018-03-14','55160519'),('2018-03-07','55160712'),('2018-03-31','55160831'),('2018-03-14','55161013'),('2018-04-18','55161024'),('2018-03-26','55161109'),('2018-03-26','55170102'),('2018-03-17','55170117'),('2018-03-10','55170119'),('2018-03-25','55170120'),('2018-03-17','55170222'),('2018-03-16','55170225'),('2018-03-17','55170228'),('2018-03-25','55170307'),('2018-03-25','55170328'),('2018-03-17','55170412'),('2018-03-25','55170422'),('2018-03-25','55170423'),('2018-03-17','55170503'),('2018-03-17','55170505'),('2018-03-17','55170507'),('2018-03-17','55170509'),('2018-03-17','55170510'),('2018-04-07','55170518'),('2018-03-17','55170519'),('2018-03-17','55170529'),('2018-03-14','55170531'),('2018-03-25','55170604'),('2018-03-17','55170608'),('2018-03-17','55170626'),('2018-03-23','55170704'),('2018-03-17','55170705'),('2018-03-16','55170707'),('2018-03-25','55170714'),('2018-03-16','55170802'),('2018-03-25','55170811'),('2018-03-14','55170816'),('2018-03-15','55170833'),('2018-03-14','55171003'),('2018-04-04','55171011'),('2018-03-16','55171013'),('2018-04-07','55171017'),('2018-04-07','55171022'),('2018-03-25','55171023'),('2018-03-25','55171025'),('2018-03-16','55171026'),('2018-03-14','55171029'),('2018-03-25','55171031'),('2018-04-07','55171033'),('2018-04-07','55171101'),('2018-03-14','55171102'),('2018-03-25','55171105'),('2018-03-16','55171110'),('2018-03-25','55171114'),('2018-03-25','55171115'),('2018-03-25','55171118'),('2018-03-25','55171119'),('2018-04-07','55171120'),('2018-03-24','55171131'),('2018-06-08','55171201'),('2018-03-25','70170222');
/*!40000 ALTER TABLE `join_date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learned_text`
--

DROP TABLE IF EXISTS `learned_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `learned_text` (
  `number` varchar(8) NOT NULL COMMENT '学号',
  `learned` text COMMENT '学过的知识',
  PRIMARY KEY (`number`),
  CONSTRAINT `learned_text_ibfk_1` FOREIGN KEY (`number`) REFERENCES `member` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='报名时留言学过的知识';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learned_text`
--

LOCK TABLES `learned_text` WRITE;
/*!40000 ALTER TABLE `learned_text` DISABLE KEYS */;
INSERT INTO `learned_text` VALUES ('08170417','python'),('10170234','基本没有学过。'),('10170330','c语言'),('10170428','C语言'),('10170429','c'),('10170431',''),('10170432','正在学习c语言'),('10170434',''),('10170524',''),('19170223',''),('19171125',''),('20170930','c/java/python'),('21160607','数据结构'),('21160806','c、c  、数据结构'),('21172406','C  '),('21172435','c'),('21172601','c'),('21172614','c . c  '),('21172703','c语言，数据结构'),('21172721','C/C  /HTML5/CSS'),('23170109','C语言 python'),('23170618','JAVA Python Linux'),('24170835',''),('29170224','C'),('55150116',''),('55150911','c  /c/lua/java/c#/hlsl/图形学/编译原理/操作系统'),('55160117','没有 不会'),('55160121','C C  '),('55160208','无可奉告'),('55160236','c语言 c＋＋  java'),('55160519',''),('55160712',''),('55160831','c/c  /java/'),('55161013',''),('55161024','html  css js  jquery'),('55161109','软件工程大一大二范围内的课程@_@'),('55170102',''),('55170117','C C   python'),('55170119',''),('55170120',''),('55170222','C'),('55170225','c'),('55170228',''),('55170307','c/c  '),('55170328','学过c语言，Java语言，c  语言，接触过Python'),('55170412',''),('55170422',''),('55170423','c'),('55170503','C java'),('55170505','c java'),('55170507','c/c  ，Java'),('55170509','C'),('55170510','C'),('55170518',''),('55170519',''),('55170529',''),('55170531','c,php,py'),('55170604','C语言'),('55170608',''),('55170626','一点点python'),('55170704','C语言'),('55170705','c'),('55170707','C语言'),('55170714',''),('55170802','C/C  '),('55170811','c/c  '),('55170816','C语言'),('55170833','c，python'),('55171003','c/c  '),('55171011','C语言'),('55171013',''),('55171017','c语言'),('55171022','C'),('55171023',''),('55171025','c c   python  c#  ubuntu  '),('55171026','C/C  '),('55171029','一点点Python，一点点Linux'),('55171031','C语言'),('55171033','c'),('55171101','html CSS Python'),('55171102','c# php'),('55171105','学过c语言，数据结构和c  在学'),('55171110',''),('55171114','c，c  ，html（一点点）'),('55171115','C     C  和算法导论学了一点。。'),('55171118',''),('55171119','c，c  '),('55171120','c语言'),('55171131','C  '),('55171201',''),('70170222','Java');
/*!40000 ALTER TABLE `learned_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linux_group`
--

DROP TABLE IF EXISTS `linux_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linux_group` (
  `isLeader` tinyint(1) NOT NULL DEFAULT '0' COMMENT '成员类型，1为组长，0为普通组员',
  `number` varchar(8) NOT NULL COMMENT '学号',
  PRIMARY KEY (`number`),
  CONSTRAINT `linux_group_ibfk_1` FOREIGN KEY (`number`) REFERENCES `member` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Linux组组员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linux_group`
--

LOCK TABLES `linux_group` WRITE;
/*!40000 ALTER TABLE `linux_group` DISABLE KEYS */;
INSERT INTO `linux_group` VALUES (0,'10170524'),(0,'23170618'),(1,'55160208'),(0,'55160236'),(1,'55160712'),(0,'55160831'),(0,'55161109'),(0,'55170225'),(0,'55170531'),(0,'55171023'),(0,'55171029'),(0,'55171102'),(0,'70170222');
/*!40000 ALTER TABLE `linux_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `isManager` tinyint(1) NOT NULL DEFAULT '0' COMMENT '用户类型，1为管理员，0为普通社员',
  `password` varchar(32) DEFAULT NULL COMMENT '用户的登录密码',
  `userPic` varchar(40) DEFAULT '../../userPicUpload/default.png' COMMENT '用户头像的存储路径',
  `name` varchar(20) NOT NULL COMMENT '姓名',
  `number` varchar(8) NOT NULL COMMENT '学号',
  `college` varchar(100) NOT NULL COMMENT '学院',
  `major` varchar(100) NOT NULL COMMENT '专业',
  `gender` tinyint(1) NOT NULL COMMENT '性别，男为0 女为1',
  `grade` varchar(1) NOT NULL COMMENT '年级',
  `qq` varchar(15) NOT NULL COMMENT 'QQ号码',
  `phone` varchar(11) NOT NULL COMMENT '电话',
  `cpp` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否是C/C++组组员，1为是，0为否',
  `algorithm` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否是算法组组员，1为是，0为否',
  `web` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否是Web组组员，1为是，0为否',
  `linux` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否是Linux组组员，1为是，0为否',
  `java` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否是Java组组员，1为是，0为否',
  PRIMARY KEY (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (0,'8ec5b9b2d3b232da567e5ba3d1606fd1','../../userPicUpload/08170417.png','田苗','08170417','行政学院','行政管理',1,'1','1054479320','18844135299',0,0,1,0,0),(0,'bc9277519a1adba73407a075b9d420e9','../../userPicUpload/10170234.png','肖祖尚','10170234','数学学院','数学与应用数学',0,'1','1256500415','15887889710',1,1,0,0,0),(0,'9c4fbbc2d1560e8c98247af5f1dff824','../../userPicUpload/10170330.png','容易','10170330','数学学院','信息与计算科学(数学学院)',0,'1','571641887','18843146989',0,1,0,0,0),(0,'66cac33f54d9d585c7375bf240b68b09','../../userPicUpload/default.png','王岳政','10170428','数学学院','信息与计算科学(数学学院)',0,'1','2506066714','17673143616',0,1,0,0,0),(0,'b24e90853da36ce84ed0fe518448cee8','../../userPicUpload/10170429.png','陈宇航','10170429','数学学院','信息与计算科学(数学学院)',0,'1','884505461','15211306043',1,0,0,0,0),(0,'250ee835105d6131ae5d2ed3e98c4d58','../../userPicUpload/10170431.png','杨卓霖','10170431','数学学院','信息与计算科学(数学学院)',0,'1','1207014796','18844133321',0,1,0,0,0),(0,'344c16e5b790ab3818e288e8730c0bcf','../../userPicUpload/10170432.png','都宇韬','10170432','数学学院','信息与计算科学(数学学院)',0,'1','1776875573','13348983087',1,1,0,0,0),(0,'7ed40e14742c253b6772e93c28621c4a','../../userPicUpload/10170434.png','李银朋','10170434','数学学院','信息与计算科学(数学学院)',0,'1','1635124433','17519243901',1,0,1,0,0),(0,'71721bfab5fa1d41f544901eafd64f3b','../../userPicUpload/10170524.png','吕凤棋','10170524','数学学院','统计学',0,'1','906463445','15601084106',0,0,0,1,0),(0,'56888f13a589474a160cee715ed6709b','../../userPicUpload/19170223.png','冯朝阳','19170223','电子科学与工程学院','电子信息科学与技术',0,'1','1947079425','15886773670',1,0,1,0,0),(0,'b982636c03afffd1537b0f0282d8955e','../../userPicUpload/default.png','梁辰','19171125','电子科学与工程学院','电子科学与技术',0,'1','1072127205','13147657963',0,0,0,0,1),(0,'df6d091abec63ee799e0caecff05abf3','../../userPicUpload/20170930.png','温继贤','20170930','通信工程学院','信息工程',0,'1','3335177094','18180769506',0,1,0,0,1),(0,'92abd4b68c313fadcb9339e54cae61a0','../../userPicUpload/21160607.png','叶静','21160607','计算机科学与技术学院','计算机科学与技术',1,'2','3480018837','17843122005',1,1,0,0,0),(0,'cf470fdea338fff77965fcd9ce2e86b7','../../userPicUpload/default.png','邓艳红','21160806','计算机科学与技术学院','计算机科学与技术',1,'2','996794385','18581147003',0,1,1,0,0),(0,'9d8239fe0ed0ebd49c9d25cd958fe73b','../../userPicUpload/21172406.png','张闯','21172406','计算机科学与技术学院','计算机科学与技术',0,'1','1343029425','15714341679',1,0,0,0,0),(0,'55ca00a10d0d2afac2eecb61bc85a65b','../../userPicUpload/21172435.png','何昆霖','21172435','计算机科学与技术学院','计算机科学与技术',0,'1','1257037783','15604411268',1,1,0,0,0),(0,'df3db72a4a832bf3657cf3c23c45dc1e','../../userPicUpload/21172601.png','王琪玮','21172601','计算机科学与技术学院','计算机科学与技术',0,'1','1741057508','18844128475',1,1,0,0,0),(0,'0cf78e39ec28530fe5d96ef759a26772','../../userPicUpload/default.png','孙瑛璐','21172614','计算机科学与技术学院','计算机科学与技术',1,'1','3235965801','18243854353',0,1,1,0,0),(0,'79ff0c2143574d02f4f5093072da2db3','../../userPicUpload/21172703.png','雷浩洁','21172703','计算机科学与技术学院','计算机科学与技术',0,'1','1301547369','18844128462',1,1,0,0,0),(1,'8ea384786ffe5d7ec70c4612f11bc1ef','../../userPicUpload/21172721.png','陈建玮','21172721','计算机科学与技术学院','计算机科学与技术',0,'1','1070456974','15598594772',0,0,1,0,1),(0,'bda472abf2b6ba675cba7d1b2011f84b','../../userPicUpload/23170109.png','韩宝玉','23170109','地球探测科学与技术学院','地球物理学',0,'1','1249749499','17519243569',1,0,0,0,0),(0,'d807405628aa2c14fb647bcd817a7c11','../../userPicUpload/default.png','解瑞','23170618','地球探测科学与技术学院','测绘工程',0,'1','1193355952','18709839092',0,0,0,1,1),(0,'f306fc2d474659652df636a0d5365573','../../userPicUpload/24170835.png','马子雄','24170835','建设工程学院','工科试验班(地质工程)',0,'1','1505423508','18844112080',0,0,1,0,0),(0,'edd7debd5725b6bac09de1faf9d7164d','../../userPicUpload/29170224.png','蒋思航','29170224','护理学院','护理学',0,'1','1093007757','18804318772',1,0,1,0,0),(0,'d8b55069ecc556dada22fd72d2902c47','../../userPicUpload/55150116.png','韩晔聪','55150116','软件学院','软件工程',0,'3','964529139','15834585915',0,1,1,0,1),(0,'9ee3150bda1b30d056d8a80ec0e59b34','../../userPicUpload/55150911.png','刘骐嘉','55150911','软件学院','软件工程',0,'3','765465865','13604302852',1,1,1,0,0),(1,'2e4c3eb870a1f23fc88b583f5e43f585','../../userPicUpload/55160117.png','万懿锋','55160117','软件学院','软件工程',0,'2','121108850','17843126792',0,1,0,0,0),(1,'8b32858a336b72f41e2dcf600b8dab60','../../userPicUpload/55160121.png','何宇鹏','55160121','软件学院','软件工程',0,'2','834613101','13604568355',0,1,0,0,0),(1,'717a5752215bd63bfc3c1adea1483241','../../userPicUpload/55160208.png','邱昊然','55160208','软件学院','软件工程',0,'2','2678061071','17649820690',1,1,1,1,1),(0,'91c88aa4199fdfb791e14cae89159075','../../userPicUpload/default.png','刘路','55160236','软件学院','软件工程',0,'2','1982033466','18443999811',1,1,1,1,1),(1,'0bb6b7f818653478bdb394fca6835eb7','../../userPicUpload/55160519.png','楚程翔','55160519','软件学院','软件工程',0,'2','1215502776','18844097095',1,0,0,0,0),(1,'de5d15cf83ebe9419c5879d6cd2ac8c5','../../userPicUpload/55160712.png','田金东','55160712','软件学院','软件工程',0,'2','952524069','15584240965',1,1,1,1,1),(0,'81d5faa35c9c9e43f97011f1b112546f','../../userPicUpload/default.png','雷银春','55160831','软件学院','软件工程',0,'2','1776109898','15826443379',1,1,1,1,1),(1,'e68fee5cd19e808c8b35db3757a5ecc7','../../userPicUpload/default.png','龙思凡','55161013','软件学院','软件工程',0,'2','863534383','18844097361',1,0,0,0,0),(0,'6924770f7c0c6dfac68ab3c37155f9c9','../../userPicUpload/default.png','靳海龙','55161024','软件学院','软件工程',0,'2','1343815893','15043004452',0,0,1,0,0),(0,'e411752cf8f72735c262c2fa7d3c26e7','../../userPicUpload/55161109.png','朱小谢','55161109','软件学院','软件工程',0,'2','1261099254','13869391527',1,0,0,1,0),(0,'8781254f3bab8e63a371d18989a0fd0b','../../userPicUpload/55170102.png','白晗','55170102','软件学院','软件工程',1,'1','1147710217','18830065102',0,1,0,0,0),(0,'6970c42826068e052db59aafd4a60331','../../userPicUpload/55170117.png','王兴昊','55170117','软件学院','软件工程',0,'1','438630875','17390940984',0,1,1,0,0),(0,'0939f68ecf6c7122c97d8c390d5039f2','../../userPicUpload/55170119.png','王泽赢','55170119','软件学院','软件工程',0,'1','1049290401','15526649681',1,1,0,0,1),(0,'07ff3425f9c457b43429a30d12313a2b','../../userPicUpload/55170120.png','王天放','55170120','软件学院','软件工程',0,'1','441912994','15946620098',0,1,0,0,1),(0,'82b3fc26742d7f2f78e3af0aca919265','../../userPicUpload/55170222.png','徐宇扬','55170222','软件学院','软件工程',0,'1','770416566','13958162741',0,1,0,0,1),(0,'40a0f1db40f4167e8dfe28cb4b29b90a','../../userPicUpload/55170225.png','汤嘉','55170225','软件学院','软件工程',0,'1','947120018','13863327182',1,1,1,1,1),(0,'edc2721b425149c962312128a76ed0d0','../../userPicUpload/default.png','周龙','55170228','软件学院','软件工程',0,'1','2281753944','13104422486',1,0,0,0,0),(0,'64ff2f106a2234ac8f8c342f1f02a9a0','../../userPicUpload/default.png','孙雨欣','55170307','软件学院','软件工程',1,'1','595434909','15526870016',1,1,0,0,0),(0,'a05a125ad77a5ea9346bf3b4cdd0a2c5','../../userPicUpload/55170328.png','胡彪','55170328','软件学院','软件工程',0,'1','1045515285','13396181326',0,1,0,0,1),(0,'d7b966c374ac9df5b58ed9c5d0fe0ac0','../../userPicUpload/default.png','徐梓涵','55170412','软件学院','软件工程',0,'1','899233013','18844112403',1,0,0,0,0),(0,'01c0b9fb771c924a3b630aa4908da654','../../userPicUpload/default.png','秦震','55170422','软件学院','软件工程',0,'1','464804255','18844111465',1,0,0,0,0),(0,'f733d448412b651a02e53b192fdc2e85','../../userPicUpload/default.png','沈飞鸿','55170423','软件学院','软件工程',0,'1','508178817','13675773263',1,0,0,0,0),(0,'ad363951bf39cf9e6a8975110a94364a','../../userPicUpload/default.png','郑春月','55170503','软件学院','软件工程',1,'1','1529474826','17519243608',0,0,1,0,0),(0,'97a7f1bccd9f73b16aef4136a282c3ad','../../userPicUpload/55170505.png','魏珂欣','55170505','软件学院','软件工程',1,'1','1051607807','17519242562',0,0,1,0,1),(0,'2ec0f49e8f1d14b9412ac336b39c3bf7','../../userPicUpload/55170507.png','张玉叶','55170507','软件学院','软件工程',1,'1','617619767','17519240842',0,0,0,0,1),(0,'6b32478e20739d9ff5e25895880be1f5','../../userPicUpload/55170509.png','高磊','55170509','软件学院','软件工程',0,'1','1769824245','17692320477',1,1,0,0,0),(0,'63983f685c4b7fd7c134d61eb100ce25','../../userPicUpload/55170510.png','李雅帅','55170510','软件学院','软件工程',0,'1','1341648608','18514344869',1,0,0,0,1),(0,'9a9de4aff50491d6a233d87d0abaa364','../../userPicUpload/55170518.png','田晓林','55170518','软件学院','软件工程',0,'1','2046250197','15143896185',1,0,0,0,0),(0,'af2c1a90de4566a92a61be42f197db80','../../userPicUpload/default.png','马国睿','55170519','软件学院','软件工程',0,'1','1733309172','15526893141',0,1,0,0,0),(0,'fd0a2b329a26c74a7f78a83a3d27a154','../../userPicUpload/55170529.png','刘世喆','55170529','软件学院','软件工程',0,'1','2414946247','18774669895',0,1,0,0,0),(0,'f91e7b2152a689e1f0ca1936448f46e3','../../userPicUpload/55170531.png','陈宝','55170531','软件学院','软件工程',0,'1','321927153','18580561530',0,1,0,1,0),(0,'27bb844637dbc3116a05a0f620d1f7cc','../../userPicUpload/55170604.png','阎一诺','55170604','软件学院','软件工程',1,'1','2648806340','18804313611',0,1,0,0,0),(0,'ddc088deca4c0a157cb53df30f3cb1cb','../../userPicUpload/55170608.png','孟磊','55170608','软件学院','软件工程',0,'1','2458975449','15526879147',1,1,0,0,0),(0,'3fa092c49dad54a466cb2ffdd00dad6c','../../userPicUpload/55170626.png','赵庆澳','55170626','软件学院','软件工程',0,'1','1337225737','15543511491',0,0,0,0,1),(0,'fd8ccc3c6f61fd3de1b465463a73bd6c','../../userPicUpload/55170704.png','孟莹','55170704','软件学院','软件工程',1,'1','2054536689','15543584720',0,1,0,0,0),(0,'9ecc4002337cdac9764d7a687d137bce','../../userPicUpload/default.png','孙淇','55170705','软件学院','软件工程',1,'1','1627315958','15526662472',0,0,1,0,1),(0,'c3bf78331a8b83b13430f5243309ffe9','../../userPicUpload/55170707.png','王子璇','55170707','软件学院','软件工程',1,'1','961185809','15209522137',1,1,0,0,1),(0,'c50c669b7ae426fc580d1a146d828296','../../userPicUpload/default.png','黄星','55170714','软件学院','软件工程',0,'1','1090355267','13904390126',0,0,1,0,0),(0,'a3fa6130eb1bfa47d2470615e4a00baf','../../userPicUpload/55170802.png','舒曼','55170802','软件学院','软件工程',1,'1','2854808687','13159502729',1,0,0,0,0),(0,'498194ea6c90a94d1dbdb73284d60861','../../userPicUpload/default.png','麻铭典','55170811','软件学院','软件工程',0,'1','460937922','15640116215',0,1,0,0,0),(0,'fbe2b82d87e2ca0c94f31cd33d726bb9','../../userPicUpload/55170816.png','王圣方','55170816','软件学院','软件工程',0,'1','984058907','18744290119',1,0,0,0,1),(0,'b02913e5c93bf4f838d0d301178971c6','../../userPicUpload/55170833.png','田向楠','55170833','软件学院','软件工程',0,'1','1764261714','15143079303',1,0,0,0,1),(0,'fd26c209f95cd09030179388f2197562','../../userPicUpload/55171003.png','朱静','55171003','软件学院','软件工程',1,'1','870878469','18843356607',1,0,0,0,0),(0,'60f8d150e7150906b7c4e1d7dd1a2729','../../userPicUpload/55171011.png','于晴海','55171011','软件学院','软件工程',0,'1','337362251','13942087207',1,1,0,0,0),(0,'c8053e7013289c06fe707fa6df113953','../../userPicUpload/55171013.png','李东宇','55171013','软件学院','软件工程',0,'1','457788157','18604456178',0,0,0,0,1),(0,'8c8c1f6a7133e7d72632a51230091c97','../../userPicUpload/55171017.png','李卓潼','55171017','软件学院','软件工程',0,'1','2468776256','17519241103',1,0,0,0,0),(0,'3cd3113744abf17eaab1fa4520d298b2','../../userPicUpload/55171022.png','陈晓旭','55171022','软件学院','软件工程',0,'1','3532370250','18844118056',1,0,0,0,1),(0,'7df787ca2cb9bdfbdea3e3ac3ecb3f7b','../../userPicUpload/55171023.png','郭富城','55171023','软件学院','软件工程',0,'1','1018687955','18844117760',0,0,0,1,0),(0,'ab1994b0c10a24251d2aedebca81c0b1','../../userPicUpload/55171025.png','张煜松','55171025','软件学院','软件工程',0,'1','303306714','13838951082',0,1,1,0,0),(0,'c30230a0bf4c6b56937564ae37feef36','../../userPicUpload/55171026.png','方磊','55171026','软件学院','软件工程',0,'1','392707595','18238259962',1,1,0,0,0),(0,'2a394c8cc2a9db07f8ac85094d7ea1cb','../../userPicUpload/55171029.png','容程烽','55171029','软件学院','软件工程',0,'1','836608885','15018190903',1,0,0,1,0),(0,'45148b1d476f0600095ef817c9eced23','../../userPicUpload/55171031.png','郭一鸣','55171031','软件学院','软件工程',0,'1','1423390801','15526637479',0,0,1,0,0),(0,'55b2c6d30e0ac3258f42cbe7966de3b6','../../userPicUpload/default.png','魏文杰','55171033','软件学院','软件工程',0,'1','1873345106','15202579225',1,0,0,0,0),(0,'42f3a564c9c2370a5f1ab4aac7458af7','../../userPicUpload/55171101.png','陈宇哲','55171101','软件学院','软件工程',0,'1','1059496154','17390940514',1,1,0,0,0),(0,'7b715f8f8ee3d53d0b4e1c90d652ad87','../../userPicUpload/55171102.png','杨良正','55171102','软件学院','软件工程',0,'1','670171961','17519469325',1,0,1,1,0),(0,'3b510695b7ce9361ecf2ef2d100a38b4','../../userPicUpload/55171105.png','王惠宁','55171105','软件学院','软件工程',1,'1','471345952','17390956560',1,1,0,0,0),(0,'f801d3d1cf6435ffcc9ba26996144fb2','../../userPicUpload/default.png','李玲玲 ','55171110','软件学院','软件工程',1,'1','2654585019','18175515602',1,0,0,0,0),(0,'81b67a55a1cc80b41e5335b6bfa38d19','../../userPicUpload/55171114.png','张迩瀚','55171114','软件学院','软件工程',0,'1','353075371','15526883076',0,1,1,0,1),(0,'704c9edbfa7addc84de6478b7be724b3','../../userPicUpload/55171115.png','于晨晖','55171115','软件学院','软件工程',0,'1','905779660','15526894656',0,1,0,0,0),(0,'be4c4022cdc59f30f584c95ef959d01b','../../userPicUpload/55171118.png','谢旭晨','55171118','软件学院','软件工程',0,'1','313441979','17705852351',1,1,0,0,0),(0,'474680e7f75d6c2dfaa22b8c4b3b5a8b','../../userPicUpload/55171119.png','黄旭','55171119','软件学院','软件工程',0,'1','1741823581','18879513235',0,1,0,0,0),(0,'69c7384246651f223f3c91268055009f','../../userPicUpload/55171120.png','李广鹏','55171120','软件学院','软件工程',0,'1','1301912698','18584365065',1,1,0,0,0),(0,'c0613460a91819ba090cb2cb61b11f5b','../../userPicUpload/55171131.png','修可栋','55171131','软件学院','软件工程',0,'1','1226448285','13147713358',1,0,0,0,0),(0,'fadc06e901235ffee7c46a1def7eabbc','../../userPicUpload/55171201.png','李四','55171201','软件学院','软件工程',0,'1','123456789','17546215789',0,1,1,0,0),(0,'c89084f83f7a6e7fc4ff8c95fee8ad50','../../userPicUpload/70170222.png','谭邦泰','70170222','临床医学院','临床医学',0,'1','542060759','18043113203',0,1,0,1,1);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_group`
--

DROP TABLE IF EXISTS `web_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_group` (
  `isLeader` tinyint(1) NOT NULL DEFAULT '0' COMMENT '成员类型，1为组长，0为普通组员',
  `number` varchar(8) NOT NULL COMMENT '学号',
  PRIMARY KEY (`number`),
  CONSTRAINT `web_group_ibfk_1` FOREIGN KEY (`number`) REFERENCES `member` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Web组组员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_group`
--

LOCK TABLES `web_group` WRITE;
/*!40000 ALTER TABLE `web_group` DISABLE KEYS */;
INSERT INTO `web_group` VALUES (0,'08170417'),(0,'10170434'),(0,'19170223'),(0,'21160806'),(0,'21172614'),(0,'21172721'),(0,'24170835'),(0,'29170224'),(0,'55150116'),(0,'55150911'),(1,'55160208'),(0,'55160236'),(1,'55160712'),(0,'55160831'),(0,'55161024'),(0,'55170117'),(0,'55170225'),(0,'55170503'),(0,'55170505'),(0,'55170705'),(0,'55170714'),(0,'55171025'),(0,'55171031'),(0,'55171102'),(0,'55171114'),(0,'55171201');
/*!40000 ALTER TABLE `web_group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-02 11:25:49
