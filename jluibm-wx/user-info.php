<?php
    $lifeTime = 7 * 24 * 3600;   
    session_set_cookie_params($lifeTime);
    session_start();
    $number = $_GET['number'];
    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");
    $sql_select_user = "SELECT * from member where number='$number';";
    $retval = mysqli_query($main_db,$sql_select_user);
    while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
        $name = $row['name'];
        $college = $row['college'];
        $major = $row['major'];
        $gender = $row['gender'];
        $grade = $row['grade'];
        $qq = $row['qq'];
        $phone = $row['phone'];
        $isManager = $row['isManager'];
        $arr = array("name"=>$name,"number"=>$number,"college"=>$college,"major"=>$major,"gender"=>$gender,"grade"=>$grade,"qq"=>$qq,"phone"=>$phone,"isManager"=>$isManager);
        echo json_encode($arr);
        break;
    }
?>