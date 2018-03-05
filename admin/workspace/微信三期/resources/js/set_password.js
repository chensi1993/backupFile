/**
 * Created by chensi on 2017/8/2.
 */
function isCheck(){
    var setInp = $.trim($("#set_inp").val());
    var confirmInp = $.trim($("#confirm_inp").val());
    var reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    if(!setInp){
        showModal("密码不能为空！");
            return false;
    }else if(!confirmInp){
        showModal("确认密码不能为空！");
            return false;
    }else if(!reg.test(setInp) || !reg.test(confirmInp)){
        showModal("请输入密码长度为6-20位，不能全是数字或字母");
        return false;
    }else if(confirmInp != setInp){
        showModal("密码不一致！");
    }
    $("#password_btn").attr("disabled",true);//设置按钮不可用，防止重复上传
}


