/**
 * Created by chensi on 2018/2/8.
 */
$(function(){
    //返回上一页
    $(".shop-name").on("click",function(){
        window.history.go(-1);  //返回上一页
    });
    //判断手机号是否绑定
    var phoneBind =$(".user-phone").children("input");
    if(phoneBind.val() == ""){
        phoneBind.val("未绑定");
        phoneBind.css("text-align","right");
        phoneBind.next(".right-img").css("display","block");
        $(".user-phone").on("click",function(){
            window.location.href = "sign_in.html";
        })

    }
});
