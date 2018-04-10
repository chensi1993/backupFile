/**
 * Created by admin on 2018/4/3.
 */
//$(function(){
//    //页面加载时显示条形码
//    createBarcode('div128','1234567890123456789012345678','C');
//});

$(function(){
    code128();
});


function code128(){
    $("#bcTarget").empty().barcode("1234567890123456789012345678", "code128",{barWidth:1, barHeight:60,showHRI:true});
}