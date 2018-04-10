/**
 * Created by admin on 2018/4/3.
 */
$(function(){

    loadData();
});

//跳转到明细详情
$(".contents-list").children(".list-info").on("click",function(){
    //var listId =$(".contents-list").children(".list-info").attr('id');
    window.location.href = "numberDetail_second.html";
});

//上拉加载更多
function loadData(){
    var counter = 0;//页码数

    // dropload函数接口设置
    $('.content-center').dropload({
        scrollArea : window,
        //上拉加载更多 回调函数
        loadDownFn : function(me){
            // 每次请求，页码加1
            counter++;
            $.ajax({
                type: 'GET',
                url: 'resources/js/list.json',
                dataType: 'json',
                success: function(data){

                    console.log(data);
                    var result = '';
                    // 选择需要显示的数据 拼接 DOM
                    for(var i = 0; i < data.shopList.length; i++){

                        result +='<div class="list-info" id="infoList">'
                        +'<div class="list-left col-xs-2">'
                        +'<img src="http://localhost:63342/workSpace/admin/project/personalCode/e%E6%99%BA%E9%80%9AH5/resources/img/v1mxshanghu@2x.png"/>'
                        +'</div>'
                        +'<div class="list-center col-xs-6">'
                        +'<p>'+'消费-'+ data.shopList[i].shopName +'</p>'
                        +'<p>'+'<span>'+'03-22'+'</span>'+'<span>'+'13:00'+'</span>'+'</p>'
                        +'</div>'
                        +'<div class="list-right col-xs-4">'
                        +'<div class="right-top">'
                        +'<span>'+'-'+data.shopList[i].shopPrice+'</span>'
                        +'<img src="http://localhost:63342/workSpace/admin/project/personalCode/e%E6%99%BA%E9%80%9AH5/resources/img/v1more2@2x.png">'
                        +'</div>'
                        +'</div>'
                        +'</div>';

                    }
                    //var refund ='<div class="right-bottom">'
                    //    +'<span>'+'已退款全额退款'+'('+'30.00'+')'+'</span>'
                    //    +'</div>';
                    //
                    //$('.list-right').append(refund);

                    //首次加载无数据
                    if(counter == 1 && data.shopList.length == 0){
                        //锁定
                        me.lock();
                        //无数据展示
                        noDateShow();
                    }
                    if(data.shopList.length == 0){

                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    }

                    $('.contents-list').append(result);
                    // 每次数据加载完，必须重置
                    me.resetload();
                },
                // 加载出错
                error: function(xhr, type){
                    alert('Ajax error!');
                }
            });
        }
    });
}
//无数据展示
function noDateShow(){
    $(".default-tips").css("display","block");//提示语显示
    $(".content-center").css("display","none");//列表隐藏
}
