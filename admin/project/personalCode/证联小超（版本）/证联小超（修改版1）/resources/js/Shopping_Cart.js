$(function(){
	getData();
	Total();
});
var setJson = sessionStorage.getItem("setJson"); //将storage转变为字符串存储
var job = JSON.parse(setJson);
console.log(job);

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
function getData(){
	var newArr=deleteRepeat(job);
//	console.log(newArr);
	var str = "";
	for(var i = 0; i < newArr.length; i++){
		str +='<li>'
		    	+'<img src="'+newArr[i].setImg+'" class="col-xs-3 I_mg">'
		    	+'<div class="col-xs-5 div_text">'
			    	+'<p>'+newArr[i].setName+'</p>'
			    	+'<span>'+'<img src="resources/img/人民币1.svg" width="20"/>'+newArr[i].setMoney+'</span>'
		    	+'</div>'
				+'<div class="input-group col-xs-4">'
					+'<button class="btn btn-default col-xs-3" type="button" onclick="jian(this);">'+'-'+'</button>'
					+'<input type="number" class="text-center col-xs-5" size="3" readonly="readonly" unselectable="on" onfocus="this.blur();" value="'+newArr[i].setNum+'">'
					+'<button class="btn btn-default col-xs-3" type="button" onclick="add(this);">'+'+'+'</button>'
				+'</div>'
		    +'</li>';
	}
	$('ul.list-unstyled').append(str);
}
//"+"
function add(a){
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
	var num=parseInt(n)-1;
	if(num<1){alert("不能小于1!"); return}
	$(a).next().val(num);
	//写入总计栏  
	Total();
};
//合计
function Total(){
	var sum = 0;
	$(".input-group input").each(function(){
		//获取单价
		var price = $(this).parent().prev().children('span').text();
//		console.log(price);
    	sum += +$(this).val()*price;
	});
	var Inp_val = $(".Input").val(sum.toFixed(2));
	console.log(Inp_val.val());
	sessionStorage.setItem("set_Json",Inp_val.val());
}




//$(function(){

//把购物车信息传递到首页
//var shopArr = [];
var shopArr=deleteRepeat(job);

$(".list-unstyled li").each(function(){
	var shops ={
		"setId":"",
		"setImg":"", //商品图片
		"setName":"", //商品名称
		"setNum":"",  //单个购买数量
		"setMoney":""//单价
	};
	var shopId =$(this).attr("id");
	var img =$(this).find("img")[0].src;
	var name =$(this).find(".div_text").find("p").html(); //商品名称
	var number=$(this).find(".input-group").find(".text-center").val();//商品数量
	var price =$(this).find(".div_text").find("span").text(); //商品单价
	//$('.input-form :input').bind('input propertychange', function()
	//{
	//	console.log()
	//})
	//shops["setId"]=shopId.toString();
	shops["setImg"]=img.toString();
	shops["setName"]=name.toString();
	shops["setNum"]=number.toString();
	shops["setMoney"]=price.toString();
	shopArr.push(shops);
});

$(".footer-nav li:nth-child(2)").click(function () {

	sessionStorage.setItem("shopJson",JSON.stringify(shopArr));
	var shopJson = sessionStorage.getItem("shopJson");
	console.log(shopJson);

});
//});
