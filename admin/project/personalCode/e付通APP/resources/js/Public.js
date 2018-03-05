$(function(){
	Dtshow();
})
	function Dtshow(){
		$("#accordion").on('show.bs.collapse', function(e){			
			$(e.target).prev('.recommend_issue').find("img").attr('src','resources/img/v1up@3x.png');
		});
		$("#accordion").on('hide.bs.collapse', function(e){			
			$(e.target).prev('.recommend_issue').find("img").attr('src','resources/img/v1down@3x.png');
		});
				
	}