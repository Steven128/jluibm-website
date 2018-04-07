//获取可签到活动的列表
$(document).ready(function() {

    $.ajax({
        type: "POST",
        url: "../php/activity.php",
        dataType: "JSON",
        data: {
            "request": "getInactiveList",
        },
        success: function(e) {
            var appendText = '<div class="text-outer"><div class="sign-item-outer">';
            if (e == '') {
                appendText += '<div class="inactive-item no-inactive-item"><h5>这里空空如也，什么也没有</h5><h5>还没有未签到的活动，先创建新的活动吧</h5><div class="animation-box"><div class="road"><div class="shadow"><div class="shelt"><div class="head"><div class="eyes"><div class="lefteye"><div class="eyeball"></div><div class="eyebrow"></div></div><div class="righteye"><div class="eyeball"></div><div class="eyebrow"></div></div></div></div></div><div class="hat"></div></div></div></div></div>';
            } else {
                var i = 0;
                while (e[i]) {
                    var date = e[i].time.substring(0, 10);
                    var time = e[i].time.substring(11, 18);
                    if (time == "morning") {
                        time = "上午";
                    } else if (time == "afternoon") {
                        time = "下午";
                    } else if (time == "evening") {
                        time = "晚上";
                    }
                    appendText += '<div class="inactive-item"><div class="signup-text"><h2>' + e[i].activity_name + '</h2><h5>' + date + ' ' + time + '</h5><h5>地点：' + e[i].place + '</h5></div><div class="btn-area"><button class="start-signup" value="' + e[i].activity_id + '"><p>开始签到</p></button></div></div>';

                    i++;
                }
            }

            appendText += '</div></div>';
            $("#signUp-tab").append(appendText);
        },
        error: function(err) {

        }
    });

});

$(document).on("click", ".start-signup", function() {
    var activity_id = $(this).val();
    window.open("get-location.html?" + escape("activity_id=" + activity_id));
})

var latitude = '';
var longitude = '';
$(document).on("click", "#qrcode", function() {
    var activity_id = window.location.search;
    activity_id = unescape(activity_id);
    activity_id = activity_id.match(/\?activity_id=(.*?)$/)[1];
    var duration = $("#duration").val();
    window.location.href = "qrcode.html?" + escape("activity_id=" + activity_id + "&duration=" + duration + "&longitude=" + longitude + "&latitude=" + latitude);
})