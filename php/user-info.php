<?php
    @header("content-type:text/html;charset=utf8");
    session_start();
    $number = $_GET['number'];
    $request = $_GET['request'];
    if($request == 'get_info'){
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
        echo json_encode($data);
    }
    //获取参加过的活动
    else if($request == 'get_activity') {
        $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
        mysqli_query($main_db,"set names utf8");
        mysqli_select_db($main_db,"JLUIBMclub");
        //获取所有活动的id
        $sql_select_activity = "SELECT activity_id from activity WHERE state='finished';";
        $retval_activity = mysqli_query($main_db,$sql_select_activity);
        $data = array();
        while($row_activity = mysqli_fetch_array($retval_activity,MYSQLI_ASSOC)) {
            $activity_id = $row_activity['activity_id'];
            $activity_name = $row_activity['activity_name'];
            $time = $row_activity['time'];
            //在活动签到表中检查是否有该生
            $sql_select_member = "SELECT number from $activity_id;";
            $retval_list = mysqli_query($main_db,$sql_select_member);
            while($row_member = mysqli_fetch_array($retval_list,MYSQLI_ASSOC)) {
                if($row_member['number'] == $number) {
                    //参加过该活动
                    $arr = array("activity_name"=>$activity_name,"time"=>$time);
                    array_push($data,$arr);
                    break;
                }
            }
        }
        echo json_encode($data);
    }
?>
