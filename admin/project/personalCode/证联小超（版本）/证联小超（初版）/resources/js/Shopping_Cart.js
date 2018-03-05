//"+"
function add(a){
	var n=$(a).prev().val();
	console.log($(a));
	var num=parseInt(n)+1;
	if(num==0){alert("cc");}
	$(a).prev().val(num);
};
//"-"
function jian(a){
	var n=$(a).next().val();
	var num=parseInt(n)-1;
	if(num<1){alert("不能小于1!"); return}
	$(a).next().val(num);
};


$(function(){

	var str = sessionStorage.getItem("setJson");
	var strData = JSON.parse(str);

	//json数据去重
	function deleteRepeat(strData) {
		for(var i=0;i<strData.length-1;i++){
			var old=strData[i];
			for(var j=i+1;j<strData.length;j++){
				if(old.setId==strData[j].setId){
					strData.splice(j,1);
					j--;
				}
			}
		}
		//console.log(strData);
		return strData;
	}
	var newArr=deleteRepeat(strData);
	console.log(newArr);


});
