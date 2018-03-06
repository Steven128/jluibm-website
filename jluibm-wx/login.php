<?php
    $lifeTime = 7 * 24 * 3600;   
    session_set_cookie_params($lifeTime);
    session_start();
    if(isset($_SESSION['userNumber'])){
        $arr = array("用户"=>$_SESSION['userName'],"学号"=>$_SESSION['userNumber']);
        echo json_encode($_SESSION['userNumber']); 
    }
    else{
        $number = urldecode($_POST['number']);
        $password = urldecode($_POST['password']);

        $main_db = mysqli_connect("127.0.0.1","root","JLUIBMclub123") or die ("failed!");
        mysqli_query($main_db,"set names utf8");
        mysqli_select_db($main_db,"JLUIBMclub");

        $exist = 0;
        $check = 0;
        $sql_compare = "SELECT number,password,name,isManager from member;";
        $retval = mysqli_query($main_db,$sql_compare);
        while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
            if( $row['number']==$number ){
                $exist = 1;
                if( $row['password']==$password ){
                    $check = 1;
                    $_SESSION['userName'] = $row['name'];
                    $_SESSION['userNumber'] = $row['number'];
                    echo json_encode(array("message"=>"success","PHPSESSID"=>session_id(),"number"=>$_SESSION['userNumber']));
                    break;
                }
                break;
            }
        }   
        if( $exist == 0 ) {
            unset($_SESSION);
            session_destroy();
            echo json_encode(array("message"=>"does_not_exist"));
        }
        else if( $exist == 1 && $check == 0 ) {
            unset($_SESSION);
            session_destroy();
            echo json_encode(array("message"=>"wrong passwd"));
        }
    }
?>