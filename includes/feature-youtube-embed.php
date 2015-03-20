<?php

class WSU_Home_YouTube_Embed {
	public function __construct() {
		add_shortcode( 'wsu_feature_youtube', array( $this, 'display_feature_youtube' ) );
	}

	/**
	 * Display the custom iframe used for YouTube embeds on feature pages.
	 *
	 * [wsu_feature_youtube src="https://www.youtube.com/embed/OmN5coh0heM?modestbranding=1;showinfo=0;controls=0;rel=0" width="560" height="315"]
	 * @param $atts
	 *
	 * @return string
	 */
	public function display_feature_youtube( $atts ) {
		$defaults = array(
			'width' => '560',
			'height' => '315',
			'src' => '',
		);
		$atts = shortcode_atts( $defaults, $atts );

		if ( empty( $atts['src'] ) ) {
			return '';
		}

		if ( ! empty( absint( $atts['width'] ) ) ) {
			$width = 'width="' . absint( $atts['width'] ) . '"';
		} else {
			$width = '';
		}

		if ( ! empty( absint( $atts['height'] ) ) ) {
			$height = 'height="' . absint( $atts['height'] ) . '"';
		} else {
			$height = '';
		}

		$url_parts = parse_url( $atts['src'] );
		if ( ! isset( $url_parts['host'] ) || ! in_array( $url_parts['host'], array( 'www.youtube.com', 'youtube.com' ) ) ) {
			return '';
		}

		$url = esc_url_raw( $atts['src'] );
		$content = '<iframe ' . $width . ' ' . $height . ' src="' . $url . '" frameborder="0" allowfullscreen></iframe>';

		return $content;
	}

}
new WSU_Home_YouTube_Embed();