<?php
    @header("content-type:text/html;charset=utf8");
    $request = $_POST['request'];

   // 修改社员信息
    if($request == "update-member"){
        $name = $_POST['name'];
        $number = $_POST['number'];
        $college = $_POST['college'];
        $major = $_POST['major'];
        $gender = $_POST['gender'];
        $grade = $_POST['grade'];
        $qq = $_POST['qq'];
        $phone = $_POST['phone'];
        $isManager = $_POST['isManager'];
        //
        $college_updated = 0;
        $major_updated = 0;
        $gender_updated = 0;
        $grade_updated = 0;
        
        $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
        mysqli_query($main_db,"set names utf8");
        mysqli_select_db($main_db,"JLUIBMclub");
        $sql_select = "SELECT name,number,college,major,gender,grade,qq,phone,isManager FROM member WHERE number='$number';";
        $retval = mysqli_query($main_db,$sql_select);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            if($row['college']!=$college){
                $sql_update = "UPDATE member SET college='$college' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
                $college_updated = 1;
            }
            if($row['major']!=$major){
                $sql_update = "UPDATE member SET major='$major' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
                $major_updated = 1;
            }
            if($row['gender']!=$gender){
                $sql_update = "UPDATE member SET gender='$gender' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
                $gender_updated = 1;
            }
            if($row['grade']!=$grade){
                $sql_update = "UPDATE member SET grade='$grade' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
                $grade_updated = 1;
            }
            if($row['qq']!=$qq){
                $sql_update = "UPDATE member SET qq='$qq' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
            }
            if($row['phone']!=$phone){
                $sql_update = "UPDATE member SET phone='$phone' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
            }
            if($row['isManager']!=$isManager){
                $sql_update = "UPDATE member SET isManager='$isManager' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
            }
        }
        if($isManager == 0) {
                //由管理员变为普通社员，取消所有组长权限
                function cancelLeader($main_db,$number,$group) {
                    $sql_select_group = "SELECT * FROM $group"."_group WHERE number='$number';";
                    $retval_group = mysqli_query($main_db,$sql_select_group);
                    while($row_group = mysqli_fetch_array($retval_group,MYSQLI_ASSOC)) {
                        if($row_group['isLeader'] == 1) {
                            //是该组组长，需要取消权限
                            $sql_update_group = "UPDATE $group"."_group SET isLeader=0 WHERE number='$number';";
                            $retval = mysqli_query($main_db,$sql_update_group);
                        }
                    }
                }
                cancelLeader($main_db,$number,"cpp");
                cancelLeader($main_db,$number,"algorithm");
                cancelLeader($main_db,$number,"web");
                cancelLeader($main_db,$number,"linux");
                cancelLeader($main_db,$number,"java");
            }

        $sql_select = "SELECT number FROM learned_text;";
        $retval = mysqli_query($main_db,$sql_select);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
                if($college_updated == 1){
                    $sql_update = "UPDATE learned_text SET college='$college' WHERE number='$number';";
                    $step = mysqli_query( $main_db,$sql_update );
                }
                if($major_updated == 1){
                    $sql_update = "UPDATE learned_text SET major='$major' WHERE number='$number';";
                    $step = mysqli_query( $main_db,$sql_update );
                }
                if($gender_updated == 1){
                    $sql_update = "UPDATE learned_text SET gender='$gender' WHERE number='$number';";
                    $step = mysqli_query( $main_db,$sql_update );
                }
                if($grade_updated == 1){
                    $sql_update = "UPDATE learned_text SET grade='$grade' WHERE number='$number';";
                    $step = mysqli_query( $main_db,$sql_update );
                }
            }
        
        echo json_encode(array("message"=>"success"));
    }


    else if($request == "update-group-member"){
        $name = $_POST['name'];
        $number = $_POST['number'];
        $college = $_POST['college'];
        $major = $_POST['major'];
        $gender = $_POST['gender'];
        $grade = $_POST['grade'];
        $qq = $_POST['qq'];
        $phone = $_POST['phone'];
        $group = $_POST['group'];
        $isLeader = $_POST['isLeader'];
        //
        $college_updated = 0;
        $major_updated = 0;
        $gender_updated = 0;
        $grade_updated = 0;
        
        $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
        mysqli_query($main_db,"set names utf8");
        mysqli_select_db($main_db,"JLUIBMclub");
        $sql_select = "SELECT name,number,college,major,gender,grade,qq,phone FROM member WHERE number='$number';";
        $retval = mysqli_query($main_db,$sql_select);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            if($row['college']!=$college){
                $sql_update = "UPDATE member SET college='$college' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
                $college_updated = 1;
            }
            if($row['major']!=$major){
                $sql_update = "UPDATE member SET major='$major' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
                $major_updated = 1;
            }
            if($row['gender']!=$gender){
                $sql_update = "UPDATE member SET gender='$gender' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
                $gender_updated = 1;
            }
            if($row['grade']!=$grade){
                $sql_update = "UPDATE member SET grade='$grade' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
                $grade_updated = 1;
            }
            if($row['qq']!=$qq){
                $sql_update = "UPDATE member SET qq='$qq' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
            }
            if($row['phone']!=$phone){
                $sql_update = "UPDATE member SET phone='$phone' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
            }
        }
        
        $sql_select = "SELECT number FROM learned_text;";
        $retval = mysqli_query($main_db,$sql_select);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            if($college_updated == 1){
                $sql_update = "UPDATE learned_text SET college='$college' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
            }
            if($major_updated == 1){
                $sql_update = "UPDATE learned_text SET major='$major' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
            }
            if($gender_updated == 1){
                $sql_update = "UPDATE learned_text SET gender='$gender' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
            }
            if($grade_updated == 1){
                $sql_update = "UPDATE learned_text SET grade='$grade' WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_update );
            }
        }

        $sql_select = "UPDATE $group"."_group SET isLeader='$isLeader' WHERE number='$number';";
        $retval = mysqli_query($main_db,$sql_select);


        
        echo json_encode(array("message"=>"success"));
    }//////////////////////////////////////////////////////////////////////////////


  //  删除社员
    else if($request == "delete-member"){

        $number = $_POST['number'];

        $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
        mysqli_query($main_db,"set names utf8");
        mysqli_select_db($main_db,"JLUIBMclub");
        $sql_delete = "DELETE from member WHERE number='$number';";
        $step = mysqli_query( $main_db,$sql_delete );
        $sql_delete = "DELETE from join_infomation WHERE number='$number';";
        $step = mysqli_query( $main_db,$sql_delete );
        $sql_delete = "DELETE from learned_text WHERE number='$number';";
        $step = mysqli_query( $main_db,$sql_delete );

        $sql_select = "SELECT number FROM cpp_group;";
        $retval = mysqli_query($main_db,$sql_select);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            if($row['number']==$number){
                $sql_delete = "DELETE from cpp_group WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_delete );
            }
        }
        $sql_select = "SELECT number FROM algorithm_group;";
        $retval = mysqli_query($main_db,$sql_select);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            if($row['number']==$number){
                $sql_delete = "DELETE from algorithm_group WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_delete );
            }
        }
        $sql_select = "SELECT number FROM web_group;";
        $retval = mysqli_query($main_db,$sql_select);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            if($row['number']==$number){
                $sql_delete = "DELETE from web_group WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_delete );
            }
        }
        $sql_select = "SELECT number FROM linux_group;";
        $retval = mysqli_query($main_db,$sql_select);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            if($row['number']==$number){
                $sql_delete = "DELETE from linux_group WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_delete );
            }
        }
        $sql_select = "SELECT number FROM java_group;";
        $retval = mysqli_query($main_db,$sql_select);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            if($row['number']==$number){
                $sql_delete = "DELETE from java_group WHERE number='$number';";
                $step = mysqli_query( $main_db,$sql_delete );
            }
        }

        //删除用户头像
        $file = "../../userPicUpload/".$number.".png";
        $file_backup = "/home/userPicUpload_backup/".$number.".png";
        if(is_file($file)){
            unlink($file);
        }
        if(is_file($file_backup)){
            unlink($file_backup);
        }
        
        echo json_encode(array("message"=>"success"));
    }

    else if($request == "delete-group-member"){
        $number = $_POST['number'];
        $group = $_POST['group'];

        $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
        mysqli_query($main_db,"set names utf8");
        mysqli_select_db($main_db,"JLUIBMclub");
        $sql_delete = "DELETE from $group"."_group WHERE number='$number';";
        $step = mysqli_query( $main_db,$sql_delete );
        $sql_delete = "UPDATE member SET $group=0 WHERE number='$number';";
        $step = mysqli_query( $main_db,$sql_delete );
        echo json_encode(array("message"=>"success"));
    }

    else if($request == "add-group-member"){
        $number = $_POST['number'];
        $group = $_POST['group'];
        
        $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
        mysqli_query($main_db,"set names utf8");
        mysqli_select_db($main_db,"JLUIBMclub");
        
        $isIn = 0;
        $name = '';
        $sql_check = "SELECT name,number,$group FROM member where number='$number';";
        $check_result = mysqli_query($main_db,$sql_check);
        if(mysqli_num_rows($check_result) == 0){
            echo json_encode(array("message"=>"does_not_exist"));
        }
        else {
            while($row = mysqli_fetch_array($check_result,MYSQLI_ASSOC)){
                $name = $row['name'];
                if($row['number'] == $number && $row[$group] == 1){
                    $isIn = 1;
                    echo json_encode(array("message"=>"already_in"));
                }
            }
            if($isIn == 0){
                $sql_insert = "INSERT INTO $group"."_group(name,number)"."VALUES('$name','$number');";
                $retval = mysqli_query($main_db,$sql_insert);
                if($retval){
                    $sql_update = "UPDATE member SET $group=1 WHERE number='$number'";
                    $update = mysqli_query($main_db,$sql_update);
                    if($update){
                        echo json_encode(array("message"=>"success"));
                    }
                    else {
                        echo json_encode(array("message"=>"error"));
                    }
                }
                else {
                    echo json_encode(array("message"=>"error"));
                }
            }
        }
    }
?>