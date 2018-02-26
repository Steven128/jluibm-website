<?php
    @header("content-type:text/html;charset=utf8");
    session_start();
    $number = $_GET['number'];
    if($number!=$_SESSION['userNumber']){
        session_destroy();
        echo json_encode("该用户未登录！");
    }
    else{
        $data = array();
        $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
        mysqli_query($main_db,"set names utf8");
        mysqli_select_db($main_db,"JLUIBMclub");
        $sql_select = "SELECT * from member where number='$number';";
        $retval = mysqli_query($main_db,$sql_select);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            $name = $row['name'];
            $college = $row['college'];
            $major = $row['major'];
            $gender = $row['gender'];
            $grade = $row['grade'];
            $qq = $row['qq'];
            $phone = $row['phone'];
            $isManager = $row['isManager'];
            $getPath = mysqli_query($main_db,"SELECT userPic from member where number=$number;");
            $userPicPath = '';
            while($step = mysqli_fetch_array($getPath,MYSQLI_ASSOC)){
                $userPicPath = $step['userPic'];
            }
            //加入的组
            $cpp = $row['cpp'];
            $algorithm = $row['algorithm'];
            $web = $row['web'];
            $linux = $row['linux'];
            $java = $row['java'];
            break;
        }
        $arr = array("name"=>$name,"number"=>$number,"college"=>$college,"major"=>$major,"gender"=>$gender,"grade"=>$grade,"qq"=>$qq,"phone"=>$phone,"isManager"=>$isManager,"userPicPath"=>$userPicPath);
        array_push($data,$arr);
        $arr = array("cpp"=>$cpp,"algorithm"=>$algorithm,"web"=>$web,"linux"=>$linux,"java"=>$java);
        array_push($data,$arr);
        $sql_select_activity = "SELECT activityCode,activityName,time from activity where state='finished';";
        $retval = mysqli_query($main_db,$sql_select_activity);
        $arr = array();
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            $activityCode = $row['activityCode'];
            $sql_select_single = "SELECT * from $activityCode where number='$number'";
            $retval_single = mysqli_query($main_db,$sql_select_single);
            if(mysqli_num_rows($retval_single) == 1){
                array_push($arr,array("activityName"=>$row['activityName'],"time"=>$row['time']));
            }
        }
        array_push($data,$arr);
        echo json_encode($data);
    }
?>
