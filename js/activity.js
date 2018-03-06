$(document).ready(function() {
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
                number = e.number;
                if (e.isManager == "0") {
                    window.wxc.xcConfirm("你不是管理员，没有管理权限！", window.wxc.xcConfirm.typeEnum.error, {
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
                    //获取活动列表
                    $.ajax({
                        type: "POST",
                        url: "../php/activity.php",
                        dataType: "JSON",
                        data: {
                            "request": "getList"
                        },
                        success: function(e) {
                            var appendText_get = "";
                            var subText_get = "";
                            var activity_count = 0;
                            while (e[activity_count]) {
                                var activity_id = e[activity_count].activity_id;
                                var activity_name = e[activity_count].activity_name;
                                var setBy = e[activity_count].setBy;
                                if (setBy == 'cpp') {
                                    setBy = 'C/C++组';
                                } else if (setBy == 'algorithm') {
                                    setBy = '算法组';
                                } else if (setBy == 'web') {
                                    setBy = 'Web组';
                                } else if (setBy == 'linux') {
                                    setBy = 'Linux组';
                                } else if (setBy == 'java') {
                                    setBy = 'Java组';
                                } else {
                                    setBy = '其他';
                                }
                                var place = e[activity_count].place;
                                var time = (e[activity_count].time).substring(0, 10);
                                var state = e[activity_count].state;
                                if (state == 'inactive') {
                                    state = '未开始';
                                } else if (state == 'active') {
                                    state = '正在进行';
                                } else if (state == 'finished') {
                                    state = '已完成';
                                }
                                var activity_count_num = activity_count + 1;
                                subText_get = "<tr><td class='count'>" + activity_count_num + "</td><td class='activity_name'>" + activity_name + "</td><td class='setBy'>" + setBy + "</td><td class='time'>" + time + "</td><td class='state'>" + state + "</td>";
                                appendText_get += subText_get;
                                //如果活动未完成。添加编辑图标
                                if (state == "未开始") {
                                    subText_get = "<td><button class='update-activity update-img' value='" + activity_id + "'><img src='../src/icon/edit.png' width='16px' /></button>";
                                    appendText_get += subText_get;
                                }
                                //如果进行中或已完成，添加删除图标
                                else {
                                    subText_get = "<td><button class='delete-img' value='" + activity_id + "'><img src='../src/icon/drop.png' width='16px' /></button>";
                                    appendText_get += subText_get;
                                }

                                //添加查看图标
                                subText_get = "<button class='display-activity display-img' value='" + activity_id + "'><img src='../src/icon/display.png' width='16px' /></button></td>";
                                appendText_get += subText_get;
                                activity_count++;
                            }
                            $(".activity-form").append(appendText_get);
                            $("#activity-statistics").append("<h5>当前共有活动" + activity_count + "个</h5>");
                        },
                        error: function(e) {
                            $("#activity-statistics").append("<h5>当前共有活动" + 0 + "个</h5>");
                        }
                    });
                }
            }
        }
    });
    //创建活动
    $("#create-Activity").validate({
        onsubmit: true, // 是否在提交是验证
        rules: { //规则
            name: {
                required: true,
            },
            place: {
                required: true
            },
        },
        messages: { //验证错误信息

            name: {
                required: "请输入活动名称"
            },
            place: {
                required: "请输入活动地点"
            },
        },
        submitHandler: function(form) { //通过之后回调
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
                    "request": "createActivity",
                    "activity_name": name,
                    "setBy": group,
                    "place": place,
                    "time": holdTime,
                    "remarks": remarks
                },
                success: function(res) {
                    if (res.message == "success") {
                        $(".submit").attr("disabled", "disabled");
                        window.wxc.xcConfirm("新建活动成功！", window.wxc.xcConfirm.typeEnum.success);
                    } else {
                        window.wxc.xcConfirm("出错啦，再试一次吧！", window.wxc.xcConfirm.typeEnum.error);
                    }
                },
                error: function(err) {

                }
            });
        },
        invalidHandler: function(form, validator) {
            return false;
        }
    });
    //修改活动-提交
    $("#activity-update-form").validate({
        onsubmit: true, // 是否在提交是验证
        rules: { //规则
            name: {
                required: true,
            },
            place: {
                required: true
            },
        },
        messages: { //验证错误信息

            name: {
                required: "请输入活动名称"
            },
            place: {
                required: "请输入活动地点"
            },
        },
        submitHandler: function(form) { //通过之后回调
            window.wxc.xcConfirm("确认修改？", window.wxc.xcConfirm.typeEnum.confirm, {
                onOk: function() {
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
                            "request": "updateActivity",
                            "activity_name": name,
                            "setBy": group,
                            "place": place,
                            "time": holdTime,
                            "remarks": remarks
                        },
                        success: function(res) {
                            if (res.message == "success") {
                                window.wxc.xcConfirm("修改成功！", window.wxc.xcConfirm.typeEnum.success, {
                                    onOk: function() {
                                        window.location.reload();
                                    },
                                    onClose: function() {
                                        window.location.reload();
                                    }
                                });

                            } else {
                                window.wxc.xcConfirm("出错啦，再试一次吧！", window.wxc.xcConfirm.typeEnum.error);
                            }
                        },
                        error: function(err) {
                            window.wxc.xcConfirm("出错啦，再试一次吧！", window.wxc.xcConfirm.typeEnum.error);
                        }
                    });
                }
            });

        },
        invalidHandler: function(form, validator) {
            return false;
        }
    });


});

$(document).on("click", "#createActivity", function() {
    window.open("create-activity.html");
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
            "request": "getSingle",
            "activity_id": activity_id,
        },
        success: function(e) {

            if (e.state != 'inactive') {
                window.wxc.xcConfirm("只有还未举办的活动才可修改！", window.wxc.xcConfirm.typeEnum.warning);
            } else {
                $(".activity-update").remove();
                var activity_id = e.activity_id;
                var activity_name = e.activity_name;
                var place = e.place;
                var appendText_get = "<div class='activity-update text'><h4 class='activity-title'>活动信息修改</h4><button class='close'><img src='../src/icon/close.png' width='32px' /></button><form id='activity-update-form' method='post'><input id='activity_id' type='text' class='activity_id' name='activity_id' value='" + activity_id + "' />";
                appendText_get += "<div class='section'><div class='section__title'>活动名称</div><div class='form-group'><input id='name' type='text' class='input-text form-control' name='name' placeholder='请输入活动名称' value='" + activity_name + "' /></div></div>";
                appendText_get += "<div class='section'><div class='section__title'>活动地点</div><div class='form-group'><input id='place' type='text' class='input-text form-control' name='place' placeholder='请输入活动地点' value='" + place + "' /></div></div>";

                var setBy = e.setBy;
                if (setBy == 'cpp') {
                    appendText_get += "<div class='section'><div class='section__title'>组别</div><select id='group' class='select form-control' name='group'><option class='option' value='cpp' select='selected'>C/C++组</option><option class='option' value='algorithm'>算法组</option><option class='option' value='web'>Web组</option><option class='option' value='linux'>Linux组</option><option class='option' value='java'>Java组</option><option class='option' value='other'>其他</option></select></div>";
                } else if (setBy == 'algorithm') {
                    appendText_get += "<div class='section'><div class='section__title'>组别</div><select id='group' class='select form-control' name='group'><option class='option' value='cpp'>C/C++组</option><option class='option' value='algorithm' select='selected'>算法组</option><option class='option' value='web'>Web组</option><option class='option' value='linux'>Linux组</option><option class='option' value='java'>Java组</option><option class='option' value='other'>其他</option></select></div>";
                } else if (setBy == 'web') {
                    appendText_get += "<div class='section'><div class='section__title'>组别</div><select id='group' class='select form-control' name='group'><option class='option' value='cpp'>C/C++组</option><option class='option' value='algorithm'>算法组</option><option class='option' value='web' select='selected'>Web组</option><option class='option' value='linux'>Linux组</option><option class='option' value='java'>Java组</option><option class='option' value='other'>其他</option></select></div>";
                } else if (setBy == 'linux') {
                    appendText_get += "<div class='section'><div class='section__title'>组别</div><select id='group' class='select form-control' name='group'><option class='option' value='cpp'>C/C++组</option><option class='option' value='algorithm'>算法组</option><option class='option' value='web'>Web组</option><option class='option' value='linux' select='selected'>Linux组</option><option class='option' value='java'>Java组</option><option class='option' value='other'>其他</option></select></div>";
                } else if (setBy == 'java') {
                    appendText_get += "<div class='section'><div class='section__title'>组别</div><select id='group' class='select form-control' name='group'><option class='option' value='cpp'>C/C++组</option><option class='option' value='algorithm'>算法组</option><option class='option' value='web'>Web组</option><option class='option' value='linux'>Linux组</option><option class='option' value='java' select='selected'>Java组</option><option class='option' value='other'>其他</option></select></div>";
                } else {
                    appendText_get += "<div class='section'><div class='section__title'>组别</div><select id='group' class='select form-control' name='group'><option class='option' value='cpp'>C/C++组</option><option class='option' value='algorithm'>算法组</option><option class='option' value='web'>Web组</option><option class='option' value='linux'>Linux组</option><option class='option' value='java'>Java组</option><option class='option' value='other' select='selected'>其他</option></select></div>";
                }

                var time = (e.time);
                var year = time.substring(0, 4);
                var month = time.substring(5, 7);
                var day = time.substring(8, 10);
                var time = time.substring(11, 18);
                var state = e.state;
                if (state == 'inactive') {
                    appendText_get += "<div class='section'><div class='section__title'>状态</div><div class='form-group'><input id='state' type='text' class='input-text form-control' name='place' value='未开始' disabled='disabled' /></div></div>";
                }
                //year,month,day
                appendText_get += "<div class='section'><div class='section__title'>举办时间</div><div class='select-time form-inline col-xs-12'><div class='select-date'><select id='selYear' class='form-control'></select><span>年</span><select id='selMonth' class='form-control'></select><span>月</span><select id='selDay' class='form-control'></select><span>日</span></div>";
                //time
                if (time == 'morning') {
                    appendText_get += "<select id='selTime' class='form-control'><option class='option' value='morning' selected='selected'>上午</option><option class='option' value='afternoon'>下午</option><option class='option' value='evening'>晚上</option></select></div></div>";
                } else if (time == 'afternoon') {
                    appendText_get += "<select id='selTime' class='form-control'><option class='option' value='morning'>上午</option><option class='option' value='afternoon' selected='selected'>下午</option><option class='option' value='evening'>晚上</option></select></div></div>";
                } else if (time == 'evening') {
                    appendText_get += "<select id='selTime' class='form-control'><option class='option' value='morning'>上午</option><option class='option' value='afternoon'>下午</option><option class='option' value='evening' selected='selected'>晚上</option></select></div></div>";
                }
                appendText_get += "<script type='text/javascript'>var selYear = window.document.getElementById('selYear');var selMonth = window.document.getElementById('selMonth');var selDay = window.document.getElementById('selDay');var dateNow = new Date();new DateSelector(selYear, selMonth, selDay);</script></div>";
                var remarks = e.remarks;
                appendText_get += "<div class='section'><label><div class='section__title'>备注</div><textarea id='remarks' class='form-control' name='remarks' rows='5' placeholder='在此填写备注'>" + remarks + "</textarea></label></div><div class='btn-area'><button type='submit' class='submit'>确认修改</button><button id='delete-img' type='button' value='" + activity_id + "'>删除活动</button></div></form></div></div>";
                $(".activity-info").append(appendText_get);
                $("#selYear option[value='" + year + "']").attr("selected", "selected");
                $('#selYear').attr("disabled", "disabled");
                $("#selMonth option[value='" + month + "']").attr("selected", "selected");
                $("#selDay option[value='" + day + "']").attr("selected", "selected");
                $(".activity-box").css("display", "none");
                $(".activity-info").css("display", "block");
            }
        },
        error: function(err) {

        }
    });
});

$(document).on("click", ".display-activity", function() {
    var activity_id = $(this).val();
    window.open("sign.html?" + escape("activity_id=" + activity_id));
});

$(document).on("click", ".close", function() {
    $(".activity-box").css("display", "block");
    $(".activity-info").css("display", "none");
    $(".activity-update").remove();
});

//删除活动
$(document).on("click", ".delete-img", function() {
    var activity_id = $(this).val();
    window.wxc.xcConfirm("确定要删除此活动吗？", window.wxc.xcConfirm.typeEnum.confirm, {
        onOk: function() {
            $.ajax({
                type: "POST",
                url: "../php/activity.php",
                dataType: "JSON",
                data: {
                    "request": "deleteActivity",
                    "activity_id": activity_id,
                },
                success: function(e) {
                    if (e.message == "success") {
                        window.wxc.xcConfirm("删除成功！", window.wxc.xcConfirm.typeEnum.success, {
                            onOk: function() {
                                window.location.reload();
                            },
                            onClose: function() {
                                window.location.reload();
                            }
                        });
                        $(".display-box").css("display", "none");
                        $(".update-box").css("display", "none");
                        $(".activity-box").css("display", "block");
                        $(".title").css("display", "block");
                        $(".bar-item").css("background-color", "#435770");
                        $("#activity-item").css("background-color", "rgba(87, 110, 136, 0.85)");
                        $(".cpp-box").css("display", "none");
                        $(".algorithm-box").css("display", "none");
                        $(".web-box").css("display", "none");
                        $(".linux-box").css("display", "none");
                        $(".java-box").css("display", "none");
                    } else {
                        window.wxc.xcConfirm("出错啦！", window.wxc.xcConfirm.typeEnum.error);
                    }
                },
                error: function(err) {

                    window.wxc.xcConfirm("出错啦！", window.wxc.xcConfirm.typeEnum.error);

                }
            });
        },
        onClose: function() {

        },
        onCancel: function() {

        }
    });
});
$(document).on("click", "#delete-img", function() {
    var activity_id = $(this).val();
    window.wxc.xcConfirm("确定要删除此活动吗？", window.wxc.xcConfirm.typeEnum.confirm, {
        onOk: function() {
            $.ajax({
                type: "POST",
                url: "../php/activity.php",
                dataType: "JSON",
                data: {
                    "request": "deleteActivity",
                    "activity_id": activity_id,
                },
                success: function(e) {
                    if (e.message == "success") {
                        window.wxc.xcConfirm("删除成功！", window.wxc.xcConfirm.typeEnum.success, {
                            onOk: function() {
                                window.location.reload();
                            },
                            onClose: function() {
                                window.location.reload();
                            }
                        });
                        $(".display-box").css("display", "none");
                        $(".update-box").css("display", "none");
                        $(".activity-box").css("display", "block");
                        $(".title").css("display", "block");
                        $(".bar-item").css("background-color", "#435770");
                        $("#activity-item").css("background-color", "rgba(87, 110, 136, 0.85)");
                        $(".cpp-box").css("display", "none");
                        $(".algorithm-box").css("display", "none");
                        $(".web-box").css("display", "none");
                        $(".linux-box").css("display", "none");
                        $(".java-box").css("display", "none");
                    } else {
                        window.wxc.xcConfirm("出错啦！", window.wxc.xcConfirm.typeEnum.error);
                    }
                },
                error: function(err) {

                    window.wxc.xcConfirm("出错啦！", window.wxc.xcConfirm.typeEnum.error);
                }
            });
        },
        onClose: function() {

        },
        onCancel: function() {

        }
    });
});