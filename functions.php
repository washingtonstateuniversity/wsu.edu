<?php

class WSU_Home_Theme {
	/**
	 * @var string The version of the WSU Home theme for cache breaking.
	 */
	var $version = '0.0.1';

	/**
	 * Configure our default hooks.
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 11 );
	}

	/*
	 * Maintain the script version in combination with the parent.
	 */
	public function script_version() {
		return spine_get_script_version() . $this->version;
	}

	/**
	 * Enqueue scripts used on the front end.
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'wsu-home-typekit', 'https://use.typekit.net/roi0hte.js', array(), false, false );
		wp_enqueue_script( 'wsu-home', get_stylesheet_directory_uri() . '/js/script.js', array( 'wsu-home-typekit' ), wsu_home_script_version(), true );
	}
}
new WSU_Home_Theme();