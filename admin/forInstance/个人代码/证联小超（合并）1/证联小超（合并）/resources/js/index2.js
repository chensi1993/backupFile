/**
 * Created by chensi on 2018/1/18.
 */
//点击购物车将选取的数据传入购物车
var setJson = [];
$(function () {

    var classIndex = 0;
    $(".tab_btn").on("click",function(){
        $("#tab").empty();
        classIndex = $(this).index();
        $(this).addClass("curr_btn").siblings().removeClass("curr_btn");

        //var params ={
        //};
        $.ajax({
            type:"GET",
            url:"resources/js/index2.json",
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            async : true,
            //data:JSON.stringify(params),
            success:function(data){
                var goodsList = data.goodsList;
                //var shopData = data.shopData;
                var shopData = data.shopData;
                var shopLists = data.shopData[classIndex].shopList;



                //$.each(goodsList,function(i,list){
                //    //console.log(goodsList);
                //    var title = list.title ;//类别名称
                //    var orderLi ="<a href='javascript:void(0)' class='tab_btn'>"+title+"</a>";
                //    $("#btn").append(orderLi);
                //    $("#btn").children("a").eq(0).addClass("curr_btn");
                //    $("#btn").children("a").eq(i).attr("index",i);
                //});

                //var classIdTemp = null; //商品类别名
                $.each(shopLists,function(j,json){
                    console.log(shopLists);

                    var img = json.img;
                    var shopName =json.shopName;
                    var shopPrice =json.shopPrice;
                    //var classId = json.classId;  //菜品类别ID
                    var shopList = '<div class="shop-list section curr_div">'
                        +'<div class="section-li row" id="001">'
                        +'<div class="prt-lt col-xs-4">'
                        +'<img src='+img+'>'
                        +'</div>'
                        +'<div class="prt-rt col-xs-8">'
                        +'<p class="rt-name">'+shopName+'</p>'
                        +'<div class="rt-info row">'
                        +'<p class="info-p col-xs-4">'+'¥'+'<span class="price">'+shopPrice+'</span>'+'</p>'
                        +'<div class="lt-rt col-xs-8">'
                        +'<button type="button" class="addBtn">'+'加入购物车'+'</button>'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                        + '</div>';
                    $("#tab").append(shopList);
                    //console.log(shopData);
                    //$("#tab").children(".shop-list").eq(0).addClass("curr_div");
                });
                //兼容iOS设备样式
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    $(".shop-list:last-of-type").css("margin-bottom", "10rem");
                }
            },
            error: function (result) {
                alert(result.statusText);
            }
        });



    });
    ////左侧菜单列表切换
    //var btn = getClass('tab_btn');//获取按钮数组
    //var div = getClass('tab_div');//获取div数组
    //var classIndex = 0;
    //for (i = 0; i < btn.length; i++) {
    //    btn[i].onclick = function () {//按钮点击事件
    //        var index = (this.getAttribute('index') - 0);//获取是第几个按钮按下
    //        classIndex = index;
    //        //console.log(index);
    //        //console.log(classIndex);
    //        if (btn[index].className.indexOf('curr_btn') >= 0) return;//如果按下的按钮为当前选中的按钮则无反应
    //        for (var i = 0; i < btn.length; i++) {
    //            if (index == i) {
    //                btn[i].className = 'tab_btn curr_btn';
    //                //div[i].className = 'tab_div curr_div';
    //            } else {
    //                btn[i].className = 'tab_btn';
    //                //div[i].className = 'tab_div';
    //            }
    //        }
    //        var params ={};
    //        $.ajax({
    //            type:"POST",
    //            url:"resources/js/index2.json",
    //            contentType:"application/json; charset=utf-8",
    //            dataType:"json",
    //            data:JSON.stringify(params),
    //            success:function(data){
    //                //alert(data);
    //                var goodsList = data.goodsList;
    //                //var shopData = data.shopData;
    //                var shopData = data.shopData;
    //                var shopLists = data.shopData[classIndex].shopList;
    //
    //
    //
    //                //$.each(goodsList,function(i,list){
    //                //    //console.log(goodsList);
    //                //    var title = list.title ;//类别名称
    //                //    var orderLi ="<a href='javascript:void(0)' class='tab_btn'>"+title+"</a>";
    //                //    $("#btn").append(orderLi);
    //                //    $("#btn").children("a").eq(0).addClass("curr_btn");
    //                //    $("#btn").children("a").eq(i).attr("index",i);
    //                //});
    //
    //                //var classIdTemp = null; //商品类别名
    //                $.each(shopLists,function(j,json){
    //                    console.log(shopLists);
    //
    //                    var img = json.img;
    //                    var shopName =json.shopName;
    //                    var shopPrice =json.shopPrice;
    //                    //var classId = json.classId;  //菜品类别ID
    //                    var shopList = '<div class="shop-list section curr_div">'
    //                        +'<div class="section-li row" id="001">'
    //                        +'<div class="prt-lt col-xs-4">'
    //                        +'<img src='+img+'>'
    //                        +'</div>'
    //                        +'<div class="prt-rt col-xs-8">'
    //                        +'<p class="rt-name">'+shopName+'</p>'
    //                        +'<div class="rt-info row">'
    //                        +'<p class="info-p col-xs-4">'+'¥'+'<span class="price">'+shopPrice+'</span>'+'</p>'
    //                        +'<div class="lt-rt col-xs-8">'
    //                        +'<button type="button" class="addBtn">'+'加入购物车'+'</button>'
    //                        +'</div>'
    //                        +'</div>'
    //                        +'</div>'
    //                        +'</div>'
    //                        + '</div>';
    //                    $("#tab").append(shopList);
    //                    //console.log(shopData);
    //                    //$("#tab").children(".shop-list").eq(0).addClass("curr_div");
    //                });
    //                //兼容iOS设备样式
    //                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //                    alert("dd");
    //                    $(".shop-list:last-of-type").css("margin-bottom", "10rem");
    //                }
    //            },
    //            error: function (result) {
    //                alert(result.statusText);
    //            }
    //        });
    //    }
    //}



    $(".addBtn").on("click",function () {
        add_shoppingcart(this);
        $("#Total").show();
    });
    //css("display") == "none"
    //点击购物车
    $(".shopp").on("click",function () {
        if ($("#Total").val() > 0) {
            goods();
        }

    });

    //点击遮罩层
    $(".back_color").click(function () {
        goods();
    });
    ////兼容iOS设备样式
    //if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //    $(".section-li:last-of-type").css("margin-bottom", "10rem");
    //}
    //兼容ios按钮点击事件
    document.body.addEventListener('touchstart', function () {
    });

    //点结算的时候把购物车的数据保存到sessionStorage
    $(".footer-nav2 li a button[type='submit']").click(function () {
        var setObj = {
            "setId": "",
            "setName": "", //商品名称
            "setNum": "",  //单个购买数量
            "setMoney": ""//单价
        };
        var trList = $("#goods tr");
        for (var i = 0; i < trList.length; i++) {
            var trId = trList[i].id;
            var tdArr = trList.eq(i).find("td");
            var tdName = tdArr.eq(0).html();//收入类别
            var tdMoney = tdArr.eq(1).html();//收入金额
            var tdInp_val = tdArr.eq(2).find(".result").val();//  备注
//		     alert(trId);
//		    alert(history_income_type);
//		    alert(history_income_money);
//		    alert(history_income_remark);
        }
        setObj["setId"] = trId.toString();
        setObj["setName"] = tdName.toString();
        setObj["setMoney"] = tdMoney.toString();
        setObj["setNum"] = tdInp_val.toString();
        console.log(setJson.length);
        setJson.push(setObj);
        sessionStorage.setItem("setJson", JSON.stringify(setJson));
        console.log(JSON.stringify(setJson));

    });
});
//点击"加入购物车"
function add_shoppingcart(btn) {
    var shopId = $(btn).parent(".lt-rt").parent(".rt-info").parent(".prt-rt").parent(".section-li").attr("id");
    var name = $(btn).parent(".lt-rt").parent(".rt-info").prev(".rt-name").html(); //商品名称
    var price = $(btn).parent(".lt-rt").prev(".info-p").find(".price").html(); //商品单价

//在添加之前确定该商品在购物车中是否存在,若存在,则数量+1,若不存在则创建行
    var $trs = $("#goods>tr");
    for (var i = 0; i < $trs.length; i++) {
        var $gtds = $trs.eq(i).children();
        var gName = $gtds.eq(0).html();
        if (name == gName) {//若存在
            var num = parseInt($gtds.eq(2).children().eq(1).val());
            $gtds.eq(2).children().eq(1).val(++num);//数量+1
            //金额从新计算
            $gtds.eq(2).children().eq(3).val((price * num).toFixed(2));
            total();
            return;//后面代码不再执行
        }
    }
    var li =
        "<tr id=" + shopId + ">" +
        "<td class='Name'>" + name + "</td>" +
        "<td>" + price + "</td>" +
        "<td class='center' align='center'>" +
        "<input type='button' class='minus btn' value='-' onclick='jian(this);'/> " +
        "<input type='number' class='result' size='3' value='1' onfocus='Lose_focus(this);' onblur='onBlur(this);'/> " +
        "<input type='button' class='add btn' value='+' onclick='add(this);'/>" +
        "<input type='hidden' name='money' value=" + price + " />" +
        "</td>" +
        "</tr>";
    //追加到#goods后面
    $("#goods").append($(li));
    //总计功能
    total();

}
//监听购物车里的val获取焦点
function Lose_focus(btn){
    var shopNum =$(btn).val();
    $(btn).keyup(function(){//只能输入正整数
        $(btn).val($(btn).val().replace(/\D|^0/g,''));
    }).bind("paste",function(){
        $(btn).val($(btn).val().replace(/\D|^0/g,''));
    });
}
//监听购物车里的val失去焦点
function onBlur(btn){
    var shopNum = $(btn).val();
    var price = $(btn).parent().prev().html();//获取当前商品单价
    if(shopNum==""||shopNum.match( /^[\u4E00-\u9FA5]{1,}$/)){
        $(btn).val("1");
        shopNum = 1;
    }
    $(btn).next().next().val((shopNum*price).toFixed(2));//当前商品小计
    total();//计算总价
}

function onFocus(foc){
    var shopNum =$(foc).val();
    console.log(shopNum);
}
function onBlur(blu){
    var shopNum =$(blu).val();
    var price = $(blu).parent().prev().html();
    console.log(shopNum);
    console.log(price);
}
//增加"+"功能
function add(btn) {
    //购物车数据改变
    var $td = $(btn).prev();
    var num = parseInt($td.val());//number
    //num此时为number类型(在计算时会自动转换为number类型)
    $td.val(++num);
    //获取单价,再加计算前要先转换为number类型
    var price = $(btn).parent().prev().html();
    $(btn).next().val((num * price).toFixed(2));
    //总计功能
    total();
}
//减少"-"功能
function jian(btn) {
    //该商品数量=1时候不能再减少
    var num = parseInt($(btn).next().val());
    if (num <= 1) {
        $(btn).parent().parent().remove();
    }
    //商品数量-1
    $(btn).next().val(--num);
    //从新计算金额
    var price = $(btn).parent().prev().html();
    $(btn).next().next().next().val((num * price).toFixed(2));

    //总计功能
    total();
}
//监听数量
//function Inp_val(btn) {
//    var num = parseInt($(btn).val());
//    if (isNaN(num)) {
//        $(btn).val();
//        alert(num);
//    } else if (num == "0") {
//        $(btn).parent().parent().remove();
//        $(btn).val("0");
//    }
//    var price = $(btn).parent().prev().html();
//    $(btn).next().next().val((num * price).toFixed(2));
//    total();
//}
//删除购物车所有商品
function Del() {
    $("#goods").children("tr").remove();
    //总计功能
    total();
}
//总计功能
function total() {
    //获取所有购物车中的trs
    var $trs = $("#goods tr");
    var amount = 0;
//	    alert($trs);
    var V_al = 0;
    for (var i = 0; i < $trs.length; i++) {
        var money = Number($trs.eq(i).children().eq(2).children().eq(3).val());
        var vaL = parseInt($trs.eq(i).children().eq(2).children().eq(1).val());
        amount += money;
        V_al += vaL;
    }
    //写入总计栏

    $(".Input").val(amount.toFixed(2));
    $("#Total").val(V_al);
    if (V_al < 1) {
        $("#Total").hide();
        $(".Input").val(amount);
        goods();
    }
}
function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+','+
        num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
}


//点击购物车查看详情，蒙层显示
function goods() {
    $("#goods2").toggle(500);//已选商品
    if ($(".back_color").css("display") == "none") {
        $(".back_color").show();//蒙层显示
        $(".container").css("position", "fixed");
    } else {
        $(".back_color").hide();//蒙层隐藏
        $(".container").css("position", "absolute");
    }
}
//获取class类名
function getClass(className) { //className指class的值
    var tagname = document.getElementsByTagName('*');  //获取指定元素
    var tagnameAll = [];     //这个数组用于存储所有符合条件的元素
    for (var i = 0; i < tagname.length; i++) {     //遍历获得的元素
        if (tagname[i].className.indexOf(className) >= 0) {     //如果获得的元素中的class的值等于指定的类名，就赋值给tagnameAll
            tagnameAll[tagnameAll.length] = tagname[i];
        }
    }
    return tagnameAll;

}





