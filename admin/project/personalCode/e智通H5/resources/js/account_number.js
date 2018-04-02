/**
 * Created by admin on 2018/4/1.
 */
$(function(){

});

//点击同意
function isCheck(){
    var accountName = $.trim($("#account-name").val());//获取姓名
    var idNumber = $.trim($("#Id-number").val());//获取身份证号
    var phone = $.trim($("#phone-number").val());//获取手机号

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