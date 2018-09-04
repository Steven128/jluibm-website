<?php

@header("content-type:text/html;charset=utf8");
$base64_image_content = $_POST['userPicData'];
$number = $_POST['number'];
//匹配出图片的格式
if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)) {
    $type = $result[2];
    $new_file = "../../userPicUpload/";
    $new_file_backup = "/home/userPicUpload_backup/";
    if (!file_exists($new_file)) {
        //检查是否有该文件夹，如果没有就创建，并给予最高权限
        mkdir($new_file, 0700);
    }
    $new_file = $new_file . $number . ".{$type}";
    $new_file_backup = $new_file_backup . $number . ".{$type}";

    if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content)))) {
        //连接MySQL数据库
        $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
        mysqli_query($main_db, "set names utf8");
        mysqli_select_db($main_db, "JLUIBMclub");
        //将头像位置存入数据库中
        $sql_update = "UPDATE member SET userPic='$new_file' WHERE number='$number';";
        $step = mysqli_query($main_db, $sql_update);
        if ($step) {
            file_put_contents($new_file_backup, base64_decode(str_replace($result[1], '', $base64_image_content)));
            echo json_encode(array("message" => "success"));
        }
    } else {
        echo json_encode(array("message" => "failed"));
    }
}
