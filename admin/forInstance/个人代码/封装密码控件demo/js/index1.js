/**
 * Created by admin on 2018/4/25.
 */
$(function () {
    //输入密码格子的ul标签，class名要跟对应的input框的id名相同
    //初始化密码卫士,绑定键盘对象。数字参数：0代表全键盘，1代表数字键盘
    passGuard1.generate("kb1", kb, "passGuard1", 1);

});
var kb = new keyBoard({
    "chaosMode": 0, // 混乱模式,0:无混乱;1:打开时乱一次;2:每输入一个字符乱一次,默认值0
    "pressStatus": 1, // 按键状态,0:按下、抬起按键无变化;1:按下、抬起按键的颜色变化,默认值0
    "kbType": 0, // 键盘类型,0:全键盘;1:纯数字键盘,默认值0
    "svg": "svg",//svg图片的地址
    "hasMap": "0",//是否调用mapping值：当为1时调用，当为非1时，不调用
    "license": "YytaZmJyZEM0M1ZEV1VZcmEvaXduNmZiSlRROWlEblcrdkZzZFcxUXdHSndvVWlCamZjRGRId2tuSnBEN3pJRFpSVDREQ1pTSVYxTmZ6L21kYkk2c2NXbUVQSVdnRGZSNldPSnAzQkgyVThwTUs1SXdoeTdCc1BBQUJ5em9vd2JLODFmcVpIbkF4SUkxNFY1QzdDRjZSREZCSmduS1N1QzMrMVVYNFFWNkVVPXsiaWQiOjAsInR5cGUiOiJ0ZXN0IiwicGxhdGZvcm0iOjEwLCJub3RiZWZvcmUiOiIyMDE4MDQxMyIsIm5vdGFmdGVyIjoiMjAxODA3MTMifQ=="
});
//设置映射数组,此处为了方便demo演示，写死了，正常应该由
//服务器端下发映射数组
passGuard.mapArr = "Wyc0MycsICc1NycsICc3MScsICcxMjEnLCAnMTI2JywgJzEyNCcsICc5MCcsICcxMTInLCAnODknLCAnOTMnLCAnMTA1JywgJzgxJywgJzExMycsICcxMjUnLCAnNjgnLCAnMzgnLCAnODUnLCAnNjUnLCAnMTE4JywgJzgwJywgJzg3JywgJzkxJywgJzQ0JywgJzMzJywgJzc4JywgJzg4JywgJzk2JywgJzEwOScsICc2MScsICc2NicsICc0MCcsICc4MicsICc3MicsICcxMjAnLCAnOTUnLCAnMTEwJywgJzQ2JywgJzg2JywgJzEwNycsICc1MCcsICc3MCcsICc5OCcsICcxMTcnLCAnMzYnLCAnMTAxJywgJzgzJywgJzQ4JywgJzExNCcsICc2NycsICc3NycsICcxMDgnLCAnMTAwJywgJzM1JywgJzczJywgJzY5JywgJzk5JywgJzEwMicsICc3NicsICc3NScsICcxMDQnLCAnNDknLCAnOTInLCAnNjInLCAnNTgnLCAnNTMnLCAnNzknLCAnOTcnLCAnNDUnLCAnNDEnLCAnMTE5JywgJzEyMycsICc1MScsICc2MycsICc0NycsICcxMDYnLCAnMzknLCAnMTExJywgJzExNScsICczNCcsICc5NCcsICcxMjInLCAnNjQnLCAnNTknLCAnMTE2JywgJzM3JywgJzc0JywgJzU1JywgJzYwJywgJzU0JywgJzUyJywgJzQyJywgJzg0JywgJzEwMycsICc1Nidd";
var passGuard1 = new passGuard({
    "mappurl": "./send_mapping.jsp",
    "jump": 1, //是否用添加删除回调：1代表使用，0代表不使用
    "add": tianjia, //输入框值添加回调,当jump为1时，才有回调
    "del": jianshao, //输入框值减少回调,当jump为1时，才有回调
    "maxLength": 6, // 最大输入长度
    "regExp1": "[\\S\\s]", // 输入过程限制的正则
    "regExp2": "[0-9]{6,12}",
    "displayMode": 0, // 显示形式,0:星号;1:明文,默认值0
    "callBack": cb5, //成功回调
    "errorCallBack": cb6, //失败回调
    "focus": inputFocus1,//H5键盘获取焦点回调
    "blur": inputBlur1,//H5键盘失去焦点回调
    "rsaPublicKey": "3081890281810092d9d8d04fb5f8ef9b8374f21690fd46fdbf49b40eeccdf416b4e2ac2044b0cfe3bd67eb4416b26fd18c9d3833770a526fd1ab66a83ed969af74238d6c900403fc498154ec74eaf420e7338675cad7f19332b4a56be4ff946b662a3c2d217efbe4dc646fb742b8c62bfe8e25fd5dc59e7540695fa8b9cd5bfd9f92dfad009d230203010001" // rsa公钥
});
//H5键盘获取焦点回调
function inputFocus1() {
    console.log("passGuard1输入框获得焦点");
}
//H5键盘失去焦点回调
function inputBlur1() {
    console.log("passGuard1输入框失去焦点");
}
//成功回调
function cb5() {
    $(".cover").hide();
    $(".cover-Div").hide();
    $(".kb1 li").html("");
    console.log("开始提交");
    console.log(passGuard1.getOutput());
    //formSubmit(); //输入成功跳转
}
//失败回调
function cb6() {
    console.log("失败3");
}
//输入框值添加回调
function tianjia(xh) { //xh为密码的长度
    $(".kb1>li").eq(xh - 1).text("").append($("<p class='yuan'></p>"));
    if (xh == 6) {
        kb.hide();
    }
}
//输入框值减少回调
function jianshao(xh) {
    $(".kb1>li").eq(xh).html("——");
}
window.onload = function () {
    Le = 1;//调用H5键盘的input框
    for (var i = 1; i <= 1; i++) {//PH.arrPlace-->H5输入框的placeholder数组；PH.arrId-->H5输入框的id数组
        $("#" + PH.arrId[i - 1]).val("");
    }
    setTimeout(function () {
        kb.generate();
        Show = 0;
    }, 100);
    //输入密码格子样式
    var liHeight = document.documentElement.clientWidth * 0.81 * 0.166;
    $(".kb1>li").css({
        height: liHeight + "px",
        lineHeight: liHeight + "px"
    });
    $("#kb1").css({
        height: liHeight + "px"
    });
    $("#LoginBtn").on("touchstart", function () {
        $(".cover").fadeIn(300);
        $(".cover-Div").show();
        setTimeout(function () {
            $("#kb1").focus(); //调用键盘
        }, 50)
    });
    //$(".close").on("touchend", function() {
    //    $(".cover").fadeOut(300);
    //    $(".cover-Div").hide();
    //    clearpwd();
    //});
    $(document).on("touchstart", function (e) {
        if (e.target.className.indexOf("cover") > -1) {
            clearpwd();
            $(".cover").hide();
            $(".cover-Div").hide();
            e.preventDefault();
        }
    });
    //关闭6个格子时，删除密码
    function clearpwd() {
        $("#kb1").val("");
        passGuard1.getOutput();//对应键盘的密文清空
        $(".kb1 li").html("");//对应输入密码格子清空
    }
};