<?php

class WSU_Home_Academic_Calendar {
	public function __construct() {
		add_shortcode( 'wsu_academic_calendar', array( $this, 'display_academic_calendar' ) );
	}

	/**
	 * Parse the content between the academic calendar shortcode tags into
	 * some sort of structure. Each line inside the shortcode must be
	 * structured as such:
	 *
	 * MONTH DAY THE TEXT OF MY DATE
	 * Mar 9 This is the event.
	 *
	 * @param $atts
	 * @param $content
	 *
	 * @return string
	 */
	public function display_academic_calendar( $atts, $content ) {
		// Clear the <br> tags that will be there.
		$content = strip_tags( $content );

		// Break things up based on new lines.
		$dates = explode( "\n", $content );

		// Ditch anything that is invalid.
		$dates = array_filter( $dates, array( $this, 'filter_date' ) );

		// And then build our HTML.
		$content = '<ul class="wsu-academic-calendar">';
		foreach ( $dates as $date ) {
			$date_parts = explode( ' ' , $date );

			$month = array_shift( $date_parts );
			$day = array_shift( $date_parts );
			$text = implode( ' ', $date_parts );

			$content .= '<li><span class="wsu-ac-month">' . $month . '</span> <span class="wsu-ac-day">' . $day . '</span> <span class="wsu-ac-text">' . $text . '</span></li>';
		}
		$content .= '</ul>';

		return $content;
	}

	/**
	 * Filter an array value to validity.
	 *
	 * @param $date
	 *
	 * @return bool
	 */
	public function filter_date( $date ) {
		if ( empty( trim( $date ) ) ) {
			return false;
		}

		$date = explode( ' ', $date );

		if ( count( $date ) >= 3 ) {
			return true;
		}

		return false;
	}
}
new WSU_Home_Academic_Calendar();