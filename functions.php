<?php

// Include the WSUWP Media Wall plugin.
include_once( __DIR__ . '/includes/wsuwp-media-wall.php' );

include_once( __DIR__ . '/includes/fields-of-study.php' );
include_once( __DIR__ . '/includes/wsuwp-map-embed.php' );

class WSU_Home_Theme {
	/**
	 * @var string The version of the WSU Home theme for cache breaking.
	 */
	var $version = '0.3.0';

	/**
	 * Configure our default hooks.
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 11 );
		add_action( 'wp_enqueue_scripts', array( $this, 'temp_enqueue_style' ), 99 );
		add_action( 'after_setup_theme', array( $this, 'register_menus' ), 10 );
		add_filter( 'body_class', array( $this, 'site_body_class' ), 11 );
		add_action( 'wp_update_nav_menu', array( $this, 'update_nav_menu' ), 10, 1 );
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

	/**
	 * When a nav menu is updated in the dashboard, force a regeneration of that menu's
	 * cache on the next front end page view by bumping its incrementer.
	 *
	 * @param int $menu_id ID of the menu being saved.
	 */
	public function update_nav_menu( $menu_id ) {
		$theme_mods_option = 'theme_mods_' . sanitize_key( get_stylesheet() );
		$menu_assignments = get_option( $theme_mods_option, array() );

		if ( ! isset( $menu_assignments['nav_menu_locations'] ) ) {
			return;
		}

		foreach( $menu_assignments['nav_menu_locations'] as $location => $id ) {
			if ( $menu_id !== $id ) {
				continue;
			}

			$menu_incr_key = md5( $location );
			$nav_cache_incr = wp_cache_incr( $menu_incr_key, 1, 'wsu-home-nav' );
			if ( empty( $nav_cache_incr ) || 1000 < $nav_cache_incr ) {
				wp_cache_set( $menu_incr_key, 0, 'wsu-home-nav' );
			}
		}
	}

	/**
	 * Serve a cached version of the nav menu if it exists. Cache nav menus as
	 * they are generated for future immediate use.
	 *
	 * @param array $menu_args List of arguments for the menu. Used for the menu and the cache key.
	 *
	 * @return string HTML output for the menu.
	 */
	public function get_menu( $menu_args ) {
		$cache_incr_key = md5( $menu_args['theme_location'] );
		$cache_key = md5( serialize( $menu_args ) );

		if ( ! $cache_incr = wp_cache_get( $cache_incr_key, 'wsu-home-nav' ) ) {
			$cache_incr = '';
		}

		if ( $nav_menu = wp_cache_get( $cache_key . $cache_incr, 'wsu-home-nav' ) ) {
			return $nav_menu;
		}

		ob_start();
		wp_nav_menu( $menu_args );
		$nav_menu = ob_get_contents();
		ob_end_clean();

		wp_cache_set( $cache_key . $cache_incr, $nav_menu, 'wsu-home-nav', 3600 );

		return $nav_menu;
	}
}
$wsu_home_theme = new WSU_Home_Theme();

/**
 * Retrieve the HTML for a nav menu.
 *
 * @param $menu_args
 *
 * @return string
 */
function wsu_home_get_menu( $menu_args ) {
	global $wsu_home_theme;
	return $wsu_home_theme->get_menu( $menu_args );
}