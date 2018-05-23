//2秒自动消失弹框
var clearFlag = 0; 
var time = 2;//设置2秒后自动消失
//2秒弹框
function showModal(errMsg){
//	$(".alert-bg").show();//显示遮罩层
    $("#loading3").hide();//隐藏"加载中"
    $("#my-modal-alert .modal-footer").hide();//隐藏"确定按钮"
    //父页面禁止点击、触摸、滑动操作
    container();
    $("#modal_message").text(errMsg);//填充错误信息
    errMsg = ""; //清空错误信息内容
    $("#my-modal-alert").toggle();//显示模态框
    clearFlag = self.setInterval("autoClose()",300);//每过一秒调用一次autoClose方法
}

//关闭加载中
function secondout(){
    $(".my-modal-alert").css("width","80%");
    $("#my-modal-alert").hide();//隐藏模态框
    //移除父页面禁止点击、触摸、滑动操作
    $(".container-fluid").unbind();
}
//调用加载中
function second(errMsg){
    $(".my-modal-alert").css("width","40%");
    $("#loading3").show();//显示"加载中"
    $("#my-modal-alert .modal-footer").hide();//隐藏"确定按钮"
    //父页面禁止点击、触摸、滑动操作
    container();
    $("#modal_message").text(errMsg);//填充错误信息
    errMsg = ""; //清空错误信息内容
    $("#my-modal-alert").show();//显示模态框
}

function container(){
    //父页面禁止点击、触摸、滑动操作
    $(".container-fluid").bind({
        "click": function (e) {
            return false;
        },
        "touchstart": function (e) {
            return false;
        },
        "touchmove": function (e) {
            return false;
        }
    });
}
function autoClose(){
    if(time>0){
        time--;
    }else if(time<=0){
        window.clearInterval(clearFlag);
        $("#my-modal-alert").toggle();//关闭模态框
        $("#modal_message").empty();//清空弹框内容
//      $(".alert-bg").hide();//隐藏遮罩
        time = 2;
        //移除父页面禁止点击、触摸、滑动操作
        $(".container-fluid").unbind();
    }
}

