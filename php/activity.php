<?php
$request = $_POST['request'];
//返回活动列表
if($request == 'getList'){
    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_select = "select * from activity;";
    $retval = mysqli_query($main_db,$sql_select);
    $data = array();
    while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
        $activity_id = $row['activity_id'];
        $activity_name = $row['activity_name'];
        $setBy = $row['setBy'];
        $place = $row['place'];
        $time = $row['time'];
        $remarks = $row['remarks'];
        $state = $row['state'];
        $arr = array("activity_id"=>$activity_id,"activity_name"=>$activity_name,"setBy"=>$setBy,"place"=>$place,"time"=>$time,"remarks"=>$remarks,"state"=>$state);
        array_push($data,$arr);
    }
    echo json_encode($data);
}

//返回单个活动信息
else if($request == 'getSingle'){
    $activity_id = $_POST['activity_id'];
    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_select = "select * from activity where activity_id='$activity_id';";
    $retval = mysqli_query($main_db,$sql_select);
    while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
        $activity_id = $row['activity_id'];
        $activity_name = $row['activity_name'];
        $setBy = $row['setBy'];
        $place = $row['place'];
        $time = $row['time'];
        $remarks = $row['remarks'];
        $state = $row['state'];
        $data = array("activity_id"=>$activity_id,"activity_name"=>$activity_name,"setBy"=>$setBy,"place"=>$place,"time"=>$time,"remarks"=>$remarks,"state"=>$state);
        break;
    }
    echo json_encode($data);
}

//创建活动
else if($request == 'createActivity'){
    $activity_name = $_POST['activity_name'];
    $setBy = $_POST['setBy'];
    $place = $_POST['place'];
    $time = $_POST['time'];
    $remarks = $_POST['remarks'];

    $activityTime = substr($time,2,2).substr($time,5,2).substr($time,8,2);
    
    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_select = "select * from activity where activity_id like 'activity"."_"."$setBy"."_"."$activityTime%';";
    $retval = mysqli_query($main_db,$sql_select);
    $count = 1;
    $arr =array();
    while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
        $count = $count + 1;
    }
    $count = (string)$count;
    
    if(strlen($count) == 1){
        $count = "0".$count;
    }
    $activity_id = "activity_"."$setBy"."_"."$activityTime"."_"."$count";

    $sql_insert = "insert into activity"."(activity_id,activity_name,setBy,place,time,remarks,state)"."values"."('$activity_id','$activity_name','$setBy','$place','$time','$remarks','inactive');";
    $step = mysqli_query( $main_db,$sql_insert );
    if($step){
        //下面创建用于存储签到数据的数据表
        $activity_table = "CREATE TABLE $activity_id(".
            "submitTime varchar(20) NOT NULL,".
            "number varchar(8) NOT NULL,".
            "submitLocation varchar(100) NOT NULL".
            ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
        $retval = mysqli_query( $main_db, $activity_table );
        $retval=true;
        if($retval ){
            echo json_encode("success");
        }
       else {
            echo json_encode("create activity-sign db".$retval);
       }
    }
    else {
        echo json_encode($step);
    }
}

//修改活动状态
else if($request == 'changeState'){
    $activity_id = $_POST['activity_id'];

    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_update = "UPDATE activity SET state='active' WHERE activity_id='$activity_id';";
    $retval = mysqli_query($main_db,$sql_update);
    if($retval){
        echo json_encode("success");
    }
    else {
        echo json_encode("failed");
    }
}


//签到结束
else if($request == 'activity-finish'){
    $activity_id = $_POST['activity_id'];

    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_update = "UPDATE activity SET state='finished' WHERE activity_id='$activity_id';";
    $retval = mysqli_query($main_db,$sql_update);
    if($retval){
        echo json_encode("success");
    }
    else {
        echo json_encode("failed");
    }
}

//删除活动
else if($request == 'deleteActivity'){
    $activity_id = $_POST['activity_id'];

    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");
    //在表activity中删除该活动
    $sql_delete = "DELETE FROM activity WHERE activity_id='$activity_id';";
    $retval = mysqli_query($main_db,$sql_delete);
    if($retval){
        //删除用于存放签到数据的数据表
        $sql_drop = "DROP TABLE $activity_id;";
        $step = mysqli_query($main_db,$sql_drop);
        if($step){
            echo json_encode("success");
        }
        else {
            echo json_encode("failed");
        }
        
    }
    else {
        echo json_encode("failed");
    }
}

//获取已签到列表
else if($request == "getSignedList") {
    $activity_id = $_POST['activity_id'];
    
    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_select_list = "SELECT * FROM $activity_id;";
    $retval_list = mysqli_query($main_db,$sql_select_list);
    $data = array();
    while($row_activity = mysqli_fetch_array($retval_list,MYSQLI_ASSOC)){
        $number = $row_activity['number'];
        $submitTime = $row_activity['submitTime'];
        $location = $row['location'];
        //在member表中获得其详细信息
        $sql_select_single = "SELECT name,college,major,gender,grade FROM member WHERE number='$number';";
        $retval_single = mysqli_query($main_db,$sql_select_single);
        while($row_member = mysqli_fetch_array($retval_single,MYSQLI_ASSOC)){
            $name = $row_member['name'];
            $college = $row_member['college'];
            $major = $row_member['major'];
            $gender = $row_member['gender'];
            $grade = $row_member['grade'];
            $arr = array("number"=>$number,"name"=>$name,"submitTime"=>$submitTime,"location"=>$location,"college"=>$college,"major"=>$major,"gender"=>$gender,"grade"=>$grade);
            array_push($data,$arr);
            break;
        }
    }
    echo json_encode($data);
}


?>