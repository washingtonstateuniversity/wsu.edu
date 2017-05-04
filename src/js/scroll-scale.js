( function( $, window ) {

	function scroll_scale() {
		$( ".ui-scroll-scale" ).each( function() {
			var $element = $( this ),
				container = $element.parent()[ 0 ].getBoundingClientRect();

			if ( 0 < container.bottom ) {
				$element.css( "transform", "scale(" + ( 1 + $( window ).scrollTop() / 5000 ) + ")" );
			}
		} );
	}

	$( window ).scroll( function() {
		window.requestAnimationFrame( scroll_scale );
	} );
}( jQuery, window ) );
