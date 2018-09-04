<?php
//活动报名
$request = $_GET['request'];
$user_agent = $_SERVER['HTTP_UA'];
if ($user_agent == "WeChat_SmallProgram") {
    if ($request == "getActiveList") {
        //获取可报名的活动的列表
        $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
        mysqli_query($main_db, "set names utf8");
        mysqli_select_db($main_db, "JLUIBMclub");

        $data = array();
        $sql_select = "SELECT * FROM enroll WHERE state=1;";
        $retval = mysqli_query($main_db, $sql_select);
        while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
            $enroll_id = $row['enroll_id'];
            $activity_name = $row['activity_name'];
            $quantity = $row['quantity'];
            $hold = $row['hold'];
            $remarks = $row['remarks'];
            $state = $row['state'];
            $date = $row['date'];
            $single = array("enroll_id" => $enroll_id, "activity_name" => $activity_name, "quantity" => $quantity, "hold" => $hold, "remarks" => $remarks, "state" => $state, "date" => $date);
            array_push($data, $single);
        }
        echo json_encode($data);

    } else if ($request == "checkAlready") {
        //检查是否已经报名过了
        $number = $_GET['number'];
        $enroll_id = $_GET['enroll_id'];

        $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
        mysqli_query($main_db, "set names utf8");
        mysqli_select_db($main_db, "JLUIBMclub");

        $sql_selete = "SELECT * FROM enroll_join where number='$number' and enroll_id='$enroll_id';";
        $retval = mysqli_query($main_db, $sql_select);
        $retval_check = mysqli_num_rows($retval);
        if ($retval_check > 0) {
            echo json_encode(array("message" => "has_enrolled"));
        } else {
            //检查人数是否已满
            $sql_get_quantity = "SELECT * FROM enroll WHERE enroll_id='$enroll_id';";
            $retval = mysqli_query($main_db, $sql_get_quantity);
            $quantity = 0;
            while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
                $quantity = $row['quantity'];
                break;
            }

            $sql_check_quantity = "SELECT * FROM enroll_join enroll_id='$enroll_id';";
            $retval = mysqli_query($main_db, $sql_check_quantity);
            $retval_check = mysqli_num_rows($retval);
            if ($retval_check < $quantity) {
                echo json_encode(array("message" => "enroll_allowed"));
            } else {
                echo json_encode(array("message" => "not-allowed"));
            }
        }
    }
}
