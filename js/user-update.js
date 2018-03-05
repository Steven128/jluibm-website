//修改头像
$(document).on("click", "#uploadPic", function() {
    var userPicData = $("#previewResult")[0].src; //用户头像base64
    $.ajax({
        type: "POST",
        url: "../php/uploadPic.php",
        dataType: "JSON",
        data: {
            "number": number,
            "userPicData": userPicData,
        },
        success: function(e) {
            if (e.message == "success") {
                window.wxc.xcConfirm("头像修改成功！", window.wxc.xcConfirm.typeEnum.success, {
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
})

//修改密码
$(document).ready(function() {
    $("#update-password").validate({
        onsubmit: true, // 是否在提交是验证
        rules: { //规则

            oldPassword: {
                required: true,
            },
            newPassword: {
                required: true
            },
            reNewPassword: {
                required: true,
                equalTo: "#newPassword"
            },
        },
        messages: { //验证错误信息

            oldPassword: {
                required: "请输入原密码"
            },
            newPassword: {
                required: "请输入新密码"
            },
            reNewPassword: {
                required: "请再次输入新密码",
                equalTo: "两次密码输入不一致"
            },
        },
        submitHandler: function(form) { //通过之后回调
            var oldPasswd = $("#oldPassword").val();
            oldPasswd = "JLUIBMclub" + number + oldPasswd;
            oldPasswd = hex_md5(oldPasswd);
            var newPasswd = $("#newPassword").val();
            newPasswd = "JLUIBMclub" + number + newPasswd;
            newPasswd = hex_md5(newPasswd);
            $.ajax({
                type: "POST",
                url: "../php/user-update.php",
                dataType: "JSON",
                data: {
                    "request": "password-update",
                    "number": number,
                    "oldPasswd": oldPasswd,
                    "newPasswd": newPasswd,
                },
                success: function(e) {
                    if (e.message == "success") {
                        window.wxc.xcConfirm("密码修改成功！", window.wxc.xcConfirm.typeEnum.success, {
                            onOk: function() {
                                window.location.reload();
                            },
                            onClose: function() {
                                window.location.reload();
                            }
                        });

                    } else if (e.message == "wrong oldPassword") {
                        window.wxc.xcConfirm("原密码错误！", window.wxc.xcConfirm.typeEnum.error);
                    }
                },
                error: function(err) {
                    window.wxc.xcConfirm("出错啦，再试一次吧！", window.wxc.xcConfirm.typeEnum.error);
                }
            })
        },
        invalidHandler: function(form, validator) {
            return false;
        }
    });



    //修改个人信息
    $("#update-form").validate({
        onsubmit: true, // 是否在提交是验证
        rules: { //规则
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
        },
        messages: { //验证错误信息
            qq: {
                required: "请输入QQ号码",
                digits: "QQ号码应为数字",
                rangelength: "输入的QQ号码不合法"
            },
            phone: {
                required: "请输入手机号码",
                digits: "手机号码只能为数字",
                rangelength: "你输入的不是正确的手机号码"
            },
        },
        submitHandler: function(form) { //通过之后回调;
            var qq = $("#qq").val();
            var phone = $("#phone").val();
            $.ajax({
                type: "POST",
                url: "../php/user-update.php",
                dataType: "JSON",
                data: {
                    "request": "info-update",
                    "number": number,
                    "qq": qq,
                    "phone": phone,
                },

                success: function(e) {
                    if (e.message == "success") {
                        window.wxc.xcConfirm("修改成功！", window.wxc.xcConfirm.typeEnum.success, {
                            onOk: function() {
                                window.location.reload();
                            },
                            onClose: function() {
                                window.location.reload();
                            }
                        });
                    } else if (e.message == "error") {
                        window.wxc.xcConfirm("出错啦，再试一次吧！", window.wxc.xcConfirm.typeEnum.error);
                    }
                },
                error: function(err) {
                    window.wxc.xcConfirm("出错啦，再试一次吧！", window.wxc.xcConfirm.typeEnum.error);
                }
            });
        },
        invalidHandler: function(form, validator) {
            return false;
        }
    });
});