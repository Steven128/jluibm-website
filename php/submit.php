<?php
@header("content-type:text/html;charset=utf8");
$request = ($_GET['request']);
session_start();
if($request == 'check'){
	$number = $_GET['number'];

	$main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
	mysqli_query($main_db,"set names utf8");
	mysqli_select_db($main_db,"JLUIBMclub");

	$check = 1;
	$sql_compare = "SELECT number from join_infomation;";
	$retval = mysqli_query($main_db,$sql_compare);
	while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
		if($row['number']==$number){
			$check = 0;
		}
		if($number==''){
			$check = 0;
		}
	}
	if($check==0){
		echo json_encode(array("message"=>"has joined"));
	}
	else{
		echo json_encode(array("message"=>"not found"));
	}
}

else if($request == 'submit'){

}
$name = $_GET['name'];
$number = $_GET['number'];
$college = $_GET['college'];
$major = $_GET['major'];
$gender = $_GET['gender'];
$grade = $_GET['grade'];
$qq = $_GET['qq'];
$phone = $_GET['phone'];
$lang = $_GET['lang'];
$learned = $_GET['learned'];
$lang=explode(",",$lang);

//==========================================
$cpp = 0;
$algorithm = 0;
$web = 0;
$linux = 0;
$java = 0;
foreach($lang as $key){
	if($key=='cpp'){
		$cpp = 1;
	}
	if($key=='algorithm'){
		$algorithm = 1;
	}
	if($key=='web'){
		$web = 1;
	}
	if($key=='linux'){
		$linux = 1;
	}
	if($key=='java'){
		$java = 1;
	}
}


//==========================================

//连接数据库

$main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
mysqli_query($main_db,"set names utf8");
mysqli_select_db($main_db,"JLUIBMclub");
$submitTime = date("Y-m-d");

//检测数据库中是否已经有该学号信息

$check = 1;
$sql_compare = "SELECT number from join_infomation;";
$retval = mysqli_query($main_db,$sql_compare);
while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
	if($row['number']==$number){
		$check = 0;
	}
	if($number==''){
		$check = 0;
	}
}

//信息插入数据库
if($check==0){
	echo json_encode(array("message"=>"has joined"));
}
else{
	$sql_insert = "insert into join_infomation"."(join_date,name,number,college,major,gender,grade,qq,phone,cpp,algorithm,web,linux,java,learned)"."VALUES"."('$submitTime','$name','$number','$college','$major','$gender','$grade','$qq','$phone','$cpp','$algorithm','$web','$linux','$java','$learned');";
	$join = mysqli_query( $main_db,$sql_insert );
	if($join){
		unset($_SESSION);
		session_destroy(); 
		//在社团成员系统中添加该学生信息

		$sql_insert = "insert into member"."(name,number,college,major,gender,grade,qq,phone,cpp,algorithm,web,linux,java)"."VALUES"."('$name','$number','$college','$major','$gender','$grade','$qq','$phone','$cpp','$algorithm','$web','$linux','$java');";
		$step = mysqli_query( $main_db,$sql_insert );

		if($step){
			//根据该学生感兴趣的方向分组

			foreach($lang as $key){
				if($key=='cpp'){
					$sql_insert = "insert into cpp_group"."(name,number)"."VALUES"."('$name','$number');";
					$insert_cpp = mysqli_query( $main_db,$sql_insert );
				}
				if($key=='algorithm'){
					$sql_insert = "insert into algorithm_group"."(name,number)"."VALUES"."('$name','$number');";
					$insert_algorithm = mysqli_query( $main_db,$sql_insert );
				}
				if($key=='web'){
					$sql_insert = "insert into web_group"."(name,number)"."VALUES"."('$name','$number');";
					$insert_web = mysqli_query( $main_db,$sql_insert );
				}
				if($key=='linux'){
					$sql_insert = "insert into linux_group"."(name,number)"."VALUES"."('$name','$number');";
					$insert_linux = mysqli_query( $main_db,$sql_insert );
				}
				if($key=='java'){
					$sql_insert = "insert into java_group"."(name,number)"."VALUES"."('$name','$number');";
					$insert_java = mysqli_query( $main_db,$sql_insert );
				}
			}
			$sql_insert = "insert into learned_text"."(name,number,college,major,gender,grade,learned)"."VALUES"."('$name','$number','$college','$major','$gender','$grade','$learned');";
			$insert_text = mysqli_query( $main_db,$sql_insert );
			if($insert_text){
				$sql_set_pic = "UPDATE member SET userPic='../../userPicUpload/default.png' WHERE number='$number';";
				$set_pic = mysqli_query( $main_db,$sql_set_pic );
				echo json_encode(array("message"=>"success"));
			}
			else {
				echo json_encode(array("message"=>"insert into text error"));
			}

		}
		else {
			echo json_encode(array("message"=>"insert into member error"));
		}

		//
		
	}
	else {
		die ("insert into join_infomation error");
	}
		
}
?>