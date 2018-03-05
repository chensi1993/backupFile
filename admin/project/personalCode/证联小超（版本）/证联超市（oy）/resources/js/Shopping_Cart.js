$(function(){
	getData();
	Total();
	popCnt();
})
var setJson = localStorage.getItem("setJson"); //将storage转变为字符串存储
var job = JSON.parse(setJson);
//去重
function deleteRepeat(job) {
	for(var i=0;i<job.length-1;i++){
		var old=job[i];
		var num = 1;
		for(var j=i+1;j<job.length;j++){
			if(old.setId==job[j].setId){
				job.splice(j,1);
				j--;
				num++;
			}
		}
		old["setNum"]=num.toString();
	}
	return job;
}
var newArr=deleteRepeat(job);
function getData(){
//	console.log(newArr);
	var str = "";
	for(var i = 0; i < newArr.length; i++){
		str +='<li id="'+newArr[i].setId+'">'
		    	+'<img src="'+newArr[i].setImg+'" class="col-xs-3 I_mg">'
		    	+'<div class="col-xs-5 div_text">'
			    	+'<p>'+newArr[i].setName+'</p>'
			    	+'<span>'+'<img src="resources/img/人民币1.svg" width="20"/>'+newArr[i].setMoney+'</span>'
		    	+'</div>'
				+'<div class="input-group col-xs-4">'
					+'<button class="btn btn-default col-xs-3" type="button" onclick="jian(this);">'+'-'+'</button>'
					+'<input type="number" class="text-center col-xs-5" size="3" value="'+newArr[i].setNum+'">'
					+'<button class="btn btn-default col-xs-3" type="button" onclick="add(this);">'+'+'+'</button>'
				+'</div>'
		    +'</li>';
	}
	$('ul.list-unstyled').append(str);
}
//"+"
function add(a){
//	console.log($(a).parent().parent().attr("id"));
	var n=$(a).prev().val();
	var num=parseInt(n)+1;
	if(num==0){alert("cc");}
	$(a).prev().val(num);
	//写入总计栏  
	Total();
};
//"-"
function jian(a){
	var n=$(a).next().val();
	var num;
	if(n<=1){
		$('#myModal').modal('show');
		$('#yesBtn').click(function(){
//			num=parseInt(n)-1;
//			$(a).next().val(num);
			$(a).parent(".input-group").parent().remove();
			$('#myModal').modal('hide');
			//写入总计栏
			Total();
		});
	}else if(n>1){
		num=parseInt(n)-1;
		$(a).next().val(num);
		//写入总计栏
		Total();
	}
}
//合计
function Total(){
	var sum = 0;
	$(".input-group input").each(function(){
		//获取单价
		var price = $(this).parent().prev().children('span').text();
		console.log($(this).val());
    	sum += $(this).val()*price;
	});
	var Inp_val = $(".Input").val(sum.toFixed(2));
	localStorage.setItem("set_Json",Inp_val.val());
}

//模态框弹出后阻止滚动
function popCnt(){
	//记录是否阻止滚动
	var disableScroll = false;
	//如果弹出对话框时，底层的视图就不让滚动了
	document.addEventListener('touchmove', function(e) {
		if(disableScroll){
			e.preventDefault();
		}
	}, false);
	//模态框显示时禁止滚动
	$('#myModal').on('show.bs.modal', function () {
		disableScroll = true;
	});
	//点击模态框取消时（隐藏遮罩层）
	$('#myModal').on('hide.bs.modal', function () {
	  //允许滚动
		disableScroll = false;
	});
}
