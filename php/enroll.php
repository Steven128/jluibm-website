<?php
$request = $_GET['request'];

if ($request == "getList") {
    //获取列表

    $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $data       = array();
    $sql_select = "SELECT * FROM enroll ORDER BY state;";
    $retval     = mysqli_query($main_db, $sql_select);
    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
        $enroll_id    = $row['enroll_id'];
        $activity_name = $row['activity_name'];
        $quantity      = $row['quantity'];
        $hold          = $row['hold'];
        $remarks       = $row['remarks'];
        $state         = $row['state'];
        $date          = $row['date'];
        $single        = array("enroll_id" => $enroll_id, "activity_name" => $activity_name, "quantity" => $quantity, "hold" => $hold, "remarks" => $remarks, "state" => $state, "date" => $date);
        array_push($data, $single);
    }
    echo json_encode($data);

} else if ($request == "displaySingle") {
    //查看详细信息
    $enroll_id = $_GET['enroll_id'];
    $main_db    = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $sql_select = "SELECT * FROM enroll where enroll_id='$enroll_id';";
    $retval     = mysqli_query($main_db, $sql_select);
    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
        $enroll_id    = $row['enroll_id'];
        $activity_name = $row['activity_name'];
        $quantity      = $row['quantity'];
        $hold          = $row['hold'];
        $remarks       = $row['remarks'];
        $state         = $row['state'];
        $date          = $row['date'];
        $single        = array("enroll_id" => $enroll_id, "activity_name" => $activity_name, "quantity" => $quantity, "hold" => $hold, "remarks" => $remarks, "state" => $state, "date" => $date);
        echo json_encode($single);
        break;
    }

} else if ($request == "getStuList") {
    //获取已报名学生的列表
    $enroll_id = $_GET['enroll_id'];
    $main_db    = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $data       = array();
    $sql_select = "SELECT * FROM $enroll_id;";
    $retval     = mysqli_query($main_db, $sql_select);
    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
        $submitTime = $row['submitTime'];
        $name       = $row['name'];
        $number     = $row['number'];
        $college    = $row['college'];
        $gender     = $row['gender'];
        $grade      = $row['grade'];
        $qq         = $row['qq'];
        $comeFrom   = $row['comeFrom'];
        $single     = array("submitTime" => $submitTime, "name" => $name, "number" => $number, "college" => $college, "gender" => $gender, "grade" => $grade, "qq" => $qq, "comeFrom" => $comeFrom);
        array_push($data, $single);
    }
    echo json_encode($data);
} else if ($request == "deleteEnroll") {
    $enroll_id = $_GET['enroll_id'];
    $main_db    = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $sql_delete = "DELETE FROM enroll WHERE enroll_id='$enroll_id';";
    $retval     = mysqli_query($main_db, $sql_delete);
    if ($retval) {
        //下面删除记录报名信息的表
        $sql_drop = "DROP table $enroll_id;";
        $retval   = mysqli_query($main_db, $sql_drop);
        if ($retval) {
            echo json_encode(array("message" => "success"));
        } else {
            echo json_encode(array("message" => "error", "reason" => "drop_info_table_failed"));
        }
    } else {
        echo json_encode(array("message" => "error", "reason" => "delete_from_enroll_tab_failed"));
    }

} else if ($request == "startEnroll") {
    $enroll_id = $_GET['enroll_id'];
    $main_db    = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $sql_update = "UPDATE enroll SET state=1 WHERE enroll_id='$enroll_id';";
    $retval     = mysqli_query($main_db, $sql_update);
    if ($retval) {
        echo json_encode(array("message" => "success"));
    } else {
        echo json_encode(array("message" => "error"));
    }

} else if ($request == "endEnroll") {
    $enroll_id = $_GET['enroll_id'];
    $main_db    = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $sql_update = "UPDATE enroll SET state=2 WHERE enroll_id='$enroll_id';";
    $retval     = mysqli_query($main_db, $sql_update);
    if ($retval) {
        echo json_encode(array("message" => "success"));
    } else {
        echo json_encode(array("message" => "error"));
    }

}
