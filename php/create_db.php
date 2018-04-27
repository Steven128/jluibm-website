<?php
$infodb = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!<br><br>");
mysqli_query($infodb,"set names utf8");

$delete = "DROP DATABASE JLUIBMclub;";
$retval = mysqli_query( $infodb, $delete );
$create = "CREATE DATABASE JLUIBMclub;";
$retval = mysqli_query( $infodb, $create );

if(mysqli_select_db($infodb,"JLUIBMclub"))
	echo '已选择JLUIBMclub数据库<br><br>';

//创建报名表数据
$join = "CREATE TABLE join_infomation( ". 
		"join_date DATE NOT NULL COMMENT '注册时间',".
		"name VARCHAR(20) NOT NULL COMMENT '姓名',".
        "number VARCHAR(8) NOT NULL PRIMARY KEY COMMENT '学号',".
        "college VARCHAR(100) NOT NULL COMMENT '学院',".
        "major VARCHAR(100) NOT NULL COMMENT '专业',".
        "gender VARCHAR(6) NOT NULL COMMENT '性别',".
		"grade TINYINT(1) NOT NULL COMMENT '年级，数字代表几年级',".
		"qq VARCHAR(15) NOT NULL  COMMENT 'QQ号码',".
		"phone VARCHAR(11) NOT NULL COMMENT '手机号码',".
		"cpp TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否加入C/C++组，加入为1，未加入为0',".
		"algorithm TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否加入算法组，加入为1，未加入为0',".
		"web TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否加入Web组，加入为1，未加入为0',".
		"linux TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否加入Linux组，加入为1，未加入为0',".
		"java TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否加入Java组，加入为1，未加入为0',".
		"learned TEXT(350) COMMENT '自己学过的知识'".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT '报名表，记录报名时填写表单的数据，不再更新数据';";
$retval = mysqli_query( $infodb, $join );
if(!$retval )
{
    die('数据表join_infomation创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表join_infomation创建成功<br><br>";

//创建社团成员数据表
$member = "CREATE TABLE member( ".
        "isManager TINYINT(1) DEFAULT 0 NOT NULL COMMENT '用户类型，1为管理员，0为普通社员',".
        "password VARCHAR(32) COMMENT '用户的登录密码',".
        "userPic VARCHAR(40) DEFAULT '../../userPicUpload/default.png' COMMENT '用户头像的存储路径',".
		"name VARCHAR(20) NOT NULL COMMENT '姓名',".
        "number VARCHAR(8) NOT NULL PRIMARY KEY COMMENT '学号',".
        "college VARCHAR(100) NOT NULL COMMENT '学院',".
        "major VARCHAR(100) NOT NULL COMMENT '专业',".
        "gender VARCHAR(6) NOT NULL COMMENT '性别',".
		"grade VARCHAR(1) NOT NULL COMMENT '年级',".
		"qq VARCHAR(15) NOT NULL COMMENT 'QQ号码',".
        "phone VARCHAR(11) NOT NULL COMMENT '电话',".
        "cpp TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否是C/C++组组员，1为是，0为否',".
		"algorithm TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否是算法组组员，1为是，0为否',".
		"web TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否是Web组组员，1为是，0为否',".
		"linux TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否是Linux组组员，1为是，0为否',".
		"java TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否是Java组组员，1为是，0为否'".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT '用户表';";
$retval = mysqli_query( $infodb, $member );
if(!$retval )
{
    die('数据表member创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表member创建成功<br><br>";

//创建各组组员数据表
$cpp = "CREATE TABLE cpp_group(".
	    "isLeader TINYINT(1) NOT NULL DEFAULT 0 COMMENT '成员类型，1为组长，0为普通组员',".
	    "name VARCHAR(20) NOT NULL COMMENT '姓名',".
        "number VARCHAR(8) NOT NULL PRIMARY KEY COMMENT '学号'".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT 'C/C++组组员表';";
$retval = mysqli_query( $infodb, $cpp );
if(!$retval )
{
    die('数据表cpp_group创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表cpp_group创建成功<br><br>";

$algorithm = "CREATE TABLE algorithm_group(".
		"isLeader TINYINT(1) NOT NULL DEFAULT 0 COMMENT '成员类型，1为组长，0为普通组员',".
	    "name VARCHAR(20) NOT NULL COMMENT '姓名',".
        "number VARCHAR(8) NOT NULL PRIMARY KEY COMMENT '学号'".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT '算法组组员表';";
$retval = mysqli_query( $infodb, $algorithm );
if(!$retval )
{
    die('数据表algorithm_group创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表algorithm_group创建成功<br><br>";

$web = "CREATE TABLE web_group(".
	    "isLeader TINYINT(1) NOT NULL DEFAULT 0 COMMENT '成员类型，1为组长，0为普通组员',".
	    "name VARCHAR(20) NOT NULL COMMENT '姓名',".
        "number VARCHAR(8) NOT NULL PRIMARY KEY COMMENT '学号'".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT 'Web组组员表';";
$retval = mysqli_query( $infodb, $web );
if(!$retval )
{
    die('数据表web_group创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表web_group创建成功<br><br>";

$linux = "CREATE TABLE linux_group(".
	    "isLeader TINYINT(1) NOT NULL DEFAULT 0 COMMENT '成员类型，1为组长，0为普通组员',".
	    "name VARCHAR(20) NOT NULL COMMENT '姓名',".
        "number VARCHAR(8) NOT NULL PRIMARY KEY COMMENT '学号'".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT 'Linux组组员表';";
$retval = mysqli_query( $infodb, $linux );
if(!$retval )
{
    die('数据表linux_group创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表linux_group创建成功<br><br>";

$java = "CREATE TABLE java_group(".
	"isLeader TINYINT(1) NOT NULL DEFAULT 0 COMMENT '成员类型，1为组长，0为普通组员',".
	   "name VARCHAR(20) NOT NULL COMMENT '姓名',".
        "number VARCHAR(8) NOT NULL PRIMARY KEY COMMENT '学号'".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT 'Java组组员表';";
$retval = mysqli_query( $infodb, $java );
if(!$retval )
{
    die('数据表java_group创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表java_group创建成功<br><br>";

//创建数据表以汇总文本域填入的信息
$text = "CREATE TABLE learned_text(".
		"name VARCHAR(20) NOT NULL COMMENT '姓名',".
        "number VARCHAR(8) NOT NULL PRIMARY KEY COMMENT '学号',".
        "college VARCHAR(100) NOT NULL COMMENT '学院',".
        "major VARCHAR(100) NOT NULL COMMENT '专业',".
        "gender VARCHAR(6) NOT NULL COMMENT '性别',".
		"grade VARCHAR(1) NOT NULL COMMENT '年级',".
		"learned TEXT(350) COMMENT '学过的知识'".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT '报名时留言学过的知识';";
$retval = mysqli_query( $infodb, $text );
if(!$retval )
{
    die('数据表text创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表text创建成功<br><br>";


$activity = "CREATE TABLE activity(".
            "activity_id VARCHAR(30) NOT NULL COMMENT '活动ID',".
            "activity_name VARCHAR(30) NOT NULL COMMENT '活动名',".
            "setBy VARCHAR(10) NOT NULL COMMENT '创办活动的组',".
            "place VARCHAR(50) NOT NULL COMMENT '活动地点',".
            "time VARCHAR(30) NOT NULL COMMENT '活动举办时间',".
            "remarks TEXT(300) NOT NULL COMMENT '备注',".
            "longitude VARCHAR(20) COMMENT '签到地点经度',".
            "latitude VARCHAR(20) COMMENT '签到地点纬度',".
            "state VARCHAR(8) NOT NULL COMMENT '活动状态，inactive（未开始） active（正在签到） finished（已完成签到）'".
            ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT '活动表';";
$retval = mysqli_query( $infodb, $activity );
if(!$retval )
{
    die('数据表activity创建失败<br><br>' . mysqli_error($infodb));
}
 echo "数据表activity创建成功<br><br>";

 $baoming = "CREATE TABLE baoming(".
            "baoming_id VARCHAR(30) NOT NULL PRIMARY KEY COMMENT '报名表ID',".
            "activity_name VARCHAR(30) NOT NULL COMMENT '活动名',".
            "date DATE NOT NULL COMMENT '活动举办时间',".
            "quantity INT NOT NULL COMMENT '报名人数限制',".
            "hold VARCHAR(100) NOT NULL COMMENT '举办社团名称（用逗号隔开）',".
            "remarks TEXT COMMENT '备注',".
            "state TINYINT(1) DEFAULT 0 COMMENT '活动报名状态，0为未开放报名，1为报名期间，2为已结束报名'".
            ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT '活动报名表';";
            $retval = mysqli_query( $infodb, $baoming );
            if(!$retval )
            {
                die('数据表baoming创建失败<br><br>' . mysqli_error($infodb));
            }
             echo "数据表baoming创建成功<br><br>";
?>