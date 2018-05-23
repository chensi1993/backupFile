/**
 * Created by chensi on 2018/4/18.
 */
$(function(){
    second("加载中...");
    secondout();

    //监听三个input输入框状态，改变按钮颜色
    $('#add_cardnumber').bind('input propertychange', function() {
        changeColor();
    });
    $('#add_bank').bind('input propertychange', function() {
        changeColor();
    });
    $('#add_phone').bind('input propertychange', function() {
        changeColor();
    });
});
// 正则验证银行卡方法
//!function () {
//    $('#add_cardnumber').on('keyup mouseout input',function(){
//        var $this = $(this),
//            v = $this.val();
//        /\S{5}/.test(v) && $this.val(v.replace(/\s/g,'').replace(/(.{4})/g, "$1 "));
//    });
//}();
function changeColor(){
    var cardNumber = $.trim($("#add_cardnumber").val());//获取银行卡号
    var addBank = $.trim($("#add_bank").val());//获取银行卡卡类型
    var phone = $.trim($("#add_phone").val());//获取手机号
    //var regex = /^(998801|998802|622525|622526|435744|435745|483536|528020|526855|622156|622155|356869|531659|622157|627066|627067|627068|627069)\d{10}$/;
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if(cardNumber !="" && addBank !="" && phone !="" && myreg.test(phone)){
        $("#nextBtn").attr("disabled",false);
        $("#nextBtn").css("background","#4995EF");

    }else{
        $("#nextBtn").attr("disabled",true);
        $("#nextBtn").css("background","#ADCBF2");
    }
}
//手机号说明
function modalTips(){
    $("#myModal").modal("show");
}

//点击提交
function isCheck(){
    var cardNumber = $.trim($("#add_cardnumber").val());//获取银行卡号
    console.log(cardNumber);
    var addBank = $.trim($("#add_bank").val());//获取银行卡卡类型
    var phone = $.trim($("#add_phone").val());//获取手机号
    if (cardNumber == null || cardNumber == "")
    {
        showModal("请输入银行卡卡号！");
        return;
    }
    if (addBank == null || addBank == "")
    {
        showModal("请选择银行卡卡类型！");
        return;
    }
    if (phone == null || phone == "")
    {
        showModal("请输入手机号！");
        return;
    }
    $("#nextBtn").attr("disabled",true);



}
//联动选择
//function mobileSelect(){
    var bankCardArr=['中国银行','建设银行','工商银行','民生银行','浦发银行','兴业银行'];
    var cardTypeArr = ['储蓄卡'];

    var mobileSelect2 = new MobileSelect({
        trigger: '#add_bank', //trigger(必填参数) 触发对象的id/class/tag
        wheels: [          //wheels(必填参数)  数据源,需要显示的数据
            {data: bankCardArr},
            {data: cardTypeArr}
        ],
        position:[0, 0],  //初始化定位
        transitionEnd:function(indexArr, data){  //每一次手势滑动结束后触发的回调函数,返回indexArr(当前选中的选项索引)、data(选中的数据)
            console.log(data);
            $("#add_bank").val(data[0]);
        },
        callback:function(indexArr, data){   //选择成功后触发的回调函数，返回indexArr(选中的选项索引)、data(选中的数据)
            console.log(data);
            $("#add_bank").val(data[0]);

        }
    });
    mobileSelect2.locatePostion(0,1);

//}
