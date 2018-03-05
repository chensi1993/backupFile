/**
 * Created by chensi on 2017/7/27.
 */
$(function(){
    var counter = 0;
    // 每页展示4个
    var num = 4;
    var pageStart = 0,pageEnd = 0;

    // dropload
    $('.content').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            $.ajax({
                type: 'GET',
                url: 'resources/json/blog.json',
                dataType: 'json',
                success: function(data){
                    var result = '';
                    counter++;
                    pageEnd = num * counter;
                    pageStart = pageEnd - num;

                    for(var i = pageStart; i < pageEnd; i++){
                        result +='<div class="merchant_list row" id="notAdd">'
                        +   '<div class="col-xs-7 list_left">'
                        +       '<h3>'+ data.list[i].name +'</h3>'
                        +       '<p>'+'签约于'+'<span>'+ data.list[i].date +'</span>'+'</p>'
                        +   '</div>'
                        +   '<div class="col-xs-5 list_right">'
                        +       '<span>'+ data.list[i].noAdd +'</span>'
                        +   '</div>'
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
                        $('.merchant_contain').append(result);
                        // 每次数据加载完，必须重置
                        me.resetload();
                    },1000);
                },
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        }
    });
});