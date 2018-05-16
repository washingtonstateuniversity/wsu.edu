{
const navigation = document.querySelector( ".main-navigation .nav-dropdown" );
const navigation_buttons = navigation.querySelectorAll( "button" );
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
