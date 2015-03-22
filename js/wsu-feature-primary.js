(function($, window){
	play_video = function(evt) {
		evt.target.play();
		evt.target.addEventListener('ended', function() { this.load(); });
		$('video').unbind('hover');
	};

	var players = [];

	window.onYouTubeIframeAPIReady = function() {
		$('.inline-youtube-video').each(function(){
			var video_id = $(this).data('video-id'),
				video_height = $(this).data('video-height'),
				video_width = $(this).data('video-width');

			players.push(video_id);
			players[video_id] = new YT.Player( 'youtube-video-' + video_id, {
				height: video_height,
				width: video_width,
				videoId: video_id,
				playerVars: {
					modestbranding: 1,
					showinfo: 0,
					controls: 0,
					rel: 0
				},
				events: {
					'onReady': onPlayerReady
				}
			});
		});
	};

	window.onPlayerReady = function(event) {
		$('.start-' + event.target.h.id).on('click', function() {
			event.target.playVideo();
		})
	};

	$(document).ready(function() {
		$video = $('.exit-video').find('video');
		$video.on('hover', play_video);
		$video.on('click', play_video);

		var tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	});

})(jQuery, window);