<?php

$request = $_POST['request'];

if ($request == "createBaoming") {
    //创建报名
    $name     = $_POST['name'];
    $date     = $_POST['date'];
    $quantity = $_POST['quantity'];
    $hold     = $_POST['hold'];
    $remarks  = $_POST['remarks'];

    $year       = substr($date, 2, 2);
    $month      = substr($date, 5, 2);
    $day        = substr($date, 8, 2);
    $datetime   = "" . $year . $month . $day;
    $baoming_id = "bm_" . $datetime;

    $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $sql_insert = "INSERT INTO baoming" .
        "(baoming_id,activity_name,date,quantity,hold,remarks)" .
        "VALUES" .
        "('$baoming_id','$name','$date',$quantity,'$hold','$remarks');";
    $retval = mysqli_query($main_db, $sql_insert);
    if ($retval) {
        if (createTable($main_db, $baoming_id, $name)) {
            echo json_encode(array("message" => "success"));
        } else {
            echo json_encode(array("message" => "error", "reason" => "create_table_failed"));
        }

    } else {
        echo json_encode(array("message" => "error", "reason" => "create_baoming_failed", "response" => $retval));
    }

} else if ($request == "update") {
    //修改信息

}

function createTable($main_db, $baoming_id, $activity_name)
{
    $sql_create_tab = "CREATE TABLE $baoming_id(" .
        "submitTime DATETIME NOT NULL COMMENT '报名时间'," .
        "name VARCHAR(20) NOT NULL COMMENT '姓名'," .
        "number VARCHAR(8) NOT NULL PRIMARY KEY COMMENT '学号'," .
        "college VARCHAR(100) NOT NULL COMMENT '学院'," .
        "gender VARCHAR(6) NOT NULL COMMENT '性别，男为male，女为female'," .
        "grade TINYINT(1) NOT NULL COMMENT '年级，数字代表几年级'," .
        "qq VARCHAR(15) NOT NULL  COMMENT 'QQ号码'," .
        "comeFrom VARCHAR(50) NOT NULL COMMENT '来自哪个社团'" .
        ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT '活动 $activity_name 报名表，记录报名信息';";
    $retval = mysqli_query($main_db, $sql_create_tab);
    if ($retval) {
        return 1;
    } else {
        return 0;
    }
}
