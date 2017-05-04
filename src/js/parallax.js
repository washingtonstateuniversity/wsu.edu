( function( $, window ) {

	function parallax() {
		$( ".ui-parallax" ).each( function() {
			var $element = $( this ),
				container = $element.parent()[ 0 ].getBoundingClientRect();

			if ( 0 < container.bottom ) {
				$element.css( "transform", "translateY(" + $( window ).scrollTop() / 4 + "px)" );
			}
		} );
	}

	$( window ).scroll( function() {
		window.requestAnimationFrame( parallax );
	} );
}( jQuery, window ) );
