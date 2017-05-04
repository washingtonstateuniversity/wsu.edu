( function( $, window ) {

	// Fix elements in place when they reach the top of the viewport,
	// scroll normally when the bottom of the element's container is in the viewport.
	function stick_and_go() {
		$( ".ui-stick-and-go" ).each( function() {
			var $element = $( this ),
				element = this.getBoundingClientRect(),
				window_height = $( window ).height();

			if ( 0 >= element.top && element.bottom >= window_height ) {
				$element.addClass( "fixed" );
			} else {
				$element.removeClass( "fixed" );
			}

			if ( element.bottom <= window_height ) {
				$element.addClass( "absolute" );
			} else {
				$element.removeClass( "absolute" );
			}
		} );
	}

	// Reset element positioning.
	function reset_positioning() {
		$( ".ui-stick-and-go" ).removeClass( "fixed absolute" );
	}

	$( window ).resize( function() {
		if ( 989 > $( window ).width() ) {
			reset_positioning();
		}
	} );

	$( window ).scroll( function() {
		if ( 989 < $( window ).width() ) {
			window.requestAnimationFrame( stick_and_go );
		}
	} );
}( jQuery, window ) );
