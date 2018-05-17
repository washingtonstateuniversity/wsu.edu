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


{
const navigation = document.querySelector( ".main-navigation .nav-dropdown" );
const navigation_buttons = navigation.querySelectorAll( "button" );
const navigation_sections = navigation.querySelectorAll( ".main-navigation .nav-dropdown .nav-section" );
const search_wrapper = document.querySelector( ".header-search-wrapper" );
const search_button = document.querySelector( ".nav-search button" );
const close_search_button = search_wrapper.querySelector( ".close-header-search button" );

// Keys used for navigation.
const watch_keys  = [ 27, 37, 38, 39, 40 ];
const escape_key  = 27;
const left_arrow  = 37;
const up_arrow    = 38;
const right_arrow = 39;
const down_arrow  = 40;

navigation_buttons.forEach( function( button ) {
	button.addEventListener( "focus", function( event ) {
		navigation_sections.forEach( function( section ) {
			section.classList.remove( "nav-section--has-focus" );
		} );
		event.srcElement.parentElement.classList.add( "nav-section--has-focus" );
	} );
} );

navigation.addEventListener( "keydown", function ( event ) {

	if ( -1 === watch_keys.indexOf( event.keyCode ) ) {
		return;
	}

	// Stop default browser behavior for these specific keys (e.g. scrolling up/down)
	event.preventDefault();

	// The escape key close	s the menu when used anywhere in the navigation.
	if ( event.keyCode === escape_key ) {
		navigation_buttons.forEach( function ( el ) {
			el.setAttribute( "aria-expanded", false );
			el.nextElementSibling.hidden = true;
		} );

		// If the focus was on a child element of the nav section, reapply
		// focus to the parent section's button.
		event.path.forEach( function( el ) {
			if ( el.localName === "li" && el.classList.contains( "nav-section" ) ) {
				el.querySelector( "button" ).focus();
			}
		} );
	}

	// The down arrow navigates within a sub-navigation list and wraps to
	// the first item when pressed on the last item.
	if ( event.keyCode === down_arrow && event.srcElement.localName === "a" ) {
		if ( event.srcElement.parentElement.nextElementSibling !== null ) {
			event.srcElement.parentElement.nextElementSibling.querySelector( "a" ).focus();
		} else {
			event.srcElement.parentElement.parentElement.querySelector( "a" ).focus();
		}
	}

	// The up arrow navigates within a sub-navigation list and wraps to
	// the last item when pressed on the first item.
	if ( event.keyCode === up_arrow && event.srcElement.localName === "a" ) {
		if ( event.srcElement.parentElement.previousElementSibling !== null ) {
			event.srcElement.parentElement.previousElementSibling.querySelector( "a" ).focus();
		} else {
			let items = event.srcElement.parentElement.parentElement.querySelectorAll( "a" );
			items[ items.length -1 ].focus();
		}
	}

	// The right arrow navigates from a sub-navigation menu item to the
	// next nav-section button. No action is taken if the arrow is used
	// on the last nav-section.
	if ( event.keyCode === right_arrow && event.srcElement.localName === "a" ) {
		event.path.forEach( function( el ) {
			if ( el.localName === "li" && el.classList.contains( "nav-section" ) && el.nextElementSibling !== null ) {
				el.nextElementSibling.querySelector( "button" ).focus();
			}
		} );
	}

	// The right arrow navigates between menu buttons at the top level of the
	// navigation. Wraps back to the first button when pressed on the last button.
	if ( event.keyCode === right_arrow && event.srcElement.localName === "button" ) {
		if ( event.srcElement.parentElement.nextElementSibling === null ) {
			event.srcElement.parentElement.parentElement.querySelector( "button" ).focus();
		} else {
			event.srcElement.parentElement.nextElementSibling.querySelector( "button" ).focus();
		}
	}

	// The left arrow navigates from a sub-navigation menu item to the
	// previous nav-section button. No action is taken if the arrow is
	// used on the first nav-section.
	if ( event.keyCode === left_arrow && event.srcElement.localName === "a" ) {
		event.path.forEach( function( el ) {
			if ( el.localName === "li" && el.classList.contains( "nav-section" ) && el.previousElementSibling !== null ) {
				el.previousElementSibling.querySelector( "button" ).focus();
			}
		} );
	}

	// The left arrow navigates between menu buttons at the top level of the
	// navigation. Wraps to the last button when pressed on the first button.
	if ( event.keyCode === left_arrow && event.srcElement.localName === "button" ) {
		if ( event.srcElement.parentElement.previousElementSibling === null ) {
			let items = event.srcElement.parentElement.parentElement.querySelectorAll( "button" );
			items[ items.length - 1 ].focus();
		} else {
			event.srcElement.parentElement.previousElementSibling.querySelector( "button" ).focus();
		}
	}
} );

navigation_buttons.forEach( function ( el ) {
	el.addEventListener( "click", function ( event ) {
		let is_aria_expanded = this.getAttribute( "aria-expanded" ) === 'true' || false;

		// Each button in the main navigation has a mirrored state, so we adjust
		// aria-expanded and hidden on all sub-navigation on every button interaction.
		navigation_buttons.forEach( function ( el ) {
			el.setAttribute( "aria-expanded", ! is_aria_expanded );

			let el_menu = el.nextElementSibling;
			el_menu.hidden = !el_menu.hidden;
		} );

		// Focus the first menu item if the keyboard was used to open the menu.
		if ( event.screenX === 0 && event.screenY === 0 ) {
			this.nextElementSibling.querySelector( "a" ).focus();
		}
	} );

	el.addEventListener( "keydown", function( event ) {
		if ( event.keyCode === down_arrow && this.getAttribute( "aria-expanded" ) === "false" ) {
			// Each button in the main navigation has a mirrored state, so we adjust
			// aria-expanded and hidden on all sub-navigation on every button interaction.
			navigation_buttons.forEach( function ( el ) {
				el.setAttribute( "aria-expanded", true );
				el.nextElementSibling.hidden = false;
			} );

			this.nextElementSibling.querySelector( "a" ).focus();
		} else if ( event.keyCode === down_arrow && this.getAttribute( "aria-expanded" ) === "true" ) {
			this.nextElementSibling.querySelector( "a" ).focus();
		}

		if ( event.keyCode === up_arrow && this.getAttribute( "aria-expanded" ) === "true" ) {
			// Each button in the main navigation has a mirrored state, so we adjust
			// aria-expanded and hidden on all sub-navigation on every button interaction.
			navigation_buttons.forEach( function ( el ) {
				el.setAttribute( "aria-expanded", false );
				el.nextElementSibling.hidden = true;
			} );
		}
	} );
} );

search_button.addEventListener( "click", function() {
	if ( search_wrapper.classList.contains( "header-search-wrapper-open" ) ) {
		search_wrapper.classList.remove( "header-search-wrapper-open" );
	} else {
		search_wrapper.classList.add( "header-search-wrapper-open" );
	}
} );

close_search_button.addEventListener( "click", function() {
	search_wrapper.classList.remove( "header-search-wrapper-open" );

	// Place focus back on search button if this action was fired with the keyboard.
	if ( event.screenX === 0 && event.screenY === 0 ) {
		search_button.focus();
	}
} );

}


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
