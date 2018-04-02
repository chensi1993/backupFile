/**
 * Created by admin on 2018/4/1.
 */
/**
 * Created by admin on 2018/4/1.
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

            })
        }else{
            $("#account-btn").css({
                "background":"#ADCBF2"
            });
            $("#change-color").css({
                "color":"#BEBEBE"
            })
        }
    });

    //数字显示隐藏
    $(".xiaq_tb").on("click",function(){
        $(".numb_box").slideUp(500);
    });
    $(".mm_box").on("click",function(){
        $(".numb_box").slideDown(500);
    });
    //----
    var i = 0;
    $(".nub_ggg li .zf_num").on("click",function(){
        //$(".mm_box li").eq(i).children("span").css("display","none");
        $(".mm_box li").eq(i).text($(this).text());
        console.log($(this).text());

        if(i<6){
            //$(".mm_box li").eq(i).addClass("mmdd");
            $(".mm_box li").eq(i).attr("data",$(this).text());
            i++;

            if (i==6) {
                setTimeout(function(){
                    var data = "";
                    $(".mm_box li").each(function(){
                        data += $(this).attr("data");
                        $(".mm_box li").eq(i).text($(this).text());
                    });
                    alert("成功"+data);
                },100);
            }
        }
    });

    $(".nub_ggg li .zf_del").on("click",function(){

        if(i>0){
            i--;
            //$(".mm_box li").eq(i).removeClass("mmdd");
            $(".mm_box li").eq(i).text("——");
            //$(".mm_box li").eq(i).children("span").css("display","block");
            $(".mm_box li").eq(i).attr("data","");
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
        send.value = times + "秒后重试";
        if(times <= 0){
            send.disabled =false;
            send.value = "获取验证码";
            clearInterval(timer);
            times = 60;
        }
    },1000);
}
//点击立即开通
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