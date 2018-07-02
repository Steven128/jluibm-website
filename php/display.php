<?php
    @header("content-type:text/html;charset=utf8");

    $request = $_GET['request'];
    
    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");
    //获取全部成员信息
    if($request == "all"){
        $sql_select = "SELECT isManager,name,number,college,major,gender,grade,qq,phone from member ORDER BY isManager DESC,grade DESC,number ASC,gender ASC;";
        $retval = mysqli_query($main_db,$sql_select);
        $data = array();
        $count = 1;
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            $number = $row['number'];
            $name = $row['name'];
            $college = $row['college'];
            $major = $row['major'];
            $gender = $row['gender'];
            $grade = $row['grade'];
            $qq = $row['qq'];
            $phone = $row['phone'];
            $isManager = $row['isManager'];
            
            $arr = array("count"=>$count,"name"=>$name,"number"=>$number,"college"=>$college,"major"=>$major,"gender"=>$gender,"grade"=>$grade,"qq"=>$qq,"phone"=>$phone,"isManager"=>$isManager);
            array_push($data,$arr);
            $count += 1;
        }
        echo json_encode($data);
    }
    //获得某个社员信息
    if($request == "single"){
        $target = $_GET["target-user"];
        $sql_select = "SELECT isManager,name,number,college,major,gender,grade,qq,phone from member WHERE number='$target';";
        $retval = mysqli_query($main_db,$sql_select);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            $number = $row['number'];
            $name = $row['name'];
            $college = $row['college'];
            $major = $row['major'];
            $gender = $row['gender'];
            $grade = $row['grade'];
            $qq = $row['qq'];
            $phone = $row['phone'];
            $isManager = $row['isManager'];
            $arr = array("name"=>$name,"number"=>$number,"college"=>$college,"major"=>$major,"gender"=>$gender,"grade"=>$grade,"qq"=>$qq,"phone"=>$phone,"isManager"=>$isManager);
        }
        echo json_encode($arr);
    }


     //获得某个组员信息
     if($request == "single-group"){
        $target = $_GET["target-user"];
        $group = $_GET["group"];
        $sql_select = "SELECT name,number,college,major,gender,grade,qq,phone from member WHERE number='$target';";
        $retval = mysqli_query($main_db,$sql_select);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            $number = $row['number'];
            $name = $row['name'];
            $college = $row['college'];
            $major = $row['major'];
            $gender = $row['gender'];
            $grade = $row['grade'];
            $qq = $row['qq'];
            $phone = $row['phone'];
            //检查是否是组长
            $sql_select_group = "SELECT isLeader from $group"."_group WHERE number='$target';";
            $retval_group = mysqli_query($main_db,$sql_select_group);
            $row_group = mysqli_fetch_array($retval_group,MYSQLI_ASSOC);
            $isLeader = $row_group['isLeader'];
            $arr = array("name"=>$name,"number"=>$number,"college"=>$college,"major"=>$major,"gender"=>$gender,"grade"=>$grade,"qq"=>$qq,"phone"=>$phone,"isLeader"=>$isLeader);
        }
        echo json_encode($arr);
    }

?>
