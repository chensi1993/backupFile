$(function () {

    //判断开关状态，如果是打开状态，点击弹出模态框提示是否关闭自动提现功能
    $('#automatic_inp').on('click',function(){

        if($("[name=items]:checkbox").prop("checked") == true){
            $('#oneModal').modal('hide');
            $('.automatic_bankCard').css('display','block');
            $('#automatic_btn').css('display','block');
        }else if($("[name=items]:checkbox").prop("checked") == false){
            $('#oneModal').modal('show');
            $("[name=items]:checkbox").prop("checked",true);
        }
    });

    //自动提现功能弹出框，点击“是”关闭提现功能
    $('#determine').on('touchstart',function(){
        $("[name=items]:checkbox").prop("checked",false);
        window.location.href = '';
    });

    //更换银行卡弹框，点击“是”跳转到选择银行卡页
    $('#changeCard').on('touchstart',function(){
        $('.automatic_bankCard').css('display','block');
        $('#automatic_btn').css('display','block');
        window.location.href = 'Choice_Bank.html';
    });
});
//点击确认按钮
function isCheck(){
    window.location.href = 'Account_balance.html';
}