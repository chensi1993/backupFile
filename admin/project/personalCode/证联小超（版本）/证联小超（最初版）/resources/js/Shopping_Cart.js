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
