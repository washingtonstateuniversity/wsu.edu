( function( $, window ) {

	// Reduce the opacity of elements as they are scrolled up out of the viewport.
	function scroll_fade() {
		$( ".ui-scroll-fade" ).each( function() {
			var $element = $( this ),
				element = this.getBoundingClientRect(),
				container = $element.parent()[ 0 ].getBoundingClientRect(),
				window_height = $( window ).height();

			if ( 0 < container.bottom && 0 > container.top ) {
				$element.css( "opacity", element.bottom / window_height );
			}
		} );
	}

	// Reset element opacity.
	function reset_opacity() {
		$( ".ui-scroll-fade" ).css( "opacity", 1 );
	}

	$( window ).scroll( function() {
		if ( 989 < $( window ).width() ) {
			window.requestAnimationFrame( scroll_fade );
		}
	} );

	$( window ).resize( function() {
		if ( 989 > $( window ).width() ) {
			reset_opacity();
		}
	} );
}( jQuery, window ) );
