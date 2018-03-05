$(function(){
    var ow,oLeft;
    var labOffset = $('#label').offset;
    var btnOffset = $('#btn').offset;
    alert(btnOffset);
    var sliClient = $('#slider').clientWidth;
    var btnClient = $('#btn').clientWidth;

    $("#btn").on("touchstart",function(e){
        var touch = e.originalEvent.changedTouches[0];

        ow = touch.pageX - btnOffset.left;
        alert(btnOffset.left);
        $("#btn").addClass("button");
        $("#track").addClass("track");
    });
    $("#btn").on("touchmove.move",function(e){
        var touch = e.originalEvent.changedTouches[0];
        oLeft = touch.pageX - ow;
        if(oLeft < 0) {
            oLeft = 0;
        }else if(oLeft > labOffset.width - btnOffset.width){
            oLeft = labOffset.width - btnOffset.width;
        }
        $('#btn').css("left",oLeft+"px");
        $('#slider').css("width",(oLeft+btnOffset.width)+"px");
    });
    $("#btn").on("touchend.move",function(e){
        if(oLeft>=(sliClient - btnClient)){
            $("#btn").css("left",labOffset.width - btnOffset.width);
            $("#track").css("width",labOffset.width - btnOffset.width);
            $("#bandWord").css("display","none");
        }else{
            $("#btn").css("left","0");
            $("#track").css("width","0");
            $("#bandWord").css("display","block");
        }
        $("#btn").removeClass("button").addClass("button-on");
        $("#track").removeClass("track").addClass("track-on");
    });
})












//$('#btn').bind(touchEvents.touchstart, function (event) {
//    alert("aa");
//    event.preventDefault();
//    var touch = e.Touches[0]; //获取第一个触点
//    var x = Number(touch.pageX); //页面触点X坐标
//    console.log(event);
//    var oBtn = $('#btn').offset;
//    ow = x - oBtn.left;
//    $('#btn').addClass('button');
//    $('#track').addClass('track');
//
//
//});
//
//$('#btn').bind(touchEvents.touchmove, function (event) {
//    event.preventDefault();
//    var touch = e.Touches[0]; //获取第一个触点
//    var oLeft = x - ow;
//    if(oLeft<0){
//        oLeft = 0;
//    }else if(oLeft > labWidth - btnWidth){
//        oLeft = labWidth - btnWidth;
//    }
//    $('#btn').css('left',oLeft+'px');
//    $('$track').css('width',(oLeft + btnWidth)+'px');
//});
//
//$('#btn').bind(touchEvents.touchend, function (event) {
//    event.preventDefault();
//    if(oLeft>=(oSlider.client.width - $('#btn').client.width)){
//
//    }
//
//});





$('#btn').on("click",function(event){
    alert("aa");
});