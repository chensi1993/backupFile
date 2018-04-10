/**
 * Created by admin on 2018/4/2.
 */
$(function(){
    $(".top-image").on("click",function(){
        $('#myModal').modal('show');//模态框
    });
    $("#yesBtn").on("click",function(){
        window.history.go(-1);
    })

});