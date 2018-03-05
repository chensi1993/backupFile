/**
 * Created by chensi on 2017/8/4.
 */

// 正则验证银行卡方法
!function () {
    $('#add_cardnumber').on('keyup mouseout input',function(){
        var $this = $(this),
        v = $this.val();
        /\S{5}/.test(v) && $this.val(v.replace(/\s/g,'').replace(/(.{4})/g, "$1 "));
    });
}();
//获取验证码
function getVerCode() {
    var phone = $.trim($("#add_phone").val());//获取手机号
    var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (phone == null || phone == "" || !reg.test(phone)) {

        showModal("请输入有效的手机号码！");
        $("#getVerCodeBtn").attr("disabled", false); //设置按钮不可用
        return;

    }else{
        //定时器
        var send=document.getElementById('getVerCodeBtn');
        var submit=document.getElementById('add_submit'),
            times=60,
            timer=null;

        send.disabled=true;
        timer = setInterval(function(){
            times --;
            send.value = "重新发送("+times + ")";
            send.style.background = '#999';
            //submit.style.background.image = 'linear-gradient(-90deg, #FF986E 0%, #FF6468 100%)';
            if(times <= 0){
                send.disabled =false;
                send.value = "获取验证码";
                send.style.background = '#FF6468';
                //submit.style.background = '#D8D8D8';
                clearInterval(timer);
                times = 60;
            }
            console.log(times);
        },1000);

    }
}


//点击提交
function isCheck(){
    var cardNumber = $.trim($("#add_cardnumber").val());//获取银行卡号
    var bankType = $.trim($("#add_bank").val());
    var phone = $.trim($("#add_phone").val());//获取手机号
    var verCode = $.trim($("#add_code").val());//获取验证码
    var opTio = $.trim($("#opTio").val());//获取银行行别
    var options=$($("#opTio option:selected")); //获取选中的项
    var optValue = options.val();
    var addBank = $("#add_bank").val(optValue);
    console.log(addBank);
    //alert(options.val()); //拿到选中项的值
    if (cardNumber == null || cardNumber == "")
    {
        showModal("请输入银行卡号！");
        return;
    }

    if (opTio == null || opTio == 0)
    {
        showModal("请选择银行行别！");
        return;
    }
    if (phone == null || phone == "")
    {
        showModal("请输入手机号！");
        return;
    }

    if (verCode == null || verCode == "")
    {
        showModal("请输入验证码！");
        return;
    }
    $("#add_submit").attr("disabled",true);//设置按钮不可用，防止重复上传

    $("#add_submit").css("background","#D8D8D8");

}