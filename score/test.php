<?php
    set_time_limit(0);
    session_start();
    $number = $_GET['number'];
    $password = $_GET['password'];
    $termId = $_GET['termId'];
    $termId = (int)$termId;
    function CheckId($number,$password){
        $cookie = "loginPage=userLogin.jsp; JSESSIONID=; alu=$number; alp=$password; ald=; PHPSESSID=".session_id();
        $HTTP_REQUEST_HEADER = array(
            "Host: cjcx.jlu.edu.cn",
            "Proxy-Connection: keep-alive",
            "Cookie: alu=$number; loginPage=userLogin.jsp; pwdStrength=1;PHPSESSID=".session_id(),
            "Pragma: no-cache",
            "Cache-Control: max-age=0",
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Origin: http://cjcx.jlu.edu.cn",
            "Upgrade-Insecure-Requests: 1",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36",
            "Content-Type: application/x-www-form-urlencoded",
            "Referer: http://cjcx.jlu.edu.cn/score/userLogin.php?reason=logout",
            "Accept-Encoding: gzip, deflate",
            "Accept-Language: zh-CN,zh;q=0.9"
        );

        $ch = curl_init();
        $url = "http://cjcx.jlu.edu.cn/score/action/security_check.php";  //此处修改为教务系统免验证码登陆页URL
        $post_data = "j_username=$number&j_password=$password";
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
        curl_setopt($ch, CURLOPT_NOBODY, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 120);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch,CURLOPT_ENCODING,'gzip');
        curl_setopt($ch,CURLOPT_FOLLOWLOCATION,1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $HTTP_REQUEST_HEADER);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($ch, CURLOPT_COOKIESESSION, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); 
        $rs = curl_exec($ch);
        $rs = mb_convert_encoding($rs, 'utf-8', 'GBK,UTF-8,ASCII');
        //抓取URL并把它传递给浏览器
        $httpCode = curl_getinfo($ch,CURLINFO_HTTP_CODE);
        //关闭cURL资源，并且释放系统资源
        curl_close($ch);
        if ($httpCode == 302) {
            return true;
        }else if ($httpCode == 200){
            return false;
        }
        return false;
    }

    CheckId($number,$password);

    function getInfo($number,$password,$termId){

        $HTTP_REQUEST_HEADER = array(
            "Host: cjcx.jlu.edu.cn",
            "Proxy-Connection: keep-alive",
            "Cookie:loginPage=userLogin.jsp; alu=$number; alp=$password; ald=; PHPSESSID=".session_id(),
            "Pragma: no-cache",
            "Cache-Control: max-age=0",
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Origin: http://cjcx.jlu.edu.cn",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36",
            "Content-Type: application/json",
            "Referer: http://cjcx.jlu.edu.cn/score/index.php",
            "Accept-Encoding: gzip, deflate",
            "Accept-Language: zh-CN,zh;q=0.9",
            "Accept: */*",
            "X-Requested-With: XMLHttpRequest",
            "Content-Length: 81"
        );
        
        $ch = curl_init();
        $url = "http://cjcx.jlu.edu.cn/score/action/service_res.php";  //此处修改为教务系统免验证码登陆页URL
        $data = array("tag"=>"lessonSelectResult@oldStudScore","params"=>array("xh"=>$number,"termId"=>$termId,"mousePath"=> "WDwABVAwAKVBQAYWEgApYGQA5ZHQBLaIABbbIwBsdKAB8fMACNhOgCdiQQCuiSQC/iTgDPiVQDgiWwDxiZQEAicQESifQEjihwEzijAFEikgFWimgFlhpQF2gqgGIgrAGXgrQITgsAIcguQItgxAI/gzAJPg0AJfg0gJxg1gKAg3gKRg5wKhC/gAM"));
        $data_string = json_encode($data);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
        curl_setopt($ch, CURLOPT_NOBODY, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 120);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch,CURLOPT_ENCODING,'gzip');
        curl_setopt($ch,CURLOPT_FOLLOWLOCATION,1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $HTTP_REQUEST_HEADER);
        curl_setopt($ch, CURLOPT_POSTFIELDS,$data_string);
        curl_setopt($ch, CURLOPT_COOKIESESSION, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); 
        curl_setopt($ch, CURLOPT_URL, 'http://cjcx.jlu.edu.cn/score/action/service_res.php');//登陆后要从哪个页面获取信息
        $rs = curl_exec($ch);
        echo ($rs);
        $rs = mb_convert_encoding($rs, 'utf-8', 'GBK,UTF-8,ASCII');
        //抓取URL并把它传递给浏览器
        $httpCode = curl_getinfo($ch,CURLINFO_HTTP_CODE);
        //关闭cURL资源，并且释放系统资源
        curl_close($ch);
    }
    getInfo($number,$password,$termId);  
?>