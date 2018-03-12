var userNumber = "";
$(document).ready(function() {
    //打开页面时检查是否已经登录且是否有管理权限
    $.ajax({
        type: "POST",
        url: "../php/check_login.php",
        dataType: "JSON",
        data: {
            "request": "getNumber"
        },
        success: function(e) {
            if (e.number == '' || e.number == null) {
                window.location.href = "../";
                window.event.returnValue = false;
            } else {
                userNumber = e.number;
                if (e.isManager == "0") {
                    window.wxc.xcConfirm("你不是管理员！", window.wxc.xcConfirm.typeEnum.error, {
                        onOk: function() {
                            window.location.href = "../user/";
                            window.event.returnValue = false;
                        },
                        onClose: function() {
                            window.location.href = "../user/";
                            window.event.returnValue = false;
                        }
                    });

                } else {
                    //是管理员的话加载社员信息
                    $.ajax({
                        type: "GET",
                        url: "../php/display.php",
                        dataType: "JSON",
                        data: {
                            "request": "all"
                        },
                        success: function(e) {
                            var appendText_main = "";
                            i = 0;
                            while (e[i]) {
                                var name = e[i].name;
                                var number = e[i].number;
                                var college = e[i].college;
                                var major = e[i].major;
                                var gender = '';
                                if (e[i].gender == 'male') {
                                    gender = '男';
                                } else {
                                    gender = '女';
                                }
                                var grade = '';
                                if (e[i].grade == '1') {
                                    grade = '大一';
                                } else if (e[i].grade == '2') {
                                    grade = '大二';
                                } else if (e[i].grade == '3') {
                                    grade = '大三';
                                } else {
                                    grade = '大四';
                                }
                                var qq = e[i].qq;
                                var phone = e[i].phone;
                                var isManager = '';
                                if (e[i].isManager == '1') {
                                    isManager = '管理员';
                                } else {
                                    isManager = '社员';
                                }
                                //
                                var j = i + 1;
                                var hrefNumber = escape('number=' + number);
                                var subText_main = "<tr><td class='count'>" + j + "</td><td class='isManager'>" + isManager + "</td><td class='name'><a href='view.html?" + hrefNumber + "' target='_blank'>" + name + "</a></td><td class='number'>" + number + "</td><td class='college'>" + college + "</td><td class='major'>" + major + "</td><td class='gender'>" + gender + "</td><td class='grade'>" + grade + "</td><td class='qq'>" + qq + "</td><td class='phone'>" + phone + "</td>";
                                appendText_main += subText_main;
                                //尾部添加编辑的图标
                                //本人的信息不可在此处修改
                                if (e[i].number != userNumber) {
                                    subText_main = "<td><button class='edit-img' value='" + number + "'><img src='../src/icon/edit.png' /></button>";
                                    appendText_main += subText_main;
                                } else {
                                    subText_main = "<td>";
                                    appendText_main += subText_main;
                                }

                                //如果不是管理员，添加删除的图标
                                if (e[i].isManager != 1) {
                                    subText_main = "<button class='drop-img' value='" + number + "'><img src='../src/icon/drop.png' /></button></td></tr>";
                                    appendText_main += subText_main;
                                } else {
                                    subText_main = "<span class='drop-no-img'></span></td></tr>";
                                    appendText_main += subText_main;
                                }
                                //
                                i++;
                            }
                            $(".display-form").append(appendText_main);
                            $("#main-statistics").append("<h5>当前共有" + i + "人</h5>");
                        },
                        error: function(err) {

                        }
                    });
                    //检查是哪个组的组长
                    $.ajax({
                        type: "GET",
                        url: "../php/group_info.php",
                        dataType: "JSON",
                        data: {
                            "request": "group",
                            "number": userNumber
                        },
                        success: function(e) {
                            i = 0;
                            var leftbar_append = '';
                            var topnav_append = '';
                            while (i < 5) {
                                if (e[i] == "cpp") {
                                    leftbar_append += "<h4 class='bar-item cpp-item'><span><img class='icon' src='../src/icon/cpp.png' /></span><span class='item-text'>C/C++组成员</span></h4>";
                                    topnav_append += "<th><h4 class='bar-item bar-item-6 cpp-item'><span><img class='icon' src='../src/icon/cpp.png' /></span><div class='item-text'>C/C++组成员</div></h4></th>";
                                    $(".main-bar").append("<div class='cpp-box box'><div class='title col-xs-12'><h4 class='title-left'>C/C++组成员</h4><button class='addBtn' value='cpp'><img src='../src/icon/add.png' /></button></div><div class='text-outer col-xs-12'><div class='display-text text'><table class='cpp-display group-display table-sort table-sort-search'><thead><tr><th class='table-sort'>序号</th><th class='table-sort'>类别</th><th class='table-sort'>姓名</th><th class='table-sort'>学号</th><th class='table-sort'>学院</th><th class='table-sort'>专业</th><th class='table-sort'>性别</th><th class='table-sort'>年级</th><th>QQ</th><th>手机号码</th><th>操作</th></tr></thead><tbody class='cpp-form'></tbody></table></div></div></div>");
                                }
                                if (e[i] == "algorithm") {
                                    leftbar_append += "<h4 class='bar-item algorithm-item'><span><img class='icon' src='../src/icon/algorithm.png' /></span><span class='item-text'>算法组成员</span></h4>";
                                    topnav_append += "<th><h4 class='bar-item bar-item-6 algorithm-item'><span><img class='icon' src='../src/icon/algorithm.png' /></span><div class='item-text'>算法组成员</div></h4></th>";
                                    $(".main-bar").append("<div class='algorithm-box box'><div class='title col-xs-12'><h4 class='title-left'>算法组成员</h4><button class='addBtn' value='algorithm'><img src='../src/icon/add.png' /></button></div><div class='text-outer col-xs-12'><div class='display-text text'><table class='algorithm-display group-display table-sort table-sort-search'><thead><tr><th class='table-sort'>序号</th><th class='table-sort'>类别</th><th class='table-sort'>姓名</th><th class='table-sort'>学号</th><th class='table-sort'>学院</th><th class='table-sort'>专业</th><th class='table-sort'>性别</th><th class='table-sort'>年级</th><th>QQ</th><th>手机号码</th><th>操作</th></tr></thead><tbody class='algorithm-form'></tbody></table></div></div></div>");
                                }
                                if (e[i] == "web") {
                                    leftbar_append += "<h4  class='bar-item web-item'><span><img class='icon' src='../src/icon/web.png' /></span><span class='item-text'>Web组成员</span></h4>";
                                    topnav_append += "<th><h4 class='bar-item bar-item-6 web-item'><span><img class='icon' src='../src/icon/web.png' /></span><div class='item-text'>Web组成员</div></h4></th>";
                                    $(".main-bar").append("<div class='web-box box'><div class='title col-xs-12'><h4 class='title-left'>Web组成员</h4><button class='addBtn' value='web'><img src='../src/icon/add.png' /></button></div><div class='text-outer col-xs-12'><div class='display-text text'><table class='web-display group-display table-sort table-sort-search'><thead><tr><th class='table-sort'>序号</th><th class='table-sort'>类别</th><th class='table-sort'>姓名</th><th class='table-sort'>学号</th><th class='table-sort'>学院</th><th class='table-sort'>专业</th><th class='table-sort'>性别</th><th class='table-sort'>年级</th><th>QQ</th><th>手机号码</th><th>操作</th></tr></thead><tbody class='web-form'></tbody></table></div></div></div>");
                                }
                                if (e[i] == "linux") {
                                    leftbar_append += "<h4  class='bar-item linux-item'><span><img class='icon' src='../src/icon/linux.png' /></span><span class='item-text'>Linux组成员</span></h4>";
                                    topnav_append += "<th><h4 class='bar-item bar-item-6 linux-item'><span><img class='icon' src='../src/icon/linux.png' /></span><div class='item-text'>Linux组成员</div></h4></th>";
                                    $(".main-bar").append("<div class='linux-box box'><div class='title col-xs-12'><h4 class='title-left'>Linux组成员</h4><button class='addBtn' value='linux'><img src='../src/icon/add.png' /></button></div><div class='text-outer col-xs-12'><div class='display-text text'><table class='linux-display group-display table-sort table-sort-search'><thead><tr><th class='table-sort'>序号</th><th class='table-sort'>类别</th><th class='table-sort'>姓名</th><th class='table-sort'>学号</th><th class='table-sort'>学院</th><th class='table-sort'>专业</th><th class='table-sort'>性别</th><th class='table-sort'>年级</th><th>QQ</th><th>手机号码</th><th>操作</th></tr></thead><tbody class='linux-form'></tbody></table></div></div></div>");
                                }
                                if (e[i] == "java") {
                                    leftbar_append += "<h4  class='bar-item java-item'><span><img class='icon' src='../src/icon/java.png' /></span><span class='item-text'>Java组成员</span></h4>";
                                    topnav_append += "<th><h4 class='bar-item bar-item-6 java-item'><span><img class='icon' src='../src/icon/java.png' /></span><div class='item-text'>Java组成员</div></h4></th>";
                                    $(".main-bar").append("<div class='java-box box'><div class='title col-xs-12'><h4 class='title-left'>Java组成员</h4><button class='addBtn' value='java'><img src='../src/icon/add.png' /></button></div><div class='text-outer col-xs-12'><div class='display-text text'><table class='java-display group-display table-sort table-sort-search'><thead><tr><th class='table-sort'>序号</th><th class='table-sort'>类别</th><th class='table-sort'>姓名</th><th class='table-sort'>学号</th><th class='table-sort'>学院</th><th class='table-sort'>专业</th><th class='table-sort'>性别</th><th class='table-sort'>年级</th><th>QQ</th><th>手机号码</th><th>操作</th></tr></thead><tbody class='java-form'></tbody></table></div></div></div>");
                                }
                                i++;
                            }
                            $(".left-display").after(leftbar_append);
                            $(".top-display").after(topnav_append);
                        },
                        error: function(err) {},
                    });
                    //是组长的话获取各组的信息
                    $.ajax({
                        type: "GET",
                        url: "../php/group_info.php",
                        dataType: "JSON",
                        data: {
                            "request": "info",
                            "number": userNumber
                        },
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
                                var gender = '';
                                if (e[i].gender == 'male') {
                                    gender = '男';
                                } else {
                                    gender = '女';
                                }
                                var grade = '';
                                if (e[i].grade == '1') {
                                    grade = '大一';
                                } else if (e[i].grade == '2') {
                                    grade = '大二';
                                } else if (e[i].grade == '3') {
                                    grade = '大三';
                                } else {
                                    grade = '大四';
                                }
                                var qq = e[i].qq;
                                var phone = e[i].phone;
                                var isLeader = '';
                                if (e[i].isLeader == '1') {
                                    isLeader = '组长';
                                } else {
                                    isLeader = '组员';
                                }
                                var hrefNumber = escape('number=' + number);
                                //
                                if (e[i].group == "cpp") {
                                    var subText_cpp = "<tr><td class='count'>" + a + "</td><td class='isLeader'>" + isLeader + "</td><td class='name'><a href='view.html?" + hrefNumber + "' target='_blank'>" + name + "</a></td><td class='number'>" + number + "</td><td class='college'>" + college + "</td><td class='major'>" + major + "</td><td class='gender'>" + gender + "</td><td class='grade'>" + grade + "</td><td class='qq'>" + qq + "</td><td class='phone'>" + phone + "</td>";
                                    appendText_cpp += subText_cpp;
                                    a++;
                                    //尾部添加编辑的图标
                                    //本人信息不可在此修改
                                    if (e[i].number != userNumber) {
                                        subText_cpp = "<td><button class='group-edit-img' id='cpp' value='" + number + "'><img src='../src/icon/edit.png' /></button>";
                                        appendText_cpp += subText_cpp;
                                    } else {
                                        subText_cpp = "<td>";
                                        appendText_cpp += subText_cpp;
                                    }
                                    //如果不是组长，添加删除的图标
                                    if (e[i].isLeader != 1) {
                                        subText_cpp = "<button class='group-drop-img' id='cpp' value='" + number + "'><img src='../src/icon/drop.png' /></button></td></tr>";
                                        appendText_cpp += subText_cpp;
                                    } else {
                                        subText_cpp = "<span class='drop-no-img'></span></td></tr>";
                                        appendText_cpp += subText_cpp;
                                    }
                                }
                                if (e[i].group == "algorithm") {
                                    var subText_algorithm = "<tr><td class='count'>" + b + "</td><td class='isLeader'>" + isLeader + "</td><td class='name'><a href='view.html?" + hrefNumber + "' target='_blank'>" + name + "</a></td><td class='number'>" + number + "</td><td class='college'>" + college + "</td><td class='major'>" + major + "</td><td class='gender'>" + gender + "</td><td class='grade'>" + grade + "</td><td class='qq'>" + qq + "</td><td class='phone'>" + phone + "</td>";
                                    appendText_algorithm += subText_algorithm;
                                    b++;
                                    //尾部添加编辑的图标
                                    //本人信息不可在此修改
                                    if (e[i].number != userNumber) {
                                        subText_algorithm = "<td><button class='group-edit-img' id='algorithm' value='" + number + "'><img src='../src/icon/edit.png' /></button>";
                                        appendText_algorithm += subText_algorithm;
                                    } else {
                                        subText_algorithm = "<td>";
                                        appendText_algorithm += subText_algorithm;
                                    }
                                    //如果不是组长，添加删除的图标
                                    if (e[i].isLeader != 1) {
                                        subText_algorithm = "<button class='group-drop-img' id='algorithm' value='" + number + "'><img src='../src/icon/drop.png' /></button></td></tr>";
                                        appendText_algorithm += subText_algorithm;
                                    } else {
                                        subText_algorithm = "<span class='drop-no-img'></span></td></tr>";
                                        appendText_algorithm += subText_algorithm;
                                    }
                                }
                                if (e[i].group == "web") {
                                    var subText_web = "<tr><td class='count'>" + c + "</td><td class='isLeader'>" + isLeader + "</td><td class='name'><a href='view.html?" + hrefNumber + "' target='_blank'>" + name + "</a></td><td class='number'>" + number + "</td><td class='college'>" + college + "</td><td class='major'>" + major + "</td><td class='gender'>" + gender + "</td><td class='grade'>" + grade + "</td><td class='qq'>" + qq + "</td><td class='phone'>" + phone + "</td>";
                                    appendText_web += subText_web;
                                    c++;
                                    //尾部添加编辑的图标
                                    //本人信息不可在此修改
                                    if (e[i].number != userNumber) {
                                        subText_web = "<td><button class='group-edit-img' id='web' value='" + number + "'><img src='../src/icon/edit.png' /></button>";
                                        appendText_web += subText_web;
                                    } else {
                                        subText_web = "<td>";
                                        appendText_web += subText_web;
                                    }
                                    //如果不是组长，添加删除的图标
                                    if (e[i].isLeader != 1) {
                                        subText_web = "<button class='group-drop-img' id='web' value='" + number + "'><img src='../src/icon/drop.png' /></button></td></tr>";
                                        appendText_web += subText_web;
                                    } else {
                                        subText_web = "<span class='drop-no-img'></span></td></tr>";
                                        appendText_web += subText_web;
                                    }
                                }
                                if (e[i].group == "linux") {
                                    var subText_linux = "<tr><td class='count'>" + d + "</td><td class='isLeader'>" + isLeader + "</td><td class='name'><a href='view.html?" + hrefNumber + "' target='_blank'>" + name + "<a></td><td class='number'>" + number + "</td><td class='college'>" + college + "</td><td class='major'>" + major + "</td><td class='gender'>" + gender + "</td><td class='grade'>" + grade + "</td><td class='qq'>" + qq + "</td><td class='phone'>" + phone + "</td>";
                                    appendText_linux += subText_linux;
                                    d++;
                                    //尾部添加编辑的图标
                                    //本人信息不可在此修改
                                    if (e[i].number != userNumber) {
                                        subText_linux = "<td><button class='group-edit-img' id='linux' value='" + number + "'><img src='../src/icon/edit.png' /></button>";
                                        appendText_linux += subText_linux;
                                    } else {
                                        subText_linux = "<td>";
                                        appendText_linux += subText_linux;
                                    }
                                    //如果不是组长，添加删除的图标
                                    if (e[i].isLeader != 1) {
                                        subText_linux = "<button class='group-drop-img' id='linux' value='" + number + "'><img src='../src/icon/drop.png' /></button></td></tr>";
                                        appendText_linux += subText_linux;
                                    } else {
                                        subText_linux = "<span class='drop-no-img'></span></td></tr>";
                                        appendText_linux += subText_linux;
                                    }
                                }
                                if (e[i].group == "java") {
                                    var subText_java = "<tr><td class='count'>" + f + "</td><td class='isLeader'>" + isLeader + "</td><td class='name'><a href='view.html?" + hrefNumber + "' target='_blank'>" + name + "</a></td><td class='number'>" + number + "</td><td class='college'>" + college + "</td><td class='major'>" + major + "</td><td class='gender'>" + gender + "</td><td class='grade'>" + grade + "</td><td class='qq'>" + qq + "</td><td class='phone'>" + phone + "</td>";
                                    appendText_java += subText_java;
                                    f++;
                                    //尾部添加编辑的图标
                                    //本人信息不可在此修改
                                    if (e[i].number != userNumber) {
                                        subText_java = "<td><button class='group-edit-img' id='java' value='" + number + "'><img src='../src/icon/edit.png' /></button>";
                                        appendText_java += subText_java;
                                    } else {
                                        subText_java = "<td>";
                                        appendText_java += subText_java;
                                    }
                                    //如果不是组长，添加删除的图标
                                    if (e[i].isLeader != 1) {
                                        subText_java = "<button class='group-drop-img' id='java' value='" + number + "'><img src='../src/icon/drop.png' /></button></td></tr>";
                                        appendText_java += subText_java;
                                    } else {
                                        subText_java = "<span class='drop-no-img'></span></td></tr>";
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
                                $('table.table-sort').tablesort();
                            });
                        },
                        error: function(err) {

                        }
                    });
                }
            }
        },
        error: function(err) {

        }
    });
    $(".overview-box").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".overview-item").css("background-color", "rgba(87, 110, 136, 0.85)");
    $(".display-box").css("display", "none");
    $(".update-box").css("display", "none");
    $(".activity-box").css("display", "none");
    $(".activity-info").css("display", "none");
    $(".cpp-box").css("display", "none");
    $(".algorithm-box").css("display", "none");
    $(".web-box").css("display", "none");
    $(".linux-box").css("display", "none");
    $(".java-box").css("display", "none");
});

$(document).on("click", ".overview-item", function() {
    $(".update-box").empty();
    $(".overview-box").css("display", "block");
    $(".title").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".overview-item").css("background-color", "rgba(87, 110, 136, 0.85)");
    $(".display-box").css("display", "none");
    $(".update-box").css("display", "none");
    $(".activity-box").css("display", "none");
    $(".activity-info").css("display", "none");
    $(".cpp-box").css("display", "none");
    $(".algorithm-box").css("display", "none");
    $(".web-box").css("display", "none");
    $(".linux-box").css("display", "none");
    $(".java-box").css("display", "none");
});

$(document).on("click", ".display-item", function() {
    $(".update-box").empty();
    $(".overview-box").css("display", "none");
    $(".display-box").css("display", "block");
    $(".title").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".display-item").css("background-color", "rgba(87, 110, 136, 0.85)");
    $(".update-box").css("display", "none");
    $(".activity-box").css("display", "none");
    $(".activity-info").css("display", "none");
    $(".cpp-box").css("display", "none");
    $(".algorithm-box").css("display", "none");
    $(".web-box").css("display", "none");
    $(".linux-box").css("display", "none");
    $(".java-box").css("display", "none");
});

$(document).on("click", ".activity-item", function() {
    $(".update-box").empty();
    $(".overview-box").css("display", "none");
    $(".display-box").css("display", "none");
    $(".update-box").css("display", "none");
    $(".activity-box").css("display", "block");
    $(".activity-info").css("display", "none");
    $(".title").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".activity-item").css("background-color", "rgba(87, 110, 136, 0.85)");
    $(".cpp-box").css("display", "none");
    $(".algorithm-box").css("display", "none");
    $(".web-box").css("display", "none");
    $(".linux-box").css("display", "none");
    $(".java-box").css("display", "none");
});

$(document).on("click", ".cpp-item", function() {
    $(".update-box").empty();
    $(".overview-box").css("display", "none");
    $(".display-box").css("display", "none");
    $(".update-box").css("display", "none");
    $(".activity-box").css("display", "none");
    $(".activity-info").css("display", "none");
    $(".cpp-box").css("display", "block");
    $(".title").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".cpp-item").css("background-color", "rgba(87, 110, 136, 0.85)");
    $(".algorithm-box").css("display", "none");
    $(".web-box").css("display", "none");
    $(".linux-box").css("display", "none");
    $(".java-box").css("display", "none");
});

$(document).on("click", ".algorithm-item", function() {
    $(".update-box").empty();
    $(".overview-box").css("display", "none");
    $(".display-box").css("display", "none");
    $(".update-box").css("display", "none");
    $(".activity-box").css("display", "none");
    $(".activity-info").css("display", "none");
    $(".cpp-box").css("display", "none");
    $(".algorithm-box").css("display", "block");
    $(".title").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".algorithm-item").css("background-color", "rgba(87, 110, 136, 0.85)");
    $(".web-box").css("display", "none");
    $(".linux-box").css("display", "none");
    $(".java-box").css("display", "none");
});

$(document).on("click", ".web-item", function() {
    $(".update-box").empty();
    $(".overview-box").css("display", "none");
    $(".display-box").css("display", "none");
    $(".update-box").css("display", "none");
    $(".activity-box").css("display", "none");
    $(".activity-info").css("display", "none");
    $(".cpp-box").css("display", "none");
    $(".algorithm-box").css("display", "none");
    $(".web-box").css("display", "block");
    $(".title").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".web-item").css("background-color", "rgba(87, 110, 136, 0.85)");
    $(".linux-box").css("display", "none");
    $(".java-box").css("display", "none");
});

$(document).on("click", ".linux-item", function() {
    $(".update-box").empty();
    $(".overview-box").css("display", "none");
    $(".display-box").css("display", "none");
    $(".update-box").css("display", "none");
    $(".activity-box").css("display", "none");
    $(".activity-info").css("display", "none");
    $(".cpp-box").css("display", "none");
    $(".algorithm-box").css("display", "none");
    $(".web-box").css("display", "none");
    $(".linux-box").css("display", "block");
    $(".title").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".linux-item").css("background-color", "rgba(87, 110, 136, 0.85)");
    $(".java-box").css("display", "none");
});

$(document).on("click", ".java-item", function() {
    $(".update-box").empty();
    $(".overview-box").css("display", "none");
    $(".display-box").css("display", "none");
    $(".update-box").css("display", "none");
    $(".activity-box").css("display", "none");
    $(".activity-info").css("display", "none");
    $(".cpp-box").css("display", "none");
    $(".algorithm-box").css("display", "none");
    $(".web-box").css("display", "none");
    $(".linux-box").css("display", "none");
    $(".java-box").css("display", "block");
    $(".title").css("display", "block");
    $(".bar-item").css("background-color", "#435770");
    $(".java-item").css("background-color", "rgba(87, 110, 136, 0.85)");
});