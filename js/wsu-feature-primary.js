(function($, window){
	/**
	 * Play a given video and clean up once it has played.
	 *
	 * @param evt
	 */
	play_video = function(evt) {
		evt.target.play();
		evt.target.addEventListener('ended', function() { this.load(); });
		$('video').unbind('hover');
	};

	/**
	 * Look for an exit video in the document and bind necessary events to
	 * it when found.
	 */
	setup_exit_video = function() {
		$video = $('.exit-video').find('video');
		$video.on('hover', play_video);
		$video.on('click', play_video);
	};

	/**
	 * Create a script element to load in the YouTube iFrame API and insert it
	 * into the document.
	 */
	load_youtube = function() {
		var tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	};

	/**
	 * Callback function expected by the YouTube Iframe API. Without a function
	 * with this name available in the global space, our use of the YouTube API
	 * does not work.
	 *
	 * Loop through each of the inline YouTube Videos, gather the video information,
	 * and set up objects representing the videos.
	 */
	window.onYouTubeIframeAPIReady = function() {
		$('.inline-youtube-video').each(function(){
			var video_id = $(this).data('video-id'),
				video_height = $(this).data('video-height'),
				video_width = $(this).data('video-width');

			new YT.Player( 'youtube-video-' + video_id, {
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

	/**
	 * Callback function expected by the YouTube iFrame API based on our specification
	 * in the events data above. We use this to attach a click event to any text with
	 * a class of `start-{video_id}`. This allows initial interaction with the video to
	 * begin inside the document.
	 *
	 * @param event
	 */
	window.onPlayerReady = function(event) {
		$('.start-' + event.target.h.id).on('click', function() {
			event.target.playVideo();
		})
	};

	/**
	 * Fire any actions that we need to happen once the document is ready.
	 */
	$(document).ready(function() {
		load_youtube();
		setup_exit_video();
	});

})(jQuery, window);