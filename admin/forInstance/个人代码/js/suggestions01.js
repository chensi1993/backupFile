/**
 * Created by chensi on 2017/12/4.
 */
$(function(){
    //tab切换
    $(".suggest_tips li").on("touchstart",function () {

        var list = $(this).index();
        $(this).css("color", "#ff6a19").siblings().css("color", "#8C8C8C");
        $(this).css("border-bottom", "2px solid #ff6a19").siblings().css("border", "none");
        $("#textWord").val('');
        changeColor();
    });

    //输入框聚焦时按钮颜色
    $('#textWord').bind('keyup paste', function(){
        changeColor();
    });
    $('#contactVal').bind('keyup paste', function(){
        changeColor();
    });

});

//判断输入框格式是否正确时，按钮背景颜色变换
function changeColor(){
    var textVal = $("#textWord").val();
    var inform = $(".contact_way").find("input").val();
    var emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[1678]|18[0-9]|14[57])[0-9]{8}$/;
    if(textVal.length > 0 && phoneReg.test(inform)&& inform.length == 11 || emailReg.test(inform)){

        $("#suggest_btn").css("background","#ff9a63");

    }else{

        $("#suggest_btn").css("background","#b6b6b6");
        return false;
    }
}


//重写alert方法，去掉地址显示
window.alert = function(name){
var iframe = document.createElement("IFRAME");
iframe.style.display="none";
iframe.setAttribute("src", 'data:text/plain,');
document.documentElement.appendChild(iframe);
window.frames[0].window.alert(name);
iframe.parentNode.removeChild(iframe);
}


//获取点击的相应的li
function clickMe(){
    $(".suggest_tips li").each(function(){
        var colorStyle = $(this).css("color") == "rgb(140, 140, 140)";
        if(colorStyle == false){
        	return $(this).html();
        }
    });
}


function clickMeLi(){
var ul = document.getElementById('suggestType');
var lis = ul.getElementsByTagName('li');
for(var i=0;i<lis.length;i++){
    lis[i].onclick = function(){
    	return this.innerHTML;	
    }
}
}

//获取相应的userId
function GetRequest() {   
	   var url = window.location.search; //获取url中"?"符后的字串   
	   var theRequest = new Object();   
	   if (url.indexOf("?") != -1) {   
	      var str = url.substr(1);   
	      strs = str.split("&");   
	      for(var i = 0; i < strs.length; i ++) {   
	         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
	      }   
	   }   
	   return theRequest;   
	}   
var Request = new Object();
Request = GetRequest();
var wd;
var userId = Request;

//点击提交
function isCheck(){
	 $(".suggest_tips li").each(function(){
        var colorStyle = $(this).css("color") == "rgb(140, 140, 140)";
        if(colorStyle == false){
        	 suggestType =  $(this).html();
        }
    });
    changeColor();
    var suggestContent = document.getElementById('textWord').value;//反馈内容
    var contactWay = document.getElementById("contactVal").value;//联系方式
    var flag = false; //抑制表单提交自动页面跳转
    $.ajax({
			url: "usercontroller/userFeedBack.do",
			type:"post",
			async: false,
			dataType:"json",
			data:{
				suggestType:suggestType,
				suggestContent:suggestContent,
				contactWay:contactWay,
				userId:JSON.stringify(userId)
			},
			success:function(data) {
				if ('RC00' == data.resCode) {
					alert("反馈成功")
				} else {
					alert("反馈失败，请重新反馈")
				}
			},
			 error: function(){
				 alert("反馈失败，请重新反馈")
			 }
		});
}

