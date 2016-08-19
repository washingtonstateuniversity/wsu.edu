<?php

// Display an alert if it has been set in Settings -> General.
if ( wsu_home_is_site( 'wsu-home' ) || wsu_home_is_site( 'wsu-internal' ) ) {
	$wsu_home_alert = get_option( 'wsu_home_alert', false );

	if ( ! empty( $wsu_home_alert ) ) {
		?>
		<div id="power"><?php echo wp_kses_post( $wsu_home_alert ); ?></div>
		<?php
	}
}
