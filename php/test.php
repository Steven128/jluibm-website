<?php 
    $number = $_POST['number'];
    $pic = $_POST['file'];
    $arr = array("number"=>$number,"pic"=>$pic);
    echo json_encode($arr);
?>