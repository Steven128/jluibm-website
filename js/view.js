$(document).on("click", ".displayMember-button", function() {
  var stu_number = $(this).attr("value");
  //获取该社员的详细信息
  function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return Min + Math.round(Rand * Range);
  }
  var num = GetRandomNum(10000, 99999);
  $.ajax({
    type: "GET",
    url: "../php/user-info.php?request=get_info&number=" + stu_number,
    dataType: "JSON",
    success: function(e) {
      var gender = "";
      if (e[0].gender == "male") {
        gender = "男";
      } else {
        gender = "女";
      }
      var grade = "";
      if (e[0].grade == "1") {
        grade = "大一";
      } else if (e[0].grade == "2") {
        grade = "大二";
      } else if (e[0].grade == "3") {
        grade = "大三";
      } else {
        grade = "大四";
      }
      $("#updateMember-text-outer").remove();
      appendText_user =
        '<div id="updateMember-text-outer" class="text-outer"><div class=\'text\'><div class="user-main-head"><div class="userPic-box"><img class="stuPic" src="" /><div class=\'userName\'><h3>' +
        e[0].name +
        '</h3></div></div></div><div class="user-main col-xs-12 col-md-6"><div class="user-text">';
      appendText_user +=
        "<div class='info-box'><h4>基本信息</h4><div class='box-inner'><div class='inner-text'>学号：" +
        e[0].number +
        "</div>";
      appendText_user +=
        "<div class='inner-text'>学院：" + e[0].college + "</div>";
      appendText_user +=
        "<div class='inner-text'>专业：" + e[0].major + "</div>";
      appendText_user += "<div class='inner-text'>性别：" + gender + "</div>";
      appendText_user += "<div class='inner-text'>年级：" + grade + "</div>";

      appendText_user +=
        ' </div></div><div class="user-group"><div class="group-box"><h4>加入的组</h4><div class="box-inner"><div class="group-box-inner">';
      if (
        e[1].cpp == 0 &&
        e[1].algorithm == 0 &&
        e[1].web == 0 &&
        e[1].linux == 0 &&
        e[1].java == 0
      ) {
        appendText_user +=
          '<div class="inner-text">这里空空如也，什么都没有。</div>';
      } else {
        if (e[1].cpp == 1) {
          appendText_user += '<div class="inner-text">C/C++组</div>';
        }
        if (e[1].algorithm == 1) {
          appendText_user += '<div class="inner-text">算法组</div>';
        }
        if (e[1].web == 1) {
          appendText_user += '<div class="inner-text">Web组</div>';
        }
        if (e[1].linux == 1) {
          appendText_user += '<div class="inner-text">Linux组</div>';
        }
        if (e[1].java == 1) {
          appendText_user += '<div class="inner-text">Java组</div>';
        }
      }
      appendText_user +=
        '</div></div></div></div></div></div><div class="user-activities col-xs-12 col-md-6">';
      appendText_user +=
        '<div class="activities-box"><h4>参加过的活动</h4><div class="box-inner activity-inner">';
      appendText_user +=
        "</div></div></div><div class='delete-btn-area col-xs-12'>";
      if (e[0].isManager == 0) {
        appendText_user +=
          "<button class='delete-member' value='" +
          e[0].number +
          "'>删除社员</button>";
      }
      appendText_user += "</div></div></div>";
      $("#displayMember-tab").append(appendText_user);
      //
      $("#memberList-tab").removeClass("box-active");
      $("#displayMember-tab").addClass("box-active");
      $("#menu-memberList-item").removeClass("innerActive");
      $("#menu-displayMember-item").addClass("innerActive");
      if (e[0].isManager != 1) {
        $(".manager-item").remove();
      }
      $(".stuPic").attr("src", e[0].userPicPath + "?" + num);

      //获取参加过的活动
      $.ajax({
        type: "GET",
        url: "../php/user-info.php?request=get_activity&number=" + stu_number,
        dataType: "JSON",
        success: function(e) {
          if (e == "") {
            appendText_activity =
              '<div class="inner-text">这里空空如也，什么都没有。</div>';
          } else {
            var i = 0;
            appendText_activity = "<table><tbody>";
            while (e[i]) {
              appendText_activity +=
                '<tr class="inner-text"><td>' +
                e[i].activity_name +
                "</td><td>" +
                e[i].time.substring(0, 10) +
                "</td></tr>";
              i++;
            }
            appendText_activity += "</tbody></table>";
          }
          $(".activity-inner").append(appendText_activity);
        },
        error: function(err) {}
      });
    },
    error: function(err) {}
  });
});

$(document).on("click", ".displayGrouper-button", function() {
  var stu_info = $(this).attr("value");
  var stu_number = stu_info.match(/\?number=(.*?)\&/)[1];
  var stu_group = stu_info.match(/\&group=(.*?)$/)[1];
  //获取该组员的详细信息
  function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return Min + Math.round(Rand * Range);
  }
  var num = GetRandomNum(10000, 99999);
  $.ajax({
    type: "GET",
    url: "../php/user-info.php?request=get_info&number=" + stu_number,
    dataType: "JSON",
    success: function(e) {
      console.log(e);
      var gender = "";
      if (e[0].gender == "male") {
        gender = "男";
      } else {
        gender = "女";
      }
      var grade = "";
      if (e[0].grade == "1") {
        grade = "大一";
      } else if (e[0].grade == "2") {
        grade = "大二";
      } else if (e[0].grade == "3") {
        grade = "大三";
      } else {
        grade = "大四";
      }
      if (stu_group == 'cpp') {
        groupName = 'C/C++';
    } else if (stu_group == 'algorithm') {
        groupName = '算法';
    } else if (stu_group == 'web') {
        groupName = 'Web';
    } else if (stu_group == 'linux') {
        groupName = 'Linux';
    } else if (stu_group == 'java') {
        groupName = 'Java';
    }
      $("#displayGrouper-tab").find(".title").html("<h4 class=\"title-left\">查看 " + groupName + "组 组员信息</h4>");
      $("#displayGrouper-text-outer").remove();
      appendText_user =
        '<div id="displayGrouper-text-outer" class="text-outer"><div class=\'text\'><div class="user-main-head"><div class="userPic-box"><img class="stuPic" src="" /><div class=\'userName\'><h3>' +
        e[0].name +
        '</h3></div></div></div><div class="user-main col-xs-12 col-md-6"><div class="user-text">';
      appendText_user +=
        "<div class='info-box'><h4>基本信息</h4><div class='box-inner'><div class='inner-text'>学号：" +
        e[0].number +
        "</div>";
      appendText_user +=
        "<div class='inner-text'>学院：" + e[0].college + "</div>";
      appendText_user +=
        "<div class='inner-text'>专业：" + e[0].major + "</div>";
      appendText_user += "<div class='inner-text'>性别：" + gender + "</div>";
      appendText_user += "<div class='inner-text'>年级：" + grade + "</div>";

      appendText_user +=
        ' </div></div><div class="user-group"><div class="group-box"><h4>加入的组</h4><div class="box-inner"><div class="group-box-inner">';
      if (
        e[1].cpp == 0 &&
        e[1].algorithm == 0 &&
        e[1].web == 0 &&
        e[1].linux == 0 &&
        e[1].java == 0
      ) {
        appendText_user +=
          '<div class="inner-text">这里空空如也，什么都没有。</div>';
      } else {
        if (e[1].cpp == 1) {
          appendText_user += '<div class="inner-text">C/C++组</div>';
        }
        if (e[1].algorithm == 1) {
          appendText_user += '<div class="inner-text">算法组</div>';
        }
        if (e[1].web == 1) {
          appendText_user += '<div class="inner-text">Web组</div>';
        }
        if (e[1].linux == 1) {
          appendText_user += '<div class="inner-text">Linux组</div>';
        }
        if (e[1].java == 1) {
          appendText_user += '<div class="inner-text">Java组</div>';
        }
      }
      appendText_user +=
        '</div></div></div></div></div></div><div class="user-activities col-xs-12 col-md-6">';
      appendText_user +=
        '<div class="activities-box"><h4>参加过的活动</h4><div class="box-inner activity-inner">';
      appendText_user +=
        "</div></div></div><div class='delete-btn-area col-xs-12'>";
      if (e[0].isManager == 0) {
        appendText_user +=
          "<button id='" +
          stu_group +
          "' class='delete-grouper' value='" +
          e[0].number +
          "'>删除组员</button>";
      }
      appendText_user += "</div></div></div>";
      $("#displayGrouper-tab").append(appendText_user);
      //
      $("#" + stu_group + "List-tab").removeClass("box-active");
      $("#displayGrouper-tab").addClass("box-active");
      $("#menu-" + stu_group + "List-item").removeClass("innerActive");
      $("#menu-displayGrouper-item").addClass("innerActive");
      if (e[0].isManager != 1) {
        $(".manager-item").remove();
      }
      $(".stuPic").attr("src", e[0].userPicPath + "?" + num);

      //获取参加过的活动
      $.ajax({
        type: "GET",
        url: "../php/user-info.php?request=get_activity&number=" + stu_number,
        dataType: "JSON",
        success: function(e) {
          if (e == "") {
            appendText_activity =
              '<div class="inner-text">这里空空如也，什么都没有。</div>';
          } else {
            var i = 0;
            appendText_activity = "<table><tbody>";
            while (e[i]) {
              appendText_activity +=
                '<tr class="inner-text"><td>' +
                e[i].activity_name +
                "</td><td>" +
                e[i].time.substring(0, 10) +
                "</td></tr>";
              i++;
            }
            appendText_activity += "</tbody></table>";
          }
          $(".activity-inner").append(appendText_activity);
        },
        error: function(err) {}
      });
    },
    error: function(err) {}
  });
});
