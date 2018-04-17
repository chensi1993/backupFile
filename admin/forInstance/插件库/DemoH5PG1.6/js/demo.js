function _$(id){
	return document.getElementById(id);
}
function get_time(){
	return new Date().getTime().toString();
}
/**
 * 登录场景表单提交方法
 */
function formSubmit(){
	//判断密码长度
	/*if(passGuard1.getLength()==0){
		alert("原密码不能为空！");
		return false;
	}
	if(passGuard2.getLength()==0){
		alert("新密码不能为空！");
		return false;
	}
	if(passGuard3.getLength()==0){
		alert("确认密码不能为空！");
		return false;
	}*/
	//判断密码是否匹配正则
	/*if(passGuard2.getValid()==1){
		alert("新密码不符合要求！");
		return false;
	}
	if(passGuard3.getValid()==1){
		alert("确认密码不符合要求！");
		return false;
	}
	//比对新密码和确认密码
	if(passGuard2.getHash() != passGuard3.getHash()){
		alert("新密码和确认密码不一致！");
		return false;
	}*/
	//设置32位随机因子,此处为了demo方便演示，写死了，正常应用后台随机下发。
	passGuard2.setRandKey("12345678901234567890123456789012");
	//获取密文
	var miwen = passGuard2.getOutput();
	_$("kb1").value = "";
	_$("kb2").value = "";
	_$("kb3").value = "";
	for(var i=1;i<=3;i++){//PH.arrPlace-->H5输入框的placeholder数组；PH.arrId-->H5输入框的id数组
		$("#"+PH.arrId[i-1]).attr('placeholder',PH.arrPlace[i-1]);
	}
	console.log("密文:" + miwen);
}

