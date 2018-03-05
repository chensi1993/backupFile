/**
 * Created by chensi on 2017/8/2.
 */
$(function(){
    $("#agree_img").on("click",function(){
        if($("#agree_img").prop("checked") == true){
            $("#register_btn").css({
                "background":"#FF6468",
                "box-shadow":"10px 10px 15px 0px #FF6468"
            });
        }else{
            $("#register_btn").css({
                "background":"#b6b6b6",
                "box-shadow":"10px 10px 15px 0px #b6b6b6"
            });
        }
    })
});
//点击下一步
function isCheck(){
    var phone = $.trim($("#number_inp").val());//获取手机号
    var verCode = $.trim($("#code_inp").val());//获取验证码
    var refereeInp = $.trim($("#referee_inp").val());//获取推荐人手机号

    if (phone == null || phone == "")
    {
        alert("请输入手机号！");
        return;
    }

    if (verCode == null || verCode == "")
    {
        alert("请输入验证码！");
        return;
    }

    if (refereeInp == null || refereeInp == "")
    {
        alert("请输入推荐人手机号！");
        return;
    }
    if($("#agree_img").prop("checked") == true){
        return;
    }

    $("#register_btn").attr("disabled",true);//设置按钮不可用，防止重复上传

    window.location.href = "set_password.html";

}
//获取验证码
function getVerCode() {
    var phone = $.trim($("#number_inp").val());//获取手机号
    var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (phone == null || phone == "" || !reg.test(phone)) {

        alert("请输入有效的手机号码！");
        $("#getVerCodeBtn").attr("disabled", false); //设置按钮不可用
        return;

    }else{
            //定时器
            var send=document.getElementById('getVerCodeBtn'),
            times=60,
            timer=null;

                send.disabled=true;
                timer = setInterval(function(){
                    times --;
                    send.value =  "重新发送("+times +")";
                    send.style.color = '#666';
                    if(times <= 0){
                        send.disabled =false;
                        send.value = "获取验证码";
                        send.style.color = '#FF6468';
                        clearInterval(timer);
                        times = 60;
                    }
                    console.log(times);
                },1000);

    }
}

