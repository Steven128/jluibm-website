<?php
@header("content-type:text/html;charset=utf8");
$number = $_POST['number'];
$newPasswd = $_POST['password'];
$email = $_POST['email'];

$main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
mysqli_query($main_db, "set names utf8");
mysqli_select_db($main_db, "JLUIBMclub");

$sql_update = "UPDATE member SET password='$newPasswd' WHERE number='$number';";
$step = mysqli_query($main_db, $sql_update);
echo json_encode(array("message" => "success"));
