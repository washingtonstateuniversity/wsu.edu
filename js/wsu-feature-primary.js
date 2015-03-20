try{Typekit.load();}catch(e){}

(function($, window){
	play_video = function(evt) {
		evt.target.play();
		evt.target.addEventListener('ended', function() { this.load(); });
		$('video').unbind('hover');
	};

	$(document).ready(function() {
		$video = $('.exit-video').find('video');
		$video.on('hover', play_video);
		$video.on('click', play_video);
	});
})(jQuery, window);