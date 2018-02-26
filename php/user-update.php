<?php
    $request = $_POST['request'];
    $number = $_POST['number'];

    if($request == "password-update"){
        $oldPasswd = $_POST['oldPasswd'];
        $newPasswd = $_POST['newPasswd'];
        $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
        mysqli_query($main_db,"set names utf8");
        mysqli_select_db($main_db,"JLUIBMclub");
        $sql_select = "SELECT password FROM member WHERE number='$number';";
        $retval = mysqli_query($main_db,$sql_select);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            $password = $row['password'];
        }
        if($oldPasswd == $password){
            $sql_update = "UPDATE member SET password='$newPasswd' WHERE number='$number';";
            $step = mysqli_query( $main_db,$sql_update );
            echo json_encode("success");
        }
        else {
            echo json_encode("wrong oldPassword");
        }
    }

    if($request == "info-update"){
        $qq = $_POST['qq'];
        $phone = $_POST['phone'];
        $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
        mysqli_query($main_db,"set names utf8");
        mysqli_select_db($main_db,"JLUIBMclub");
        $sql_update = "UPDATE member SET qq='$qq' WHERE number='$number';";
        $step = mysqli_query( $main_db,$sql_update );
        $sql_update = "UPDATE member SET phone='$phone' WHERE number='$number';";
        $step = mysqli_query( $main_db,$sql_update );
        echo json_encode("success");
    }
?>