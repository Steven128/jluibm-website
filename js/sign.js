$(document).ready(function() {
    var activityCode = window.location.search;
    activityCode = unescape(activityCode);
    activityCode = activityCode.match(/\?activityCode=(.*?)$/)[1];
    $.ajax({
        type: "POST",
        url: "../php/activity.php",
        dataType: "JSON",
        data: {
            "request": "getSingle",
            "activityCode": activityCode,
        },
        success: function(e) {
            var activityCode = e.activityCode;
            var activityName = e.activityName;
            var place = e.place;
            var appendText = '<div id="activityCode" class="box" value="' + activityCode + '"></div><div class="box"><h4>活动名称：</h4><p>' + activityName + '</p></div><div class="box"><h4>活动地点：</h4><p>' + place + '</p></div>';
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
                appendText += '<div class="btn-area"><button id="sign-start" type="button" class="submit" value="' + activityCode + '">开始签到</button></div>';
            } else if (state == 'active') {
                appendText += '<div class="box"><h4>活动状态：</h4><p>正在进行</p></div>';
            } else if (state == 'finished') {
                appendText += '<div class="box"><h4>活动状态：</h4><p>已完成</p></div>';
            }
            $(".activity-text").append(appendText);
        },
        error: function(err) {

        }
    })
});

$(document).on("click", "#sign-start", function() {
    var activityCode = $(this).val();
    $(".btn-area").remove();
    var appendText = '<hr><div><h4>请选择签到时间</h4><select id="duration" class="select form-control"><option value="1">1分钟</option><option value="3">3分钟</option><option value="5">5分钟</option><option value="10">10分钟</option><option value="30">30分钟</option><option value="60">60分钟</option></select><div class="btn-area"><button id="qrcode" value="' + activityCode + '" type="button" class="submit">点击生成二维码</button></div></div>';
    $(".activity-text").append(appendText);
})

$(document).on("click", "#qrcode", function() {
    var activityCode = $(this).val();
    var duration = $("#duration").val();
    window.location.href = "qrcode.html?" + escape("activityCode=" + activityCode + "&duration=" + duration);
})