( function( $, window ) {

	// Load the appropriate image for the screen size.
	function process_card_images() {
		$( ".card-image" ).each( function() {
			var $image = $( this ),
				$container = $image.closest( ".column" ),
				desktop_image = $image.data( "desktop-image" ),
				mobile_image = $image.data( "mobile-image" );

			if ( 989 < $( window ).width() && desktop_image ) {
				$image.width( $container.width() ).css( "background-image", "url(" + desktop_image + ")" );
			} else if ( mobile_image ) {
				$image.removeClass( "fixed absolute" ).removeAttr( "style" ).css( "background-image", "url(" + mobile_image + ")" );
			}
		} );
	}

	// Fix images
	function card_image_parallax() {
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

				if ( 0 <= card.bottom ) {
					$image.css( "opacity", card.bottom / window_height );
				}
			} else {
				$image.removeClass( "absolute" );
			}
		} );
	}

	$( window ).resize( function() {
		process_card_images();
	} );

	$( window ).scroll( function() {
		if ( 989 < $( window ).width() ) {
			window.requestAnimationFrame( card_image_parallax );
		}
	} );
}( jQuery, window ) );
