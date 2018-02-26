<?php

    $number = urldecode($_POST['number']);
    $newPasswd = urldecode($_POST['password']);
    $email = urldecode($_POST['email']);
    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");
    $sql_select = "SELECT password FROM member WHERE number='$number';";
    $retval = mysqli_query($main_db,$sql_select);
    $sql_update = "UPDATE member SET password='$newPasswd' WHERE number='$number';";
    $step = mysqli_query( $main_db,$sql_update );
    echo json_encode("success");

?>