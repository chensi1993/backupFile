/**
 * Created by chensi on 2018/2/8.
 */
$(function(){
    //点击下拉按钮展示商品
    $('.order-title').on('click',function(){
        $(this).next('.order-content').toggle();
        if($(this).find("img").hasClass("rotate")){ //点击箭头旋转180度

            $(this).find("img").removeClass("rotate");

            $(this).find("img").addClass("rotate1");

        }else{

            $(this).find("img").removeClass("rotate1"); //再次点击箭头回来

            $(this).find("img").addClass("rotate");

        }
    });
});

//将数字转换成金额显示
function toMoney(num){
    num = num.toFixed(2);
    num = parseFloat(num);
    num = num.toLocaleString();
    return num;//返回的是字符串23,245.12保留2位小数
}