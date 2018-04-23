/**
 * Created by admin on 2018/4/1.
 */
$(function () {
    //loadHtml();
    refreshFun();

    onLoad();
    //passwordFun();


    //overtimeFun();
    //fiveFun();
    //sixFun();

});
$("#backBtn").on("click",function(){

});
//条形码和二维码每分钟更新一次
function refreshFun(){
    //页面加载时显示条形码
    //$("#bcTarget").empty().barcode("12345679012345679012345679", "code128",{barWidth:1, barHeight:95,showHRI:false});
    JsBarcode("#barcode3", "12345678901234567890123456789", {
        //width:1.4,
        displayValue:false
    });
    JsBarcode("#barcode2", "12345678901234567890123456789", {
        width:2.3,
        height:160,
        displayValue:true,
        fontSize:20
    });
    //页面加载时显示二维码
    outputQRCod(1234567912345679, 160, 160);
    //qrcode = new QRCode(document.getElementById("bcTarget"), {
    //    width : 150,//设置宽高
    //    height : 150
    //});
}
//点击条形码弹出付款码提示框
function modalTips(){
    $("#myModalTips").modal("show");
}
//点击知道了弹出全屏条形码
function codeBtn(){
    $("#codeBtn").on("click",function(){
        $("#myModalTips").modal("hide");
        $(".window").addClass("window-show");
        //$("#barcode2").addClass("cloes-img");
    });
    $(".window").on("click",function(){
        $(".window").removeClass("window-show");
        //$("#barcode2").removeClass("cloes-img");
    });
}
codeBtn();
//中文字符处理
function toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
//生成二维码
function outputQRCod(txt, width, height) {
    //先清空
    $("#code").empty();
    $("#code1").empty();
    //中文格式转换
    var str = toUtf8(txt);
    //生成二维码
    $("#code").qrcode({
        render: "table",
        width: width,
        height: height,
        text: str
    });
    //$("#code1").qrcode({
    //    render: "table",
    //    width: width,
    //    height: height,
    //    text: str
    //});
}
//定时刷新
function rr(){
    //var time = 60;//设定时间有效期
    //function refer(){
    //    console.log("ss");
    //    if(time == 0){
    //        console.log("60秒到了！");
    //        window.location.reload();
    //    }
    //    time--;
    //}
    //return refer;
    //setInterval("refer()",1000);//启动定时器

    var time = 10;//设定时间有效期
    setInterval(function(){
        if(time == 0){
            //alert("dd");
            console.log("10秒到了！");
            window.location.reload();
        }
        time--;
    },1000);

}
//rr();

//监听页面进入后台状态和锁屏状态事件
timer = 0;
function onLoad(){
    document.addEventListener("visibilitychange",stateChanged);
    document.addEventListener("webkitvisibilitychange", stateChanged);
    document.addEventListener("msvisibilitychange", stateChanged);
}
function stateChanged(){

    if(document.hidden || document.webkitHidden || document.msHidden){
        //new tab or window minimized
        timer = new Date().getTime();
        console.log("likai")
    }
    else {
        //alert("aa");
        //alert('You were away for ' + (new Date().getTime()-timer)/1000+ ' seconds.')
    }
}


//点击刷新按钮条形码和二维码更新一次
function btnRefresh(){
    window.location.reload();
}
//$(".swept-update").children("img").on("click",function(){
//    window.location.reload();
//});



//密码控件
function Payment_Money(){
    var i = 0;
    $(".nub_ggg li .zf_num").on("click",function(){
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
                    clearFun();
                    i = 0;
                },100);
            }
        }
    });
    //删除
    $(".nub_ggg li .zf_del").on("click",function(){
        if(i>0){
            i--;
            $(".mm_box li").eq(i).removeClass("mmdd");
            $(".mm_box li").eq(i).attr("data","");
        }
    });
    //清空
    $(".nub_ggg li .zf_empty").on("click",function(){
        $(".mm_box li").removeClass("mmdd");
        $(".mm_box li").attr("data","");
        i = 0;
    });
}
function passwordFun(){
    //调取支付密码框
    $('.js-Payment-Money').show();
    //$('.js-Payment5').show();
    //$('.js-Payment6').show();
    //$('.js-Tim').show();
    $('#myModal').modal('show');
    //输入支付密码
    Payment_Money();

    //点击输入密码的返回，清空密码
    $('.modal-content').on("click",".css-fol-left",function(){
        clearFun();
        i = 0;
    });
}
//清除支付密码
function clearFun(){
    $(".mm_box li").removeClass("mmdd");
    $(".mm_box li").attr("data","");

}


//点击重新输入
$("#reInput").on("click",function(){
    $('.js-Payment-Money').show(); //密码框
    $('.js-Payment5').hide();//输入五次错误框
    $('#myModal').modal('show');//模态框
});
//输入5次
function fiveFun(msg){
    $('#myModal').modal('show');//模态框
    $('.js-Payment5').show();//输入五次错误框
    $('.js-Payment-Money').hide(); //密码框
    $('.js-Payment6').hide();//输入六次错误框
    $('.js-Tim').hide();//支付时间超时框
    $('.js-Payment5').find('.modal-body').text(msg);//输入五次提示信息
}
//输入6次
function sixFun(msg){
    $('#myModal').modal('show');//模态框
    $('.js-Payment6').show();//输入六次错误框
    $('.js-Payment5').hide();//输入五次错误框
    $('.js-Payment-Money').hide(); //密码框
    $('.js-Tim').hide();//支付时间超时框
    $('.js-Payment6').find('.modal-body').html(msg);//输入六次提示信息
}
//支付超时
function overtimeFun(msg){
    $('#myModal').modal('show');//模态框
    $('.js-Tim').show();//支付时间超时框
    $('.js-Payment6').hide();//输入六次错误框
    $('.js-Payment5').hide();//输入五次错误框
    $('.js-Payment-Money').hide(); //密码框
    $('.js-Tim').find('.modal-body').text(msg);//支付时间超时
}
//关闭页面
//document.onbeforeunload=function (){
//          alert("===onbeforeunload===");
//          if(event.clientX>document.body.clientWidth && event.clientY < 0 || event.altKey){
//              alert("你关闭了浏览器");
//              window.event.returnValue = "是否关闭？";
//          }else{
//              alert("你正在刷新页面");
//          }
//};
//打开扫一扫
function linkScan(){
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {

        window.location.href = Android.openScan(); //打开扫一扫
    }
    if (isIOS) {

        window.location.href ="http://www.baidu.com/";
        openScan();
    }

}



//提示用户是否离开此页面（关闭、刷新或者点击后退等）

//window.addEventListener("beforeunload", function (e) {
//
//    var confirmationMessage = '确定离开此页吗？本页不需要刷新或后退';
//
//    (e || window.event).returnValue = confirmationMessage;     // Gecko and Trident
//    return confirmationMessage;                                // Gecko and WebKit
//
//});

//alert(document.cookie); //首次访问abc！=123，刷新后abc=kill，而不是abc=123
//document.cookie = 'abc=123';
//window.onbeforeunload = function (e) {
//    return e.returnValue = '确认关闭？！！';
//};
//window.onunload = function () {
//    document.cookie = 'abc=kill';
//};

//var userAgent = navigator.userAgent;
//if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
////  window.location.href="about:blank";
//	alert("aa");
//}else if(userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1){
//  window.opener=null;window.open('about:blank','_self','').close();
//  alert("bb");
//}else {
//  window.opener = null;
//  window.open("about:blank", "_self");
//  window.close();
//  alert("cc");
//}

//window.onbeforeunload = function(){
//  //var n = window.event.screenX - window.screenLeft;
//  //var b = n > document.documentElement.scrollWidth-20;
//  if(event.clientX > document.body.clientWidth && event.clientY < 0 || event.altKey)
//  {
//      alert("关闭");
//      window.event.returnValue = "是否关闭？";
//  }else{
//      alert("刷新");
//  }
//};

//window.addEventListener( 'blur', function() { console.log( 'blur' ); } );
//window.addEventListener( 'focus', function() { console.log( 'focus' ); } );

//window.onbeforeunload=function(e){
//    return (e||window.event).returnValue='确认离开？！'
//};

