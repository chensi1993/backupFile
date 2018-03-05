	$(function(){
		var oInput = $(".fake-box input");
		$("#pwd-input").on("input", function() {  
			var pwd = $(this).val().trim();
			var len = pwd.length;  
			for (var i = 0; i < len; i++) {  
			    oInput.eq("" + i + "").val(pwd[i]);
			}   
			oInput.each(function() {  
			    var index = $(this).index();  
			    if (index >= len) {  
			        $(this).val("");
			    }
			});  
			if (len == 6) {  
			    // alert("成功")
				$(this).val('');
			}  
		});	    
	});
	