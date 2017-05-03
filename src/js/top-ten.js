( function( $, window ) {

	// Removes the `src` from each image. (Madness!)
	// Loads the appropriate image for the screen size.
	// Determines and sets image widths so they don't rescale when positioned.
	function process_card_images() {
		$( ".content-card--feature-image" ).each( function() {
			var $figure = $( this ),
				$image = $figure.find( "img" ),
				$card = $figure.closest( ".content-card" ),
				desktop_image = $figure.data( "desktop-image" ),
				mobile_image = $figure.data( "mobile-image" );

			$image.removeAttr( "src" );

			if ( 989 < $( window ).width() && desktop_image ) {
				$image.css( {
					"background-image": "url(" + desktop_image + ")",
					"width": $card.width() / 2
				} );
			} else if ( mobile_image ) {
				$figure.removeClass( "fixed absolute" );
				$image.css( {
					"background-image": "url(" + mobile_image + ")",
					"width": "100%"
				} );
			}
		} );
	}

	$( window ).resize( function() {
		process_card_images();
	} );
}( jQuery, window ) );
