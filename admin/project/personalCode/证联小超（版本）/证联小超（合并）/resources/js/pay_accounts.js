/**
 * Created by chensi on 2018/2/8.
 */
$(function(){

    //var jsonString = getSessionStorage(openId);
    //var productInfoMap={};
    //productInfoMap = jsonString["productInfo"];
    //setObj ={
    //    "productId":"",
    //    "productPic":"", //商品图片
    //    "productName":"", //商品名称
    //    "productSum":"",  //单个购买数量
    //    "productPrice":"",//单价
    //    "productTotalAmount":"" //商品总价
    //};
    //
    //for(var key in productInfoMap){
    //    setObj=productInfoMap[key];
    //
    //    var listStr = '';
    //    listStr +='<ul class="order-li row">'
    //    +'<li class="col-xs-5">'+setObj["productName"]+'</li>'
    //    +'<li class="col-xs-2">'+'x'+setObj["productSum"]+'</li>'
    //    +'<li class="col-xs-5">'+'￥'+setObj["productPrice"]+'</li>'
    //    +'</ul>';
    //
    //    //追加到.order-content后面
    //    $(".order-content").append(listStr);
    //
    //}





});

//function getSessionStorage(key){
//    var returnValue;
//    $.ajax({
//        url:"http://172.16.96.111:8085/zlzf-wechat/onlineShop/getSession.do/zlzf-wechat/onlineShop/getSession.do",//要请求的服务器url
//        data:{sessionKey:key},  //这里的email对应表单中的name="email"，也是发送url中的email=value(GET方式)
//        async:false,   //是否为异步请求
//        cache:false,  //是否缓存结果
//        type:"POST", //请求方式为POST
//        dataType:"json",   //服务器返回的数据是什么类型
//        success:function(result){  //这个方法会在服务器执行成功是被调用 ，参数result就是服务器返回的值(现在是json类型)
//            if(result){
//                returnValue= result;
//
//                var productTotalAmount = result.productTotalAmount; //总价
//                var productTotal = result.productTotal; //总数
//                var productInfo = result.productInfo; //商品信息
//                var productId = productInfo.productId; //商品Id
//                var productName = productInfo.productName; //商品名称
//                var productPic = productInfo.productPic; //商品logo
//                var productPrice = productInfo.productPrice; //商品单价
//                var productSum = productInfo.productSum; //商品单个数量
//
//                var listStr = '';
//                $.each(function(){
//                    listStr +='<ul class="order-li row">'
//                                +'<li class="col-xs-5">'+productName+'</li>'
//                                +'<li class="col-xs-2">'+'x'+productSum+'</li>'
//                                +'<li class="col-xs-5">'+'￥'+productPrice+'</li>'
//                            +'</ul>';
//
//                    //追加到.order-content后面
//                    $(".order-content").append(listStr);
//
//                })
//
//
//            }else{
//                returnValue= null;
//            }
//        },
//        error:function(result){  //这个方法会在服务器执行成功是被调用 ，参数result就是服务器返回的值(现在是json类型)
//            returnValue= null;
//        }
//    });
//    return returnValue;
//}



function getData(){
//		var set_Json = sessionStorage.getItem("set_Json");
//		console.log(set_Json);
//		$('#total').html("￥"+set_Json);
}
//取消
function cancelBtn(){

}
//支付
function payBtn(){
    //if(){
       $("#payBtn").attr("data-target","#myModal");
    //}

}
function signBtn(){

    window.location.href = "sign_in.html";
}