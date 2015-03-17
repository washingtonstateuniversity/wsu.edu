<?php

// Include the WSUWP Media Wall plugin.
include_once( __DIR__ . '/includes/wsuwp-media-wall.php' );

include_once( __DIR__ . '/includes/fields-of-study.php' );

class WSU_Home_Theme {
	/**
	 * @var string The version of the WSU Home theme for cache breaking.
	 */
	var $version = '0.2.5';

	/**
	 * Configure our default hooks.
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 11 );
		add_action( 'wp_enqueue_scripts', array( $this, 'temp_enqueue_style' ), 99 );
		add_action( 'after_setup_theme', array( $this, 'register_menus' ), 10 );
		add_filter( 'body_class', array( $this, 'site_body_class' ), 11 );
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
		wp_enqueue_script( 'wsu-home-nav', get_stylesheet_directory_uri() . '/js/wsu-home-navigation-view.js', array( 'backbone' ), $this->script_version(), true );
		wp_enqueue_script( 'wsu-home', get_stylesheet_directory_uri() . '/js/script.js', array( 'wsu-home-typekit' ), $this->script_version(), true );
	}

	public function temp_enqueue_style() {
		wp_enqueue_style( 'wsu-life-temp', 'https://lilley.wsu.edu/life-css/?custom-css=1&ver=0.19.4-1.2.0-31478#038;csblog=684&cscache=6&csrev=123', array(), $this->script_version() );
	}

	/**
	 * Register the additional menus used by the WSU Home theme on top of those
	 * provided by default in the Spine Parent Theme.
	 */
	public function register_menus() {
		register_nav_menu( 'mega-menu', 'Mega Menu' );
		register_nav_menu( 'signature-menu', 'Signature Menu' );
		register_nav_menu( 'fat-footer', 'Fat Footer' );
		register_nav_menu( 'quick-links', 'Quick Links' );
		register_nav_menu( 'top-level-links', 'Top Level Links' );
	}

	/**
	 * Add body classes for the site domain and path to help with targeting on multiple
	 * sites using this theme.
	 *
	 * @param array $classes
	 *
	 * @return array
	 */
	public function site_body_class( $classes ) {
		$site = wsuwp_get_current_site();
		$site_domain = 'domain-' . sanitize_title_with_dashes( $site->domain );
		$site_path = 'path-' . sanitize_title_with_dashes( $site->path );

		if ( ! isset( $classes[ $site_domain ] ) ) {
			$classes[] = $site_domain;
		}

		if ( ! isset( $classes[ $site_path ] ) ) {
			$classes[] = $site_path;
		}

		return $classes;
	}
}
new WSU_Home_Theme();