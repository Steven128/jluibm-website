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
        $activityCode = $row['activityCode'];
        $activityName = $row['activityName'];
        $setBy = $row['setBy'];
        $place = $row['place'];
        $time = $row['time'];
        $remarks = $row['remarks'];
        $state = $row['state'];
        $arr = array("activityCode"=>$activityCode,"activityName"=>$activityName,"setBy"=>$setBy,"place"=>$place,"time"=>$time,"remarks"=>$remarks,"state"=>$state);
        array_push($data,$arr);
    }
    echo json_encode($data);
}

//返回单个活动信息
if($request == 'getSingle'){
    $activityCode = $_POST['activityCode'];
    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_select = "select * from activity where activityCode='$activityCode';";
    $retval = mysqli_query($main_db,$sql_select);
    while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
        $activityCode = $row['activityCode'];
        $activityName = $row['activityName'];
        $setBy = $row['setBy'];
        $place = $row['place'];
        $time = $row['time'];
        $remarks = $row['remarks'];
        $state = $row['state'];
        $data = array("activityCode"=>$activityCode,"activityName"=>$activityName,"setBy"=>$setBy,"place"=>$place,"time"=>$time,"remarks"=>$remarks,"state"=>$state);
        break;
    }
    echo json_encode($data);
}

//创建活动
if($request == 'createActivity'){
    $activityName = $_POST['activityName'];
    $setBy = $_POST['setBy'];
    $place = $_POST['place'];
    $time = $_POST['time'];
    $remarks = $_POST['remarks'];

    $activityTime = substr($time,2,2).substr($time,5,2).substr($time,8,2);
    
    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_select = "select * from activity where activityCode like 'activity"."_"."$setBy"."_"."$activityTime%';";
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
    $activityCode = "activity_"."$setBy"."_"."$activityTime"."_"."$count";

    $sql_insert = "insert into activity"."(activityCode,activityName,setBy,place,time,remarks,state)"."values"."('$activityCode','$activityName','$setBy','$place','$time','$remarks','inactive');";
    $step = mysqli_query( $main_db,$sql_insert );
    if($step){
        //下面创建用于存储签到数据的数据表
        $activity_table = "CREATE TABLE $activityCode(".
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
if($request == 'changeState'){
    $activityCode = $_POST['activityCode'];

    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_update = "UPDATE activity SET state='active' WHERE activityCode='$activityCode';";
    $retval = mysqli_query($main_db,$sql_update);
    if($retval){
        echo json_encode("success");
    }
    else {
        echo json_encode("failed");
    }
}


//签到结束
if($request == 'activity-finish'){
    $activityCode = $_POST['activityCode'];

    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_update = "UPDATE activity SET state='finished' WHERE activityCode='$activityCode';";
    $retval = mysqli_query($main_db,$sql_update);
    if($retval){
        echo json_encode("success");
    }
    else {
        echo json_encode("failed");
    }
}

//删除活动
if($request == 'deleteActivity'){
    $activityCode = $_POST['activityCode'];

    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");
    //在表activity中删除该活动
    $sql_delete = "DELETE FROM activity WHERE activityCode='$activityCode';";
    $retval = mysqli_query($main_db,$sql_delete);
    if($retval){
        //删除用于存放签到数据的数据表
        $sql_drop = "DROP TABLE $activityCode;";
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

?>