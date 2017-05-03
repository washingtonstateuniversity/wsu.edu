( function( $, window ) {

	// Fix images in place when they reach the top of the viewport,
	// scroll as normal when the bottom of the container is in the viewport.
	function stick_and_go() {
		$( ".ui-stick-and-go > *" ).each( function() {
			var element = this.getBoundingClientRect(),
				window_height = $( window ).height(),
				$image = $( this ).find( "figure" );

			if ( 0 >= element.top && element.bottom >= window_height ) {
				$image.addClass( "fixed" );
			} else {
				$image.removeClass( "fixed" );
			}

			if ( element.bottom <= window_height ) {
				$image.addClass( "absolute" );
			} else {
				$image.removeClass( "absolute" );
			}
		} );
	}

	$( window ).scroll( function() {
		if ( 989 < $( window ).width() ) {
			window.requestAnimationFrame( stick_and_go );
		}
	} );
}( jQuery, window ) );
