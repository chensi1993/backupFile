/**
 * Created by admin on 2018/4/1.
 */
$(function () {
    //createBarcode和outputQRCod分别为调用的条形码和二维码插件的方法
    //页面加载时显示条形码
    createBarcode('div128','12345678','B');
    //页面加载时显示二维码
    outputQRCod($("#inputTxt").val(), 200, 200);

});
//条形码和二维码每分钟更新一次
function refreshFun(){
    //history.go(0);
}
//点击刷新按钮条形码和二维码更新一次
$(".swept-update").children("img").on("click",function(){
    //页面加载时显示条形码
    createBarcode('div128','12345679','B');
    //页面加载时显示二维码
    outputQRCod($("#inputTxt").val(), 200, 200);
});
setInterval(refreshFun, 60000);

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
    //中文格式转换
    var str = toUtf8(txt);
    //生成二维码
    $("#code").qrcode({
        render: "table",
        width: width,
        height: height,
        text: str
    });
}