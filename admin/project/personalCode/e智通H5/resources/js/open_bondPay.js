/**
 * Created by admin on 2018/4/2.
 */
$(function(){
    //协议前边同意按钮
    $("#agree-img").on("click",function(){
        if($("#agree-img").prop("checked") == true){
            $("#account-btn").css({
                "background":"#4995EF"
            });
            $("#change-color").css({
                "color":"#4995EF"
            });
            $("#account-btn").attr("disabled",false);
            $("#account-btn").on("click",function(){
                isCheck();
            });

        }else{
            $("#account-btn").css({
                "background":"#ADCBF2"
            });
            $("#change-color").css({
                "color":"#BEBEBE"
            });
            $("#account-btn").attr("disabled",true);
        }
    });
});
//获取验证码
function getVerCode() {
    var phone = $.trim($(".pay-password").find(".phoneNum").val());//获取手机号
    //定时器
    var send=document.getElementById('getVerCodeBtn'),
        times=60,
        timer=null;

    send.disabled=true;
    timer = setInterval(function(){
        times --;
        send.value =  "重新获取("+times+")" ;
        send.style.color= "#C1C1C1";
        if(times <= 0){
            send.disabled =false;
            send.value = "获取验证码";
            send.style.color = "#4995EF";
            clearInterval(timer);
            times = 60;
        }
    },1000);
}
//点击同意
function isCheck(){
    var accountNumber = $.trim($("#account-number").val());//获取资金账号
    var accountName = $.trim($("#account-name").val());//获取姓名
    var idNumber = $.trim($("#Id-number").val());//获取身份证号
    var phone = $.trim($("#phone-number").val());//获取手机号
    var iphoneCode = $.trim($("#iphoneCode").val());//获取验证码
    if (accountNumber == null || accountNumber == 0)
    {
        showModal("请输入完整的资金账号！");
        return;
    }
    if (accountName == null || accountName == 0)
    {
        showModal("请输入您的姓名！");
        return;
    }

    if (idNumber == null || idNumber == "")
    {
        showModal("请输入证件号！");
        return;
    }
    if (iphoneCode == null || iphoneCode == "")
    {
        showModal("请输入验证码！");
        return;
    }
    if($("#agree_img").prop("checked") == true){
        return;
    }
    //验证身份证号
    var reg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
    if (!reg.test(idNumber)){
        showModal("请输入有效证件号！");
        return;
    }
    //验证姓名
    var name_reg=/((^[\u4E00-\u9FA5]{2,5}$)|(^[a-zA-Z]+[\s\.]?([a-zA-Z]+[\s\.]?){0,4}[a-zA-Z]$))/;
    if (!name_reg.test(accountName)) {
        showModal("请输入您的姓名！");
        return;
    }
    $("#account-btn").attr("disabled",true);//设置按钮不可用，防止重复上传

}