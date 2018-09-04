<?php
@header("content-type:text/html;charset=utf8");
session_start();
$request = $_GET['request'];
$adminNumber = $_GET['adminNumber'];
$number = $adminNumber;
if (isset($_SESSION['userNumber']) && $_SESSION['userNumber'] == $adminNumber) {
    if ($request == "group") {
        $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
        mysqli_query($main_db, "set names utf8");
        mysqli_select_db($main_db, "JLUIBMclub");

        function checkLeader($group, $main_db, $number, $data)
        {
            $sql_select = "SELECT isLeader from $group" . "_group WHERE number='$number';";
            $retval = mysqli_query($main_db, $sql_select);
            while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
                if ($row['isLeader'] == 1) {
                    array_push($data, $group);
                }
            }
            return $data;
        }
        $data = array();
        $data += checkLeader("cpp", $main_db, $number, $data);
        $data += checkLeader("algorithm", $main_db, $number, $data);
        $data += checkLeader("web", $main_db, $number, $data);
        $data += checkLeader("linux", $main_db, $number, $data);
        $data += checkLeader("java", $main_db, $number, $data);
        echo json_encode($data);
    } else if ($request == "info") {
        //是该组管理员的话在 member表 中获取该组成员详细信息
        function get_group_info($group, $main_db, $number, $data)
        {
            $sql_select_group = "SELECT isLeader,number from $group" . "_group WHERE number = $number;";
            $retval_group = mysqli_query($main_db, $sql_select_group);
            while ($row_group = mysqli_fetch_array($retval_group, MYSQLI_ASSOC)) {
                if ($number == $row_group['number'] && $row_group['isLeader'] == 1) {
                    $sql_select_group = "SELECT isLeader,member.number,name,college,major,gender,grade,qq,phone from member,$group" . "_group WHERE member.number=$group" . "_group.number ORDER BY isManager DESC,grade DESC,number ASC,gender ASC;";
                    $retval_single = mysqli_query($main_db, $sql_select_group);

                    while ($row_single = mysqli_fetch_array($retval_single, MYSQLI_ASSOC)) {
                        $info_isLeader = $row_single['isLeader'];
                        $info_name = $row_single['name'];
                        $info_number = $row_single['number'];
                        $info_college = $row_single['college'];
                        $info_major = $row_single['major'];
                        $info_gender = $row_single['gender'];
                        $info_grade = $row_single['grade'];
                        $info_qq = $row_single['qq'];
                        $info_phone = $row_single['phone'];
                        $arr = array("group" => $group, "isLeader" => $info_isLeader, "name" => $info_name, "number" => $info_number, "college" => $info_college, "major" => $info_major, "gender" => $info_gender, "grade" => $info_grade, "qq" => $info_qq, "phone" => $info_phone);
                        array_push($data, $arr);
                    }
                }
                return $data;
            }
        }

        $main_db = mysqli_connect("127.0.0.1", "root", "JLUIBMclub123") or die("failed!");
        mysqli_query($main_db, "set names utf8");
        mysqli_select_db($main_db, "JLUIBMclub");

        $data = array();
        $data += get_group_info("cpp", $main_db, $number, $data);
        $data += get_group_info("algorithm", $main_db, $number, $data);
        $data += get_group_info("web", $main_db, $number, $data);
        $data += get_group_info("linux", $main_db, $number, $data);
        $data += get_group_info("java", $main_db, $number, $data);
        echo json_encode($data);
    }
}
