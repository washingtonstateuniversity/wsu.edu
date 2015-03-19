<?php

class WSU_Home_Academic_Calendar {
	public function __construct() {
		add_shortcode( 'wsu_academic_calendar', array( $this, 'display_academic_calendar' ) );
	}

	public function display_fields_of_study( $atts, $content ) {

		$content = '';

		return $content;
	}
}
new WSU_Home_Academic_Calendar();