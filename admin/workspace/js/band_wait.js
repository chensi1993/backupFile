$(function(){
    //进入退款授权码模态框隐藏取消关联模态框
    $("#determine").on("click",function(){
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
    $("#btnReturn").on("click",function(){
        $("#pwd-input").val("");
        $("#fake-box input").val("");
    });
    //点击确定清空授权码
    $("#determines").on("click",function(){
        $("#pwd-input").val("");
        $("#fake-box input").val("");
    });

});
