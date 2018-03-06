<?php
$lifeTime = 7 * 24 * 3600;
session_set_cookie_params($lifeTime);
session_start();
$request = $_GET['request'];
if ($request == "getNumber") {
    if (isset($_SESSION['userNumber'])) {
        $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
        mysqli_query($main_db, "set names utf8");
        mysqli_select_db($main_db, "JLUIBMclub");
        //在数据库中查找当前session对应用户是否存在
        $check = 0;
        $sql_compare = "SELECT number from member;";
        $retval = mysqli_query($main_db, $sql_compare);
        while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
            if ($row['number'] == $_SESSION['userNumber']) {
                $check = 1;
                //用户存在
                $number = $_SESSION['userNumber'];
                $name = $_SESSION['userName'];
                $isManager = $_SESSION['isManager'];
                $arr = array("number" => $number, "name" => $name, "isManager" => $isManager);
                die(json_encode($arr));
                echo json_encode($arr);
            }
        }
        if ($check == 0) {
            unset($_SESSION);
            session_destroy();
            $arr = array("number" => null);
            echo json_encode($arr);
        }
        // $number = $_SESSION['userNumber'];
        // $name = $_SESSION['userName'];
        // $isManager = $_SESSION['isManager'];
        // $arr = array("number"=>$number,"name"=>$name,"isManager"=>$isManager);
        // echo json_encode($arr);
    } else {
        $arr = array("number" => null);
        echo json_encode($arr);
    }
}
if ($request == "logout") {
    unset($_SESSION);
    session_destroy();
    echo json_encode(array("message" => "success logout"));
}
