try {Typekit.load();}catch ( e ) {}
var wsuNavigation = wsuNavigation || {};
var wsuFOS = wsuFOS || {};

( function( $, wsuNavigation, wsuFOS ) {
	populate_headline_meta = function() {
		var $features_container = $( ".features-container" ),
			$home_headlines = $features_container.find( ".home-headline" ),
			html = '<ul class="home-headline-nav">',
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

			html += '<li data-id="' + id + '" class="' + active_class + '"><span class="home-headline-nav-headline"><a href="' + url + '">' + headline + "</a></span>" +
					'<span class="home-headline-nav-date">' + date + "</span></li>";
		} );

		html += '<li><span class="home-headline-nav-date home-headline-nav-more"><a href="/125/">...</a></span></li></ul>';
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

	populate_media_wall = function() {
		$( ".media-wall-image" ).each( function() { $( this ).attr( "src", $( this ).data( "src" ) ); } );
	};

	process_section_backgrounds = function() {
		var $bg_sections = $( ".section-wrapper-has-background" );

		$bg_sections.each( function() {
			var background_image = $( this ).data( "background" );
			$( this ).css( "background-image", "url(" + background_image + ")" );
		} );
	};

	fix_no_svg_support = function() {
		svg_imgs = $( ".lt-ie9" ).find( 'img[src$=".svg"]' );

		if ( svg_imgs.length ) {
			$.each( svg_imgs, function() {
				$( this ).attr( "src", $( this ).attr( "src" ).replace( ".svg", ".png" ) );
			} );
		}
	};

	$( document ).ready( function() {
		populate_headline_meta();
		populate_media_wall();
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
