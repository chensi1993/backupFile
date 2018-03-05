/**
 * Created by chensi on 2018/1/20.
 */
$(function(){
    $('.order-title').on('click',function(){
        $('.order-content').toggle();
        if($(this).find("img").hasClass("rotate")){ //点击箭头旋转180度

            $(this).find("img").removeClass("rotate");

            $(this).find("img").addClass("rotate1");

        }else{

            $(this).find("img").removeClass("rotate1"); //再次点击箭头回来

            $(this).find("img").addClass("rotate");

        }
    });
});
