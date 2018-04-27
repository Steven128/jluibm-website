/**
 * 获取活动列表
 */

$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "../php/baoming.php?request=getList",
    dataType: "JSON",
    success: function(e) {
      console.log(e);
      var i = 0;
      var appendText = "";
      while (e[i]) {
        var baoming_id = e[i].baoming_id;
        var activity_name = e[i].activity_name;
        var date = e[i].date;
        var hold = e[i].hold;
        var quantity = e[i].quantity;
        var state = e[i].state;
        var step = state;
        if (state == 0) {
          state = "未开始报名";
        } else if (state == 1) {
          state = "正在报名期间";
        } else if (state == 2) {
          state = "已结束报名";
        }
        var j = i + 1;
        appendText +=
          "<tr><td>" +
          j +
          "</td><td><a class='displayBaoming-button' href='#' value='" +
          baoming_id +
          "'>" +
          activity_name +
          "</a></td><td>" +
          date +
          "</td><td>" +
          hold +
          "</td><td>" +
          quantity +
          "</td><td>" +
          state +
          "</td>";
        if (step == 0) {
          appendText +=
            "<td><button class='update-baoming update-img' value='" +
            baoming_id +
            "'><img src='../src/icon/edit.png' width='16px' /></button></td>";
        } else {
          appendText += "<td></td>";
        }

        i++;
      }
      $(".baoming-list").append(appendText);
    },
    error: function(err) {
      console.log(err.responseText);
    }
  });
});

/**
 * 添加社团名称
 */
$(document).on("click", ".add-hold", function() {
  var item = $(".hold_outer");
  item = item[item.length - 1];
  console.log(item);
  var $id = item.firstElementChild;
  if ($id.value != "") {
    var count = $id.name;
    count = parseInt(count.substring(4, count.length)); //目前已添加的社团数量
    count++;
    var new_item = item.outerHTML.replace(
      /input id="hold(.*?)\"/,
      'input id="hold' + count + '"'
    );
    new_item = new_item.replace(
      /name="hold(.*?)\"/,
      'name="hold' + count + '"'
    );
    new_item = new_item.replace(/icon-add/, "icon-delete");
    new_item = new_item.replace(/add-hold/, "delete-hold");
    $(".hold_section").append(new_item);
  }
});

/**
 * 减少社团名称
 */
$(document).on("click", ".delete-hold", function() {
  $(this)
    .parent()
    .remove();
});

/**
 * 创建活动报名-提交
 */
$(document).ready(function() {
  $("#create-Baoming").validate({
    onsubmit: true, // 是否在提交是验证
    rules: {
      //规则
      name: {
        required: true
      },
      time: {
        required: true
      },
      quantity: {
        required: true
      }
    },
    messages: {
      //验证错误信息

      name: {
        required: "请输入活动名称"
      },
      time: {
        required: "请输入活动名称"
      },
      quantity: {
        required: "请输入活动名称"
      }
    },
    submitHandler: function(form) {
      var name = $("#baoming_name").val();
      var date = $("#date").val();
      var quantity = $("#quantity").val();
      var remarks = $("#remarks").val();
      var $this = $("#create-Baoming input");
      var length = $this.length - 1;
      var hold = "";
      for (var i = 0; i < length; i++) {
        if ($this[i].id.indexOf("hold") > -1) {
          hold += $this[i].value;
          hold += ",";
        }
      }
      hold = hold.substring(0, hold.length - 1);
      $.ajax({
        type: "POST",
        url: "../php/create-baoming.php",
        dataType: "JSON",
        data: {
          request: "createBaoming",
          name: name,
          date: date,
          quantity: quantity,
          hold: hold,
          remarks: remarks
        },
        success: function(res) {
          if (res.message == "success") {
            $(".submit").attr("disabled", "disabled");
            localStorage.setItem("reason", "update");
            window.wxc.xcConfirm(
              "新建活动成功！",
              window.wxc.xcConfirm.typeEnum.success,
              {
                onOk: function() {
                  window.location.href = "../admin/?back=baomingList";
                },
                onClose: function() {
                  window.location.href = "../admin/?back=baomingList";
                }
              }
            );
          } else {
            console.log(res);
            window.wxc.xcConfirm(
              "出错啦，再试一次吧！",
              window.wxc.xcConfirm.typeEnum.error
            );
          }
        },
        error: function(err) {
          console.log(err.responseText);
        }
      });
    }
  });
});

/**
 * 查看活动报名详细信息
 */
$(document).on("click", ".displayBaoming-button", function() {
  var baoming_id = $(this).attr("value");
  $.ajax({
    type: "GET",
    url: "../php/baoming.php?request=displaySingle&baoming_id=" + baoming_id,
    dataType: "JSON",
    success: function(e) {
      $("#displayBaoming-text-outer").remove();
      var baoming_id = e.baoming_id;
      var activity_name = e.activity_name;
      var date = e.date;
      var hold = e.hold;
      var quantity = e.quantity;
      var state = e.state;
      var step = state;
      if (state == 0) {
        state = "未开始报名";
      } else if (state == 1) {
        state = "正在报名期间";
      } else if (state == 2) {
        state = "已结束报名";
      }
      var appendText =
        '<div id="displayBaoming-text-outer" class="text-outer"><div class="text"><div class="displayBaoming-name"><h2>' +
        activity_name +
        '</h2></div><div class="displayBaoming-inner">';
      appendText += "<h5>举办时间：" + date + "</h5>";
      appendText += "<h5>举办社团：" + hold + "</h5>";
      appendText += "<h5>报名人数限制：" + quantity + "</h5>";
      appendText += "<h5>状态：" + state + "</h5>";
      if (step == 0) {
        //添加开放报名的按钮
        appendText +=
          '<button id="start-baoming" value="' +
          baoming_id +
          '">开放报名通道</button></div>';
      } else if (step == 1) {
        //添加结束报名的按钮
        appendText +=
          '<button id="end-baoming" value="' +
          baoming_id +
          '">结束报名</button></div><hr>';
        //添加已报名人数和列表
        appendText += '<div class="stu-list"></div>';
      } else if (step == 2) {
        //添加已报名人数和列表
        appendText += '</div><hr><div class="stu-list"></div>';
      }
      appendText += "</div></div>";
      $("#displayBaoming-tab").append(appendText);
      if (step != 0) {
        getStuList(baoming_id);
      }
      $("#baomingList-tab").removeClass("box-active");
      $("#displayBaoming-tab").addClass("box-active");
      $("#menu-baomingList-item").removeClass("innerActive");
      $("#menu-displayBaoming-item").addClass("innerActive");
    },
    error: function(err) {
      console.log(err);
    }
  });
  /**
   * 获得已报名同学的人数和列表
   */
  function getStuList(baoming_id) {
    $.ajax({
      type: "GET",
      url: "../php/baoming.php?request=getStuList&baoming_id=" + baoming_id,
      dataType: "JSON",
      success: function(e) {
        console.log(e);
        var appendText =
          '<table class="tablesorter result"><thead><tr><th>序号</th><th>姓名</th><th>学号</th><th>学院</th><th>性别</th><th>年级</th><th>QQ号码</th><th>来自哪个社团</th><th>报名时间</th></tr></thead><tbody>';
        var i = 0;
        while (e[i]) {
          var j = i + 1;
          appendText +=
            "<tr><td>" +
            j +
            "</td><td>" +
            e[i].name +
            "</td><td>" +
            e[i].number +
            "</td><td>" +
            e[i].college +
            "</td><td>" +
            e[i].gender +
            "</td><td>" +
            e[i].grade +
            "</td><td>" +
            e[i].qq +
            "</td><td>" +
            e[i].comeFrom +
            "</td><td>" +
            e[i].submitTime +
            "</td></tr>";
          i++;
        }
        appendText += "</tbody></table>";
        $(".stu-list").append(appendText);
      },
      eror: function(err) {
        console.log(err.responseText);
      }
    });
  }
});

/**
 * 点击修改活动按钮
 */
$(document).on("click", ".update-baoming", function() {
  var baoming_id = $(this).val();
  $.ajax({
    type: "GET",
    url: "../php/baoming.php?request=displaySingle&baoming_id=" + baoming_id,
    dataType: "JSON",
    success: function(e) {
      $("#displayBaoming-text-outer").remove();
      var baoming_id = e.baoming_id;
      var activity_name = e.activity_name;
      var date = e.date;
      var hold = e.hold;
      var quantity = e.quantity;
      var remarks = e.remarks;
      var state = e.state;
      var step = state;
      if (state == 0) {
        state = "未开始报名";
      } else if (state == 1) {
        state = "正在报名期间";
      } else if (state == 2) {
        state = "已结束报名";
      }
      var appendText =
        '<div id="updateActivity-text-outer" class="text-outer col-xs-12"><div class="activity-update text"><form id="baoming-update-form">';
      appendText +=
        '<div class="section baoming_id_input"><div class="section__title">活动名称</div><div class="form-group"><input id="baoming_id" type="text" class="input-text form-control" name="baoming_id" value="' +
        baoming_id +
        '" /></div></div>';
      appendText +=
        '<div class="section"><div class="section__title">活动名称</div><div class="form-group"><input id="name" type="text" class="input-text form-control" name="name" placeholder="请输入活动名称" value="' +
        activity_name +
        '" /></div></div>';
      appendText +=
        '<div class="section"><div class="section__title">举办时间（yyyy-MM-dd）</div><div class="form-group"><input id="date" type="text" class="input-text form-control" name="date" placeholder="请输入举办时间" value="' +
        date +
        '" /></div></div>';
      appendText +=
        '<div class="section"><div class="section__title">举办社团</div><div class="form-group"><input id="hold" type="text" class="input-text form-control" name="hold" disabled="disabled" value="' +
        hold +
        '" /></div></div>';
      appendText +=
        '<div class="section"><div class="section__title">人数限制</div><div class="form-group"><input id="quantity" type="text" class="input-text form-control" name="quantity" placeholder="请输入人数限制" value="' +
        quantity +
        '" /></div></div>';
      appendText +=
        "<div class='section'><label><div class='section__title'>备注</div><textarea id='remarks' class='form-control' name='remarks' rows='5' placeholder='在此填写备注'>" +
        remarks +
        "</textarea></label></div><div class='btn-area'><button type='submit' class='submit'>确认修改</button><button class='deleteBaoming' type='button' value='" +
        baoming_id +
        "'>删除活动</button></div></form></div></div></div>";
      appendText += "</form></div></div>";
      $("#updateBaoming-tab").append(appendText);
      $("#baomingList-tab").removeClass("box-active");
      $("#updateBaoming-tab").addClass("box-active");
      $("#menu-baomingList-item").removeClass("innerActive");
      $("#menu-updateBaoming-item").addClass("innerActive");
    },
    error: function(err) {
      console.log(err);
    }
  });
});

/**
 * 修改活动报名-提交
 */

$("#baoming-update-form").validate({
  // onsubmit: true, // 是否在提交是验证
  // rules: {
  //   //规则
  //   name: {
  //     required: true
  //   },
  //   time: {
  //     required: true
  //   },
  //   quantity: {
  //     required: true
  //   }
  // },
  // messages: {
  //   //验证错误信息

  //   name: {
  //     required: "请输入活动名称"
  //   },
  //   time: {
  //     required: "请输入活动名称"
  //   },
  //   quantity: {
  //     required: "请输入活动名称"
  //   }
  // },
  submitHandler: function(form) {
    // $(".submit").attr("disabled", "disabled");
    var baoming_id = $("#baoming_id").val();
    var name = $("#name").val();
    var date = $("#date").val();
    var quantity = $("#quantity").val();
    var remarks = $("#remarks").val();
    var hold = $("#hold").val();
    console.log(baoming_id);
    // $.ajax({
    //   type: "POST",
    //   url: "../php/create-baoming.php",
    //   dataType: "JSON",
    //   data: {
    //     request: "createBaoming",
    //     name: name,
    //     date: date,
    //     quantity: quantity,
    //     hold: hold,
    //     remarks: remarks
    //   },
    //   success: function(res) {
    //     if (res.message == "success") {
    //       // localStorage.setItem("reason", "update");
    //       window.wxc.xcConfirm(
    //         "新建活动成功！",
    //         window.wxc.xcConfirm.typeEnum.success,
    //         {
    //           onOk: function() {
    //             // window.location.href = "../admin/?back=baomingList";
    //           },
    //           onClose: function() {
    //             // window.location.href = "../admin/?back=baomingList";
    //           }
    //         }
    //       );
    //     } else {
    //       console.log(res);
    //       window.wxc.xcConfirm(
    //         "出错啦，再试一次吧！",
    //         window.wxc.xcConfirm.typeEnum.error
    //       );
    //     }
    //   },
    //   error: function(err) {
    //     console.log(err.responseText);
    //   }
    // });
  }
});

/**
 * 删除活动报名
 */
$(document).on("click", ".deleteBaoming", function() {
  var baoming_id = $(this).val();
  window.wxc.xcConfirm(
    "确定要删除此活动吗？",
    window.wxc.xcConfirm.typeEnum.confirm,
    {
      onOk: function() {
        $.ajax({
          type: "GET",
          url:
            "../php/baoming.php?request=deleteBaoming&baoming_id=" + baoming_id,
          dataType: "JSON",
          success: function(e) {
            if (e.message == "success") {
              localStorage.setItem("reason", "update");
              window.wxc.xcConfirm(
                "删除成功！",
                window.wxc.xcConfirm.typeEnum.success,
                {
                  onOk: function() {
                    window.location.href = "../admin/?back=baomingList";
                  },
                  onClose: function() {
                    window.location.href = "../admin/?back=baomingList";
                  }
                }
              );
            } else {
              window.wxc.xcConfirm(
                "出错啦！",
                window.wxc.xcConfirm.typeEnum.error
              );
            }
          },
          error: function(err) {
            window.wxc.xcConfirm(
              "出错啦！",
              window.wxc.xcConfirm.typeEnum.error
            );
          }
        });
      },
      onClose: function() {},
      onCancel: function() {}
    }
  );
});

/**
 * 开放报名通道
 */
$(document).on("click", "#start-baoming", function() {
  var baoming_id = $(this).val();
  $.ajax({
    type: "GET",
    url: "../php/baoming.php?request=startBaoming&baoming_id=" + baoming_id,
    dataType: "JSON",
    success: function(e) {
      if (e.message == "success") {
        localStorage.setItem("reason", "update");
        window.wxc.xcConfirm(
          "报名通道已开放！",
          window.wxc.xcConfirm.typeEnum.success,
          {
            onOk: function() {
              window.location.href = "../admin/?back=baomingList";
            },
            onClose: function() {
              window.location.href = "../admin/?back=baomingList";
            }
          }
        );
      } else {
        window.wxc.xcConfirm("出错啦！", window.wxc.xcConfirm.typeEnum.error);
      }
    },
    error: function(err) {
      window.wxc.xcConfirm("出错啦！", window.wxc.xcConfirm.typeEnum.error);
    }
  });
});

/**
 * 关闭报名通道
 */
$(document).on("click", "#end-baoming", function() {
  var baoming_id = $(this).val();
  $.ajax({
    type: "GET",
    url: "../php/baoming.php?request=endBaoming&baoming_id=" + baoming_id,
    dataType: "JSON",
    success: function(e) {
      if (e.message == "success") {
        localStorage.setItem("reason", "update");
        window.wxc.xcConfirm(
          "报名通道已关闭！",
          window.wxc.xcConfirm.typeEnum.success,
          {
            onOk: function() {
              window.location.href = "../admin/?back=baomingList";
            },
            onClose: function() {
              window.location.href = "../admin/?back=baomingList";
            }
          }
        );
      } else {
        window.wxc.xcConfirm("出错啦！", window.wxc.xcConfirm.typeEnum.error);
      }
    },
    error: function(err) {
      window.wxc.xcConfirm("出错啦！", window.wxc.xcConfirm.typeEnum.error);
    }
  });
});
