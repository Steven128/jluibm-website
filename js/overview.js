$(document).ready(function() {
    //获取近10天加入社团的人数
    $.ajax({
        type: "GET",
        url: "../php/overview.php?request=count",
        dataType: "JSON",
        success: function(e) {
            var $categories = [];
            var $data = [];
            i = 0;
            while (e[i]) {
                $categories.push(e[i].date);
                $data.push(e[i].count);
                i++;
            }
            $categories.reverse();
            $data.reverse();
            $(function() {
                $('.highcharts').highcharts({
                    title: {
                        text: '',
                        x: -20 //center
                    },
                    colors: ['blue'],
                    plotOptions: {
                        line: {
                            lineWidth: 3
                        },
                        tooltip: {
                            hideDelay: 200
                        }
                    },

                    xAxis: {
                        categories: $categories
                    },
                    yAxis: {
                        title: {
                            text: '人数'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1
                        }]
                    },
                    tooltip: {
                        valueSuffix: '人',
                        crosshairs: true,
                        shared: true
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: [{
                        name: '新增人数',
                        color: 'rgba(0,120,200,0.75)',
                        marker: {
                            radius: 6
                        },
                        data: $data
                    }]
                });
            });
        },
        error: function(err) {

        }
    });

    //获取总人数
    $.ajax({
        type: "GET",
        url: "../php/overview.php?request=amount",
        dataType: "JSON",
        success: function(e) {
            var appendText = '<div class="amount-title">社团成员总数</div><div class="amount-body">' + e.amount + '人</div>';
            $(".amount-container").append(appendText);
        }
    })

    //获取性别比例
    $.ajax({
        type: "GET",
        url: "../php/overview.php?request=gender",
        dataType: "JSON",
        success: function(e) {

            var male_ratio = (e.male / (e.male + e.female));
            var female_ratio = (e.female / (e.male + e.female));
            var appendText = '<ul class="graphs stats-container stats-gender"><li class="animated" data-provide="circular" data-fill-color="lightblue" data-percent="true" data-initial-value="' + male_ratio + '" data-max-value="1" data-title="男生" data-dates="' + e.male + '人"></li><li class="animated" data-provide="circular" data-fill-color="pink" data-percent="true" data-initial-value="' + female_ratio + '" data-max-value="1" data-title="女生" data-dates="' + e.female + '人"></li></ul>'
            $(".inner-ratio-gender").append(appendText);
            ratio();
        },
        error: function(err) {

        }
    });

    //获取年级比例
    $.ajax({
        type: "GET",
        url: "../php/overview.php?request=grade",
        dataType: "JSON",
        success: function(e) {
            var grade_1_ratio = e.grade_1_number / (e.grade_1_number + e.grade_2_number + e.grade_3_number + e.grade_4_number);
            var grade_2_ratio = e.grade_2_number / (e.grade_1_number + e.grade_2_number + e.grade_3_number + e.grade_4_number);
            var grade_3_ratio = e.grade_3_number / (e.grade_1_number + e.grade_2_number + e.grade_3_number + e.grade_4_number);
            var grade_4_ratio = e.grade_4_number / (e.grade_1_number + e.grade_2_number + e.grade_3_number + e.grade_4_number);
            var appendText = '<ul class="graphs stats-container stats-grade"><li class="animated" data-provide="circular" data-fill-color="#b1f037" data-percent="true" data-initial-value="' + grade_1_ratio + '" data-max-value="1" data-title="大一" data-dates="' + e.grade_1_number + '人"></li><li class="animated" data-provide="circular" data-fill-color="#3b8eff" data-percent="true" data-initial-value="' + grade_2_ratio + '" data-max-value="1" data-title="大二" data-dates="' + e.grade_2_number + '人"></li><li class="animated" data-provide="circular" data-fill-color="rgb(255, 0, 242)" data-percent="true" data-initial-value="' + grade_3_ratio + '" data-max-value="1" data-title="大三" data-dates="' + e.grade_3_number + '人"></li><li class="animated" data-provide="circular" data-fill-color="rgb(81, 255, 0)" data-percent="true" data-initial-value="' + grade_4_ratio + '" data-max-value="1" data-title="大四" data-dates="' + e.grade_4_number + '人"></li></ul>';
            $(".inner-ratio-grade").append(appendText);
            ratio();
        },
        error: function(err) {

        }
    });

    //获取各组人数比例
    $.ajax({
        type: "GET",
        url: "../php/overview.php?request=group",
        dataType: "JSON",
        success: function(e) {

            var cpp_ratio = e.cpp / e.all;
            var algorithm_ratio = e.algorithm / e.all;
            var web_ratio = e.web / e.all;
            var linux_ratio = e.linux / e.all;
            var java_ratio = e.java / e.all;
            var appendText = '<ul class="graphs stats-container stats-group"><li class="animated" data-provide="circular" data-fill-color="#297fdf" data-percent="true" data-initial-value="' + cpp_ratio + '" data-max-value="1" data-title="C/C++组" data-dates="' + e.cpp + '人"></li><li class="animated" data-provide="circular" data-fill-color="#27d7b8" data-percent="true" data-initial-value="' + algorithm_ratio + '" data-max-value="1" data-title="算法组" data-dates="' + e.algorithm + '人"></li><li class="animated" data-provide="circular" data-fill-color="#f05a5a" data-percent="true" data-initial-value="' + web_ratio + '" data-max-value="1" data-title="Web组" data-dates="' + e.web + '人"></li><li class="animated" data-provide="circular" data-fill-color="#55c9ea" data-percent="true" data-initial-value="' + linux_ratio + '" data-max-value="1" data-title="Linux组" data-dates="' + e.linux + '人"></li><li class="animated" data-provide="circular" data-fill-color="#ef994c" data-percent="true" data-initial-value="' + java_ratio + '" data-max-value="1" data-title="Java组" data-dates="' + e.java + '人"></li></ul>';
            $(".inner-ratio-group").append(appendText);
            ratio();
        },
        error: function(err) {

        }
    });
})