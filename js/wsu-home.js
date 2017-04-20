/* global Backbone, jQuery, _ */
var wsuFOS = wsuFOS || {};

( function( window, Backbone, $, _, wsuFOS ) {
	"use strict";

	wsuFOS.appView = Backbone.View.extend( {
		el: ".find-fos-wrapper",

		// Setup the events used in the overall application view.
		events: {
			"click .fos-label": "toggleAcademic"
		},

		toggleAcademic: function( evt ) {
			var $container = $( evt.target ).parent();

			if ( $( $container ).hasClass( "fos-open" ) ) {
				$( $container ).removeClass( "fos-open" );
			} else {
				$( $container ).addClass( "fos-open" );
			}
		}
	} );
} )( window, Backbone, jQuery, _, wsuFOS );

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
			"click .close-header-search": "toggleSearch",
			"click .top-level-links-label": "toggleCampuses",
			"click .campus-links-close": "toggleCampuses"
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
		},

		toggleCampuses: function( evt ) {
			evt.preventDefault();

			var $campus_wrapper = $( ".campus-links-full-page-wrapper" );

			if ( $campus_wrapper.hasClass( "campus-links-hide" ) ) {
				$campus_wrapper.removeClass( "campus-links-hide" );
			} else {
				$campus_wrapper.addClass( "campus-links-hide" );
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

( function( $ ) {
	var has_alert = function() {
		return 0 !== $( ".wsu-home-alert" ).length;
	};

	var display_alert = function() {
		$.get( "https://alert.wsu.edu/wp-json/alert/v1/active/", function( data ) {
			if ( "emergency" === data.status && false === has_alert() ) {
				$( "#binder" ).prepend( "<div class='wsu-home-alert'><h1>WSU Alert</h1><a href='" + data.url + "'>" + data.message + "</a></div>" );
			} else if ( "clear" === data.status && has_alert() ) {
				$( ".wsu-home-alert" ).remove();
			}
		} );
	};

	display_alert();
	setInterval( display_alert, 120 * 1000 );
}( jQuery ) );
