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
    });
});

//退出H5，返回原生APP
function linkApp(){
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {

        window.location.href = AndroidStart.nativeUrl();
    }
    if (isIOS) {

        window.location.href ="https://www.baidu.com/" ;
        nativeIos();
    }

}
