var stu_list;
var totalStu = 0;
$(document).ready(function() {
    var href = unescape(window.location.search);
    var activity_id = href.match(/\?activity_id=(.*?)$/)[1];
    //获取活动详情
    $.ajax({
        type: "POST",
        url: "../php/activity.php",
        dataType: "JSON",
        data: {
            request: "getSingle",
            activity_id: activity_id
        },
        success: function(e) {
            $("#displayActivity-text-outer").remove();
            var activity_name = e.activity_name;
            var place = e.place;
            var appendText =
                '<div class="displayActivity-name"><h2>' +
                activity_name +
                '</h2><button id="start">抽奖</button></div>';
            //已完成签到的活动，获取签到列表
            getSignedList(e.activity_id);
            $(".overview-text").append(appendText);
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
                activity_id: activity_id
            },
            success: function(e) {
                var i = 0;
                var appendText_list =
                    '<hr><div class="signed-list"><h4>待抽奖列表</h4><div class="signed-list-inner"><table id="stu_list" class="table-sorter"><thead><tr><th>序号</th><th>姓名</th><th>学号</th><th>学院/专业</th><th>年级</th><th>性别</th><th>签到时间</th></tr></thead><tbody>';
                while (e[i]) {
                    var j = i + 1;
                    var name = e[i].name;
                    var number = e[i].number;
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
                        '<tr><td class="list-order">' +
                        j +
                        "</td><td>" +
                        name +
                        "</td><td class='number-item'>" +
                        number +
                        "</td><td>" +
                        college +
                        "&nbsp;&nbsp;" +
                        major +
                        "</td><td>" +
                        grade +
                        "</td><td>" +
                        gender +
                        "</td><td>" +
                        time +
                        "</td></tr>";
                    i++;
                }
                totalStu = i;
                appendText_list += "</tbody></table><div></div>";
                $(".overview-text").append(appendText_list);
                fore();
                stu_list = JSON.parse(stu_list);
            },
            error: function(err) {}
        });
    }
});

function fore() {
    var temp = "";
    var tabLen = document.getElementById("stu_list");
    stu_list = "[";
    for (var i = 1; i < tabLen.rows.length; i++) {
        if (i == 1) {
            stu_list +=
                '{"order":"' +
                tabLen.rows[i].cells[0].innerHTML +
                '","name":"' +
                tabLen.rows[i].cells[1].innerHTML +
                '","number":"' +
                tabLen.rows[i].cells[2].innerHTML +
                '","haszhongjiang":"false"}';
        } else {
            stu_list +=
                ',{"order":"' +
                tabLen.rows[i].cells[0].innerHTML +
                '","name":"' +
                tabLen.rows[i].cells[1].innerHTML +
                '","number":"' +
                tabLen.rows[i].cells[2].innerHTML +
                '","haszhongjiang":"false"}';
        }
    }
    stu_list += "]";
}

function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return Min + Math.round(Rand * Range);
}

function choujiang() {
    var zhongjiang_num = GetRandomNum(1, totalStu);
    var flag = 0;
    for (var i in stu_list) {
        if (stu_list[i].haszhongjiang == "false") {
            flag = 1;
        }
    }
    if (flag) {
        while (stu_list[zhongjiang_num - 1].haszhongjiang == "true") {
            zhongjiang_num = GetRandomNum(1, totalStu);
        }
        console.log(zhongjiang_num - 1);
        var text =
            "中奖同学为 <h4 class='alert-name'><b>" +
            stu_list[zhongjiang_num - 1].name +
            "</b></h4> ,学号为 " +
            stu_list[zhongjiang_num - 1].number +
            " ";
        stu_list[zhongjiang_num - 1].haszhongjiang = "true";
        var toRemove = $(".number-item");
        for (var i = 0; i < toRemove.length; i++) {
            if (toRemove[i].innerHTML == stu_list[zhongjiang_num - 1].number) {
                var thisdel = toRemove[i];
                thisdel.parentNode.parentNode.removeChild(thisdel.parentNode);
                break;
            }
        }
        var toChangeOrder = $(".list-order");
        for (var i = 0; i < toChangeOrder.length; i++) {
            toChangeOrder[i].innerHTML = i + 1;
        }

        window.wxc.xcConfirm(text, window.wxc.xcConfirm.typeEnum.success);
    } else {
        window.wxc.xcConfirm(
            "所有同学均已中奖！",
            window.wxc.xcConfirm.typeEnum.warning
        );
    }
}

$(document).on("click", "#start", function() {
    choujiang();
});