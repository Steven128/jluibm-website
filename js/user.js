//退出登录
$(document).ready(function() {

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
                window.location.href = "../";
                window.event.returnValue = false;
            },
            error: function(err) {

            },
        });
    });
    $(".user-box").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".user-item").css("background-color", "rgba(87, 110, 136, 0.85)");
    $(".pic-box").css("display", "none");
    $(".passwd-box").css("display", "none");
    $(".update-box").css("display", "none");

});


$(document).on("click", ".user-item", function() {
    $(".user-box").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".user-item").css("background-color", "rgba(87, 110, 136, 0.85)");
    $(".pic-box").css("display", "none");
    $(".passwd-box").css("display", "none");
    $(".update-box").css("display", "none");
});

$(document).on("click", ".pic-item", function() {
    $(".user-box").css("display", "none");
    $(".pic-box").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".pic-item").css("background-color", "rgba(87, 110, 136, 0.85)");
    $(".passwd-box").css("display", "none");
    $(".update-box").css("display", "none");
});

$(document).on("click", ".passwd-item", function() {
    $(".user-box").css("display", "none");
    $(".pic-box").css("display", "none");
    $(".passwd-box").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".passwd-item").css("background-color", "rgba(87, 110, 136, 0.85)");
    $(".update-box").css("display", "none");
});

$(document).on("click", ".update-item", function() {
    $(".user-box").css("display", "none");
    $(".pic-box").css("display", "none");
    $(".passwd-box").css("display", "none");
    $(".update-box").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".update-item").css("background-color", "rgba(87, 110, 136, 0.85)");
});

$(document).on("click", ".manager-item", function() {
    window.location.href = "../admin/";
});