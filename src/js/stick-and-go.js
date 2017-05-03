( function( $, window ) {

	// Determine and set image widths so they don't collapse when positioned.
	function image_width() {
		$( ".card-image" ).each( function() {
			var $image = $( this ),
				$container = $image.closest( ".column" );

			if ( 989 < $( window ).width() ) {
				$image.width( $container.width() );
			} else {
				$image.removeClass( "fixed absolute" );
			}
		} );
	}

	// Fix images in place when they reach the top of the viewport,
	// scroll as normal when the bottom of the container is in the viewport.
	function stick_and_go() {
		$( ".card" ).each( function() {
			var card = this.getBoundingClientRect(),
				window_height = $( window ).height(),
				$image = $( this ).find( ".card-image" );

			if ( 0 >= card.top && card.bottom >= window_height ) {
				$image.addClass( "fixed" );
			} else {
				$image.removeClass( "fixed" );
			}

			if ( card.bottom <= window_height ) {
				$image.addClass( "absolute" );
			} else {
				$image.removeClass( "absolute" );
			}
		} );
	}

	$( window ).resize( function() {
		image_width();
	} );

	$( window ).scroll( function() {
		if ( 989 < $( window ).width() ) {
			window.requestAnimationFrame( stick_and_go );
		}
	} );
}( jQuery, window ) );
