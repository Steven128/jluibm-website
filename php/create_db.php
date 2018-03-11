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
		"join_date varchar(10) NOT NULL,".
		"name varchar(100) NOT NULL,".
        "number varchar(8) NOT NULL,".
        "college varchar(100) NOT NULL,".
        "major varchar(100) NOT NULL,".
        "gender varchar(6) NOT NULL,".
		"grade varchar(1) NOT NULL,".
		"qq varchar(15) NOT NULL,".
		"phone varchar(11) NOT NULL,".
		"cpp tinyint(1) DEFAULT 0,".
		"algorithm tinyint(1) DEFAULT 0,".
		"web tinyint(1) DEFAULT 0,".
		"linux tinyint(1) DEFAULT 0,".
		"java tinyint(1) DEFAULT 0,".
		"learned text(350)".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
$retval = mysqli_query( $infodb, $join );
if(!$retval )
{
    die('数据表join_infomation创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表join_infomation创建成功<br><br>";

//创建社团成员数据表
$member = "CREATE TABLE member( ".
        "isManager tinyint(1) DEFAULT 0 NOT NULL,".
        "password varchar(200),".
        "userPic varchar(100),".
		"name varchar(100) NOT NULL,".
        "number varchar(8) NOT NULL,".
        "college varchar(100) NOT NULL,".
        "major varchar(100) NOT NULL,".
        "gender varchar(6) NOT NULL,".
		"grade varchar(1) NOT NULL,".
		"qq varchar(15) NOT NULL,".
        "phone varchar(11) NOT NULL,".
        "cpp tinyint(1) DEFAULT 0,".
		"algorithm tinyint(1) DEFAULT 0,".
		"web tinyint(1) DEFAULT 0,".
		"linux tinyint(1) DEFAULT 0,".
		"java tinyint(1) DEFAULT 0".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
$retval = mysqli_query( $infodb, $member );
if(!$retval )
{
    die('数据表member创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表member创建成功<br><br>";

//创建各组组员数据表
$cpp = "CREATE TABLE cpp_group(".
	    "isLeader tinyint(1) DEFAULT 0,".
	    "name varchar(100) NOT NULL,".
        "number varchar(8) NOT NULL".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
$retval = mysqli_query( $infodb, $cpp );
if(!$retval )
{
    die('数据表cpp_group创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表cpp_group创建成功<br><br>";

$algorithm = "CREATE TABLE algorithm_group(".
		"isLeader tinyint(1) DEFAULT 0,".
	    "name varchar(100) NOT NULL,".
        "number varchar(8) NOT NULL".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
$retval = mysqli_query( $infodb, $algorithm );
if(!$retval )
{
    die('数据表algorithm_group创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表algorithm_group创建成功<br><br>";

$web = "CREATE TABLE web_group(".
	    "isLeader tinyint(1) DEFAULT 0,".
	    "name varchar(100) NOT NULL,".
        "number varchar(8) NOT NULL".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
$retval = mysqli_query( $infodb, $web );
if(!$retval )
{
    die('数据表web_group创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表web_group创建成功<br><br>";

$linux = "CREATE TABLE linux_group(".
	    "isLeader tinyint(1) DEFAULT 0,".
	    "name varchar(100) NOT NULL,".
        "number varchar(8) NOT NULL".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
$retval = mysqli_query( $infodb, $linux );
if(!$retval )
{
    die('数据表linux_group创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表linux_group创建成功<br><br>";

$java = "CREATE TABLE java_group(".
	"isLeader tinyint(1) DEFAULT 0,".
	   "name varchar(100) NOT NULL,".
        "number varchar(8) NOT NULL".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
$retval = mysqli_query( $infodb, $java );
if(!$retval )
{
    die('数据表java_group创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表java_group创建成功<br><br>";

//创建数据表以汇总文本域填入的信息
$text = "CREATE TABLE learned_text(".
		"name varchar(100) NOT NULL,".
        "number varchar(8) NOT NULL,".
        "college varchar(100) NOT NULL,".
        "major varchar(100) NOT NULL,".
        "gender varchar(6) NOT NULL,".
		"grade varchar(1) NOT NULL,".
		"learned text(350)".
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
$retval = mysqli_query( $infodb, $text );
if(!$retval )
{
    die('数据表text创建失败<br><br>' . mysqli_error($infodb));
}
echo "数据表text创建成功<br><br>";


$activity = "CREATE TABLE activity(".
            "activity_id varchar(100) NOT NULL,".
            "activity_name varchar(100) NOT NULL,".
            "setBy varchar(10) NOT NULL,".
            "place varchar(100) NOT NULL,".
            "time varchar(30) NOT NULL,".
            "remarks text(300) NOT NULL,".
            "longitude varchar(20),".
            "latitude varchar(20),".
            "state varchar(10) NOT NULL".
            ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
$retval = mysqli_query( $infodb, $activity );
if(!$retval )
{
    die('数据表activity创建失败<br><br>' . mysqli_error($infodb));
}
 echo "数据表activity创建成功<br><br>";

?>