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
    $retval    = mysqli_query($main_db, $sql_check);
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
    $number      = $_GET['number'];
    $submitTime  = $_GET['submitTime'];
    $longitude   = $_GET['longitude'];
    $latitude    = $_GET['latitude'];
    function getDegree($lat)
    {
        $lat_val = floor($lat / 100);
        $degree  = (($lat / 100) - $lat_val) * 100 / 60 + $lat_val;
        return $degree;
    }
    $longitude = getDegree($longitude);
    $latitude  = getDegree($latitude);
    $main_db   = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    //检查是否已经签到
    $sql_check    = "SELECT * FROM activity_sign WHERE number=$number and activity_id='$activity_id';";
    $check_retval = mysqli_query($main_db, $sql_check);
    if (mysqli_num_rows($check_retval) == 1) {
        echo json_encode(array("message" => "already_signed"));
    } else if (mysqli_num_rows($check_retval) == 0) {
        //签到
        $sql_insert = "INSERT INTO activity_sign" . "(submitTime,number,longitude,latitude,activity_id)" . "VALUES('$submitTime','$number','$longitude','$latitude','$activity_id');";
        $retval     = mysqli_query($main_db, $sql_insert);
        if ($retval) {
            echo json_encode(array("message" => "success"));
        } else {
            echo json_encode(array("message" => "error"));
        }
    } else {
        echo json_encode(array("message" => "error"));
    }

}
