/**
 * Created by admin on 2018/4/1.
 */
$(function(){
    $("#leftImg").on("touchstart",function(){
        //$(".content-info").toggle();
        $(".content-info").css("display","block");
    });
    $(".info-right").on("touchstart",function(){
        $(".content-info").css("display","none");

        //$('.content-main').css('pointer-events', 'none');
        //
        //setTimeout(function(){
        //    $('.content-main').css('pointer-events', 'auto');
        //}, 400);

    });
});

var u = navigator.userAgent, app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//退出H5，返回原生APP
function linkApp(){
    if (isAndroid) {

        window.location.href = Android.closeActivity(); //关闭页面
    }
    if (isIOS) {

        //window.location.href ="https://www.baidu.com/";
        nativeIos();
    }

}
//打开扫一扫
function linkScan(){
    if (isAndroid) {

        window.location.href = Android.openScan(); //打开扫一扫
    }
    if (isIOS) {

        //window.location.href ="";
        scanIos();

    }

}
//打开付款码
function paymentCode(){
    window.location.href = ""

}
