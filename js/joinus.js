$(document).ready(function() {
    $("#joinus").validate({
        onsubmit: true, // 是否在提交是验证
        debug: true,
        ignore: ".learned",
        rules: { //规则

            name: {
                required: true,
                chinese: true,
            },
            number: {
                required: true,
                digits: true,
                rangelength: [8, 8]
            },
            college: {
                required: true
            },
            major: {
                required: true
            },
            qq: {
                required: true,
                digits: true,
                rangelength: [5, 12]
            },
            phone: {
                required: true,
                digits: true,
                rangelength: [11, 11]
            },
            lang: {
                required: true
            },

        },
        messages: { //验证错误信息

            name: {
                required: "请输入你的姓名",
                chinese: "请输入正确的姓名"
            },
            number: {
                required: "请输入你的学号",
                digits: "学号应为8位整数",
                rangelength: "学号应为8位整数"
            },
            college: {
                required: "请输入你的学院"
            },
            major: {
                required: "请输入你的专业"
            },
            qq: {
                required: "请输入你的QQ号码",
                digits: "QQ号码应为数字",
                rangelength: "请输入正确的QQ号码"
            },
            phone: {
                required: "请输入你的手机号码",
                digits: "手机号码只能为数字",
                rangelength: "请输入正确的手机号码"
            },
            lang: {
                required: "请至少选择一项"
            },
        },
        submitHandler: function(form) { //通过之后回调
            $("#submit").attr('disabled', true);
            var name = $("#name").val();
            var number = $("#number").val();
            var college = $("#college").val();
            var major = $("#major").val();
            var gender = $("input[name='gender']:checked").val();
            var grade = $("#grade").val();
            var qq = $("#qq").val();
            var phone = $("#phone").val();
            var lang = [];
            var learned = $("#learned").val();

            $.each($('input:checkbox'), function() {
                if (this.checked) {
                    lang.push($(this).val());
                }
            });
            var href = "set-password.html?" + escape("name=" + name + "&number=" + number + "&college=" + college + "&major=" + major + "&gender=" + gender + "&grade=" + grade + "&qq=" + qq + "&phone=" + phone + "&lang=" + lang + "&learned=" + learned);

            window.location.href = href;
            window.event.returnValue = false;
        },
        invalidHandler: function(form, validator) {
            return false;
        }
    });

    jQuery.validator.addMethod("chinese", function(value, element) {
        var chinese = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
        return this.optional(element) || (chinese.test(value));
    }, "请正确填写您的邮政编码");

});