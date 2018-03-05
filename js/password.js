$(document).ready(function() {
    var formData = location.search;
    formData = unescape(formData);
    var str1 = /\?(.*?)$/; //匹配？后的整个字符串
    var str2 = /number=(.*?)&/; //匹配学号
    var number = formData.match(str2)[1];
    formData = formData.match(str1)[1];
    $("#setPwd").validate({
        onsubmit: true, // 是否在提交是验证
        rules: { //规则
            password: {
                required: true
            },
            repassword: {
                required: true,
                equalTo: password,
            },
            email: {
                required: true,
                email: true,
            },

        },
        messages: { //验证错误信息
            password: {
                required: '请输入密码'
            },
            repassword: {
                required: '请再次输入密码',
                equalTo: '两次输入的密码不相同',
            },
            email: {
                required: '请输入邮箱',
                email: '请输入正确的邮箱地址',
            },
        },
        submitHandler: function(form) { //通过之后回调
            var userPicData = $("#previewResult")[0].src; //用户头像base64
            $("#submit").attr('disabled', true);
            var password = $("#password").val();
            var email = $("#email").val();
            var href = formData;
            $.ajax({
                type: "GET",
                url: "../php/submit.php?request=submit&" + formData,
                dataType: "JSON",
                data: {},
                success: function(info0) {
                    if (info0 == "success") {
                        //报名成功，这时把密码和邮件信息提交
                        password = 'JLUIBMclub' + number + password;
                        password = hex_md5(password);
                        $.ajax({
                            type: "POST",
                            url: "../php/set-password.php",
                            dataType: "JSON",
                            data: {
                                number: number,
                                password: password,
                                email: email,
                            },
                            success: function(info1) {
                                if (info1 == "success") {
                                    //密码和邮箱提交成功，开始上传用户头像
                                    console.log(userPicData);
                                    if (userPicData.indexOf("data:") < 0) {
                                        window.location.href = "submit-success.html";
                                    } else {
                                        $.ajax({
                                            type: "POST",
                                            url: "../php/uploadPic.php",
                                            dataType: "JSON",
                                            data: {
                                                number: number,
                                                userPicData: userPicData,
                                            },
                                            success: function(info2) {
                                                if (info2 == "success") {
                                                    window.location.href = "submit-success.html";
                                                } else {
                                                    console.log(info2);
                                                    window.wxc.xcConfirm("出错啦，再试一次吧！", window.wxc.xcConfirm.typeEnum.error);
                                                }
                                            },
                                            error: function(err2) {
                                                console.log(err2);
                                                window.wxc.xcConfirm("出错啦，再试一次吧！", window.wxc.xcConfirm.typeEnum.error);
                                            }
                                        });
                                    }
                                    //密码和邮箱提交不成功
                                } else {
                                    console.log(info1);
                                    window.wxc.xcConfirm("出错啦，再试一次吧！", window.wxc.xcConfirm.typeEnum.error);
                                }
                            },
                            error: function(err1) {
                                console.log(err1);
                                window.wxc.xcConfirm("出错啦，再试一次吧！", window.wxc.xcConfirm.typeEnum.error);
                            }
                        });
                    } else if (info0 == "has joined") {
                        window.wxc.xcConfirm("你已经加入我们了，请直接登录", window.wxc.xcConfirm.typeEnum.info, {
                            onOk: function() {
                                window.location.href = "../joinus/";
                                window.event.returnValue = false;
                            },
                            onClose: function() {
                                window.location.href = "../joinus/";
                                window.event.returnValue = false;
                            }
                        });

                    } else if (info0 == "error") {
                        console.log(info0);
                        window.wxc.xcConfirm("出错啦，再试一次吧！", window.wxc.xcConfirm.typeEnum.error);
                    }
                },
                error: function(err0) {
                    console.log(err0);
                    window.wxc.xcConfirm("出错啦，再试一次吧！", window.wxc.xcConfirm.typeEnum.error);
                }
            });
        },
        invalidHandler: function(form, validator) {
            return false;
        }
    });
});