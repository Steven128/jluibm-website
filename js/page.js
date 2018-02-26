// JavaScript Document

$(document).ready(function() {

    var width = $(window).width();

    //返回顶部

    $(function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() >= 50) {
                $('#back_to_top').fadeIn();
            } else {
                $('#back_to_top').fadeOut();
            }
        });
    });
    $('#back_to_top').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 500);
    });

    //多级菜单显示
    if (width > 992) {
        $("#wiki-item").mouseover(function() {
            $("#wiki-item").css("background-color", "rgba(102, 102, 102, 0.85)");
            $(".sub-menu").css("display", "block");
        });

        $(".sub-menu").mouseover(function() {
            $("#wiki-item").css("background-color", "rgba(102, 102, 102, 0.85)");
            $(".sub-menu").css("display", "block");
        });

        $("#web-item").mouseover(function() {
            $("#web-item").css("background-color", "rgba(102, 102, 102, 0.85)");
            $(".sub-menu-web").css("display", "block");
        });

        $(".sub-menu-web").mouseover(function() {
            $("#wiki-item").css("background-color", "rgba(102, 102, 102, 0.85)");
            $("#web-item").css("background-color", "rgba(102, 102, 102, 0.85)");
            $(".sub-menu").css("display", "block");
            $(".sub-menu-web").css("display", "block");
        });

        $("#web-1").mouseover(function() {
            $("#web-1 a").css("color", "#ffffff");
        });

        $("#web-2").mouseover(function() {
            $("#web-2 a").css("color", "#ffffff");
        });

        $("#web-3").mouseover(function() {
            $("#web-3 a").css("color", "#ffffff");
        });


        $("#wiki-item").mouseout(function() {
            $("#wiki-item").css("background-color", "transparent");
            $(".sub-menu").css("display", "none");
        });

        $(".sub-menu").mouseout(function() {
            $("#wiki-item").css("background-color", "transparent");
            $(".sub-menu").css("display", "none");
        });

        $("#web-item").mouseout(function() {
            $("#web-item").css("background-color", "transparent");
            $(".sub-menu-web").css("display", "none");
        });

        $(".sub-menu-web").mouseout(function() {
            $("#wiki-item").css("background-color", "transparent");
            $("#web-item").css("background-color", "transparent");
            $(".sub-menu").css("display", "none");
            $(".sub-menu-web").css("display", "none");
        });

        $("#web-1").mouseout(function() {
            $("#web-1 a").css("color", "#21252a");
        });

        $("#web-2").mouseout(function() {
            $("#web-2 a").css("color", "#21252a");
        });

        $("#web-3").mouseout(function() {
            $("#web-3 a").css("color", "#21252a");
        });
    } else {
        var count_button = 0;
        var count_wiki = 0;
        var count_web = 0;
        $(".menu-button").click(function() {
            count_button++;
            if (count_button % 2 == 0) {

                $(".main-navigation-mobile").css("display", "none");
                $(".sub-menu-mobile").css("display", "none");
                $(".sub-menu-web-mobile").css("display", "none");
            } else {
                $(".main-navigation-mobile").css("display", "block");
            }
        });
        $("#wiki-item-mobile").click(function() {
            count_wiki++;
            if (count_wiki % 2 == 0) {
                $(".sub-menu-mobile").css("display", "none");
                $(".sub-menu-web-mobile").css("display", "none");
            } else {
                $(".sub-menu-mobile").css("display", "block");
            }
        });
        $("#web-item-mobile").click(function() {
            count_web++;
            if (count_web % 2 == 0) {
                $(".sub-menu-web-mobile").css("display", "none");
            } else {
                $(".sub-menu-web-mobile").css("display", "block");
            }
        });
    }

    $(".online-user").click(function() {
        $(".user-info").css("display", "block");
        $(".shelter").css("display", "block");
    });

    $(".shelter").click(function() {
        $(".user-info").css("display", "none");
        $(".shelter").css("display", "none");
    })

});

$(window).resize(function() {
    var width = $(window).width();
    if (width > 992) {
        $("#wiki-item").mouseover(function() {
            $("#wiki-item").css("background-color", "rgba(102, 102, 102, 0.85)");
            $(".sub-menu").css("display", "block");
        });

        $(".sub-menu").mouseover(function() {
            $("#wiki-item").css("background-color", "rgba(102, 102, 102, 0.85)");
            $(".sub-menu").css("display", "block");
        });

        $("#web-item").mouseover(function() {
            $("#web-item").css("background-color", "rgba(102, 102, 102, 0.85)");
            $(".sub-menu-web").css("display", "block");
        });

        $(".sub-menu-web").mouseover(function() {
            $("#wiki-item").css("background-color", "rgba(102, 102, 102, 0.85)");
            $("#web-item").css("background-color", "rgba(102, 102, 102, 0.85)");
            $(".sub-menu").css("display", "block");
            $(".sub-menu-web").css("display", "block");
        });

        $("#web-1").mouseover(function() {
            $("#web-1 a").css("color", "#ffffff");
        });

        $("#web-2").mouseover(function() {
            $("#web-2 a").css("color", "#ffffff");
        });

        $("#web-3").mouseover(function() {
            $("#web-3 a").css("color", "#ffffff");
        });


        $("#wiki-item").mouseout(function() {
            $("#wiki-item").css("background-color", "transparent");
            $(".sub-menu").css("display", "none");
        });

        $(".sub-menu").mouseout(function() {
            $("#wiki-item").css("background-color", "transparent");
            $(".sub-menu").css("display", "none");
        });

        $("#web-item").mouseout(function() {
            $("#web-item").css("background-color", "transparent");
            $(".sub-menu-web").css("display", "none");
        });

        $(".sub-menu-web").mouseout(function() {
            $("#wiki-item").css("background-color", "transparent");
            $("#web-item").css("background-color", "transparent");
            $(".sub-menu").css("display", "none");
            $(".sub-menu-web").css("display", "none");
        });

        $("#web-1").mouseout(function() {
            $("#web-1 a").css("color", "#21252a");
        });

        $("#web-2").mouseout(function() {
            $("#web-2 a").css("color", "#21252a");
        });

        $("#web-3").mouseout(function() {
            $("#web-3 a").css("color", "#21252a");
        });
    } else {
        var count_button = 0;
        var count_wiki = 0;
        var count_web = 0;
        $(".menu-button").click(function() {
            count_button++;
            if (count_button % 2 == 0) {

                $(".main-navigation-mobile").css("display", "none");
                $(".sub-menu-mobile").css("display", "none");
                $(".sub-menu-web-mobile").css("display", "none");
            } else {
                $(".main-navigation-mobile").css("display", "block");
            }
        });
        $("#wiki-item-mobile").click(function() {
            count_wiki++;
            if (count_wiki % 2 == 0) {
                $(".sub-menu-mobile").css("display", "none");
                $(".sub-menu-web-mobile").css("display", "none");
            } else {
                $(".sub-menu-mobile").css("display", "block");
            }
        });
        $("#web-item-mobile").click(function() {
            count_web++;
            if (count_web % 2 == 0) {
                $(".sub-menu-web-mobile").css("display", "none");
            } else {
                $(".sub-menu-web-mobile").css("display", "block");
            }
        });
    }
});
//获取referer，兼容IE
function goTo(url) {
    var ua = navigator.userAgent;
    if (ua.indexOf('MSIE') >= 0) {
        var rl = document.createElement('a');
        rl.href = url;
        document.body.appendChild(rl);
        rl.click();
    } else {
        location.href = url;
    }
}

function getReferer() {
    if (document.referrer) {
        return document.referrer;
    } else {
        return false;
    }
}