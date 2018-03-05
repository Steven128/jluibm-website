$(document).ready(function() {
    var activity_id = window.location.search;
    activity_id = unescape(activity_id);
    activity_id = activity_id.match(/\?activity_id=(.*?)$/)[1];
    $.ajax({
        type: "POST",
        url: "../php/activity.php",
        dataType: "JSON",
        data: {
            "request": "getSingle",
            "activity_id": activity_id,
        },
        success: function(e) {
            var activity_id = e.activity_id;
            var activity_name = e.activity_name;
            var place = e.place;
            var appendText = '<div id="activity_id" class="box" value="' + activity_id + '"></div><div class="box"><h4>活动名称：</h4><p>' + activity_name + '</p></div><div class="box"><h4>活动地点：</h4><p>' + place + '</p></div>';
            var setBy = e.setBy;
            if (setBy == 'cpp') {
                appendText += '<div class="box"><h4>组别：</h4><p>C/C++组</p></div>';
            } else if (setBy == 'algorithm') {
                appendText += '<div class="box"><h4>组别：</h4><p>算法组</p></div>';
            } else if (setBy == 'web') {
                appendText += '<div class="box"><h4>组别：</h4><p>Web组</p></div>';
            } else if (setBy == 'linux') {
                appendText += '<div class="box"><h4>组别：</h4><p>Linux组</p></div>';
            } else if (setBy == 'java') {
                appendText += '<div class="box"><h4>组别：</h4><p>Java组</p></div>';
            } else {
                appendText += '<div class="box"><h4>组别：</h4><p>其他组</p></div>';
            }
            var time = (e.time);
            var year = time.substring(0, 4);
            var month = time.substring(5, 7);
            var day = time.substring(8, 10);
            var time = time.substring(11, 18);
            var state = e.state;
            //year,month,day
            appendText += '<div class="box"><h4>举办时间：</h4><p>' + year + '年' + month + '月' + day + '日';
            //time
            if (time == 'morning') {
                appendText += '上午</p></div>';
            } else if (time == 'afternoon') {
                appendText += '下午</p></div>';
            } else if (time == 'evening') {
                appendText += '晚上</p></div>';
            }
            var remarks = e.remarks;
            appendText += '<div class="box"><h4>备注：</h4><p>' + remarks + '</p></div>';

            if (state == 'inactive') {
                appendText += '<div class="box"><h4>活动状态：</h4><p>未开始</p></div>';
                //未开始的活动添加开始签到的按钮
                appendText += '<div class="btn-area"><button id="sign-start" type="button" class="submit" value="' + activity_id + '">开始签到</button></div>';
                $(".activity-text").append(appendText);
            } else if (state == 'active') {
                appendText += '<div class="box"><h4>活动状态：</h4><p>正在进行</p></div>';
                $(".activity-text").append(appendText);
            } else if (state == 'finished') {
                appendText += '<div class="box"><h4>活动状态：</h4><p>已完成</p></div>';
                $(".activity-text").append(appendText);
                //已完成签到的活动，获取签到列表
                getSignedList(e.activity_id);
            }
        },
        error: function(err) {

        }
    })
});


function getSignedList(activity_id) {
    $.ajax({
        type: "POST",
        url: "../php/activity.php",
        dataType: "JSON",
        data: {
            "request": "getSignedList",
            "activity_id": activity_id,
        },
        success: function(e) {
            var i = 0;
            var appendText_list = '<table><thead><tr><th>姓名</th><th>学院/专业</th><th>年级</th><th>性别</th><th>签到地点</th><th>签到时间</th></tr></thead><tbody>'
            while (e[i]) {
                var name = e[i].name;
                var college = e[i].college;
                var major = e[i].major;
                var grade = e[i].grade;
                var gender = e[i].gender;
                var location = e[i].location;
                var time = e[i].submitTime;
                if (gender == 'male') {
                    gender = '男';
                } else {
                    gender = '女';
                }
                var grade = '';
                if (grade == '1') {
                    grade = '大一';
                } else if (grade == '2') {
                    grade = '大二';
                } else if (grade == '3') {
                    grade = '大三';
                } else {
                    grade = '大四';
                }
                appendText_list += '<tr><td>' + name + '</td><td>' + college + '&nbsp;&nbsp;' + major + '</td><td>' + grade + '</td><td>' + gender + '</td><td>' + location + '</td><td>' + time + '</td></tr>';
                i++;
            }
            appendText_list += '</tbody></table>';
            $(".activity-text").append(appendText_list);
        },
        error: function(err) {

        }
    })
}



$(document).on("click", "#sign-start", function() {
    var activity_id = $(this).val();
    $(".btn-area").remove();
    var appendText = '<hr><div><h4>请选择签到时间</h4><select id="duration" class="select form-control"><option value="1">1分钟</option><option value="3">3分钟</option><option value="5">5分钟</option><option value="10">10分钟</option><option value="30">30分钟</option><option value="60">60分钟</option></select><div class="btn-area"><button id="qrcode" value="' + activity_id + '" type="button" class="submit">点击生成二维码</button></div></div>';
    $(".activity-text").append(appendText);
})

$(document).on("click", "#qrcode", function() {
    var activity_id = $(this).val();
    var duration = $("#duration").val();
    window.location.href = "qrcode.html?" + escape("activity_id=" + activity_id + "&duration=" + duration);
})