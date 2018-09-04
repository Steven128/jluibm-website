<?php
session_start();
$request = $_POST['request'];
$adminNumber = $_POST['adminNumber'];
if (isset($_SESSION['userNumber']) && $_SESSION['userNumber'] == $adminNumber) {
    if ($request == "createEnroll") {
        //创建报名
        $name = $_POST['name'];
        $date = $_POST['date'];
        $quantity = $_POST['quantity'];
        $hold = $_POST['hold'];
        $remarks = $_POST['remarks'];

        $year = substr($date, 2, 2);
        $month = substr($date, 5, 2);
        $day = substr($date, 8, 2);
        $datetime = "" . $year . $month . $day;
        $enroll_id = "enr_" . $datetime;

        $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
        mysqli_query($main_db, "set names utf8");
        mysqli_select_db($main_db, "JLUIBMclub");

        $sql_insert = "INSERT INTO enroll" .
            "(enroll_id,activity_name,date,quantity,hold,remarks)" .
            "VALUES" .
            "('$enroll_id','$name','$date',$quantity,'$hold','$remarks');";
        $retval = mysqli_query($main_db, $sql_insert);
        if ($retval) {
            echo json_encode(array("message" => "success"));
        } else {
            echo json_encode(array("message" => "error"));
        }

    } else if ($request == "update") {
        //修改信息

    }
}
