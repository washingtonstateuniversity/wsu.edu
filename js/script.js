try{Typekit.load();}catch(e){}

(function($, wsuNavigation){
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

		html += '<li><span class="home-headline-nav-date home-headline-nav-more"><a href="/features">...</a></span></li></ul>';
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

	$(document).ready( function() {
		var $drawer_wrapper = $('.header-drawer-wrapper'),
			drawer_height = $drawer_wrapper.height();

		$drawer_wrapper.css('margin-top', '-' + drawer_height + 'px' );
		populate_headline_meta();
	});

	wsuNavigation.app = new wsuNavigation.appView();
})(jQuery, wsuNavigation);