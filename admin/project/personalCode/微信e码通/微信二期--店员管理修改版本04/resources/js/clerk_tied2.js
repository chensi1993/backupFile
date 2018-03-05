$(function(){

    //2017.6.26修改，“click”事件改成“tap”事件：进入退款授权码模态框隐藏取消关联模态框
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
//          $(".fake-box input").val("")
        }
    });

    //点击返回清空授权码：2017.6.26修改，“click”事件改成“tap”事件
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


    //2017.6.29修改：滑动打开/关闭按钮脚本
//  var slider = new SliderUnlock(".slideunlock-slider", {
//      labelTip: "滑动打开收款通知",
//      successLabelTip: "滑动关闭收款通知",
//      duration: 200   // 动画效果执行时间，默认200ms
//  }, function(){
//      //向右滑动结束时方法
//      //左侧value为0，右侧value为1
//      var value = $(".slideunlock-lockable").val();
//      alert(value);
//
//  }, function(){
//      //滑动过程中的方法
//  });
//  slider.init();
//
});



//var value = $(".slideunlock-lockable").val();
//$.ajax({
//    url : '/zlzf-wechat/employee/messagePush.do',
//    type : 'post',
//    async : true,
//    dataType : "json",
//    data : {
//        pushFlag : '0'
//    },
//    success : function(data) {
//        // 判断响应码：RC00 成功以外弹框显示错误信息
//        if ('RC00' == data.resCode) {
//        } else {
//            showModal("设置收款通知状态失败！");
//        }
//    },
//    error : function() {
//        showModal('出现异常！');
//    }
//});

