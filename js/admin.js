var userNumber = "";
$(document).ready(function() {
  //打开页面时检查是否已经登录且是否有管理权限
  $.ajax({
    type: "POST",
    url: "../php/check_login.php",
    dataType: "JSON",
    data: {
      request: "getNumber"
    },
    success: function(e) {
      if (e.number == "" || e.number == null) {
        window.location.href = "../";
        window.event.returnValue = false;
      } else {
        userNumber = e.number;
        if (e.isManager == "0") {
          window.wxc.xcConfirm(
            "你不是管理员！",
            window.wxc.xcConfirm.typeEnum.error,
            {
              onOk: function() {
                window.location.href = "../user/";
                window.event.returnValue = false;
              },
              onClose: function() {
                window.location.href = "../user/";
                window.event.returnValue = false;
              }
            }
          );
        } else {
          //是管理员的话加载社员信息
          $.ajax({
            type: "GET",
            url: "../php/display.php?request=all",
            dataType: "JSON",
            success: function(e) {
              var appendText_main = "";
              i = 0;
              while (e[i]) {
                var name = e[i].name;
                var number = e[i].number;
                var college = e[i].college;
                var major = e[i].major;
                var gender = "";
                if (e[i].gender == "male") {
                  gender = "男";
                } else {
                  gender = "女";
                }
                var grade = "";
                if (e[i].grade == "1") {
                  grade = "大一";
                } else if (e[i].grade == "2") {
                  grade = "大二";
                } else if (e[i].grade == "3") {
                  grade = "大三";
                } else {
                  grade = "大四";
                }
                var qq = e[i].qq;
                var phone = e[i].phone;
                var isManager = "";
                if (e[i].isManager == "1") {
                  isManager = "管理员";
                } else {
                  isManager = "社员";
                }
                //
                var j = i + 1;
                var hrefNumber = escape("number=" + number);
                var subText_main =
                  "<tr><td class='count'>" +
                  j +
                  "</td><td class='isManager'>" +
                  isManager +
                  "</td><td class='name'><a class='displayMember-button' href='#' value='" +
                  number +
                  "'>" +
                  name +
                  "</a></td><td class='number'>" +
                  number +
                  "</td><td class='college'>" +
                  college +
                  "</td><td class='major'>" +
                  major +
                  "</td><td class='gender'>" +
                  gender +
                  "</td><td class='grade'>" +
                  grade +
                  "</td><td class='qq'>" +
                  qq +
                  "</td><td class='phone'>" +
                  phone +
                  "</td>";
                appendText_main += subText_main;
                //尾部添加编辑的图标
                //本人的信息不可在此处修改
                if (e[i].number != userNumber) {
                  subText_main =
                    "<td><button class='edit-img' value='" +
                    number +
                    "'><img src='../src/icon/edit.png' /></button></td></tr>";
                  appendText_main += subText_main;
                } else {
                  subText_main = "<td></td></tr>";
                  appendText_main += subText_main;
                }
                //
                i++;
              }
              $(".display-form").append(appendText_main);
              $(".display-all").tablesorter();
              $(".search").keyup(function() {
                var searchTerm = $(".search").val();
                var listItem = $(".results tbody").children("tr");
                var searchSplit = searchTerm.replace(/ /g, "'):containsi('");

                $.extend($.expr[":"], {
                  containsi: function(elem, i, match, array) {
                    return (
                      (elem.textContent || elem.innerText || "")
                        .toLowerCase()
                        .indexOf((match[3] || "").toLowerCase()) >= 0
                    );
                  }
                });

                $(".results tbody tr")
                  .not(":containsi('" + searchSplit + "')")
                  .each(function(e) {
                    $(this).attr("visible", "false");
                  });

                $(".results tbody tr:containsi('" + searchSplit + "')").each(
                  function(e) {
                    $(this).attr("visible", "true");
                  }
                );

                var jobCount = $('.results tbody tr[visible="true"]').length;
                $(".counter").text(jobCount + " item");

                if (jobCount == "0") {
                  $(".no-result").show();
                } else {
                  $(".no-result").hide();
                }
              });
            },
            error: function(err) {}
          });
          //检查是哪个组的组长
          $.ajax({
            type: "GET",
            url: "../php/group_info.php?request=group&number=" + userNumber,
            dataType: "JSON",
            success: function(e) {
              i = 0;
              var leftbar_append = "";
              var topnav_append = "";
              var mainbar_append = "";
              while (i < 5) {
                if (e[i] == "cpp") {
                  leftbar_append +=
                    '<li><a id="menu-cppList-item" href="#"><i class="iconfont-admin-menu icon-cpp"></i>C/C++组成员</a></li>';
                  topnav_append +=
                    "<th><h4 class='bar-item bar-item-6 cpp-item'><span><img class='icon' src='../src/icon/cpp.png' /></span><div class='item-text'>C/C++组成员</div></h4></th>";
                  mainbar_append +=
                    "<a name=\"cppList\"></a><div id=\"cppList-tab\" class='box'><div class='title col-xs-12'><h4 class='title-left'>C/C++组成员</h4><button class='addBtn' value='cpp'><i class=\"iconfont-admin-menu icon-add\"></i></button></div><div class='text-outer col-xs-12'><div class='display-text text'><table class='cpp-display group-display  tablesorter'><thead><tr><th class='table-sort'>序号</th><th class='table-sort'>类别</th><th class='table-sort'>姓名</th><th class='table-sort'>学号</th><th class='table-sort'>学院</th><th class='table-sort'>专业</th><th class='table-sort'>性别</th><th class='table-sort'>年级</th><th>QQ</th><th>手机号码</th><th>修改信息</th></tr></thead><tbody class='cpp-form'></tbody></table></div></div></div>";
                }
                if (e[i] == "algorithm") {
                  leftbar_append +=
                    '<li><a id="menu-algorithmList-item" href="#"><i class="iconfont-admin-menu icon-algorithm"></i>算法组成员</a></li>';
                  topnav_append +=
                    "<th><h4 class='bar-item bar-item-6 algorithm-item'><span><img class='icon' src='../src/icon/algorithm.png' /></span><div class='item-text'>算法组成员</div></h4></th>";
                  mainbar_append +=
                    "<a name=\"algorithmList\"></a><div id=\"algorithmList-tab\" class='box'><div class='title col-xs-12'><h4 class='title-left'>算法组成员</h4><button class='addBtn' value='algorithm'><i class=\"iconfont-admin-menu icon-add\"></i></button></div><div class='text-outer col-xs-12'><div class='display-text text'><table class='algorithm-display group-display  tablesorter'><thead><tr><th class='table-sort'>序号</th><th class='table-sort'>类别</th><th class='table-sort'>姓名</th><th class='table-sort'>学号</th><th class='table-sort'>学院</th><th class='table-sort'>专业</th><th class='table-sort'>性别</th><th class='table-sort'>年级</th><th>QQ</th><th>手机号码</th><th>修改信息</th></tr></thead><tbody class='algorithm-form'></tbody></table></div></div></div>";
                }
                if (e[i] == "web") {
                  leftbar_append +=
                    '<li><a id="menu-webList-item" href="#"><i class="iconfont-admin-menu icon-web"></i>Web组成员</a></li>';
                  topnav_append +=
                    "<th><h4 class='bar-item bar-item-6 web-item'><span><img class='icon' src='../src/icon/web.png' /></span><div class='item-text'>Web组成员</div></h4></th>";
                  mainbar_append +=
                    "<a name=\"webList\"></a><div id=\"webList-tab\" class='box'><div class='title col-xs-12'><h4 class='title-left'>Web组成员</h4><button class='addBtn' value='web'><i class=\"iconfont-admin-menu icon-add\"></i></button></div><div class='text-outer col-xs-12'><div class='display-text text'><table class='web-display group-display  tablesorter'><thead><tr><th class='table-sort'>序号</th><th class='table-sort'>类别</th><th class='table-sort'>姓名</th><th class='table-sort'>学号</th><th class='table-sort'>学院</th><th class='table-sort'>专业</th><th class='table-sort'>性别</th><th class='table-sort'>年级</th><th>QQ</th><th>手机号码</th><th>修改信息</th></tr></thead><tbody class='web-form'></tbody></table></div></div></div>";
                }
                if (e[i] == "linux") {
                  leftbar_append +=
                    '<li><a id="menu-linuxList-item" href="#"><i class="iconfont-admin-menu icon-linux"></i>Linux组成员</a></li>';
                  topnav_append +=
                    "<th><h4 class='bar-item bar-item-6 linux-item'><span><img class='icon' src='../src/icon/linux.png' /></span><div class='item-text'>Linux组成员</div></h4></th>";
                  mainbar_append +=
                    "<a name=\"linuxList\"></a><div id=\"linuxList-tab\" class='box'><div class='title col-xs-12'><h4 class='title-left'>Linux组成员</h4><button class='addBtn' value='linux'><i class=\"iconfont-admin-menu icon-add\"></i></button></div><div class='text-outer col-xs-12'><div class='display-text text'><table class='linux-display group-display  tablesorter'><thead><tr><th class='table-sort'>序号</th><th class='table-sort'>类别</th><th class='table-sort'>姓名</th><th class='table-sort'>学号</th><th class='table-sort'>学院</th><th class='table-sort'>专业</th><th class='table-sort'>性别</th><th class='table-sort'>年级</th><th>QQ</th><th>手机号码</th><th>修改信息</th></tr></thead><tbody class='linux-form'></tbody></table></div></div></div>";
                }
                if (e[i] == "java") {
                  leftbar_append +=
                    '<li><a id="menu-javaList-item" href="#"><i class="iconfont-admin-menu icon-java"></i>Java组成员</a></li>';
                  topnav_append +=
                    "<th><h4 class='bar-item bar-item-6 java-item'><span><img class='icon' src='../src/icon/java.png' /></span><div class='item-text'>Java组成员</div></h4></th>";
                  mainbar_append +=
                    "<a name=\"javaList\"></a><div id=\"javaList-tab\" class='box'><div class='title col-xs-12'><h4 class='title-left'>Java组成员</h4><button class='addBtn' value='java'><i class=\"iconfont-admin-menu icon-add\"></i></button></div><div class='text-outer col-xs-12'><div class='display-text text'><table class='java-display group-display  tablesorter'><thead><tr><th class='table-sort'>序号</th><th class='table-sort'>类别</th><th class='table-sort'>姓名</th><th class='table-sort'>学号</th><th class='table-sort'>学院</th><th class='table-sort'>专业</th><th class='table-sort'>性别</th><th class='table-sort'>年级</th><th>QQ</th><th>手机号码</th><th>修改信息</th></tr></thead><tbody class='java-form'></tbody></table></div></div></div>";
                }
                i++;
              }
              leftbar_append +=
                '<li><a id="menu-displayGrouper-item" href="#"><i class="iconfont-admin-menu icon-display"></i>查看组员信息<i class="iconfont-admin-menu icon-not-allowed"></i></a></li><li><a id="menu-updateGrouper-item" href="#"><i class="iconfont-admin-menu icon-update"></i>修改信息<i class="iconfont-admin-menu icon-not-allowed"></i></a></li>';
              $(".group-menu").append(leftbar_append);
              $(".top-display").after(topnav_append);
              $("#updateMember-tab").after(mainbar_append);
              getGroupMemberInfo();
            },
            error: function(err) {}
          });

          function getGroupMemberInfo() {
            //是组长的话获取各组的信息
            $.ajax({
              type: "GET",
              url: "../php/group_info.php?request=info&number=" + userNumber,
              dataType: "JSON",
              success: function(e) {
                var i = 0;
                var appendText_cpp = "";
                var appendText_algorithm = "";
                var appendText_web = "";
                var appendText_linux = "";
                var appendText_java = "";
                var a = 1,
                  b = 1,
                  c = 1,
                  d = 1,
                  f = 1;
                while (e[i]) {
                  var name = e[i].name;
                  var number = e[i].number;
                  var college = e[i].college;
                  var major = e[i].major;
                  var gender = "";
                  if (e[i].gender == "male") {
                    gender = "男";
                  } else {
                    gender = "女";
                  }
                  var grade = "";
                  if (e[i].grade == "1") {
                    grade = "大一";
                  } else if (e[i].grade == "2") {
                    grade = "大二";
                  } else if (e[i].grade == "3") {
                    grade = "大三";
                  } else {
                    grade = "大四";
                  }
                  var qq = e[i].qq;
                  var phone = e[i].phone;
                  var isLeader = "";
                  if (e[i].isLeader == "1") {
                    isLeader = "组长";
                  } else {
                    isLeader = "组员";
                  }
                  var hrefNumber = escape("number=" + number);
                  //
                  if (e[i].group == "cpp") {
                    var subText_cpp =
                      "<tr><td class='count'>" +
                      a +
                      "</td><td class='isLeader'>" +
                      isLeader +
                      "</td><td class='name'><a class='displayGrouper-button' href='#' value='?number=" +
                      number +
                      "&group=" +
                      e[i].group +
                      "'>" +
                      name +
                      "</a></td><td class='number'>" +
                      number +
                      "</td><td class='college'>" +
                      college +
                      "</td><td class='major'>" +
                      major +
                      "</td><td class='gender'>" +
                      gender +
                      "</td><td class='grade'>" +
                      grade +
                      "</td><td class='qq'>" +
                      qq +
                      "</td><td class='phone'>" +
                      phone +
                      "</td>";
                    appendText_cpp += subText_cpp;
                    a++;
                    //尾部添加编辑的图标
                    //本人信息不可在此修改
                    if (e[i].number != userNumber) {
                      subText_cpp =
                        "<td><button class='group-edit-img' id='cpp' value='" +
                        number +
                        "'><img src='../src/icon/edit.png' /></button></td></tr>";
                      appendText_cpp += subText_cpp;
                    } else {
                      subText_cpp = "<td></td></tr>";
                      appendText_cpp += subText_cpp;
                    }
                  }
                  if (e[i].group == "algorithm") {
                    var subText_algorithm =
                      "<tr><td class='count'>" +
                      b +
                      "</td><td class='isLeader'>" +
                      isLeader +
                      "</td><td class='name'><a class='displayGrouper-button' href='#' value='?number=" +
                      number +
                      "&group=" +
                      e[i].group +
                      "'>" +
                      name +
                      "</a></td><td class='number'>" +
                      number +
                      "</td><td class='college'>" +
                      college +
                      "</td><td class='major'>" +
                      major +
                      "</td><td class='gender'>" +
                      gender +
                      "</td><td class='grade'>" +
                      grade +
                      "</td><td class='qq'>" +
                      qq +
                      "</td><td class='phone'>" +
                      phone +
                      "</td>";
                    appendText_algorithm += subText_algorithm;
                    b++;
                    //尾部添加编辑的图标
                    //本人信息不可在此修改
                    if (e[i].number != userNumber) {
                      subText_algorithm =
                        "<td><button class='group-edit-img' id='algorithm' value='" +
                        number +
                        "'><img src='../src/icon/edit.png' /></button></td></tr>";
                      appendText_algorithm += subText_algorithm;
                    } else {
                      subText_algorithm = "<td></td></tr>";
                      appendText_algorithm += subText_algorithm;
                    }
                  }
                  if (e[i].group == "web") {
                    var subText_web =
                      "<tr><td class='count'>" +
                      c +
                      "</td><td class='isLeader'>" +
                      isLeader +
                      "</td><td class='name'><a class='displayGrouper-button' href='#' value='?number=" +
                      number +
                      "&group=" +
                      e[i].group +
                      "'>" +
                      name +
                      "</a></td><td class='number'>" +
                      number +
                      "</td><td class='college'>" +
                      college +
                      "</td><td class='major'>" +
                      major +
                      "</td><td class='gender'>" +
                      gender +
                      "</td><td class='grade'>" +
                      grade +
                      "</td><td class='qq'>" +
                      qq +
                      "</td><td class='phone'>" +
                      phone +
                      "</td>";
                    appendText_web += subText_web;
                    c++;
                    //尾部添加编辑的图标
                    //本人信息不可在此修改
                    if (e[i].number != userNumber) {
                      subText_web =
                        "<td><button class='group-edit-img' id='web' value='" +
                        number +
                        "'><img src='../src/icon/edit.png' /></button></td></tr>";
                      appendText_web += subText_web;
                    } else {
                      subText_web = "<td></td></tr>";
                      appendText_web += subText_web;
                    }
                  }
                  if (e[i].group == "linux") {
                    var subText_linux =
                      "<tr><td class='count'>" +
                      d +
                      "</td><td class='isLeader'>" +
                      isLeader +
                      "</td><td class='name'><a class='displayGrouper-button' href='#' value='?number=" +
                      number +
                      "&group=" +
                      e[i].group +
                      "'>" +
                      name +
                      "<a></td><td class='number'>" +
                      number +
                      "</td><td class='college'>" +
                      college +
                      "</td><td class='major'>" +
                      major +
                      "</td><td class='gender'>" +
                      gender +
                      "</td><td class='grade'>" +
                      grade +
                      "</td><td class='qq'>" +
                      qq +
                      "</td><td class='phone'>" +
                      phone +
                      "</td>";
                    appendText_linux += subText_linux;
                    d++;
                    //尾部添加编辑的图标
                    //本人信息不可在此修改
                    if (e[i].number != userNumber) {
                      subText_linux =
                        "<td><button class='group-edit-img' id='linux' value='" +
                        number +
                        "'><img src='../src/icon/edit.png' /></button></td></tr>";
                      appendText_linux += subText_linux;
                    } else {
                      subText_linux = "<td></td></tr>";
                      appendText_linux += subText_linux;
                    }
                  }
                  if (e[i].group == "java") {
                    var subText_java =
                      "<tr><td class='count'>" +
                      f +
                      "</td><td class='isLeader'>" +
                      isLeader +
                      "</td><td class='name'><a class='displayGrouper-button' href='#' value='?number=" +
                      number +
                      "&group=" +
                      e[i].group +
                      "'>" +
                      name +
                      "</a></td><td class='number'>" +
                      number +
                      "</td><td class='college'>" +
                      college +
                      "</td><td class='major'>" +
                      major +
                      "</td><td class='gender'>" +
                      gender +
                      "</td><td class='grade'>" +
                      grade +
                      "</td><td class='qq'>" +
                      qq +
                      "</td><td class='phone'>" +
                      phone +
                      "</td>";
                    appendText_java += subText_java;
                    f++;
                    //尾部添加编辑的图标
                    //本人信息不可在此修改
                    if (e[i].number != userNumber) {
                      subText_java =
                        "<td><button class='group-edit-img' id='java' value='" +
                        number +
                        "'><img src='../src/icon/edit.png' /></button></td></tr>";
                      appendText_java += subText_java;
                    } else {
                      subText_java = "<td></td></tr>";
                      appendText_java += subText_java;
                    }
                  }
                  i++;
                }
                $(".cpp-form").append(appendText_cpp);
                $(".algorithm-form").append(appendText_algorithm);
                $(".web-form").append(appendText_web);
                $(".linux-form").append(appendText_linux);
                $(".java-form").append(appendText_java);
                $(function() {
                  $(".display-all").tableExport({
                    headings: true,
                    fileName: "社员信息",
                    bootstrap: true,
                    position: "bottom",
                    ignoreCols: "操作",
                    formats: ["xlsx"]
                  });
                });
                $(function() {
                  $(".cpp-display").tableExport({
                    headings: true,
                    fileName: "C/C++组组员信息",
                    bootstrap: true,
                    position: "bottom",
                    ignoreRows: "操作",
                    formats: ["xlsx"]
                  });
                });
                $(function() {
                  $(".algorithm-display").tableExport({
                    headings: true,
                    fileName: "算法组组员信息",
                    bootstrap: true,
                    position: "bottom",
                    ignoreRows: "操作",
                    formats: ["xlsx"]
                  });
                });
                $(function() {
                  $(".web-display").tableExport({
                    headings: true,
                    fileName: "Web组组员信息",
                    bootstrap: true,
                    position: "bottom",
                    ignoreRows: "操作",
                    formats: ["xlsx"]
                  });
                });
                $(function() {
                  $(".linux-display").tableExport({
                    headings: true,
                    fileName: "Linux组组员信息",
                    bootstrap: true,
                    position: "bottom",
                    ignoreRows: "操作",
                    formats: ["xlsx"]
                  });
                });
                $(function() {
                  $(".java-display").tableExport({
                    headings: true,
                    fileName: "Java组组员信息",
                    bootstrap: true,
                    position: "bottom",
                    ignoreRows: "操作",
                    formats: ["xlsx"]
                  });
                });
                $(function() {
                  $(".group-display").tablesorter();
                });
                changeTab();
                var reason = getReason();
                if (reason == "update") {
                  localStorage.setItem("reason", "refresh");
                } else if (reason == "refresh") {
                  localStorage.setItem("reason", "none");
                  window.location.href = "../admin";
                }
              },
              error: function(err) {}
            });
          }
        }
      }
    },
    error: function(err) {}
  });

  $(window).resize(function() {
    var width = $(window).width();
    if (width > 768) {
      $(".left-bar").css("left", "0");
      $(".mask").css("display", "none");
    } else {
      $(".left-bar").css("left", "-180px");
      $(".mask").css("display", "none");
    }
  });

  let $btn = $(".avatar-small"),
    $mask = $(".mask"),
    $nav = $(".left-bar");
  $btn.click(function() {
    if ($(".left-bar").css("left") == "-180px") {
      $mask.css("display", "block");
      $nav.css("left", "0");
    } else {
      $mask.css("display", "none");
      $nav.css("left", "-180px");
    }
  });

  $mask.click(function() {
    $mask.css("display", "none");
    $nav.css("left", "-180px");
  });
});

function changeTab() {
  var href = window.location.search;
  if (href != "") {
    href = href.replace("#", "");
    var back = href.match(/\?back=(.*?)$/)[1];
    $("#menu-overview-item").removeClass("outerActive");
    $("#menu-" + back + "-item").addClass("innerActive");
    $("#menu-" + back + "-item")
      .parent()
      .parent()
      .addClass("menu-open");
    $("#menu-" + back + "-item")
      .parent()
      .parent()
      .css("display", "block");
    $("#menu-" + back + "-item")
      .parent()
      .parent()
      .parent()
      .addClass("active");
    $("#overview-tab").removeClass("box-active");
    $("#" + back + "-tab").addClass("box-active");
  }
}
function getReason() {
  return (reason = localStorage.getItem("reason"));
}
