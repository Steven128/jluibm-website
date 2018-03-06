<?php
$lifeTime = 7 * 24 * 3600;
session_set_cookie_params($lifeTime);
session_start();
$request = $_GET['request'];

if ($request == 'check') {
    $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    //查找是否有可签到的活动
    $sql_check = "SELECT * FROM activity WHERE state='active';";
    $retval = mysqli_query($main_db, $sql_check);
    if ($retval) {
        $num = mysqli_num_rows($retval);
        if ($num > 0) {
            echo json_encode(array("message" => "has_active"));
        } else if ($num == 0) {
            echo json_encode(array("message" => "no_active"));
        }
    } else {
        echo json_encode(array("message" => "error"));
    }

} else if ($request == 'sign') {
    $activity_id = $_GET['activity_id'];
    $number = $_GET['number'];
    $submitTime = $_GET['submitTime'];
    $location = $_GET['location'];

    $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    //检查是否已经签到
    $sql_check = "SELECT * FROM $activity_id WHERE number=$number;";
    $check_retval = mysqli_query($main_db, $sql_check);
    if (mysqli_num_rows($check_retval) == 1) {
        echo json_encode(array("message" => "already_signed"));
    } else if (mysqli_num_rows($check_retval) == 0) {
        //签到
        $sql_insert = "INSERT INTO $activity_id" . "(submitTime,number,submitLocation)" . "VALUES('$submitTime','$number','$location');";
        $retval = mysqli_query($main_db, $sql_insert);
        if ($retval) {
            echo json_encode(array("message" => "success"));
        } else {
            echo json_encode(array("message" => "error"));
        }
    } else {
        echo json_encode(array("message" => "error"));
    }

}
