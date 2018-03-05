/**
 * Created by chensi on 2017/8/8.
 */
function isCheck(){
    var resrtNum = $.trim($("#reset_number").val());
    var resetPas = $.trim($("#reset_pas").val());
    var resetPassword = $.trim($("#reset_password").val());
    var reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    if(!resrtNum){

        showModal("原登录密码不能为空！");
        return false;

    }else if(!resetPas){

        showModal("新登录密码不能为空！");
        return false;

    }else if(!resetPassword){

        showModal("确认新登录密码不能为空！");
        return false;

    } else if(!reg.test(resrtNum) || !reg.test(resetPas) || !reg.test(resetPassword)){

        showModal("请输入密码长度为6-20位，不能全是数字或字母！");
        return false;

    }else if(resetPas != resetPassword){

        showModal("两次密码不一致");
    }
    $("#reset_btn").attr("disabled",true);//设置按钮不可用，防止重复上传
}