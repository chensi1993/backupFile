/**
 * Created by chensi on 2017/7/26.
 */
$(document).ready(function () {
    //点击‘费率状态’显示/隐藏下拉框
    $('#status_click').on('click',function(){
        $('.status_list').toggle();
    });

    //点击下拉框标签变换背景色
    var initLi = function () {
        $(".status_ul li").css("background", "");
        $(".status_ul li").mouseover(function () {
            $(this).css("background", "#eee");
        }).mouseout(function () {
            $(this).css("background", "");
        })
    };
    initLi();
    $(".status_ul li").click(function () {
        initLi();
        //当前被点击的控件改变背景色
        $(this).css("background", "#eee");
        //取消当前控件的mouseout和mouseover事件
        $(this).unbind("mouseout");
        $(this).unbind("mouseover");
    });


    //请求参数
    var params = {
        "pageSize":"1",                  //开始页
        "rowsPerPage":"6"          //本次查询多少页
    };

    var pager = AjaxPager.$("resources/json/blog.json", params, usable_load, "#merchant_contain");
    pager.runAs();

    function usable_load(reponse){
        var data = reponse.list;
        console.log(data);
        var rows = $("#merchant_contain");

        $.each(data,function(i){
            var result = '';
            result +='<div class="merchant_list row" id="notAdd">'
            +   '<div class="col-xs-7 list_left">'
            +       '<h3>'+ data[i].name +'</h3>'
            +       '<p>'+'签约于'+'<span>'+ data[i].date +'</span>'+'</p>'
            +   '</div>'
            +   '<div class="col-xs-5 list_right">'
            +       '<span>'+ data[i].noAdd +'</span>'
            +   '</div>'
            +'</div>';
            rows.append(result);
        });
        return rows;
    }



});
