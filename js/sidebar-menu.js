$.sidebarMenu = function(menu) {
    var animationSpeed = 300;

    $(menu).on("click", "li a", function(e) {
        var $this = $(this);
        var idAttr = $this.attr("id");
        if (idAttr != undefined && !idAttr.match("update") && !idAttr.match("display")) {
            idAttr = idAttr.match(/menu-(.*?)-item/)[1];
            var $box = $(".main-bar").children();
            $box.each(function() {
                var $thisID = $(this).attr("id")
                if ($thisID != undefined) {
                    if ($(this).hasClass("box-active")) {
                        $(this).removeClass("box-active");
                    }
                    if ($thisID.match(idAttr)) {
                        $("li a").each(function() {
                            $(this).removeClass("outerActive");
                            $(this).removeClass("innerActive");
                        });
                        if ($this.attr("id") == "menu-overview-item") {
                            $this.addClass("outerActive");
                        } else {
                            $this.addClass("innerActive");
                        }
                        $(this).addClass("box-active");
                        if($(window).width() < 768) {
                            $(".left-bar").css("left","-180px");
                            $(".mask").css("display","none");
                        }
                        

                        
                    }
                }
            });
        }
        var checkElement = $this.next();

        if (checkElement.is(".treeview-menu") && checkElement.is(":visible")) {
            checkElement.slideUp(animationSpeed, function() {
                checkElement.removeClass("menu-open");
            });
            checkElement.parent("li").removeClass("active");
        } else if (checkElement.is(".treeview-menu") && !checkElement.is(":visible")) {
            //If the menu is not visible
            //Get the parent menu
            var parent = $this.parents("ul").first();
            //Close all open menus within the parent
            var ul = parent.find("ul:visible").slideUp(animationSpeed);
            //Remove the menu-open class from the parent
            ul.removeClass("menu-open");
            //Get the parent li
            var parent_li = $this.parent("li");

            //Open the target menu and add the menu-open class
            checkElement.slideDown(animationSpeed, function() {
                //Add the class active to the parent li
                checkElement.addClass("menu-open");
                parent.find("li.active").removeClass("active");
                parent_li.addClass("active");

            });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is(".treeview-menu")) {
            e.preventDefault();
        }
    });
};