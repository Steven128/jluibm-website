$(document).ready(function() {
    //判断用户是否登录
    function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    var num = GetRandomNum(10000, 99999);
    $.ajax({
        type: "POST",
        url: "../php/check_login.php",
        dataType: "JSON",
        data: {
            "request": "getNumber"
        },
        success: function(e) {

            if (e.number != '' && e.number != null) {
                $(".online").css("display", "block");
                $(".offline").css("display", "none");
                $(".bar-online").css("display", "block");
                $(".bar-offline").css("display", "none");
                $(".online-user").append(e.name);
                var userPic = e.userPicPath;
                if (userPic.indexOf("../../userPicUpload/") > -1) {
                    $(".userPic").attr('src', userPic + "?" + num);
                } else {
                    $(".userPic").attr('src', '../src/user.png');
                }
                if (e.isManager == 0) {
                    $(".manager").remove();
                }
            } else {
                $(".online").css("display", "none");
                $(".offline").css("display", "block");
                $(".bar-online").css("display", "none");
                $(".bar-offline").css("display", "block");
            }
        },
        error: function(err) {

        }
    });
});

$(document).on("click", ".logout", function() {
    $.ajax({
        type: "POST",
        url: "../php/check_login.php",
        dataType: "JSON",
        data: {
            "request": "logout"
        },
        success: function(e) {
            $(".userPic").attr('src', '../src/user.png');
            $(".bar-online").css("display", "none");
            $(".bar-offline").css("display", "block");
            window.location.reload();
        },
        error: function(err) {

        },
    });
});