# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.18)
# Database: shmaur
# Generation Time: 2018-04-15 16:12:39 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table _mysql_session_store
# ------------------------------------------------------------

DROP TABLE IF EXISTS `_mysql_session_store`;

CREATE TABLE `_mysql_session_store` (
  `id` varchar(255) NOT NULL,
  `expires` bigint(20) DEFAULT NULL,
  `data` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `_mysql_session_store` WRITE;
/*!40000 ALTER TABLE `_mysql_session_store` DISABLE KEYS */;

INSERT INTO `_mysql_session_store` (`id`, `expires`, `data`)
VALUES
	('USER_SID:-h02UIiPtTmM-tV_3Aos2uAV5dc3kulK',1522351790991,'{\"user_login\":\"shmaur\",\"id\":1}'),
	('USER_SID:8TSX7oJoMgX6G3s8F2XNA7QWpuuKKiMQ',1522351487182,'{\"user\":\"shmaur\"}'),
	('USER_SID:gpJ_InuVjj_VcxTW6YmpXEiTBsa62IBU',1522354478589,'{\"user_login\":\"shmaur\",\"id\":1}'),
	('USER_SID:qE66FWWcrqal1MOy2pOMEm3Dumlju58k',1522354064258,'{\"user_login\":\"shmaur\",\"id\":1}'),
	('USER_SID:uPagVTeMH3FSfli2MjPOukiBPFWfweAQ',1522354263600,'{\"user_login\":\"shmaur\",\"id\":1}');

/*!40000 ALTER TABLE `_mysql_session_store` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table article
# ------------------------------------------------------------

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(20) DEFAULT NULL COMMENT '作者id',
  `article_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  `article_content` longtext COMMENT '文章内容',
  `article_title` mediumtext COMMENT '标题',
  `article_excerpt` mediumtext COMMENT '摘录',
  `article_status` varchar(20) DEFAULT NULL COMMENT '文章状态',
  `comment_status` varchar(20) DEFAULT NULL COMMENT '评论状态',
  `article_modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `article_found` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `article_label` varchar(20) DEFAULT NULL COMMENT '文章标签',
  `article_photo` varchar(100) DEFAULT NULL COMMENT '文章配图',
  `article_type_id` bigint(20) DEFAULT NULL COMMENT '文章类型id',
  `article_count` bigint(20) DEFAULT NULL COMMENT '评论数量',
  `article_issue` tinyint(1) DEFAULT NULL COMMENT '是否发布',
  `article_original` tinyint(1) DEFAULT NULL COMMENT '是否原创',
  `article_author` varchar(50) DEFAULT NULL COMMENT '文章作者',
  `article_class` varchar(100) DEFAULT NULL COMMENT '文章分类',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table articleImg
# ------------------------------------------------------------

DROP TABLE IF EXISTS `articleImg`;

CREATE TABLE `articleImg` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '图片ID',
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `img_name` varchar(50) DEFAULT NULL COMMENT '图片名称',
  `img_path` varchar(100) DEFAULT NULL COMMENT '图片路径',
  `img_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table upload
# ------------------------------------------------------------

DROP TABLE IF EXISTS `upload`;

CREATE TABLE `upload` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint(20) unsigned DEFAULT '0' COMMENT '用户id',
  `file_name` char(200) DEFAULT NULL COMMENT '文件名称',
  `file_path` char(200) DEFAULT NULL COMMENT '文件路径',
  `mime_type` char(50) DEFAULT NULL COMMENT '文件类型',
  `file_size` int(10) DEFAULT NULL COMMENT '文件大小kb',
  `is_delete` tinyint(1) DEFAULT NULL COMMENT '是否删除',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上传时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_login` char(60) DEFAULT '' COMMENT '用户登录名称',
  `user_pass` char(255) DEFAULT '' COMMENT '用户密码',
  `user_name` char(50) DEFAULT '' COMMENT '用户真实姓名',
  `user_email` char(128) DEFAULT '' COMMENT '邮件',
  `user_registered` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `user_imgUrl` longtext COMMENT '头像',
  `user_type` tinyint(1) unsigned DEFAULT NULL COMMENT '用户类型 0:未审核用户；1:超级管理员；2:普通用户',
  `login_ip` char(15) DEFAULT NULL COMMENT '登录IP',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后登录时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `user_login`, `user_pass`, `user_name`, `user_email`, `user_registered`, `user_imgUrl`, `user_type`, `login_ip`, `update_time`)
VALUES
	(34,'shmaur','$2a$10$IW/PYlfwKKPRkB6Qxi9xxuG4vhqLC0DgkHQh8NgGBbeQt2ONv5RW2','shmaur','know@yuxianzhi.com','2018-04-13 21:26:07','',1,'','2018-04-14 00:08:43');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table userInfo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userInfo`;

CREATE TABLE `userInfo` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userInfo_ID` bigint(20) DEFAULT NULL,
  `userInfo_name` varchar(50) DEFAULT NULL,
  `user_age` int(5) DEFAULT NULL,
  `user_city` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
