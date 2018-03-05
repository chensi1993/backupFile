/**
 * Created by chensi on 2018/1/18.
 */
$(function(){

    //loadData();
    //兼容iOS设备样式
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        $(".section-li:last-of-type").css("margin-bottom","5rem");
    }
    //左侧菜单列表切换
    var btn=getClass('tab_btn');//获取按钮数组
    var div=getClass('tab_div');//获取div数组
    for(i=0;i<btn.length;i++){
        btn[i].onclick=function(){//按钮点击事件
            var index=(this.getAttribute('index')-0);//获取是第几个按钮按下
            if(btn[index].className.indexOf('curr_btn')>=0) return;//如果按下的按钮为当前选中的按钮则无反应
            for(i=0;i<btn.length;i++){
                if(index==i){
                    btn[i].className='tab_btn curr_btn';
                    div[i].className='tab_div curr_div';
                }else{
                    btn[i].className='tab_btn';
                    div[i].className='tab_div';
                }
            }
        }
    }

    //右侧商品数量增加、减少
    var setJson = [];

    $("#shopCart").on("touchstart",function () {
        //for(var i=0;i<setObj.length;i++){
        //    setJson.push(setObj);
        //    sessionStorage.setItem("setJson",JSON.stringify(setJson));
        //}
        //window.location = "jumpTo.html";


        //$.each($(".section-li"),function(i,dom){
        //    console.log(setObj);

            sessionStorage.setItem("setJson",JSON.stringify(setJson));
            window.location = "jumpTo.html";
        //})

    });

    //var str = sessionStorage.getItem("setJson");
    //console.log(str);

    //商品增加
    $(".add").on("touchstart", function () {
        var img =$(this).parent(".lt-rt").parent(".rt-info").parent(".prt-rt").prev(".prt-lt").find("img")[0].src;
        var name =$(this).parent(".lt-rt").parent(".rt-info").prev(".rt-name").html(); //商品名称
        var result = $(this).parent().find('input[class*=result]');
        result.val(parseInt(result.val()) + 1);//商品数量+1
        var price = $(this).parent(".lt-rt").prev(".info-p").find(".price").html(); //商品单价

        var setObj ={
            "setImg":"", //商品图片
            "setName":"", //商品名称
            "setNum":"",  //单个购买数量
            "setMoney":""//单价
        };
        setObj["setImg"]=img.toString();
        setObj["setName"]=name.toString();
        setObj["setNum"]=result.val().toString();
        setObj["setMoney"]=price.toString();
        setJson.push(setObj);
        //console.log(setObj);


        //sessionStorage.setItem("shopName",name);
        //sessionStorage.setItem("addVal",result.val());
        //sessionStorage.setItem("shopPrice",price);
        //
        //var str1 = sessionStorage.getItem("shopName");
        //var str2 = sessionStorage.getItem("addVal");
        //var str3 = sessionStorage.getItem("shopPrice");
        //console.log(str1+'增加');
        //console.log(str2+'增加');
        //console.log(str3+'增加');


    });


    //商品减少
    $(".minus").on("touchstart",function () {
        var img =$(this).parent(".lt-rt").parent(".rt-info").parent(".prt-rt").prev(".prt-lt").find("img")[0].src;
        var name =$(this).parent(".lt-rt").parent(".rt-info").prev(".rt-name").html(); //商品名称
        var result = $(this).parent().find('input[class*=result]');
        result.val(parseInt(result.val()) - 1);//商品数量-1
        var that = this;
        //商品数量减到0是，数量为0
        if(parseInt(result.val())<0){
            console.log(that);
            result.val(0);
        }
        var price = $(this).parent(".lt-rt").prev(".info-p").find(".price").html(); //商品单价

        var setObj ={
            "setImg":"", //商品图片
            "setName":"", //商品名称
            "setNum":"",  //单个购买数量
            "setMoney":""//单价
        };
        setObj["setImg"]=img.toString();
        setObj["setName"]=name.toString();
        setObj["setNum"]=result.val().toString();
        setObj["setMoney"]=price.toString();
        setJson.push(setObj);
        //console.log(setObj);
        //console.log(setObj);

        //sessionStorage.setItem("shopName",name);
        //sessionStorage.setItem("addVal",result.val());
        //sessionStorage.setItem("shopPrice",price);
        //var str1 = sessionStorage.getItem("shopName");
        //var str2 = sessionStorage.getItem("addVal");
        //var str3 = sessionStorage.getItem("shopPrice");
        //console.log(str1+'减少');
        //console.log(str2+'减少');
        //console.log(str3+'减少');
    });


    //点击购物车传入首页的数据
    //var setJson =[];
    //$("#shopCart").click(function () {
        //$.each($(".section-li"),function(i,dom){
        //
        //    var setObj ={
        //        //"setId":"",  //商品Id
        //        "setImg":"", //商品图片
        //        "setName":"", //商品名称
        //        "setNum":"",  //单个购买数量
        //        "setMoney":""//单价
        //    };
        //    //获取加载后页面里的数据
        //    var setImg = $(this).children(".prt-lt").find("img")[0].src;
        //    var setName = $(this).children(".prt-rt").find(".rt-name").html();
        //    var setNum = $(this).children(".prt-rt").find(".rt-info").find(".lt-rt").children(".result").html();
        //    var setMoney = $(this).children(".prt-rt").find(".rt-info").find(".info-p").find(".price").html();
        //
        //
        //    //数据以对象的形式存储
        //    //setObj["setId"]=setId.toString();
        //    setObj["setImg"]=setImg.toString();
        //    setObj["setName"]=setName.toString();
        //    setObj["setNum"]=setNum.toString();
        //    setObj["setMoney"]=setMoney.toString();
        //
        //    setJson.push(setObj);
        //    sessionStorage.setItem("setJson",JSON.stringify(setJson));
        //
        //    //window.location = "Shopping_Cart.html";
        //});
        //var str = sessionStorage.getItem("setJson");
        //console.log(str);

    //})



});


//获取class类名
function getClass(className) { //className指class的值

    var tagname = document.getElementsByTagName('*');  //获取指定元素
    var tagnameAll = [];     //这个数组用于存储所有符合条件的元素
    for (var i = 0; i < tagname.length; i++) {     //遍历获得的元素
        if (tagname[i].className.indexOf(className)>=0){     //如果获得的元素中的class的值等于指定的类名，就赋值给tagnameAll
            tagnameAll[tagnameAll.length] = tagname[i];
        }
    }
    return tagnameAll;

}
//加载数据
//function loadData(){
//    $.ajax({
//        type: 'GET',
//        url: 'resources/js/index.json',
//        dataType: 'json',
//        success: function(data){
//            console.log(data);
//            var dataList = data.list;
//            var listData = dataList[0].listData;
//
//            var str = "";
//            for(var i=0;i<listData.length;i++){
//                //console.log(listData[i].trade);
//
//                str +='<div class="section-li row">'
//                            +'<div class="prt-lt col-xs-4">'
//                                +'<img src="resources/img/latiao.jpg">'
//                            +'</div>'
//                            +'<div class="prt-rt col-xs-8">'
//                                +'<p class="rt-name">'+listData[i].trade+'</p>'
//                                +'<div class="rt-info row">'
//                                    +'<p class="info-p col-xs-4">'+'<span class="price">'+'¥'+listData[i].price +'</span>'+'</p>'
//                                    +'<div class="lt-rt col-xs-8">'
//                                        +'<input type="button" class="minus" value="-">'
//                                        +'<input type="text" class="result" value="0">'
//                                        +'<input type="button" class="add" value="+">'
//                                    +'</div>'
//                                +'</div>'
//                            +'</div>'
//                        +'</div>'
//            }
//            $('.shop-list').append(str);
//        }
//    })
//}




