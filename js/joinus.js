$(document).ready(function() {

    //表单验证
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
            grade: {
                equalToGrade: number
            },
            college: {
                equalToNumber: number,
                required: true,
                chinese: true,
            },
            major: {
                required: true,
                chinese: true,
                major: college
            },
            qq: {
                required: true,
                digits: true,
                rangelength: [5, 12]
            },
            phone: {
                required: true,
                phone: true
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
            grade: {
                equalToGrade: "选择的年级与学号不相符"
            },
            college: {
                equalToNumber: "选择的学院与学号不相符",
                required: "请输入你的学院",
                chinese: "请输入正确的学院"
            },
            major: {
                required: "请输入你的专业",
                chinese: "请输入正确的专业",
                major: "专业与学院不相符"
            },
            qq: {
                required: "请输入你的QQ号码",
                digits: "QQ号码应为数字",
                rangelength: "请输入正确的QQ号码"
            },
            phone: {
                required: "请输入你的手机号码",
                phone: "请输入正确的手机号码"
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
    }, "");

    jQuery.validator.addMethod("phone", function(value, element) {
        var phone = /^1[34578]\d{9}$/;
        return this.optional(element) || (phone.test(value));
    }, "");

    var hasMajor = false;
    jQuery.validator.addMethod("major", function(value, element, param) {
        var college = $(param).val();
        if (this.settings.onfocusout) {
            target.off(".validate-equalTo").on("blur.validate-equalTo", function() {
                $(element).valid();
            });
        }
        $.getJSON("../joinus/major.json", function(data) {
            $.each(data, function(i, item) {
                if (item.college == college) {
                    var majorList = item.major;
                    $.each(majorList, function(index, majorItem) {
                        if (majorItem == value) {
                            hasMajor = 1;
                            break;
                        } else {
                            hasMajor = 0;
                        }
                    })
                }
            })
        });
        return hasMajor;
    }, "");

    jQuery.validator.addMethod("equalToGrade", function(value, element, param) {
        var target = $(param);

        //年级对应哪届
        //每年需要改一次
        var year = target.val().substring(2, 4);
        var grade = 1;
        if (year == 17) {
            grade = 1;
        } else if (year == 16) {
            grade = 2;
        } else if (year == 15) {
            grade = 3;
        } else if (year == 14) {
            grade = 4;
        }
        if (this.settings.onfocusout) {
            target.off(".validate-equalTo").on("blur.validate-equalTo", function() {
                $(element).valid();
            });
        }
        return grade == value;
    }, "");

    var collegeCode = "";
    jQuery.validator.addMethod("equalToNumber", function(value, element, param) {
        var target = $(param);
        if (this.settings.onfocusout) {
            target.off(".validate-equalTo").on("blur.validate-equalTo", function() {
                $(element).valid();
            });
        }
        $.getJSON("../joinus/major.json", function(data) {
            $.each(data, function(i, item) {
                if (item.college == value) {
                    collegeCode = item.code;
                }
            })
        });
        return collegeCode === target.val().substring(0, 2);
    }, "");
});