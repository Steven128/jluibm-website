$.getJSON("../joinus/major.json", function(data) {
    var $college = $("#college");
    $college.empty(); //清空内容  
    $.each(data, function(i, item) {
        $("#collegeSelect").append('<option>' + item.college + '</option>');
    })

    $college.blur(function() {
        var $major = $("#major");
        var college = $("#college").val();
        $major.empty(); //清空内容
        $("#majorSelect").empty();
        $.each(data, function(j, item) {
            if (item.college == college) {
                $.each(item.major, function(k, item0) {
                    $("#majorSelect").append('<option>' + item0 + '</option>');
                })
            }

        })
    })

})