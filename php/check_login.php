<?php
    header("content-type:text/html;charset=utf8");
    session_start();
    $request = $_POST['request'];
    if($request=="getNumber"){
        if(isset($_SESSION['userNumber'])){
            $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
            mysqli_query($main_db,"set names utf8");
            mysqli_select_db($main_db,"JLUIBMclub");
            //在数据库中查找当前session对应用户是否存在
            $check = 0;
            $sql_compare = "SELECT number,isManager from member;";
            $retval = mysqli_query($main_db,$sql_compare);
            while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
                if( $row['number'] == $_SESSION['userNumber'] ){
                    $check = 1;
                    //用户存在
                    $number = $_SESSION['userNumber'];
                    $name = $_SESSION['userName'];
                    $isManager = $row['isManager'];
                    $getPath = mysqli_query($main_db,"SELECT userPic from member where number=$number;");
                    $userPicPath = '';
                    while($step = mysqli_fetch_array($getPath,MYSQLI_ASSOC)){
                        $userPicPath = $step['userPic'];
                    }
                    $arr = array("number"=>$number,"name"=>$name,"isManager"=>$isManager,"userPicPath"=>$userPicPath);
                    echo json_encode($arr);
                    break;
                }
            }
            if($check==0){
                unset($_SESSION);
                session_destroy(); 
                $arr = array("number"=>null);
                echo json_encode($arr);
            }
        }
        else{
            $arr = array("number"=>null);
            echo json_encode($arr);
        }
    }
    if($request=="logout"){
        unset($_SESSION);
        session_destroy();
        echo json_encode("success logout");
    }
?>