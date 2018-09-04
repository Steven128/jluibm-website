function getAdminNumber() {
    return (reason = localStorage.getItem("adminNumber"));
}
//获取活动列表
$.ajax({
    type: "POST",
    url: "../php/activity.php",
    dataType: "JSON",
    data: {
        request: "getList",
        adminNumber: getAdminNumber()
    },
    success: function(e) {
        var appendText_get = "";
        var subText_get = "";
        var activity_count = 0;
        while (e[activity_count]) {
            var activity_id = e[activity_count].activity_id;
            var activity_name = e[activity_count].activity_name;
            var setBy = e[activity_count].setBy;
            if (setBy == "cpp") {
                setBy = "C/C++组";
            } else if (setBy == "algorithm") {
                setBy = "算法组";
            } else if (setBy == "web") {
                setBy = "Web组";
            } else if (setBy == "linux") {
                setBy = "Linux组";
            } else if (setBy == "java") {
                setBy = "Java组";
            } else {
                setBy = "其他";
            }
            var place = e[activity_count].place;
            var time = e[activity_count].time.substring(0, 10);
            var state = e[activity_count].state;
            if (state == "inactive") {
                state = "未开始";
            } else if (state == "active") {
                state = "正在进行";
            } else if (state == "finished") {
                state = "已完成";
            }
            var activity_count_num = activity_count + 1;
            subText_get =
                "<tr><td class='count'>" +
                activity_count_num +
                "</td><td class='activity_name'><a class='displayActivity-button' href='#' value='" +
                activity_id +
                "'>" +
                activity_name +
                "</td><td class='setBy'>" +
                setBy +
                "</td><td class='time'>" +
                time +
                "</td><td class='state'>" +
                state +
                "</td>";
            appendText_get += subText_get;
            //活动未完成
            if (state == "未开始") {
                subText_get =
                    "<td><button class='update-activity update-img' value='" +
                    activity_id +
                    "'><img src='../src/icon/edit.png' width='16px' /></button></td>";
                appendText_get += subText_get;
            } else {
                subText_get = "<td></td>";
                appendText_get += subText_get;
            }
            activity_count++;
        }
        $(".activity-form").append(appendText_get);
    },
    error: function(e) {}
});
//创建活动
$("#create-Activity").validate({
    onsubmit: true, // 是否在提交是验证
    rules: {
        //规则
        name: {
            required: true
        },
        place: {
            required: true
        }
    },
    messages: {
        //验证错误信息

        name: {
            required: "请输入活动名称"
        },
        place: {
            required: "请输入活动地点"
        }
    },
    submitHandler: function(form) {
        //通过之后回调
        var name = $("#name").val();
        var place = $("#place").val();
        var year = $("#selYear").val();
        var month = $("#selMonth").val();
        var day = $("#selDay").val();
        var time = $("#selTime").val();
        var group = $("#group").val();
        var remarks = $("#remarks").val();
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }
        var holdTime = year + "/" + month + "/" + day + " " + time;
        $.ajax({
            type: "POST",
            url: "../php/activity.php",
            dataType: "JSON",
            data: {
                request: "createActivity",
                activity_name: name,
                setBy: group,
                place: place,
                time: holdTime,
                remarks: remarks,
                adminNumber: getAdminNumber()
            },
            success: function(res) {
                if (res.message == "success") {
                    $(".submit").attr("disabled", "disabled");
                    localStorage.setItem("reason", "update");
                    window.wxc.xcConfirm(
                        "新建活动成功！",
                        window.wxc.xcConfirm.typeEnum.success, {
                            onOk: function() {
                                window.location.href = "../admin/?back=activityList";
                            },
                            onClose: function() {
                                window.location.href = "../admin/?back=activityList";
                            }
                        }
                    );
                } else {
                    window.wxc.xcConfirm(
                        "出错啦，再试一次吧！",
                        window.wxc.xcConfirm.typeEnum.error
                    );
                }
            },
            error: function(err) {}
        });
    },
    invalidHandler: function(form, validator) {
        return false;
    }
});

//修改或删除活动
$(document).on("click", ".update-activity", function() {
    var activity_id = $(this).val();
    //获取此活动的信息
    $.ajax({
        type: "POST",
        url: "../php/activity.php",
        dataType: "JSON",
        data: {
            request: "getSingle",
            activity_id: activity_id,
            adminNumber: getAdminNumber()
        },
        success: function(e) {
            if (e.state != "inactive") {
                window.wxc.xcConfirm(
                    "只有还未举办的活动才可修改！",
                    window.wxc.xcConfirm.typeEnum.warning
                );
            } else {
                $("#updateActivity-text-outer").remove();
                var activity_id = e.activity_id;
                var activity_name = e.activity_name;
                var place = e.place;
                var appendText_get =
                    "<div id=\"updateActivity-text-outer\" class=\"text-outer col-xs-12\"><div class='activity-update text'><form id='activity-update-form' method='post'><input id='activity_id' type='text' class='activity_id' name='activity_id' value='" +
                    activity_id +
                    "' />";
                appendText_get +=
                    "<div class='section'><div class='section__title'>活动名称</div><div class='form-group'><input id='name' type='text' class='input-text form-control' name='name' placeholder='请输入活动名称' value='" +
                    activity_name +
                    "' /></div></div>";
                appendText_get +=
                    "<div class='section'><div class='section__title'>活动地点</div><div class='form-group'><input id='place' type='text' class='input-text form-control' name='place' placeholder='请输入活动地点' value='" +
                    place +
                    "' />";

                var setBy = e.setBy;
                if (setBy == "cpp") {
                    appendText_get +=
                        "<div class='section'><div class='section__title'>组别</div><select id='group' class='select form-control' name='group'><option class='option' value='cpp' select='selected'>C/C++组</option><option class='option' value='algorithm'>算法组</option><option class='option' value='web'>Web组</option><option class='option' value='linux'>Linux组</option><option class='option' value='java'>Java组</option><option class='option' value='other'>其他</option></select></div>";
                } else if (setBy == "algorithm") {
                    appendText_get +=
                        "<div class='section'><div class='section__title'>组别</div><select id='group' class='select form-control' name='group'><option class='option' value='cpp'>C/C++组</option><option class='option' value='algorithm' select='selected'>算法组</option><option class='option' value='web'>Web组</option><option class='option' value='linux'>Linux组</option><option class='option' value='java'>Java组</option><option class='option' value='other'>其他</option></select></div>";
                } else if (setBy == "web") {
                    appendText_get +=
                        "<div class='section'><div class='section__title'>组别</div><select id='group' class='select form-control' name='group'><option class='option' value='cpp'>C/C++组</option><option class='option' value='algorithm'>算法组</option><option class='option' value='web' select='selected'>Web组</option><option class='option' value='linux'>Linux组</option><option class='option' value='java'>Java组</option><option class='option' value='other'>其他</option></select></div>";
                } else if (setBy == "linux") {
                    appendText_get +=
                        "<div class='section'><div class='section__title'>组别</div><select id='group' class='select form-control' name='group'><option class='option' value='cpp'>C/C++组</option><option class='option' value='algorithm'>算法组</option><option class='option' value='web'>Web组</option><option class='option' value='linux' select='selected'>Linux组</option><option class='option' value='java'>Java组</option><option class='option' value='other'>其他</option></select></div>";
                } else if (setBy == "java") {
                    appendText_get +=
                        "<div class='section'><div class='section__title'>组别</div><select id='group' class='select form-control' name='group'><option class='option' value='cpp'>C/C++组</option><option class='option' value='algorithm'>算法组</option><option class='option' value='web'>Web组</option><option class='option' value='linux'>Linux组</option><option class='option' value='java' select='selected'>Java组</option><option class='option' value='other'>其他</option></select></div>";
                } else {
                    appendText_get +=
                        "<div class='section'><div class='section__title'>组别</div><select id='group' class='select form-control' name='group'><option class='option' value='cpp'>C/C++组</option><option class='option' value='algorithm'>算法组</option><option class='option' value='web'>Web组</option><option class='option' value='linux'>Linux组</option><option class='option' value='java'>Java组</option><option class='option' value='other' select='selected'>其他</option></select></div></div>";
                }

                var time = e.time;
                var year = time.substring(0, 4);
                var month = time.substring(5, 7);
                var day = time.substring(8, 10);
                var time = time.substring(11, 18);
                var state = e.state;
                if (state == "inactive") {
                    appendText_get +=
                        "<div class='section'><div class='section__title'>状态</div><div class='form-group'><input id='state' type='text' class='input-text form-control' name='place' value='未开始' disabled='disabled' /></div></div>";
                }
                //year,month,day
                appendText_get +=
                    "<div class='section'><div class='section__title'>举办时间</div><div class='select-time form-inline col-xs-12'><div class='select-date'><select id='selYear' class='form-control selYear'></select><span>年</span><select id='selMonth' class='form-control selMonth'></select><span>月</span><select id='selDay' class='form-control selDay'></select><span>日</span></div>";
                //time
                if (time == "morning") {
                    appendText_get +=
                        "<select id='selTime' class='form-control'><option class='option' value='morning' selected='selected'>上午</option><option class='option' value='afternoon'>下午</option><option class='option' value='evening'>晚上</option></select></div></div>";
                } else if (time == "afternoon") {
                    appendText_get +=
                        "<select id='selTime' class='form-control'><option class='option' value='morning'>上午</option><option class='option' value='afternoon' selected='selected'>下午</option><option class='option' value='evening'>晚上</option></select></div></div>";
                } else if (time == "evening") {
                    appendText_get +=
                        "<select id='selTime' class='form-control'><option class='option' value='morning'>上午</option><option class='option' value='afternoon'>下午</option><option class='option' value='evening' selected='selected'>晚上</option></select></div></div>";
                }
                appendText_get +=
                    "<script type='text/javascript'>var timeList = window.document.getElementById(\"updateActivity-tab\").children[1].children[0].children[0].children[2].children[1].children[3].children[1].children[0];var selYear = timeList.children[0];var selMonth = timeList.children[2];var selDay = timeList.children[4];var dateNow = new Date();new DateSelector(selYear, selMonth, selDay);</script></div>";
                var remarks = e.remarks;
                appendText_get +=
                    "<div class='section'><label><div class='section__title'>备注</div><textarea id='remarks' class='form-control' name='remarks' rows='5' placeholder='在此填写备注'>" +
                    remarks +
                    "</textarea></label></div><div class='btn-area'><button type='submit' class='submit'>确认修改</button><button id='delete-img' type='button' value='" +
                    activity_id +
                    "'>删除活动</button></div></form></div></div></div>";
                $("#updateActivity-tab").append(appendText_get);
                $("#activityList-tab").removeClass("box-active");
                $("#updateActivity-tab").addClass("box-active");
                $("#menu-activityList-item").removeClass("innerActive");
                $("#menu-updateActivity-item").addClass("innerActive");
            }
        },
        error: function(err) {}
    });
});

//修改活动-提交
$("#activity-update-form").validate({
    onsubmit: true, // 是否在提交是验证
    rules: {
        //规则
        name: {
            required: true
        },
        place: {
            required: true
        }
    },
    messages: {
        //验证错误信息

        name: {
            required: "请输入活动名称"
        },
        place: {
            required: "请输入活动地点"
        }
    },
    submitHandler: function(form) {
        //通过之后回调
        window.wxc.xcConfirm(
            "确认修改此活动？",
            window.wxc.xcConfirm.typeEnum.confirm, {
                onOk: function() {
                    alert("a");
                    var activity_id = $("#activity_id").val();
                    var name = $("#name").val();
                    var place = $("#place").val();
                    var year = $("#selYear").val();
                    var month = $("#selMonth").val();
                    var day = $("#selDay").val();
                    var time = $("#selTime").val();
                    var group = $("#group").val();
                    var remarks = $("#remarks").val();
                    if (month.length == 1) {
                        month = "0" + month;
                    }
                    if (day.length == 1) {
                        day = "0" + day;
                    }
                    var holdTime = year + "/" + month + "/" + day + " " + time;
                    $.ajax({
                        type: "POST",
                        url: "../php/activity.php",
                        dataType: "JSON",
                        data: {
                            request: "updateActivity",
                            activity_name: name,
                            setBy: group,
                            place: place,
                            time: holdTime,
                            remarks: remarks,
                            adminNumber: getAdminNumber()
                        },
                        success: function(res) {
                            if (res.message == "success") {
                                localStorage.setItem("reason", "update");
                                window.wxc.xcConfirm(
                                    "修改成功！",
                                    window.wxc.xcConfirm.typeEnum.success, {
                                        onOk: function() {
                                            window.location.href = "../admin/?back=activityList";
                                        },
                                        onClose: function() {
                                            window.location.href = "../admin/?back=activityList";
                                        }
                                    }
                                );
                            } else {
                                window.wxc.xcConfirm(
                                    "出错啦，再试一次吧！",
                                    window.wxc.xcConfirm.typeEnum.error
                                );
                            }
                        },
                        error: function(err) {
                            window.wxc.xcConfirm(
                                "出错啦，再试一次吧！",
                                window.wxc.xcConfirm.typeEnum.error
                            );
                        }
                    });
                }
            }
        );
    },
    invalidHandler: function(form, validator) {
        return false;
    }
});

//删除活动
$(document).on("click", "#deleteActivity-btn", function() {
    var activity_id = $(this).val();
    window.wxc.xcConfirm(
        "确定要删除此活动吗？",
        window.wxc.xcConfirm.typeEnum.confirm, {
            onOk: function() {
                $.ajax({
                    type: "POST",
                    url: "../php/activity.php",
                    dataType: "JSON",
                    data: {
                        request: "deleteActivity",
                        activity_id: activity_id,
                        adminNumber: getAdminNumber()
                    },
                    success: function(e) {
                        if (e.message == "success") {
                            localStorage.setItem("reason", "update");
                            window.wxc.xcConfirm(
                                "删除成功！",
                                window.wxc.xcConfirm.typeEnum.success, {
                                    onOk: function() {
                                        window.location.href = "../admin/?back=activityList";
                                    },
                                    onClose: function() {
                                        window.location.href = "../admin/?back=activityList";
                                    }
                                }
                            );
                        } else {
                            window.wxc.xcConfirm(
                                "出错啦！",
                                window.wxc.xcConfirm.typeEnum.error
                            );
                        }
                    },
                    error: function(err) {
                        window.wxc.xcConfirm(
                            "出错啦！",
                            window.wxc.xcConfirm.typeEnum.error
                        );
                    }
                });
            },
            onClose: function() {},
            onCancel: function() {}
        }
    );
});

//查看活动详情
$(document).on("click", ".displayActivity-button", function() {
    var activity_id = $(this).attr("value");
    //获取活动详情
    $.ajax({
        type: "POST",
        url: "../php/activity.php",
        dataType: "JSON",
        data: {
            request: "getSingle",
            activity_id: activity_id,
            adminNumber: getAdminNumber()
        },
        success: function(e) {
            $("#displayActivity-text-outer").remove();
            var activity_name = e.activity_name;
            var place = e.place;
            var appendText =
                '<div id="displayActivity-text-outer" class="text-outer"><div class="text"><div class="displayActivity-name"><h2>' +
                activity_name +
                '</h2></div><div class="displayActivity-inner"><h5>活动地点：' +
                place +
                "</h5>";
            var setBy = e.setBy;
            if (setBy == "cpp") {
                appendText += "<h5>组别：C/C++组</h5>";
            } else if (setBy == "algorithm") {
                appendText += "<h5>组别：算法组</h5>";
            } else if (setBy == "web") {
                appendText += "<h5>组别：Web组</h5>";
            } else if (setBy == "linux") {
                appendText += "<h5>组别：Linux组</h5>";
            } else if (setBy == "java") {
                appendText += "<h5>组别：Java组</h5>";
            } else {
                appendText += "<h5>组别：其他组</h5>";
            }
            var time = e.time;
            var year = time.substring(0, 4);
            var month = time.substring(5, 7);
            var day = time.substring(8, 10);
            var time = time.substring(11, 18);
            var state = e.state;
            //year,month,day
            appendText += "<h5>举办时间：" + year + "年" + month + "月" + day + "日";
            //time
            if (time == "morning") {
                appendText += "上午</h5>";
            } else if (time == "afternoon") {
                appendText += "下午</h5>";
            } else if (time == "evening") {
                appendText += "晚上</h5>";
            }
            var remarks = e.remarks;
            appendText += "<h5>备注：" + remarks + "</h5>";

            if (state == "inactive") {
                appendText += "<h5>活动状态：未开始</h5></div><div class='delete-btn-area'><button id='deleteActivity-btn' value='" + e.activity_id + "'>删除活动</button></div></div>";
            } else if (state == "active") {
                appendText += "<h5>活动状态：正在进行</h5></div></div>";
            } else if (state == "finished") {
                appendText +=
                    '<h5>活动状态：已完成</h5><button id="start-raffle" value="' +
                    e.activity_id +
                    '">开始抽奖</button></div></div>';
                //已完成签到的活动，获取签到列表
                getSignedList(e.activity_id);
            }
            $("#displayActivity-tab").append(appendText);
            $("#activityList-tab").removeClass("box-active");
            $("#displayActivity-tab").addClass("box-active");
            $("#menu-activityList-item").removeClass("innerActive");
            $("#menu-displayActivity-item").addClass("innerActive");
        },
        error: function(err) {}
    });

    function getSignedList(activity_id) {
        $.ajax({
            type: "POST",
            url: "../php/activity.php",
            dataType: "JSON",
            data: {
                request: "getSignedList",
                activity_id: activity_id,
                adminNumber: getAdminNumber()
            },
            success: function(e) {
                var i = 0;
                var appendText_list =
                    '<hr><div class="signed-list"><h4>签到情况</h4><div class="signed-list-inner"><table class=" tablesorter"><thead><tr><th>序号</th><th>姓名</th><th>学院/专业</th><th>年级</th><th>性别</th><th>签到地点</th><th>签到时间</th></tr></thead><tbody>';
                while (e[i]) {
                    var j = i + 1;
                    var name = e[i].name;
                    var college = e[i].college;
                    var major = e[i].major;
                    var grade = e[i].grade;
                    var gender = e[i].gender;
                    var distance = e[i].distance;
                    var time = e[i].submitTime;
                    if (gender == "0") {
                        gender = "男";
                    } else if (gender == "1") {
                        gender = "女";
                    } else {
                        gender = undefined;
                    }
                    if (grade == "1") {
                        grade = "大一";
                    } else if (grade == "2") {
                        grade = "大二";
                    } else if (grade == "3") {
                        grade = "大三";
                    } else if (grade == "4") {
                        grade = "大四";
                    } else {
                        grade = undefined;
                    }
                    appendText_list +=
                        "<tr><td>" +
                        j +
                        "</td><td>" +
                        name +
                        "</td><td>" +
                        college +
                        "&nbsp;&nbsp;" +
                        major +
                        "</td><td>" +
                        grade +
                        "</td><td>" +
                        gender +
                        "</td><td>" +
                        distance +
                        "米</td><td>" +
                        time +
                        "</td></tr>";
                    i++;
                }
                appendText_list += "</tbody></table><div></div>";
                $(".displayActivity-inner").after(appendText_list);
            },
            error: function(err) {}
        });
    }
});
//跳到抽奖页面
$(document).on("click", "#start-raffle", function() {
    var activity_id = $(this).val();
    var href = escape("activity_id=" + activity_id);
    window.open("raffle.html?" + href);
});