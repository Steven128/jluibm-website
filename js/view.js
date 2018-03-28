$(document).ready(function() {
    var appendText_user = '';
    var appendText_update = '';

    function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    var num = GetRandomNum(10000, 99999);
    //打开页面时检查是否已经登录且是否有管理权限
    $.ajax({
        type: "POST",
        url: "../php/check_login.php",
        dataType: "JSON",
        data: {
            "request": "getNumber"
        },
        success: function(e) {
            if (e.number == '' || e.number == null) {
                window.location.href = "../";
                window.event.returnValue = false;
            } else {
                userNumber = e.number;
                if (e.isManager == "0") {
                    window.wxc.xcConfirm("你不是管理员！", window.wxc.xcConfirm.typeEnum.error, {
                        onOk: function() {
                            window.location.href = "../user/";
                            window.event.returnValue = false;
                        },
                        onClose: function() {
                            window.location.href = "../user/";
                            window.event.returnValue = false;
                        }
                    });

                } else {
                    //获取该社员的详细信息
                    $.ajax({
                        type: "GET",
                        url: "../php/user-info.php?request=get_info&number=" + stu_number,
                        dataType: "JSON",
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
                            appendText_user = "<div class='userName'><h3>" + e[0].name + "</h3></div>";
                            $(".userPic-box").append(appendText_user);
                            appendText_user = "<div class='info-box'><h4>基本信息</h4><div class='box-inner'><div class='inner-text'>学号：" + e[0].number + "</div>";
                            appendText_user += "<div class='inner-text'>学院：" + e[0].college + "</div>";
                            appendText_user += "<div class='inner-text'>专业：" + e[0].major + "</div>";
                            appendText_user += "<div class='inner-text'>性别：" + gender + "</div>";
                            appendText_user += "<div class='inner-text'>年级：" + grade + "</div></div></div>";
                            $(".user-text").append(appendText_user);
                            appendText_user = '<div class="group-box"><h4>加入的组</h4><div class="box-inner"><div class="group-box-inner">';
                            if (e[1].cpp == 0 && e[1].algorithm == 0 && e[1].web == 0 && e[1].linux == 0 && e[1].java == 0) {
                                appendText_user += '<div class="inner-text">这里空空如也，什么都没有。</div>';
                            } else {
                                if (e[1].cpp == 1) {
                                    appendText_user += '<div class="inner-text">C/C++组</div>';
                                }
                                if (e[1].algorithm == 1) {
                                    appendText_user += '<div class="inner-text">算法组</div>';
                                }
                                if (e[1].web == 1) {
                                    appendText_user += '<div class="inner-text">Web组</div>';
                                }
                                if (e[1].linux == 1) {
                                    appendText_user += '<div class="inner-text">Linux组</div>';
                                }
                                if (e[1].java == 1) {
                                    appendText_user += '<div class="inner-text">Java组</div>';
                                }
                            }
                            appendText_user += '</div></div></div>';
                            $(".user-group").append(appendText_user);
                            appendText_user = '<div class="activities-box"><h4>参加过的活动</h4><div class="box-inner activity-inner">';
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
                            $(".stuPic").attr('src', e[0].userPicPath + "?" + num);

                            //获取参加过的活动
                            $.ajax({
                                type: "GET",
                                url: "../php/user-info.php?request=get_activity&number=" + stu_number,
                                dataType: "JSON",
                                success: function(e) {
                                    if (e == '') {
                                        appendText_activity = '<div class="inner-text">这里空空如也，什么都没有。</div>';
                                    } else {
                                        var i = 0;
                                        appendText_activity = '<table><tbody>';
                                        while (e[i]) {
                                            appendText_activity += '<tr class="inner-text"><td>' + e[i].activity_name + '</td><td>' + e[i].time.substring(0, 10) + '</td></tr>';
                                            i++;
                                        }
                                        appendText_activity += '</tbody></table>';
                                    }
                                    $(".activity-inner").append(appendText_activity);
                                },
                                error: function(err) {

                                }
                            })
                        },
                        error: function(err) {

                        }
                    });
                }
            }
        },
        error: function(err) {

        }
    });
});