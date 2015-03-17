try{Typekit.load();}catch(e){}

(function($, wsuNavigation){
	populate_headline_meta = function() {
		var $features_container = $('.features-container'),
			$home_headlines = $features_container.find('.home-headline'),
			html = '<ul class="home-headline-nav">';

		$home_headlines.each( function() {
			var $this = $(this),
				url = $this.data('anchor'),
				headline = $this.data('headline'),
				date = $this.data('date');

			html += '<li><span class="home-headline-nav-headline"><a href="' + url + '">' + headline + '</a></span>' +
					'<span class="home-headline-nav-date">' + date + '</span></li>';
		});

		html += '<li><span class="home-headline-nav-date"><a href="/features">...</a></span></li></ul>';
		$features_container.append( html );
	};

	$(document).ready(
		populate_headline_meta
	);

	wsuNavigation.app = new wsuNavigation.appView();
})(jQuery, wsuNavigation);