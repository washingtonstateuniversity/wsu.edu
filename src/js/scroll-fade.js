( function( $, window ) {

	// Load the appropriate image for the screen size.
	function reset_opacity() {
		$( ".card-image" ).each( function() {
			if ( 990 > $( window ).width() ) {
				$( this ).css( "opacity", 1 );
			}
		} );
	}

	// Reduce the opacity of images as they are scrolled up out of the viewport.
	function scroll_fade() {
		$( ".card" ).each( function() {
			var card = this.getBoundingClientRect(),
				window_height = $( window ).height(),
				$image = $( this ).find( ".card-image" );

			if ( 0 <= card.bottom ) {
				$image.css( "opacity", card.bottom / window_height );
			}
		} );
	}

	$( window ).resize( function() {
		reset_opacity();
	} );

	$( window ).scroll( function() {
		if ( 989 < $( window ).width() ) {
			window.requestAnimationFrame( scroll_fade );
		}
	} );
}( jQuery, window ) );
