/**
 * Created by chensi on 2017/7/26.
 */
$(document).ready(function () {
    //点击‘费率状态’显示/隐藏下拉框
    $('#status_click').on('click',function(){
        $('.status_list').toggle();
        if($(this).find("img").hasClass("rotate")){ //点击箭头旋转180度

            $(this).find("img").removeClass("rotate");

            $(this).find("img").addClass("rotate1");

        }else{

            $(this).find("img").removeClass("rotate1"); //再次点击箭头回来

            $(this).find("img").addClass("rotate");

        }
    });
    //点击选择列表隐藏下拉列表
    $('.status_ul>li').on('click',function(){
        $('.status_list').hide();
        if($("#status_click").find("img").hasClass("rotate")){ //点击箭头旋转180度

            $("#status_click").find("img").removeClass("rotate");

            $("#status_click").find("img").addClass("rotate1");

        }else{

            $("#status_click").find("img").removeClass("rotate1"); //再次点击箭头回来

            $("#status_click").find("img").addClass("rotate");

        }
    });

    //点击下拉框标签变换背景色
    var initLi = function () {
        $(".status_ul li").css("background", "");
        $(".status_ul li").mouseover(function () {
            $(this).css("background", "#eee");
        }).mouseout(function () {
                $(this).css("background", "");
            })
    };
    initLi();
    $(".status_ul li").click(function () {
        initLi();
        //当前被点击的控件改变背景色
        $(this).css("background", "#eee");
        //取消当前控件的mouseout和mouseover事件
        $(this).unbind("mouseout");
        $(this).unbind("mouseover");
    });
//点击商户跳转到商户详情
//    $(".merchant_list").bind("click",function(){
//        alert("跳转到商户详情");
//        window.location.href = "bigshot_merDetail.html";
//    });
//    点击设置费率跳转
//    $("#set_rates").bind("click",function(){
//        alert("跳转到设置费率");
//        $(".merchant_list").unbind("click");
//        window.location.href = "bigshot_setRates.html";
//    });
//上拉加载更多
function addMore(){
    var counter = 1;//页码数
    var num = 5;// 每页展示5个
    var pageStart = 0,pageEnd = 0;

    // dropload函数接口设置
    $('.content').dropload({
        scrollArea : window,
        //上拉加载更多 回调函数
        loadDownFn : function(me){
            // 每次请求，页码加1
            //counter++;
            $.ajax({
                type: 'GET',
                url: 'resources/json/blog.json',
                dataType: 'json',
                success: function(data){
                    console.log(data);
                    //data = JSON.parse(data);
                    var result = '';
                    counter++;
                    pageEnd = num * counter;
                    pageStart = pageEnd - num;

                    // 选择需要显示的数据 拼接 DOM
                    for(var i = pageStart; i < pageEnd; i++){
                    //for(var i = 0; i < data.list.length; i++){
                        result +='<div class="merchant_list row" id="notAdd">'
                        +   '<div class="col-xs-8 list_left">'
                        +       '<h3>'+ data.list[i].name +'</h3>'
                        +       '<p>'+'签约于'+'<span>'+ data.list[i].date +'</span>'+'</p>'
                        +   '</div>'
                        +   '<div class="col-xs-4 list_right">'
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
                        // 加载 插入到原有 DOM 之后
                        $('.merchant_contain').append(result);
                        // 每次数据加载完，必须重置
                        me.resetload();
                    },1000);
                    //点击商户跳转到商户详情
                    $(".list_left").bind("click",function(){
                        alert("跳转到商户详情");
                        window.location.href = "bigshot_merDetail.html";
                    });
                    //    点击设置费率跳转
                    $("#set_rates").bind("click",function(e){
                        alert("跳转到设置费率");
                        //$(".merchant_list").unbind("click");
                        window.location.href = "bigshot_setRates.html";
                    });
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
addMore();

});
