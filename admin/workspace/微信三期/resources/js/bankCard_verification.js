/**
 * Created by chensi on 2017/8/8.
 */
!function () {
    // 正则验证银行卡方法
    $('#card_number').on('keyup mouseout input',function(){
        var $this = $(this),
            v = $this.val();
        /\S{5}/.test(v) && $this.val(v.replace(/\s/g,'').replace(/(.{4})/g, "$1 "));
    });
}();


//点击下一步
function isCheck(){
    var cardNumber = $.trim($("#card_number").val());//获取银行卡号
    var cardName = $.trim($("#card_name").val());//获取姓名
    var idNumber = $.trim($("#Id_number").val());//获取身份证号
    var phone = $.trim($("#phone_number").val());//获取手机号
    if (cardNumber == null || cardNumber == "")
    {
        showModal("请输入银行卡号！");
        return;
    }

    if (cardName == null || cardName == 0)
    {
        showModal("请输入您的真实姓名！");
        return;
    }

    if (idNumber == null || idNumber == "")
    {
        showModal("请输入证件号！");
        return;
    }
    //验证身份证号
    var reg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
    if (!reg.test(idNumber.value)){
        showModal("请输入有效证件号！");
        return;
    }
    //验证真实姓名
    var name_reg=/((^[\u4E00-\u9FA5]{2,5}$)|(^[a-zA-Z]+[\s\.]?([a-zA-Z]+[\s\.]?){0,4}[a-zA-Z]$))/;
    if (!name_reg.test(cardName)) {
        showModal("请输入您的真实姓名！");
        return;
    }
    $("#card_btn").attr("disabled",true);//设置按钮不可用，防止重复上传

    $("#card_btn").css("background","#D8D8D8");
}
