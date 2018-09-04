CREATE TABLE IF NOT EXISTS `JLUIBMclub`.`member` (
  `isManager` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '用户类型，1为管理员，0为普通社员',
  `password` VARCHAR(32) NULL DEFAULT NULL COMMENT '用户的登录密码',
  `userPic` VARCHAR(40) NULL DEFAULT '../../userPicUpload/default.png' COMMENT '用户头像的存储路径',
  `name` VARCHAR(20) NOT NULL COMMENT '姓名',
  `number` VARCHAR(8) NOT NULL COMMENT '学号',
  `college` VARCHAR(100) NOT NULL COMMENT '学院',
  `major` VARCHAR(100) NOT NULL COMMENT '专业',
  `gender` TINYINT(1) NOT NULL COMMENT '性别，男为0 女为1',
  `grade` VARCHAR(1) NOT NULL COMMENT '年级',
  `qq` VARCHAR(15) NOT NULL COMMENT 'QQ号码',
  `phone` VARCHAR(11) NOT NULL COMMENT '电话',
  `cpp` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '是否是C/C++组组员，1为是，0为否',
  `algorithm` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '是否是算法组组员，1为是，0为否',
  `web` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '是否是Web组组员，1为是，0为否',
  `linux` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '是否是Linux组组员，1为是，0为否',
  `java` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '是否是Java组组员，1为是，0为否',
  PRIMARY KEY (`number`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '用户表';

CREATE TABLE IF NOT EXISTS `JLUIBMclub`.`join_date` (
  `date` DATE NOT NULL COMMENT '注册时间',
  `number` VARCHAR(8) NOT NULL COMMENT '学号',
  PRIMARY KEY (`number`),
  CONSTRAINT `join_date_ibfk_1`
    FOREIGN KEY (`number`)
    REFERENCES `JLUIBMclub`.`member` (`number`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '报名时间表';

CREATE TABLE IF NOT EXISTS `JLUIBMclub`.`learned_text` (
  `number` VARCHAR(8) NOT NULL COMMENT '学号',
  `learned` TEXT NULL DEFAULT NULL COMMENT '学过的知识',
  PRIMARY KEY (`number`),
  CONSTRAINT `learned_text_ibfk_1`
    FOREIGN KEY (`number`)
    REFERENCES `jluibmclub`.`member` (`number`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '报名时留言学过的知识';

CREATE TABLE IF NOT EXISTS `JLUIBMclub`.`cpp_group` (
  `isLeader` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '成员类型，1为组长，0为普通组员',
  `number` VARCHAR(8) NOT NULL COMMENT '学号',
  PRIMARY KEY (`number`),
  CONSTRAINT `cpp_group_ibfk_1`
    FOREIGN KEY (`number`)
    REFERENCES `JLUIBMclub`.`member` (`number`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'C/C++组组员表';

CREATE TABLE IF NOT EXISTS `JLUIBMclub`.`algorithm_group` (
  `isLeader` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '成员类型，1为组长，0为普通组员',
  `number` VARCHAR(8) NOT NULL COMMENT '学号',
  PRIMARY KEY (`number`),
  CONSTRAINT `algorithm_group_ibfk_1`
    FOREIGN KEY (`number`)
    REFERENCES `JLUIBMclub`.`member` (`number`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '算法组组员表';

CREATE TABLE IF NOT EXISTS `JLUIBMclub`.`web_group` (
  `isLeader` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '成员类型，1为组长，0为普通组员',
  `number` VARCHAR(8) NOT NULL COMMENT '学号',
  PRIMARY KEY (`number`),
  CONSTRAINT `web_group_ibfk_1`
    FOREIGN KEY (`number`)
    REFERENCES `JLUIBMclub`.`member` (`number`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Web组组员表';

CREATE TABLE IF NOT EXISTS `JLUIBMclub`.`linux_group` (
  `isLeader` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '成员类型，1为组长，0为普通组员',
  `number` VARCHAR(8) NOT NULL COMMENT '学号',
  PRIMARY KEY (`number`),
  CONSTRAINT `linux_group_ibfk_1`
    FOREIGN KEY (`number`)
    REFERENCES `JLUIBMclub`.`member` (`number`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Linux组组员表';

CREATE TABLE IF NOT EXISTS `JLUIBMclub`.`java_group` (
  `isLeader` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '成员类型，1为组长，0为普通组员',
  `number` VARCHAR(8) NOT NULL COMMENT '学号',
  PRIMARY KEY (`number`),
  CONSTRAINT `java_group_ibfk_1`
    FOREIGN KEY (`number`)
    REFERENCES `JLUIBMclub`.`member` (`number`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Java组组员表';

CREATE TABLE IF NOT EXISTS `JLUIBMclub`.`activity` (
  `activity_id` VARCHAR(30) NOT NULL COMMENT '活动ID',
  `activity_name` VARCHAR(30) NOT NULL COMMENT '活动名',
  `setBy` VARCHAR(10) NOT NULL COMMENT '创办活动的组',
  `place` VARCHAR(50) NOT NULL COMMENT '活动地点',
  `time` VARCHAR(30) NOT NULL COMMENT '活动举办时间',
  `remarks` TEXT NOT NULL COMMENT '备注',
  `longitude` VARCHAR(20) NULL DEFAULT NULL COMMENT '签到地点经度',
  `latitude` VARCHAR(20) NULL DEFAULT NULL COMMENT '签到地点纬度',
  `state` VARCHAR(8) NOT NULL COMMENT '活动状态，inactive（未开始） active（正在签到） finished（已完成签到）',
  PRIMARY KEY (`activity_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '活动表';

CREATE TABLE IF NOT EXISTS `JLUIBMclub`.`activity_sign` (
  `submitTime` VARCHAR(20) NOT NULL COMMENT '签到时间',
  `number` VARCHAR(8) NOT NULL COMMENT '学号',
  `longitude` VARCHAR(20) NULL DEFAULT NULL COMMENT '签到地点经度',
  `latitude` VARCHAR(20) NULL DEFAULT NULL COMMENT '签到地点纬度',
  `activity_id` VARCHAR(30) NOT NULL COMMENT '活动ID',
  INDEX `activity_id` (`activity_id` ASC),
  INDEX `number` (`number` ASC),
  CONSTRAINT `activity_sign_ibfk_1`
    FOREIGN KEY (`activity_id`)
    REFERENCES `JLUIBMclub`.`activity` (`activity_id`)
    ON DELETE CASCADE
	ON UPDATE RESTRICT,
  CONSTRAINT `activity_sign_ibfk_2`
    FOREIGN KEY (`number`)
    REFERENCES `JLUIBMclub`.`member` (`number`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '活动签到信息表';

CREATE TABLE IF NOT EXISTS `JLUIBMclub`.`enroll` (
  `enroll_id` VARCHAR(30) NOT NULL COMMENT '报名表ID',
  `activity_name` VARCHAR(30) NOT NULL COMMENT '活动名',
  `quantity` INT(11) NOT NULL COMMENT '报名人数限制',
  `hold` VARCHAR(100) NOT NULL COMMENT '举办社团名称（用逗号隔 开）',
  `remarks` TEXT NULL DEFAULT NULL COMMENT '备注',
  `state` TINYINT(1) NULL DEFAULT '0' COMMENT '活动报名状态，0为未开放报名，1 为报名期间，2为已结束报名',
  `date` DATE NOT NULL COMMENT '活动举办时间',
  PRIMARY KEY (`enroll_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '活动报名表';

CREATE TABLE IF NOT EXISTS `JLUIBMclub`.`enroll_join` (
  `submitTime` DATETIME NOT NULL COMMENT '报名时间',
  `name` VARCHAR(20) NOT NULL COMMENT '姓名',
  `number` VARCHAR(8) NOT NULL COMMENT '学号',
  `college` VARCHAR(100) NOT NULL COMMENT '学院',
  `gender` VARCHAR(6) NOT NULL COMMENT '性别，男为male，女为female',
  `grade` TINYINT(1) NOT NULL COMMENT '年级，数字代表几年级',
  `qq` VARCHAR(15) NOT NULL COMMENT 'QQ号码',
  `comeFrom` VARCHAR(50) NOT NULL COMMENT '来自哪个社团',
  `enroll_id` VARCHAR(30) NOT NULL COMMENT '报名表ID',
  INDEX `enroll_id` (`enroll_id` ASC),
  CONSTRAINT `enroll_join_ibfk_1`
    FOREIGN KEY (`enroll_id`)
    REFERENCES `JLUIBMclub`.`enroll` (`enroll_id`)
    ON DELETE CASCADE
	ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '活动报名信息表';




