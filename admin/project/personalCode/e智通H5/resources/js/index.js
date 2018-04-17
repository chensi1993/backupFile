/**
 * Created by admin on 2018/4/1.
 */
//(function (doc, win) {
//    var docEl = doc.documentElement,
//        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//        recalc = function () {
//            var clientWidth = docEl.clientWidth;
//            if (!clientWidth) return;
//            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
//        };
//
//    // Abort if browser does not support addEventListener
//    if (!doc.addEventListener) return;
//    win.addEventListener(resizeEvt, recalc, false);
//    doc.addEventListener('DOMContentLoaded', recalc, false);
//})(document, window);


/**
 * 以下这段代码是用于根据移动端设备的屏幕分辨率计算出合适的根元素的大小
 * 当设备宽度为375(iPhone6)时，根元素font-size=16px; 依次增大；
 * 限制当为设备宽度大于768(iPad)之后，font-size不再继续增大
 * scale 为meta viewport中的缩放大小
 */
//(function (doc, win) {
//    var docEl = win.document.documentElement;
//    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
//    /**
//     * ================================================
//     *   设置根元素font-size
//     * 当设备宽度为375(iPhone6)时，根元素font-size=16px;
//     × ================================================
//     */
//    var refreshRem = function () {
//        var clientWidth = win.innerWidth
//            || doc.documentElement.clientWidth
//            || doc.body.clientWidth;
//
//        console.log(clientWidth);
//        if (!clientWidth) return;
//        var fz;
//        var width = clientWidth;
//        fz = 16 * width / 375;
//        docEl.style.fontSize = fz + 'px';
//    };
//
//    if (!doc.addEventListener) return;
//    win.addEventListener(resizeEvt, refreshRem, false);
//    doc.addEventListener('DOMContentLoaded', refreshRem, false);
//    refreshRem();
//
//})(document, window);




$(function(){
    $("#leftImg").on("touchstart",function(){
        //$(".content-info").toggle();
        $(".content-info").css("display","block");
    });
    $(".info-right").on("touchstart",function(e){

        $(".content-info").css("display","none");
        e.preventDefault();

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

        window.location.href ="http://www.baidu.com/";
        scanIos();

    }

}
//打开付款码
function paymentCode(){
    window.location.href = ""

}
