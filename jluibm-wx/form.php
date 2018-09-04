<?php
$request = urldecode($_POST['request']);
$user_agent = $_SERVER['HTTP_UA'];
if ($user_agent == "WeChat_SmallProgram") {
    if ($request == 'check') {
        $number = urldecode($_POST['number']);

        $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
        mysqli_query($main_db, "set names utf8");
        mysqli_select_db($main_db, "JLUIBMclub");

        //检测数据库中是否已经有该学号信息
        $check = 1;
        $sql_compare = "SELECT number from join_date;";
        $retval = mysqli_query($main_db, $sql_compare);
        while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
            if ($row['number'] == $number) {
                $check = 0;
            }
            if ($number == '') {
                $check = 0;
            }
        }
        if ($check == 0) {
            echo json_encode(array("message" => "has joined"));
        } else {
            echo json_encode(array("message" => "not found"));
        }
    } else if ($request == 'submit') {

        $submitTime = urldecode($_POST['submitTime']);
        $name = urldecode($_POST['name']);
        $number = urldecode($_POST['number']);
        $college = urldecode($_POST['college']);
        $major = urldecode($_POST['major']);
        $gender = urldecode($_POST['gender']);
        $grade = urldecode($_POST['grade']);
        $qq = urldecode($_POST['qq']);
        $phone = urldecode($_POST['phone']);
        $languages = $_POST['languages'];
        $learned = urldecode($_POST['learned']);

        //========================================

        $cpp = 0;
        $algorithm = 0;
        $web = 0;
        $linux = 0;
        $java = 0;
        $languages = explode(",", $languages);

        if ($grade == "大一") {
            $grade = 1;
        } else if ($grade == "大二") {
            $grade = 2;
        } else if ($grade == "大三") {
            $grade = 3;
        } else {
            $grade = 4;
        }

        //==========================================

        foreach ($languages as $key) {
            if ($key == 'cpp') {
                $cpp = 1;
            }
            if ($key == 'algorithm') {
                $algorithm = 1;
            }
            if ($key == 'web') {
                $web = 1;
            }
            if ($key == 'linux') {
                $linux = 1;
            }
            if ($key == 'java') {
                $java = 1;
            }
        }

        $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
        mysqli_query($main_db, "set names utf8");
        mysqli_select_db($main_db, "JLUIBMclub");
        $submitTime = date("Y-m-d");

        $submit_check = 1;
        if ($number == '') {
            $submit_check = 0;
        }
        $sql_compare = "SELECT number from join_date;";
        $retval = mysqli_query($main_db, $sql_compare);
        while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
            if ($row['number'] == $number) {
                $submit_check = 0;
                break;
            }
        }
        if ($submit_check == 1) {
            //数据库中没有该人信息
            //信息插入数据库
            $sql_insert = "insert into member" . "(name,number,college,major,gender,grade,qq,phone,cpp,algorithm,web,linux,java)" . "VALUES" . "('$name','$number','$college','$major','$gender','$grade','$qq','$phone','$cpp','$algorithm','$web','$linux','$java');";
            $join = mysqli_query($main_db, $sql_insert);
            if ($join) {
                session_start();
                unset($_SESSION);
                session_destroy();
            } else {
                die("error");
            }

            $sql_insert = "insert into join_date" . "(date,number)" . "VALUES" . "('$submitTime','$number');";
            $step = mysqli_query($main_db, $sql_insert);

            //根据该学生感兴趣的方向分组

            foreach ($languages as $key) {
                if ($key == 'cpp') {
                    $sql_insert = "insert into cpp_group" . "(number)" . "VALUES" . "('$number');";
                    $step = mysqli_query($main_db, $sql_insert);
                }
                if ($key == 'algorithm') {
                    $sql_insert = "insert into algorithm_group" . "(number)" . "VALUES" . "('$number');";
                    $step = mysqli_query($main_db, $sql_insert);
                }
                if ($key == 'web') {
                    $sql_insert = "insert into web_group" . "(number)" . "VALUES" . "('$number');";
                    $step = mysqli_query($main_db, $sql_insert);
                }
                if ($key == 'linux') {
                    $sql_insert = "insert into linux_group" . "(number)" . "VALUES" . "('$number');";
                    $step = mysqli_query($main_db, $sql_insert);
                }
                if ($key == 'java') {
                    $sql_insert = "insert into java_group" . "(number)" . "VALUES" . "('$number');";
                    $step = mysqli_query($main_db, $sql_insert);
                }
            }

            //
            $sql_insert = "insert into learned_text" . "(number,learned)" . "VALUES" . "('$number','$learned');";
            $step = mysqli_query($main_db, $sql_insert);
            if ($step) {
                $sql_set_pic = "UPDATE member SET userPic='../../userPicUpload/default.png' WHERE number='$number';";
                $set_pic = mysqli_query($main_db, $sql_set_pic);
                echo json_encode(array("message" => "success"));
            }

        }
    }
}
