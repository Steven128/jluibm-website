<?php

$number = $_POST['number'];
$upload_tmp_name = $_FILES['file']['tmp_name'];
$upload_name = $_FILES['file']['name'];

//保存目录
$img_dir="../../userPicUpload/";

//如果当前图片不为空
if(!empty($upload_name)){
    $upload_name = explode(".",$upload_name);
    $img_type = array_pop($upload_name);
    $img_name = $number.".".$img_type;
        //如果上传的文件没有在服务器上存在
        if(!file_exists($img_dir.$upload_name))
        {
            //把图片文件从临时文件夹中转移到我们指定上传的目录中
            $file = $img_dir.$img_name;
            move_uploaded_file($upload_tmp_name,$file);
            chmod($file,0700);

            $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
            mysqli_query($main_db,"set names utf8");
            mysqli_select_db($main_db,"JLUIBMclub");
            //将头像位置存入数据库中
            $sql_update = "UPDATE member SET userPic='$file' WHERE number='$number';";
            $step = mysqli_query( $main_db,$sql_update );
            if($step){
                echo json_encode("message"=>"success");
            }
        }
}
else {
    echo json_encode("message"=>"error");
}
?>