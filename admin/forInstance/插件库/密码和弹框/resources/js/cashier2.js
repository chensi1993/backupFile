$(function(){
	$('.js-Payment-Money').show();
	$('#myModal').modal({
        keyboard: true
    })
	
	//点击输入密码的返回，清空密码
	$('.modal-content').on("click",".css-fol-left",function(){
//		$('.js-Payment-Money').hide();
		$(".mm_box li").removeClass("mmdd");
		$(".mm_box li").attr("data","");
		i = 0;
	});
	//输入支付密码
	Payment_Money();
});

//输入支付密码
	var i = 0;
	function Payment_Money(){
		$(".nub_ggg li .zf_num").click(function(){
			if(i<6){
				$(".mm_box li").eq(i).addClass("mmdd");
				$(".mm_box li").eq(i).attr("data",$(this).text());
				i++
				if (i==6) {
				  setTimeout(function(){
					var data = "";
						$(".mm_box li").each(function(){
						data += $(this).attr("data");
					});
					alert("支付成功"+data);
				  },100);
				};
			} 
		});
		//删除	
		$(".nub_ggg li .zf_del").click(function(){
			if(i>0){
				i--
				$(".mm_box li").eq(i).removeClass("mmdd");
				$(".mm_box li").eq(i).attr("data","");
			}
		});
		//清空
		$(".nub_ggg li .zf_empty").click(function(){
			$(".mm_box li").removeClass("mmdd");
			$(".mm_box li").attr("data","");
			i = 0;
		});
	}
