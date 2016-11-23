<?php

class WSUWP_Home_Map_Shortcode {
	public function __construct() {
		add_shortcode( 'wsu_home_map', array( $this, 'display_home_map' ) );
	}

	public function display_home_map( $atts ) {
		$default_atts = array(
			'version' => '',
			'scheme' => 'https',
			'map' => '',
		);
		$atts = shortcode_atts( $default_atts, $atts );

		$map_path = sanitize_title_with_dashes( $atts['map'] );

		if ( empty( $map_path ) ) {
			return '';
		}

		$content = '<div id="map-embed-' . $map_path . '"></div>';
		$content .= '<script>var map_view_scripts_block = true; var map_view_id = "map-embed-' . esc_js( $map_path ) . '";</script>';

		return $content;
	}
}
new WSUWP_Home_Map_Shortcode();
