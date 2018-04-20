
/* global Backbone, jQuery, _ */
var wsuNavigation = wsuNavigation || {};

( function( window, Backbone, $, _, wsuNavigation ) {
	"use strict";

	wsuNavigation.appView = Backbone.View.extend( {
		el: ".wsu-home-navigation",

		// Setup the events used in the overall application view.
		events: {
			"click #mega-menu-labels  ul li a": "toggleNav",
			"click .close-header-drawer": "toggleNav",
			"click .search-label": "toggleSearch",
			"click .close-header-search": "toggleSearch"
		},

		toggleNav: function( evt ) {
			evt.preventDefault();
			var $nav_wrapper = $( ".header-drawer-wrapper" );

			if ( $nav_wrapper.hasClass( "header-drawer-wrapper-open" ) ) {
				$nav_wrapper.slideUp( 400 );
				$nav_wrapper.removeClass( "header-drawer-wrapper-open" );
			} else {
				$nav_wrapper.slideDown( 400 );
				$nav_wrapper.addClass( "header-drawer-wrapper-open" );
			}
		},

		toggleSearch: function( evt ) {
			evt.preventDefault();

			var $search_wrapper = $( ".header-search-wrapper" );

			if ( $search_wrapper.hasClass( "header-search-wrapper-open" ) ) {
				$search_wrapper.removeClass( "header-search-wrapper-open" );
			} else {
				$search_wrapper.addClass( "header-search-wrapper-open" );
				$( ".header-search-input" ).focus();
			}
		}
	} );
} )( window, Backbone, jQuery, _, wsuNavigation );


/* global Typekit */
try {Typekit.load();}catch ( e ) {}
var wsuNavigation = wsuNavigation || {};
var wsuFOS = wsuFOS || {};

( function( $, wsuNavigation, wsuFOS ) {
	var populate_headline_meta = function() {
		var $features_container = $( ".features-container" ),
			$home_headlines = $features_container.find( ".home-headline" ),
			html = "<ul class='home-headline-nav'>",
			populate_now = false;

		$home_headlines.each( function() {
			var $this = $( this ),
				id = $this.data( "id" ),
				url = $this.data( "anchor" ),
				headline = $this.data( "headline" ),
				date = $this.data( "date" ),
				active_class = "active-feature";

			if ( false === populate_now ) {
				date = "Now";
				populate_now = true;
			} else {
				active_class = "";
			}

			html += "<li data-id='" + id + "' class='" + active_class + "'><span class='home-headline-nav-headline'><a href='" + url + "'>" + headline + "</a></span>" +
					"<span class='home-headline-nav-date'>" + date + "</span></li>";
		} );

		html += "<li><span class='home-headline-nav-date home-headline-nav-more'><a href='/125/'>...</a></span></li></ul>";
		$features_container.append( html );

		$( ".home-headline-nav" ).on( "click", function( evt ) {
			var id = false;

			var $target = $( evt.target );

			$( ".home-headline-nav" ).find( ".active-feature" ).removeClass( "active-feature" );

			if ( $target.is( "li" ) ) {
				id = $target.data( "id" );
				$target.addClass( "active-feature" );
			} else {
				id = $target.parents( "li" ).data( "id" );
				$target.parents( "li" ).addClass( "active-feature" );
			}

			if ( undefined === id ) {
				return;
			}

			var $features_container = $( ".features-container" );
			if ( $features_container.hasClass( "features-start" ) ) {
				$features_container.removeClass( "features-start" );
			}
			$( ".wsu-home-headline-wrapper-open" ).removeClass( "wsu-home-headline-wrapper-open" );
			$( "#" + id ).addClass( "wsu-home-headline-wrapper-open" );
		} );

	};

	var process_section_backgrounds = function() {
		var $bg_sections = $( ".section-wrapper-has-background" );

		$bg_sections.each( function() {
			var background_image = $( this ).data( "background" );
			$( this ).css( "background-image", "url(" + background_image + ")" );
		} );
	};

	var fix_no_svg_support = function() {
		var svg_imgs = $( ".lt-ie9" ).find( "img[src$='.svg']" );

		if ( svg_imgs.length ) {
			$.each( svg_imgs, function() {
				$( this ).attr( "src", $( this ).attr( "src" ).replace( ".svg", ".png" ) );
			} );
		}
	};

	$( document ).ready( function() {
		populate_headline_meta();
		process_section_backgrounds();
		fix_no_svg_support();
	} );

	if ( undefined !== wsuNavigation.appView ) {
		wsuNavigation.app = new wsuNavigation.appView();
	}

	if ( undefined !== wsuFOS.appView ) {
		wsuFOS.app = new wsuFOS.appView();
	}
} )( jQuery, wsuNavigation, wsuFOS );

/* global YT, onPlayerReady */
( function( $, window ) {
	/**
	 * Play a given video and clean up once it has played.
	 *
	 * @param evt
	 */
	var play_video = function( evt ) {
		evt.target.play();
		evt.target.addEventListener( "ended", function() { this.load(); } );
		$( "video" ).unbind( "hover" );
	};

	/**
	 * Look for an exit video in the document and bind necessary events to
	 * it when found.
	 */
	var setup_exit_video = function() {
		var $video = $( ".exit-video" ).find( "video" );

		if ( 0 < $video.length ) {
			$video.on( "hover", play_video );
			$video.on( "click", play_video );
		}
	};

	/**
	 * Create a script element to load in the YouTube iFrame API and insert it
	 * into the document.
	 */
	var load_youtube = function() {
		var tag = document.createElement( "script" );

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName( "script" )[ 0 ];
		firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );
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
		$( ".inline-youtube-video" ).each( function() {
			var video_id = $( this ).data( "video-id" ),
				video_height = $( this ).data( "video-height" ),
				video_width = $( this ).data( "video-width" );

			new YT.Player( "youtube-video-" + video_id, {
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
					"onReady": onPlayerReady
				}
			} );
		} );
	};

	/**
	 * Callback function expected by the YouTube iFrame API based on our specification
	 * in the events data above. We use this to attach a click event to any text with
	 * a class of `start-{video_id}`. This allows initial interaction with the video to
	 * begin inside the document.
	 *
	 * @param event
	 */
	window.onPlayerReady = function( event ) {
		$( ".start-" + event.target.h.id ).on( "click", function() {
			event.target.playVideo();
		} );
	};

	/**
	 * Fire any actions that we need to happen once the document is ready.
	 */
	$( document ).ready( function() {
		load_youtube();
		setup_exit_video();
	} );

} )( jQuery, window );
