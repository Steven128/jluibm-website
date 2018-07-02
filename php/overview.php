<?php
//统计社团信息

$request = $_GET['request'];
if ($request == "count"){
    $count_data = array();
    $today = date("Y-m-d");       
    $day_1_ago = date("Y-m-d",strtotime("-1 day"));    
    $day_2_ago = date("Y-m-d",strtotime("-2 day"));  
    $day_3_ago = date("Y-m-d",strtotime("-3 day"));  
    $day_4_ago = date("Y-m-d",strtotime("-4 day"));  
    $day_5_ago = date("Y-m-d",strtotime("-5 day"));  
    $day_6_ago = date("Y-m-d",strtotime("-6 day"));  
    $day_7_ago = date("Y-m-d",strtotime("-7 day"));  
    $day_8_ago = date("Y-m-d",strtotime("-8 day"));  
    $day_9_ago = date("Y-m-d",strtotime("-9 day"));     

    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");
    //获取指定日期加入社团的人数
    function getCount($main_db,$day){
        $sql_select = "select date from join_date where date='$day';";
        $retval = mysqli_query($main_db,$sql_select);
        $num = mysqli_num_rows($retval);
        $day = substr($day,5,2).".".substr($day,8,2);
        $per = array("date"=>$day,"count"=>$num);
        return $per;
    }
    array_push($count_data,getCount($main_db,$today));
    array_push($count_data,getCount($main_db,$day_1_ago));
    array_push($count_data,getCount($main_db,$day_2_ago));
    array_push($count_data,getCount($main_db,$day_3_ago));
    array_push($count_data,getCount($main_db,$day_4_ago));
    array_push($count_data,getCount($main_db,$day_5_ago));
    array_push($count_data,getCount($main_db,$day_6_ago));
    array_push($count_data,getCount($main_db,$day_7_ago));
    array_push($count_data,getCount($main_db,$day_8_ago));
    array_push($count_data,getCount($main_db,$day_9_ago));
    
    echo json_encode($count_data);
}
else if($request == "amount") {
    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_get_amount = "SELECT * from member;";
    $retval = mysqli_query($main_db,$sql_get_amount);
    $amount = mysqli_num_rows($retval);
    echo json_encode(array("amount"=>$amount));
}
else if($request == "gender"){
    $gender_data = array();
    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_select_gender = "select gender from member where gender='0';";
    $retval_gender = mysqli_query($main_db,$sql_select_gender);
    $gender_male_number = mysqli_num_rows($retval_gender);
    $sql_select_gender = "select gender from member where gender='1';";
    $retval_gender = mysqli_query($main_db,$sql_select_gender);
    $gender_female_number = mysqli_num_rows($retval_gender);
    $gender_data = array("male"=>$gender_male_number,"female"=>$gender_female_number);
    echo json_encode($gender_data);
}
else if($request == "grade"){
    $grade_data = array();
    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_select_grade = "select grade from member where grade=1;";
    $retval_grade = mysqli_query($main_db,$sql_select_grade);
    $grade_1_number = mysqli_num_rows($retval_grade);
    $sql_select_grade = "select grade from member where grade=2;";
    $retval_grade = mysqli_query($main_db,$sql_select_grade);
    $grade_2_number = mysqli_num_rows($retval_grade);
    $sql_select_grade = "select grade from member where grade=3;";
    $retval_grade = mysqli_query($main_db,$sql_select_grade);
    $grade_3_number = mysqli_num_rows($retval_grade);
    $sql_select_grade = "select grade from member where grade=4;";
    $retval_grade = mysqli_query($main_db,$sql_select_grade);
    $grade_4_number = mysqli_num_rows($retval_grade);
    $grade_data = array("grade_1_number"=>$grade_1_number,"grade_2_number"=>$grade_2_number,"grade_3_number"=>$grade_3_number,"grade_4_number"=>$grade_4_number);

    echo json_encode($grade_data);
}
else if($request == "group"){
    $group_data = array();
    $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
    mysqli_query($main_db,"set names utf8");
    mysqli_select_db($main_db,"JLUIBMclub");

    $sql_select_group = "select * from member where cpp=1;";
    $retval_group = mysqli_query($main_db,$sql_select_group);
    $group_cpp_number = mysqli_num_rows($retval_group);
    $sql_select_group = "select * from member where algorithm=1;";
    $retval_group = mysqli_query($main_db,$sql_select_group);
    $group_algorithm_number = mysqli_num_rows($retval_group);
    $sql_select_group = "select * from member where web=1;";
    $retval_group = mysqli_query($main_db,$sql_select_group);
    $group_web_number = mysqli_num_rows($retval_group);
    $sql_select_group = "select * from member where linux=1;";
    $retval_group = mysqli_query($main_db,$sql_select_group);
    $group_linux_number = mysqli_num_rows($retval_group);
    $sql_select_group = "select * from member where java=1;";
    $retval_group = mysqli_query($main_db,$sql_select_group);
    $group_java_number = mysqli_num_rows($retval_group);
    $sql_select_all = "select * from member;";
    $retval_group = mysqli_query($main_db,$sql_select_all);
    $group_all_number = mysqli_num_rows($retval_group);
    $group_data = array("cpp"=>$group_cpp_number,"algorithm"=>$group_algorithm_number,"web"=>$group_web_number,"linux"=>$group_linux_number,"java"=>$group_java_number,"all"=>$group_all_number);

    echo json_encode($group_data);
}


?>