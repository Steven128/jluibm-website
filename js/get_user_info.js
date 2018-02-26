var number = '';
var appendText_user = '';
var appendText_update = '';
$(document).ready(function() {
    function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    var num = GetRandomNum(10000, 99999);
    //检查用户是否已经登录
    $.ajax({
        type: "POST",
        url: "../php/check_login.php",
        dataType: "JSON",
        data: {
            "request": "getNumber"
        },
        success: function(e) {
            if (e.number == '' || e.number == null) {

                if (!getReferer()) {
                    goTo('?x=3&r=' + GetRandomNum(10000, 99999));
                } else {
                    var pre = "jluibm.cn/";
                    if (getReferer().indexOf(pre) < 0) {
                        window.location.href = "../";
                        window.event.returnValue = false;
                    } else {
                        var txt = "请先登录才能进行操作！";
                        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error, {
                            onOk: function() {
                                window.location.href = "../login/";
                                window.event.returnValue = false;
                            },
                            onClose: function() {
                                window.location.href = "../login/";
                                window.event.returnValue = false;
                            }
                        });
                    }
                }
            } else {
                number = e.number;
                $.ajax({
                    type: "GET",
                    url: "../php/user-info.php",
                    dataType: "JSON",
                    data: {
                        "number": number
                    },
                    success: function(e) {

                        var gender = '';
                        if (e[0].gender == 'male') {
                            gender = '男';
                        } else {
                            gender = '女';
                        }
                        var grade = '';
                        if (e[0].grade == '1') {
                            grade = '大一';
                        } else if (e[0].grade == '2') {
                            grade = '大二';
                        } else if (e[0].grade == '3') {
                            grade = '大三';
                        } else {
                            grade = '大四';
                        }
                        appendText_user = "<div class='userName'><h3>" + e[0].name + "</h3></div><button id='logout-xs' type='button' class='submit logout'>退出登录</button><div class='clear'></div>";
                        $(".userPic-box").append(appendText_user);
                        appendText_user = "<div class='info-box'><h4>我的基本信息</h4><div class='box-inner'><h5>学号：" + e[0].number + "</h5>";
                        appendText_user += "<h5>学院：" + e[0].college + "</h5>";
                        appendText_user += "<h5>专业：" + e[0].major + "</h5>";
                        appendText_user += "<h5>性别：" + gender + "</h5>";
                        appendText_user += "<h5>年级：" + grade + "</h5></div></div>";
                        $(".user-text").append(appendText_user);
                        appendText_user = '<div class="group-box"><h4>我加入的组</h4><div class="box-inner"><div class="group-box-inner">';
                        if (e[1].cpp == 0 && e[1].algorithm == 0 && e[1].web == 0 && e[1].linux == 0 && e[1].java == 0) {
                            appendText_user += '<h5>这里空空如也，什么都没有。</h5>';
                        } else {
                            if (e[1].cpp == 1) {
                                appendText_user += '<h5>C/C++组</h5>';
                            }
                            if (e[1].algorithm == 1) {
                                appendText_user += '<h5>算法组</h5>';
                            }
                            if (e[1].web == 1) {
                                appendText_user += '<h5>Web组</h5>';
                            }
                            if (e[1].linux == 1) {
                                appendText_user += '<h5>Linux组</h5>';
                            }
                            if (e[1].java == 1) {
                                appendText_user += '<h5>Java组</h5>';
                            }
                        }
                        appendText_user += '</div></div></div>';
                        $(".user-group").append(appendText_user);
                        appendText_user = '<div class="activities-box"><h4>我参加过的活动</h4><div class="box-inner">';
                        if (e[2] == '') {
                            appendText_user += '<h5>这里空空如也，什么都没有。</h5>';
                        } else {

                        }
                        appendText_user += '</div></div>';
                        $(".user-activities").append(appendText_user);
                        //
                        var subText_update = "";
                        subText_update = "<div class='group'><div class='section'><div class='section__title'>QQ&nbsp;</div><div class='form-group'><input id='qq' type='text' class='input-text form-control' name='qq' value='" + e[0].qq + "' /></div></div>";
                        appendText_update += subText_update;
                        subText_update = "<div class='section'><div class='section__title'>电话</div><div class='form-group'><input id='phone' type='text' class='input-text form-control' name='phone' value='" + e[0].phone + "' /></div></div></div>";
                        appendText_update += subText_update;
                        subText_update = "<div class='btn-area'><button id='user-update' type='submit' class='submit'>确认修改</button></div>"
                        appendText_update += subText_update;
                        $("#update-form").append(appendText_update);
                        if (e[0].isManager != 1) {

                            $(".manager-item").remove();
                        }
                        $(".userPic").attr('src', e[0].userPicPath + "?" + num);

                    },
                    error: function(err) {

                    }
                });
            }
        },
        error: function(err) {

        }
    });
});