<?php
$request = $_POST['request'];
//返回活动列表
if ($request == 'getList') {
    $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $sql_select = "select * from activity;";
    $retval     = mysqli_query($main_db, $sql_select);
    $data       = array();
    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
        $activity_id   = $row['activity_id'];
        $activity_name = $row['activity_name'];
        $setBy         = $row['setBy'];
        $place         = $row['place'];
        $time          = $row['time'];
        $remarks       = $row['remarks'];
        $state         = $row['state'];
        $arr           = array("activity_id" => $activity_id, "activity_name" => $activity_name, "setBy" => $setBy, "place" => $place, "time" => $time, "remarks" => $remarks, "state" => $state);
        array_push($data, $arr);
    }
    echo json_encode($data);
}

//返回未开始活动信息
else if ($request == 'getInactiveList') {
    $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $sql_select = "select * from activity where state='inactive';";
    $retval     = mysqli_query($main_db, $sql_select);
    $data       = array();
    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
        $activity_id   = $row['activity_id'];
        $activity_name = $row['activity_name'];
        $setBy         = $row['setBy'];
        $place         = $row['place'];
        $time          = $row['time'];
        $remarks       = $row['remarks'];
        $state         = $row['state'];
        $arr           = array("activity_id" => $activity_id, "activity_name" => $activity_name, "setBy" => $setBy, "place" => $place, "time" => $time, "remarks" => $remarks, "state" => $state);
        array_push($data, $arr);
    }
    echo json_encode($data);
}

//返回单个活动信息
else if ($request == 'getSingle') {
    $activity_id = $_POST['activity_id'];
    $main_db     = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $sql_select = "select * from activity where activity_id='$activity_id';";
    $retval     = mysqli_query($main_db, $sql_select);
    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
        $activity_id   = $row['activity_id'];
        $activity_name = $row['activity_name'];
        $setBy         = $row['setBy'];
        $place         = $row['place'];
        $time          = $row['time'];
        $remarks       = $row['remarks'];
        $state         = $row['state'];
        $data          = array("activity_id" => $activity_id, "activity_name" => $activity_name, "setBy" => $setBy, "place" => $place, "time" => $time, "remarks" => $remarks, "state" => $state);
        break;
    }
    echo json_encode($data);
}

//创建活动
else if ($request == 'createActivity') {
    $activity_name = $_POST['activity_name'];
    $setBy         = $_POST['setBy'];
    $place         = $_POST['place'];
    $time          = $_POST['time'];
    $remarks       = $_POST['remarks'];

    $activityTime = substr($time, 2, 2) . substr($time, 5, 2) . substr($time, 8, 2);

    $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $sql_select = "select * from activity where activity_id like 'activity" . "_" . "$setBy" . "_" . "$activityTime%';";
    $retval     = mysqli_query($main_db, $sql_select);
    $count      = 1;
    $arr        = array();
    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
        $count = $count + 1;
    }
    $count = (string) $count;

    if (strlen($count) == 1) {
        $count = "0" . $count;
    }
    $activity_id = "activity_" . "$setBy" . "_" . "$activityTime" . "_" . "$count";

    $sql_insert = "insert into activity" . "(activity_id,activity_name,setBy,place,time,remarks,state)" . "values" . "('$activity_id','$activity_name','$setBy','$place','$time','$remarks','inactive');";
    $step       = mysqli_query($main_db, $sql_insert);
    if ($step) {
        //下面创建用于存储签到数据的数据表
        $activity_table = "CREATE TABLE $activity_id(" .
            "submitTime VARCHAR(20) NOT NULL COMMENT '签到时间'," .
            "number VARCHAR(8) NOT NULL PRIMARY KEY COMMENT '学号'," .
            "longitude VARCHAR(20) COMMENT '签到地点经度'," .
            "latitude VARCHAR(20) COMMENT '签到地点纬度'" .
            ") ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT '活动 " . $activity_name . " 签到表，表名对应activity_id';";
        $retval = mysqli_query($main_db, $activity_table);
        $retval = true;
        if ($retval) {
            echo json_encode(array("message" => "success"));
        } else {
            echo json_encode(array("message" => "failed"));
        }
    } else {
        echo json_encode(array("message" => $step));
    }
}

//修改活动状态（开始签到）
else if ($request == 'changeState') {
    $activity_id = $_POST['activity_id'];
    $longitude   = $_POST['longitude'];
    $latitude    = $_POST['latitude'];
    $main_db     = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $sql_update = "UPDATE activity SET state='active' WHERE activity_id='$activity_id';";
    $retval     = mysqli_query($main_db, $sql_update);
    if ($retval) {
        $set_lng  = "UPDATE activity SET longitude='$longitude' WHERE activity_id='$activity_id';";
        $step_lng = mysqli_query($main_db, $set_lng);
        $set_lat  = "UPDATE activity SET latitude='$latitude' WHERE activity_id='$activity_id';";
        $step_lat = mysqli_query($main_db, $set_lat);
        echo json_encode(array("message" => "success"));
    } else {
        echo json_encode(array("message" => "failed"));
    }
}

//签到结束
else if ($request == 'activity-finish') {
    $activity_id = $_POST['activity_id'];

    $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $sql_update = "UPDATE activity SET state='finished' WHERE activity_id='$activity_id';";
    $retval     = mysqli_query($main_db, $sql_update);
    if ($retval) {
        echo json_encode(array("message" => "success"));
    } else {
        echo json_encode(array("message" => "failed"));
    }
}

//删除活动
else if ($request == 'deleteActivity') {
    $activity_id = $_POST['activity_id'];

    $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");
    //在表activity中删除该活动
    $sql_delete = "DELETE FROM activity WHERE activity_id='$activity_id';";
    $retval     = mysqli_query($main_db, $sql_delete);
    if ($retval) {
        //删除用于存放签到数据的数据表
        $sql_drop = "DROP TABLE $activity_id;";
        $step     = mysqli_query($main_db, $sql_drop);
        if ($step) {
            echo json_encode(array("message" => "success"));
        } else {
            echo json_encode(array("message" => "failed"));
        }

    } else {
        echo json_encode(array("message" => "failed"));
    }
}

//获取已签到列表
else if ($request == "getSignedList") {
    $activity_id = $_POST['activity_id'];

    $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
    mysqli_query($main_db, "set names utf8");
    mysqli_select_db($main_db, "JLUIBMclub");

    $sql_select_list = "SELECT * FROM $activity_id;";
    $retval_list     = mysqli_query($main_db, $sql_select_list);
    $data            = array();
    while ($row_activity = mysqli_fetch_array($retval_list, MYSQLI_ASSOC)) {
        $number     = $row_activity['number'];
        $submitTime = $row_activity['submitTime'];
        //用户签到的地址
        $user_lng = $row_activity['longitude'];
        $user_lat = $row_activity['latitude'];

        //获取签到时的标识位置
        $get_location = "SELECT longitude,latitude FROM activity WHERE activity_id='$activity_id';";
        $return       = mysqli_query($main_db, $get_location);
        while ($row_loc = mysqli_fetch_array($return, MYSQLI_ASSOC)) {
            $default_lng = $row_loc['longitude'];
            $default_lat = $row_loc['latitude'];
            break;
        }
        //计算用户签地点与默认地点的距离
        $distance = getDistance($default_lng, $default_lat, $user_lng, $user_lat, 1);
        //在member表中获得其详细信息
        $sql_select_single = "SELECT name,college,major,gender,grade FROM member WHERE number='$number';";
        $retval_single     = mysqli_query($main_db, $sql_select_single);
        while ($row_member = mysqli_fetch_array($retval_single, MYSQLI_ASSOC)) {
            $name    = $row_member['name'];
            $college = $row_member['college'];
            $major   = $row_member['major'];
            $gender  = $row_member['gender'];
            $grade   = $row_member['grade'];
            $arr     = array("number" => $number, "name" => $name, "submitTime" => $submitTime, "distance" => $distance, "college" => $college, "major" => $major, "gender" => $gender, "grade" => $grade);
            array_push($data, $arr);
            break;
        }
    }
    echo json_encode($data);
}

function getDistance($longitude1, $latitude1, $longitude2, $latitude2, $unit, $decimal = 0)
{

    $EARTH_RADIUS = 6370.996; // 地球半径系数
    $PI           = 3.1415926;

    $radLat1 = $latitude1 * $PI / 180.0;
    $radLat2 = $latitude2 * $PI / 180.0;

    $radLng1 = $longitude1 * $PI / 180.0;
    $radLng2 = $longitude2 * $PI / 180.0;

    $a = $radLat1 - $radLat2;
    $b = $radLng1 - $radLng2;

    $distance = 2 * asin(sqrt(pow(sin($a / 2), 2) + cos($radLat1) * cos($radLat2) * pow(sin($b / 2), 2)));
    $distance = $distance * $EARTH_RADIUS * 1000;

    if ($unit == 2) {
        $distance = $distance / 1000;
    }

    return round($distance, $decimal);

}
