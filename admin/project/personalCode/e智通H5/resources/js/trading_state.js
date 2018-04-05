/**
 * Created by admin on 2018/4/5.
 */
$(function(){

});



//交易成功
function tradeSuc(){
    //交易成功状态，隐藏交易失败样式
    $(".trading-fail").css("display","none");

    //消费成功有显示优惠
    $(".trading-coupon").css("display","block");
}

//交易失败
function tradeFail(){
    //交易失败状态，隐藏交易成功样式,状态logo改变成失败logo
    $(".trading-suc").css("display","none");
    $(".status-img").attr("src","resources/img/v1wrong@2x.png");
    $(".status-title").html("交易失败");

    //交易失败状态显示客服电话和时间
    $(".trading-status").find(".trading-care").CSS("display","block");
}

//交易未知
function tradeUnknown(){
    //交易失败状态，隐藏交易成功样式,状态logo改变成失败logo
    $(".trading-suc").css("display","none");
    $(".status-img").attr("src","resources/img/v1wrong@2x.png");
    $(".status-title").html("交易状态未知");
}
