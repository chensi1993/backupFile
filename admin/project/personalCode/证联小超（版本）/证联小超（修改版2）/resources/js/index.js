/**
 * Created by chensi on 2018/1/18.
 */
$(function(){
    loadSuc();

    ////点击购物车将选取的数据传入购物车
    var setJson = [];
    ////console.log(setJson+"初始数据");
    //
    ////存放从购物车传过来的数据
    //var ageGetJson = localStorage.getItem("shopJson");
    //console.log(ageGetJson+"从购物车传过来的数据");
    ////ageGetJson=JSON.parse(ageGetJson);
    //if(ageGetJson != null){
    //   setJson = setJson.concat(ageGetJson);
    //   console.log(setJson+"拼接数据");
    //   //setJson = ageGetJson;
    //}

    $("#shopCart").on("touchstart",function () {

        localStorage.setItem("setJson",JSON.stringify(setJson));
        //localStorage.setItem("setJson",setJson);
        window.location.href = "Shopping_Cart.html";

    });


//右侧商品数量增加、减少
//商品增加
    $(".addBtn").on("touchstart",function () {

        var setObj ={
            "setId":"",
            "setImg":"", //商品图片
            "setName":"", //商品名称
            "setNum":"",  //单个购买数量
            "setMoney":""//单价
        };

        var shopId =$(this).parent(".lt-rt").parent(".rt-info").parent(".prt-rt").parent(".section-li").attr("id");
        var img =$(this).parent(".lt-rt").parent(".rt-info").parent(".prt-rt").prev(".prt-lt").find("img")[0].src;
        var name =$(this).parent(".lt-rt").parent(".rt-info").prev(".rt-name").html(); //商品名称
        var price = $(this).parent(".lt-rt").prev(".info-p").find(".price").html(); //商品单价

        setObj["setId"]=shopId.toString();
        setObj["setImg"]=img.toString();
        setObj["setName"]=name.toString();
        setObj["setMoney"]=price.toString();
        setObj["setNum"]='1';
        //console.log(setJson.length);
        setJson.push(setObj);

    });
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
function loadSuc(){
    //兼容iOS设备样式
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        $(".section-li:last-of-type").css("margin-bottom","5rem");
    }
    //兼容ios按钮点击事件
    document.body.addEventListener('touchstart',function(){});
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
}











