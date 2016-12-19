$(document).ready(function(){

	$('a.source').each(function(){
	
		$(this).toggle(
			function(e){
				e.preventDefault();
				$(this).parent().find('textarea').css({
					borderWidth : 1
				}).animate({
					paddingTop : 30,
					paddingBottom : 30,
					height : 250
				}, 500, 'easeInOutQuad');
			},
			function(e){
				e.preventDefault();
				$(this).parent().find('textarea').animate({
					paddingTop : 0,
					paddingBottom : 0,
					height : 0
				}, 500, 'easeInOutQuad', function(){
					$(this).css({
						borderWidth : 0
					});
				});				
			}
		);
	});		
});
