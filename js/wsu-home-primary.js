try{Typekit.load();}catch(e){}
var wsuNavigation = wsuNavigation || {};
var wsuFOS = wsuFOS || {};

(function($, wsuNavigation, wsuFOS){
	populate_headline_meta = function() {
		var $features_container = $('.features-container'),
			$home_headlines = $features_container.find('.home-headline'),
			html = '<ul class="home-headline-nav">';

		$home_headlines.each( function() {
			var $this = $(this),
				id = $this.data('id'),
				url = $this.data('anchor'),
				headline = $this.data('headline'),
				date = $this.data('date');

			html += '<li data-id="' + id + '"><span class="home-headline-nav-headline"><a href="' + url + '">' + headline + '</a></span>' +
					'<span class="home-headline-nav-date">' + date + '</span></li>';
		});

		//html += '<li><span class="home-headline-nav-date home-headline-nav-more"><a href="/features">...</a></span></li></ul>';
		$features_container.append( html );

		$('.home-headline-nav').on('click', function(evt) {
			var id = false;
			evt.preventDefault();

			var $target = $(evt.target);

			if ( $target.is('li') ) {
				id = $target.data('id');
			} else {
				id = $target.parents('li').data('id');
			}

			if ( undefined === id ) {
				return;
			}

			var $features_container = $('.features-container');
			if ( $features_container.hasClass('features-start') ) {
				$features_container.removeClass('features-start');
			}
			$('.wsu-home-headline-wrapper-open').removeClass('wsu-home-headline-wrapper-open');
			$('#' + id).addClass('wsu-home-headline-wrapper-open');
		});

	};

	populate_media_wall = function() {
		$('.media-wall-image').each( function() { $(this).attr('src', $(this).data('src') ); });
	};

	process_section_backgrounds = function() {
		var $bg_sections = $('.section-wrapper-has-background');

		$bg_sections.each( function() {
			var background_image = $(this).data('background');
			$(this).css('background-image', 'url(' + background_image + ')' );
		});
	};

	$(document).ready( function() {
		populate_headline_meta();
		populate_media_wall();
		process_section_backgrounds();
	});

	if ( undefined !== wsuNavigation.appView ) {
		wsuNavigation.app = new wsuNavigation.appView();
	}

	if ( undefined !== wsuFOS.appView ) {
		wsuFOS.app = new wsuFOS.appView();
	}
})(jQuery, wsuNavigation, wsuFOS);