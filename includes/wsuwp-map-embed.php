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

		if ( empty( $atts['version'] ) ) {
			$map_server = 'maps.wsu.edu';
		} else {
			$map_server = 'beta.maps.wsu.edu';
		}

		if ( 'http' === $atts['scheme'] ) {
			$map_scheme = 'http://';
		} else {
			$map_scheme = 'https://';
		}

		return '<script type="text/javascript" src="' . $map_scheme . $map_server . '/embed/' . $map_path .'"></script>';
	}
}
new WSUWP_Home_Map_Shortcode();