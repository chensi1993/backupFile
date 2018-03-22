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