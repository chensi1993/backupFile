/**
 * Created by chensi on 2017/8/9.
 */
$(function(){
    //密码错误提示框
    function Modal(){
        $('#MyModal').modal({
            keyboard: true
        });
        $(".modal-backdrop.in").css("opacity",'0');
        setInterval(function(){
            $('#MyModal').modal('hide');
        },2000);//2000为2秒钟
    }
    //密码框
    $(".pwd-input").on("input", function() {
        var $input = $(".fake-box input");
        if(/^[0-9]*$/g.test($(this).val())){//有值只能是数字
            var pwd = $(this).val().trim();
            for (var i = 0, len = pwd.length; i < len; i++) {
                $input.eq(i).val(pwd[i]);
            }
            $input.each(function() {//将有值的当前input后的所有input清空
                var index = $(this).index();
                if (index >= len) {
                    $(this).val("");
                }
            });
            if (len == 6) {
                //执行其他操作
                Modal();
                console.log($(this).val());
            }
        }else{//清除val中的非数字，返回纯number的value
            var arr=$(this).val().match(/\d/g);
            $(this).val($(this).val().slice(0,$(this).val().lastIndexOf(arr[arr.length-1])+1));
        }
    });
});