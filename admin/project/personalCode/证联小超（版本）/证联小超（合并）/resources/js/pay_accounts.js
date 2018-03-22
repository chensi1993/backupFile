/**
 * Created by chensi on 2018/2/8.
 */
$(function(){

    /*微信浏览器特殊处理*/
    //if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
    //    $('body').addClass('index_body');//添加禁止滚动的样式
    //}else{
    //    $('body').removeClass('index_body');//去除禁止滚动的样式
    //}


    //解决移动端android浏览器中input框被软键盘遮住的问题
    var winHeight = $(window).height(); //获取当前页面高度
    $(window).resize(function() {
        var thisHeight = $(this).height();
        if (winHeight - thisHeight > 50) {
            //当软键盘弹出，在这里面操作
            $('body').css('height', winHeight + 'px');
            $('body').removeClass('index_body');//去除禁止滚动的样式

        } else {
            //当软键盘收起，在此处操作
            $('body').addClass('index_body');//添加禁止滚动的样式
        }
    });

});



function getData(){}
//取消
function cancelBtn(){}
//支付
function payBtn(){
    //    判断备注信息是否填写
    //if($("#textInfo").val() == ""){
    //    alert("请输入备注");
    //    $('#myModal').modal('hide');
    //    $("#payBtn").attr("disabled","true");
    //
    //}
    $('#myModal').modal('show');
}
function signBtn(){

    window.location.href = "sign_in.html";
}


