function _$(id) {
	return document.getElementById(id);
};
var kb = new keyBoard({
	"chaosMode" : 0,// 混乱模式,0:无混乱;1:打开时乱一次;2:每输入一个字符乱一次,默认值0
	"pressStatus" : 1,// 按键状态,0:按下、抬起按键无变化;1:按下后有放大镜效果;2:按下、抬起按键的颜色变化,默认值0
	"kbType" : 1,// 键盘类型,0:全键盘;1:纯数字键盘,默认值0
	"svg" : "../resources/svg"//svg图片的地址
});
var passGuard1 = new passGuard(
		{
			"mappurl" : "",
			"maxLength" : 6,// 最大输入长度
			"regExp1" : "[\\S\\s]",// 输入过程限制的正则
			"regExp2" : "^[0-9]{6}",
			"displayMode" : 0,// 显示形式,0:星号;1:明文,默认值0
			"callBack" : cb1,//成功回调 
			"errorCallBack" : cb2,//失败回调 
			"rsaPublicKey" : "3082010a0282010100a65e09d63e352ba5837d286501838dfb31d721f6efe99ff9fc88dc227eb0015c303e9a65b408ea1f8147236067447af74508aa10a74a6cff82f2b012e63f26ac10031a202766d2157d38de4d8de71212c42cf11402050d176c1099dfc0937b9140a1f4e14190d16e6f877c4a5f01b84c6e0e40271d7b4807da28cc2795a74eafa0502cb06296c21824bfab84a3ccdfd192af2011e4b625fd035f335ab367c50bbd2f03efeedd97534e7b84a652c888347cf8eca84a9f887f3f3a8f78989e1a137296e0a3de98ad56c7abd06675083929e4d6539bbb02c44b8e57276343c9a441d235d151a49e417ab4892db83f8c79b2642c13391bdd7a07756435ef4203fc550203010001"
		});
function cb1() {
	console.log("成功1");
};
function cb2() {
	console.log("失败1");
};
window.onload = function() {
	kb.generate();
	winHeight = $(window).height();
	passGuard1.generate("password1", kb, 1);
	//初始化密码卫士,绑定键盘对象。数字参数：0代表全键盘，1代表数字键盘
	var errorInit = $("#errorInit").val();
	if(errorInit != '' && errorInit != null){
		pwd3ModalControl('您还还未设置支付密码');
	}
	
};

function next(){
    
	var withdrawAmt = $("#withdrawAmt").val();
	var bankCardID = $("#bankCardID").val();
	//判断密码是否匹配正则
	if (passGuard1.getLength() == 0) {
		showModal("原支付密码不能为空！");
		return false;
	}
	if (passGuard1.getValid() == 1) {
		showModal("原支付密码不符合要求！");
		return false;
	}
	if(withdrawAmt.length <=0){
		showModal("系统资源忙，请稍后重试");
		return false;
	}
	if(bankCardID.length <=0){
		showModal("系统资源忙，请稍后重试");
		return false;
	}
    $("#reset_btn").attr("disabled",true);//设置按钮不可用，防止重复上传
    $.ajax({
		url : "/zlzf-wechat/wechatBg/sendRandkey.do?" ,
		type : "post",
		async : false,
		dataType : "json",
		success : function(data) {
			passGuard1.setRandKey(data.aeskey);
			sessionStorage.setItem('sessionId', data.sessionId);
		}
	});
	//获取密文
	_$("password1").value = passGuard1.getOutput();
	var echovalue = "";
	var sessionId = sessionStorage.getItem('sessionId');
	$.ajax({
		url : '/zlzf-wechat/master/withdrawCheckPwd.do',
		type : 'post',
		async : false,
		dataType : "json",
		data : {
			checkPwd : _$("password1").value,
			withdrawAmt : withdrawAmt,
			bankCardID : bankCardID,
			sessionId : sessionId
		},
		success : function(data2) {
			_$("password1").value = echovalue;
			//判断响应码：RC00 成功以外弹框显示错误信息
			if ('RC00' != data2.resCode) {
				errorDeal(data2.resMsg,data2.checkPaypasswordNum)
			} else {
				//跳转至成功提示页
				changeURL();
			}
		},
		error : function() {
			_$("password1").value = echovalue;
			showModal('出现异常！');
			$("#reset_btn").attr("disabled",false);
		}
	})
};
function changeURL(){
	if(location.pathname.indexOf("/") > -1){
        var arr = location.pathname.split('/');
        var basepath = arr[1];
        var derUrl = location.origin +"/"+ basepath + "/master/withdrawSuccess.do";
    }
//    window.history.pushState({},0,derUrl);
	location.href=derUrl;
};

function errorDeal(msg,num){
	if(num != '' && num != null){
		if(num < 5 ){
			pwd1ModalControl('支付密码错误，请重新输入');
		}else if(num == 5){
			pwd1ModalControl('支付密码已输错5次，再输错一次账号将被锁定，请点击忘记密码进行找回');
		}else{
			pwd2ModalControl('支付密码已输错多次，账号已被锁定，请点击忘记密码进行找回');
		}
	}else{
		showModal(msg);
	}
	_$("password1").value = '';
	$("#reset_btn").attr("disabled",false);
};

//弹框提示控制
function pwd1ModalControl(obj){
	$("#pwdModelTipContent1").html('');
	$("#pwdModelTipContent1").html(obj); 
	$('#pwdModal1').modal('show');
	$(".modal-backdrop.in").css("opacity",'0');
	
}
//弹框提示取消
function pwd1ModalCancel(){
	$('#pwdModal1').modal('hide');
	$("#pwdModelTipContent1").html('');
	
}

//弹框提示控制
function pwd2ModalControl(obj){
	$("#pwdModelTipContent2").html('');
	$("#pwdModelTipContent2").html(obj);
	$('#pwdModal2').modal('show');
	$(".modal-backdrop.in").css("opacity",'0');
}
//弹框提示取消
function pwd2ModalCancel(){
	window.location.href='accountLeft.do';
}

//弹框提示控制
function pwd3ModalControl(obj){
	$("#pwdModelTipContent3").html('');
	$("#pwdModelTipContent3").html(obj);
	$('#pwdModal3').modal('show');
	$(".modal-backdrop.in").css("opacity",'0');
}
