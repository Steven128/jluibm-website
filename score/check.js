$(document).ready(function() {
    $("#check").validate({
        onsubmit: true, // 是否在提交是验证
        rules: { //规则
            number: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: { //验证错误信息
            number: {
                required: "请输入教学号"
            },
            password: {
                required: "请输入密码"
            }
        },
        submitHandler: function(form) { //通过之后回调
            var number = $("#number").val();
            var password = $("#password").val();
            var termId = $("#termId").val();
            var inp = "UIMS" + number + password;
            password = hex_md5(inp);
            $(".getScore").remove();
            $(".info").append("<h4 class='checking'>查询中...</h4>");
            $.ajax({
                type: "GET",
                url: "test.php?number=" + number + "&password=" + password + "&termId=" + termId,
                dataType: "JSON",
                success: function(e) {
                    $(".checking").remove();
                    var i = 0;
                    var append_text = "<div class='getScore'>";
                    var sub = '';
                    sub = '<h4>姓名：' + e.items[0].studName + '</h4>';
                    append_text += sub;
                    sub = '<h4>教学号：' + e.items[0].xh + '</h4>';
                    append_text += sub;
                    sub = '<h4>以下是' + e.items[0].xkkh.substring(1, 10) + '学年度 第' + e.items[0].xkkh.substring(11, 12) + '学期的成绩' + '</h4>';
                    append_text += sub;
                    append_text += "<div class='display-text text'><table class='display-all'><thead><tr><th>序号</th><th class='subject'>科目</th><th>学分</th><th>分数</th><th>绩点</th><th>是否重修</th></tr></thead><tbody class='display-form'>";

                    while (e.items[i]) {
                        var j = i + 1;
                        sub = '<tr><td>' + j + '</td><td>' + e.items[i].kcmc + '</td><td>' + e.items[i].credit + '</td><td>' + e.items[i].zscj + '</td><td>' + e.items[i].gpoint + '</td><td>' + e.items[i].isReselect + '</td></tr>';
                        append_text += sub;
                        i++;
                    }
                    append_text += '</tbody></table></div><div>';
                    $(".info").append(append_text);
                },
                error: function(err) {
                    window.wxc.xcConfirm("出错啦，请稍后再试吧！", window.wxc.xcConfirm.typeEnum.error, {
                        onOk: function() {
                            window.location.reload();
                        },
                        onClose: function() {
                            window.location.reload();
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