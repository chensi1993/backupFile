$(function(){

//==================授权码=======================
    //2017.6.26修改，“click”事件改成“tap”事件：进入退款授权码模态框隐藏取消关联模态框
    //function codeFun(){
        $("#determine").on("click",function(){
            $('#myModal').modal('hide');//+
            //点击“是”按钮清空授权码
            $("#pwd-input").val("");
            $("#fake-box input").val("");
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
               console.log('成功');
            }
        });

        //点击返回清空授权码：2017.6.26修改，“click”事件改成“tap”事件
        $("#btnReturn").on("click",function(){
            $("#pwd-input").val("");
            $("#fake-box input").val("");
        });
        //点击确定清空授权码
        //2017.6.26修改，“click”事件改成“tap”事件
        $("#determines").on("click",function(){
            $("#pwd-input").val("");
            $("#fake-box input").val("");
        });
    //}
    //codeFun();


//================2017.7.3修改：滑动打开/关闭按钮脚本========================
    //页面加载时设置初始值
    //$("[name=items]:checkbox").prop("checked",true);
    //console.log($("[name=items]:checkbox").prop("checked"));

    //页面加载时判断收款通知打开/关闭状态， checked默认是false
    function Load_page(){
        if($("[name=items]:checkbox").prop("checked") == false){

            $('#lableInp').html('打开收款通知');

        }else if($("[name=items]:checkbox").prop("checked") == true){

            $('#lableInp').html('关闭收款通知');

        }
        //console.log($("[name=items]:checkbox").prop("checked"));
    }
    Load_page();

    //点击整个区域判断收款通知打开/关闭状态
    $('.checkbox').on('click',function(){

        if ($('#checkInp').is(":checked")) {

            $('#lableInp').html('关闭收款通知');
            //console.log($("[name=items]:checkbox").prop("checked"));

        } else {

            $('#lableInp').html('打开收款通知');
            //console.log($("[name=items]:checkbox").prop("checked"));
        }

    });

});




