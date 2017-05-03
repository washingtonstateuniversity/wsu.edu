( function( $, window ) {

	// Load the appropriate image for the screen size.
	function process_card_images() {
		$( ".card-image" ).each( function() {
			var $image = $( this ),
				desktop_image = $image.data( "desktop-image" ),
				mobile_image = $image.data( "mobile-image" );

			if ( 989 < $( window ).width() && desktop_image ) {
				$image.css( "background-image", "url(" + desktop_image + ")" );
			} else if ( mobile_image ) {
				$image.css( "background-image", "url(" + mobile_image + ")" );
			}
		} );
	}

	$( window ).resize( function() {
		process_card_images();
	} );
}( jQuery, window ) );
