try{Typekit.load();}catch(e){}

(function($){
	populate_headline_meta = function() {
		var $home_headlines = $('.home-headline'),
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
		$('.features-container').append( html );
	};

	$(document).ready( populate_headline_meta );
})(jQuery);