//2秒自动消失弹框
var clearFlag = 0; 
var time = 2;//设置2秒后自动消失
var showModal = function(errMsg){
//	$(".alert-bg").show();
	//父页面禁止点击、触摸、滑动操作
	$(".container").bind({
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
	$("#modal_message").append(errMsg);//填充错误信息
	errMsg = ""; //清空错误信息内容
    $("#my-modal-alert").toggle();//显示模态框
    clearFlag = self.setInterval("autoClose()",300);//每过一秒调用一次autoClose方法
};

var autoClose = function(){
    if(time>0){
    	time--;
    }else if(time<=0){
        window.clearInterval(clearFlag); 
        $("#my-modal-alert").toggle();//关闭模态框
        $("#modal_message").empty();//清空弹框内容
//      $(".alert-bg").hide();//隐藏遮罩
        time = 2;
        //移除父页面禁止点击、触摸、滑动操作
    	$(".container").unbind();
    }
};
