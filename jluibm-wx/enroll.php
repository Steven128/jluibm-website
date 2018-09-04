<?php
//活动报名
$request = urldecode($_POST['request']);
$user_agent = $_SERVER['HTTP_UA'];
if ($user_agent == "WeChat_SmallProgram") {
    if ($request == "submit") {
        //提交信息
        $enroll_id = urldecode($_POST['enroll_id']);
        $submitTime = urldecode($_POST['submitTime']);
        $name = urldecode($_POST['name']);
        $number = urldecode($_POST['number']);
        $college = urldecode($_POST['college']);
        $gender = urldecode($_POST['gender']);
        $grade = urldecode($_POST['grade']);
        $qq = urldecode($_POST['qq']);
        $comeFrom = urldecode($_POST['comeFrom']);

        $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
        mysqli_query($main_db, "set names utf8");
        mysqli_select_db($main_db, "JLUIBMclub");

        $sql_compare = "SELECT number FROM enroll_join WHERE number='$number' and enroll_id='$enroll_id';";
        $retval = mysqli_query($main_db, $sql_compare);
        $retval_check = mysqli_num_rows($retval);
        if ($retval_check > 0) {
            //存在该学生
            echo json_encode(array("message" => "already_exists"));
        } else {
            //将报名信息存入数据库
            $sql_insert = "INSERT INTO enroll_join" .
                "(enroll_id,submitTime,name,number,college,gender,grade,qq,comeFrom)" .
                "VALUES" .
                "('$enroll_id','$submitTime','$name','$number','$college','$gender',$grade,'$qq','$comeFrom');";
            $retval = mysqli_query($main_db, $sql_insert);
            if ($retval) {
                echo json_encode(array("message" => "success"));
            } else {
                echo json_encode(array("message" => "error"));
            }

        }
    }
}
