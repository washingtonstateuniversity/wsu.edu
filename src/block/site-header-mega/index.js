const navigation_buttons = document.querySelectorAll( ".main-navigation .nav-dropdown button" );

navigation_buttons.forEach( function( el ) {
	el.addEventListener( "click", function() {
		let is_aria_expanded = this.getAttribute( "aria-expanded" ) === 'true' || false;

		navigation_buttons.forEach( function( el ) {
			el.setAttribute( "aria-expanded", ! is_aria_expanded );

			let el_menu = el.nextElementSibling;
			el_menu.hidden = ! el_menu.hidden;
		} );
	} );
} );
