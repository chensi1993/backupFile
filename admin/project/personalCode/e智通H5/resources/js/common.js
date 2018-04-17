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
            });
            //$("#account-btn").attr("disabled",true);//设置按钮不可用，防止重复上传
        }else{
            $("#account-btn").css({
                "background":"#ADCBF2"
            });
            $("#change-color").css({
                "color":"#999"
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
        $(".mm_box li").eq(i).text("");

        if(i<6){
            $(".mm_box li").eq(i).addClass("mmdd");
            $(".mm_box li").eq(i).attr("data",$(this).text());
            i++;
            if (i==6) {
                setTimeout(function(){
                    var data = "";
                    $(".mm_box li").each(function(){
                        data += $(this).attr("data");
                    });
                    alert("支付成功"+data);
                },100);
            }
        }
    });

    $(".nub_ggg li .zf_del").on("click",function(){

        if(i>0){
            i--;
            $(".mm_box li").eq(i).removeClass("mmdd");
            //$(".mm_box li").eq(i).children("span").css("display","block");
            $(".mm_box li").eq(i).text("——");
            $(".mm_box li").eq(i).attr("data","");
        }
    });
});
