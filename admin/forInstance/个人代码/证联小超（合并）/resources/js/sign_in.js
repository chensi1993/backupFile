/**
 * Created by chensi on 2018/2/7.
 */
$(function(){
    //返回上一页
    $(".shop-name").on("click",function(){
        window.history.go(-1);  //返回上一页
    });

    //2018-2-11增加，如果用户没有用手机号码做登录，而是采用第三方账号授权登录，绑定手机号码并做相应的页面处理
    $(".other-center").on("click",function(){

    });

    ////获取上一个页面手机号的状态
    //var getPhone = sessionStorage.getItem("phoneStatus");
    //if(getPhone == "未绑定"){
    //    $(".shop-name").children("span").text("绑定手机号码");
    //    $(".sign-tips").children("span").html("绑定手机号代表您已同意");
    //    $("#phone_button").val("绑定");
    //    $(".other-sign").css("display","none");
    //}


    //2018-2-27增加：判断是微信还是支付宝
    //微信客户端
    if (/MicroMessenger/.test(window.navigator.userAgent)) {
        $(".other-center").find("img").attr("src","resources/img/wechat.png");
    //    支付宝客户端
    } else if (/AlipayClient/.test(window.navigator.userAgent)) {
        $(".other-center").find("img").attr("src","resources/img/zfb.png");
    }
});
//点击登录
function isCheck(){
    var phone = $.trim($("#phone_val").val());//获取手机号
    var verCode = $.trim($("#phone_inp").val());//获取验证码
    if(phone == null || phone == ""){
        showModal("请输入您的手机号！");
        return;
    }else if(verCode == null || verCode == ""){
        showModal("请输入短信验证码！");
        return;
    }
    $("#phone_button").attr("disabled",true);//设置按钮不可用，防止重复上传

    window.location.href = "";

}
//获取验证码
function getVerCode() {
    var phone = $.trim($("#phone_val").val());//获取手机号
    var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[1678]|18[0-9]|14[57])[0-9]{8}$/; //手机号正则

    if(phone == null || phone == ""){
        showModal("请输入您的手机号！");
        $("#getVerCodeBtn").attr("disabled", false); //设置按钮可用
        return;

    }else if(!phoneReg.test(phone)){
        showModal("请输入正确的手机号！");
        $("#getVerCodeBtn").attr("disabled", false); //设置按钮可用
        return;
    }
    //定时器
    var send=document.getElementById('getVerCodeBtn'),
        times=60,
        timer=null;

    send.disabled=true;
    timer = setInterval(function(){
        times --;
        send.value = times + "秒后重试";
        send.style.background = '#999';
        if(times <= 0){
            send.disabled =false;
            send.value = "获取验证码";
            send.style.background = '#FF6468';
            clearInterval(timer);
            times = 60;
        }
    },1000);
}