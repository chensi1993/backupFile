$(function(){
    //进入退款授权码模态框隐藏取消关联模态框
    //2017.6.26修改，“click”事件改成“tap”事件
    $("#determine").on("tap",function(){
        $('#myModal').modal('hide')
    });
    //退款授权码
    var oInput = $(".fake-box input");
    $("#pwd-input").on("input", function() {
        var pwd = $(this).val().trim();
        var len = pwd.length;
        for (var i = 0; i < len; i++) {
            oInput.eq("" + i + "").val(pwd[i]);
        }
        oInput.each(function() {
            var index = $(this).index();
            if (index >= len) {
                $(this).val("");
            }
        });
        if (len == 6) {
            $(this).val("");
            //$(".fake-box input").val("")
        }
    });

    //点击返回清空授权码
    //2017.6.26修改，“click”事件改成“tap”事件
    $("#btnReturn").on("tap",function(){
        $("#pwd-input").val("");
        $("#fake-box input").val("");
    });
    //点击确定清空授权码
    //2017.6.26修改，“click”事件改成“tap”事件
    $("#determines").on("tap",function(){
        $("#pwd-input").val("");
        $("#fake-box input").val("");
    });

});
