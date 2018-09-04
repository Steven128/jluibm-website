<?php

function getIndex()
{
    $HTTP_REQUEST_HEADER = array(
        "Host: oa.jlu.edu.cn",
        "Pragma: no-cache",
        "Cache-Control: no-store",
        "Cookie: userIp=49.140.97.141; route=21758f3f3a8996770c761231c7d46456; LocLan=zh_CN",
        "Accept: image/webp,image/apng,image/*,*/*;q=0.8",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36",
        "Content-Type: text/html;charset=UTF-8",
        "Referer: https://oa.jlu.edu.cn/defaultroot/login.jsp",
        "Accept-Encoding: gzip",
        "Accept-Language: zh-CN,zh;q=0.9",
        "X-Requested-With: XMLHttpRequest",
    );

    $ch = curl_init();
    $url = "https://oa.jlu.edu.cn/defaultroot/login.jsp";
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 120);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_ENCODING, 'gzip');
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    // curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $HTTP_REQUEST_HEADER);
    // curl_setopt($ch, CURLOPT_POSTFIELDS,$data_string);
    curl_setopt($ch, CURLOPT_COOKIESESSION, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_URL, 'https://oa.jlu.edu.cn/defaultroot/login.jsp'); //登陆后要从哪个页面获取信息
    $rs = curl_exec($ch);
    echo ($rs);
    $rs = mb_convert_encoding($rs, 'utf-8', 'GBK,UTF-8,ASCII');
    //抓取URL并把它传递给浏览器
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    //关闭cURL资源，并且释放系统资源
    curl_close($ch);
}
