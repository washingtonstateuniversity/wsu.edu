const navigation = document.querySelector( ".main-navigation .nav-dropdown" );
const navigation_buttons = navigation.querySelectorAll( "button" );
const navigation_sub_menus = navigation.querySelectorAll( ".sub-navigation" );
const escape_key = 27;

navigation.addEventListener( "keydown", function ( event ) {

	// When Escape is used in the navigation, close the menu.
	if ( event.keyCode === 27 ) {
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

	if ( event.keyCode === 39 && event.srcElement.localName === "a" ) {
		event.path.forEach( function( el ) {
			if ( el.localName === "li" && el.classList.contains( "nav-section" ) && el.nextElementSibling !== null ) {
				el.nextElementSibling.querySelector( "button" ).focus();
			}
		} );
	}

	if ( event.keyCode === 37 && event.srcElement.localName === "a" ) {
		event.path.forEach( function( el ) {
			if ( el.localName === "li" && el.classList.contains( "nav-section" ) && el.previousElementSibling !== null ) {
				el.previousElementSibling.querySelector( "button" ).focus();
			}
		} );
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
		if ( event.keyCode === 40 && this.getAttribute( "aria-expanded" ) === "false" ) {
			// Each button in the main navigation has a mirrored state, so we adjust
			// aria-expanded and hidden on all sub-navigation on every button interaction.
			navigation_buttons.forEach( function ( el ) {
				el.setAttribute( "aria-expanded", true );
				el.nextElementSibling.hidden = false;
			} );

			// Focus the first menu item if the keyboard was used to open the menu.
			this.nextElementSibling.querySelector( "a" ).focus();
		}

		if ( event.keyCode === 38 && this.getAttribute( "aria-expanded" ) === "true" ) {
			// Each button in the main navigation has a mirrored state, so we adjust
			// aria-expanded and hidden on all sub-navigation on every button interaction.
			navigation_buttons.forEach( function ( el ) {
				el.setAttribute( "aria-expanded", false );
				el.nextElementSibling.hidden = true;
			} );
		}
	} );
} );
