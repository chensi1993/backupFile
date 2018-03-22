/**
 * Created by chensi on 2018/2/8.
 */
$(function(){

    /*微信浏览器特殊处理*/
    if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
        $('body').addClass('index_body');//添加禁止滚动的样式
    }else{
        $('body').removeClass('index_body');//去除禁止滚动的样式
    }

    //$(".order-content").height() < 240  ? $(".order-content").height('auto') : $(".order-content").css('overflow', 'auto').height(240);
});

function getData(){

}
//取消
function cancelBtn(){

}
//支付
function payBtn(){

    $('#myModal').modal('show');


}
function signBtn(){

    window.location.href = "sign_in.html";
}


