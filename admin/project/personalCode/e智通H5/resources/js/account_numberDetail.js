/**
 * Created by admin on 2018/4/3.
 */
$(function(){

    loadData();


});
//没有交易记录时显示
//$(".default-tips").css("display","block");

//跳转到明细详情
$(".contents-list").children(".list-info").on("click",function(){
    window.location.href = "numberDetail_second.html";
});

//加载更多
//$('.content-center').dropload({
//    scrollArea : window,
//    loadDownFn : function(me){
        //$.ajax({
        //    type: 'GET',
        //    url: 'json/more.json',
        //    dataType: 'json',
        //    success: function(data){
        //        alert(data);
        //        // 每次数据加载完，必须重置
        //        me.resetload();
        //    },
        //    error: function(xhr, type){
        //        alert('Ajax error!');
        //        // 即使加载出错，也得重置
        //        me.resetload();
        //    }
        //});

        //var contentsLlist =
//    }
//});



function loadData(){
    var classIndex = 0;
    $.ajax({
        type: 'GET',
        url: 'resources/js/list.json',
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data){

            var shopData = data.shopData;
            //console.log(shopData);

            var shopLists = shopData[2].shopList;
            console.log(shopLists);
            var shopList ='<h3>'+'本月'+'</h3>';
            $.each(shopLists,function(j,json){
                //console.log(shopLists);
                var shopName =json.shopName;
                var shopPrice =json.shopPrice;

                shopList +='<div class="list-info">'
                +'<div class="list-left col-xs-2">'
                +'<img src="../img/v1mxshanghu@2x.png" alt=""/>'
                +'</div>'
                +'<div class="list-center col-xs-6">'
                +'<p>'+'消费-'+shopName +'</p>'
                +'<p>'+'<span>'+'03-22'+'</span>'+'<span>'+'13:00'+'</span>'+'</p>'
                +'</div>'
                +'<div class="list-right col-xs-4">'
                +'<div class="right-top">'
                +'<span>'+shopPrice+'</span>'
                +'<img src="../img/v1more2@2x.png" alt=""/>'
                +'</div>'
                +'<div class="right-bottom">'
                +'<span>'+'已退款全额退款'+'</span>'
                +'</div>'
                +'</div>'
                +'</div>';
            });
            $(".contents-list").append(shopList);

            //$.each(shopData,function(i,json){
            //    shopData = '<div class="contents-list">'+'</div>'
            //    $('.content-center').append(shopData);
            //});



            // 每次数据加载完，必须重置
            //me.resetload();
        },
        error: function(xhr, type){
            alert('Ajax error!');
            // 即使加载出错，也得重置
            //me.resetload();
        }
    });
}



















//上拉加载更多
function addMore(){
    var counter = 1;//页码数
    var num = 5;// 每页展示5个
    var pageStart = 0,pageEnd = 0;

    // dropload函数接口设置
    $('.content-center').dropload({
        scrollArea : window,
        //上拉加载更多 回调函数
        loadDownFn : function(me){
            // 每次请求，页码加1
            //counter++;
            $.ajax({
                type: 'GET',
                url: '',
                dataType: 'json',
                success: function(data){
                    //data = JSON.parse(data);
                    var result = '';
                    counter++;
                    pageEnd = num * counter;
                    pageStart = pageEnd - num;
                    result +='<h3>'+'本月'+'</h3>';
                    // 选择需要显示的数据 拼接 DOM
                    for(var i = pageStart; i < pageEnd; i++){
                        result +='<div class="list-info">'
                            +'<div class="list-left col-xs-2">'
                                +'<img src="../img/v1mxshanghu@2x.png" alt=""/>'
                            +'</div>'
                            +'<div class="list-center col-xs-6">'
                                +'<p>'+'消费-小胖沙县'+'</p>'
                                +'<p>'+'<span>'+'03-22'+'</span>'+'<span>'+'13:00'+'</span>'+'</p>'
                            +'</div>'
                            +'<div class="list-right col-xs-4">'
                                +'<div class="right-top">'
                                    +'<span>'+'-100.00'+'</span>'
                                    +'<img src="../img/v1more2@2x.png" alt=""/>'
                                +'</div>'
                                +'<div class="right-bottom">'
                                    +'<span>'+'已退款全额退款'+'</span>'
                                +'</div>'
                            +'</div>'
                        +'</div>';


                        if((i + 1) >= data.list.length){
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            break;
                        }
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                        // 加载 插入到原有 DOM 之后
                        $('.contents-list').append(result);
                        // 每次数据加载完，必须重置
                        me.resetload();
                    },1000);
                },
                // 加载出错
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        }
    });
}
//addMore();