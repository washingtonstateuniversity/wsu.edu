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

		html += '<li><span class="home-headline-nav-date"><a href="/features">...</a></span></li></ul>';
		$features_container.append( html );

		$('.home-headline-nav').on('click', function(evt) {
			evt.preventDefault();

			var id = $(evt.target).parent('li').data('id');

			if ( undefined === id ) {
				return;
			}

			if ( $('.features-container').hasClass('features-start') ) {
				$('.features-container').removeClass('features-start');
			}
			$('.wsu-home-headline-wrapper-open').removeClass('wsu-home-headline-wrapper-open');
			$('#' + id).addClass('wsu-home-headline-wrapper-open');
		});

	};

	$(document).ready(
		populate_headline_meta
	);

	wsuNavigation.app = new wsuNavigation.appView();
})(jQuery, wsuNavigation);