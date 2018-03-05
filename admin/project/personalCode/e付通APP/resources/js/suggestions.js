/**
 * Created by chensi on 2017/12/4.
 */
$(function(){
    //tab切换
    $(".suggest_tips li").on("touchstart",function () {

        var list = $(this).index();
        //console.log(list);
        $(this).css("color", "#ff6a19").siblings().css("color", "#8C8C8C");
        $(this).css("border-bottom", "2px solid #ff6a19").siblings().css("border", "none");
        $("#textWord").val('');
        changeColor();
    });

    //输入框聚焦时按钮颜色
    $('#textWord').bind('keyup paste', function(){
        changeColor();
    });
    $('#contactVal').bind('keyup paste', function(){
        changeColor();
    });

});

//判断输入框格式是否正确时，按钮背景颜色变换
//2018.1.5 修改邮箱验证正则，添加限制手机号长度
function changeColor(){
    var textVal = $("#textWord").val();  //反馈内容
    var inform = $("#contactVal").val();  //联系方式
    //var emailReg = /^[a-zA-Z0-9]([a-zA-Z0-9]*[-_.]?[a-zA-Z0-9]*)+@([\w-]+\.)+[a-zA-Z]{2,}$/;
    var emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[1678]|18[0-9]|14[57])[0-9]{8}$/;

    if(textVal.length > 0 && phoneReg.test(inform) && inform.length == 11 || emailReg.test(inform)){

        $("#suggest_btn").css("background","#ff9a63");

    }else{

        $("#suggest_btn").css("background","#b6b6b6");
        //layer.open({
        //    content: '请输入正确的联系方式'
        //    ,skin: 'msg'
        //    ,time: 2 //2秒后自动关闭
        //});
        return false;

    }
}
//点击提交获取当前选中的li
function clickMe(){

    //$(".suggest_tips li").each(function(){
    //    var colorStyle = $(this).css("color") == "rgb(140, 140, 140)";
    //    if(colorStyle == false){
    //        alert($(this).html());
    //    }
    //});
    var suggestContent = document.getElementById('textWord').value;//反馈内容
    var contactWay = document.getElementById("contactVal").value;//联系方式
    var emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[1678]|18[0-9]|14[57])[0-9]{8}$/;
    if (suggestContent == null || suggestContent == "")
    {
        showModal("反馈内容不能为空！");
        return false;
    }

    if (contactWay == null || contactWay == "")
    {
        showModal("联系方式不能为空！");
        return false;
    }
    if(!phoneReg.test(contactWay) && !emailReg.test(contactWay)){
        showModal("请输入正确的联系方式！");
        return false;
    }
}

function GetRequest() {
    //var url = "?wd=360&rsv_spt=1&rsv_iqid=0xaf1f9ec6000038d6&issp=1"; //获取url中"?"符后的字串
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);

        }
    }
    return theRequest;
}

var Request = new Object();
Request = GetRequest();
var wd;
wd = Request["wd"];


//2秒自动消失弹框
var clearFlag = 0;
var time = 3;//设置2秒后自动消失
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



