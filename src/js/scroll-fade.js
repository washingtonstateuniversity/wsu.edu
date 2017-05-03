( function( $, window ) {

	// Load the appropriate image for the screen size.
	function reset_opacity() {
		$( ".ui-scroll-fade .content-card--feature-image" ).each( function() {
			if ( 989 < $( window ).width() ) {
				$( this ).css( "opacity", 1 );
			}
		} );
	}

	// Reduce the opacity of images as they are scrolled up out of the viewport.
	function scroll_fade() {
		$( ".ui-scroll-fade > *" ).each( function() {
			var element = this.getBoundingClientRect(),
				window_height = $( window ).height(),
				$image = $( this ).find( ".content-card--feature-image" );

			if ( 0 <= element.bottom ) {
				$image.css( "opacity", element.bottom / window_height );
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
