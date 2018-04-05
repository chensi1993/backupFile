    function timer(){
    	var intDiff = parseInt(900);//倒计时总秒数量
	    window.setInterval(function(){
	    	var day=0,
	    		hour=0,
	        	minute=0,
	        	second=0;//时间默认值    
	    if(intDiff > 0){
	        day = Math.floor(intDiff / (60 * 60 * 24));
	        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
	        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
	        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
	    }else{//当时间耗尽，刷新页面
			$('#myModal').modal('show');
	    }
	    if (minute <= 9) minute = '0' + minute;
	    if (second <= 9) second = '0' + second;
	    $("#timeShow").html(''+minute+'分'+second+'秒');
	    	intDiff--;
	    }, 1000);
    }
    $(function(){
	    timer();
	    $(".But-style").click(function(){
		    $('#myModal.in').collapse('hide');
		    $('.modal-backdrop.in').collapse('hide');
	    })
    });