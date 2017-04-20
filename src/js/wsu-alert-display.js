( function( $ ) {
	var has_alert = function() {
		return 0 !== $( ".wsu-home-alert" ).length;
	};

	var display_alert = function() {
		$.get( "https://alert.wsu.edu/wp-json/alert/v1/active/", function( data ) {
			if ( "emergency" === data.status && false === has_alert() ) {
				$( "#binder" ).prepend( "<div class='wsu-home-alert'><h1>WSU Alert</h1><a href='" + data.url + "'>" + data.message + "</a></div>" );
			} else if ( "clear" === data.status && has_alert() ) {
				$( ".wsu-home-alert" ).remove();
			}
		} );
	};

	display_alert();
	setInterval( display_alert, 120 * 1000 );
}( jQuery ) );
