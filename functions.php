<?php

// Include the WSUWP Media Wall plugin.
include_once( __DIR__ . '/includes/wsuwp-media-wall.php' );

include_once( __DIR__ . '/includes/fields-of-study.php' );
include_once( __DIR__ . '/includes/academic-calendar.php' );
include_once( __DIR__ . '/includes/wsuwp-map-embed.php' );
include_once( __DIR__ . '/includes/feature-youtube-embed.php' );

class WSU_Home_Theme {
	/**
	 * @var string The version of the WSU Home theme for cache breaking.
	 */
	var $version = '0.6.0';

	/**
	 * Configure our default hooks.
	 */
	public function __construct() {
		add_action( 'wp_head', array( $this, 'prefetch_dns' ), 5 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 11 );
		add_action( 'wp_enqueue_scripts', array( $this, 'temp_enqueue_style' ), 99 );
		add_action( 'after_setup_theme', array( $this, 'register_menus' ), 10 );
		add_filter( 'body_class', array( $this, 'site_body_class' ), 11 );
		add_action( 'wp_update_nav_menu', array( $this, 'update_nav_menu' ), 10, 1 );
		add_filter( 'bu_navigation_filter_item_attrs', array( $this, 'bu_navigation_filter_item_attrs' ), 10, 2 );
		add_filter( 'make_the_builder_content', array( $this, 'replace_p_with_figure' ), 99 );
	}

	/*
	 * Maintain the script version in combination with the parent.
	 */
	public function script_version() {
		return spine_get_script_version() . $this->version;
	}

	/**
	 * Add a list of domains to prefetch DNS in the document head.
	 */
	public function prefetch_dns() {
		$domains = array(
			'repo.wsu.edu',
			'use.typekit.net',
			'ajax.googleapis.com',
			'beta.maps.wsu.edu',
			'lilley.news.wsu.edu',
			'maps.googleapis.com',
			'maps.gstatic.com',
		);

		foreach( $domains as $domain ) {
			echo '<link rel="dns-prefetch" href="' . $domain . '">' . "\n";
		}
	}

	/**
	 * Determine what site is being shown when using the theme on several sites.
	 *
	 * @param $name
	 *
	 * @return bool
	 */
	public function is_wsu_site( $name ) {
		$site = get_blog_details();

		$home_path = apply_filters( 'wsu_home_path', '/' );
		$features_path = apply_filters( 'wsu_home_feature_path', '/features/' );

		if ( 'wsu-home' === $name && $home_path === $site->path && is_front_page() ) {
			return true;
		}

		if ( 'wsu-internal' === $name && $home_path === $site->path && ! is_front_page() ) {
			return true;
		}

		if ( 'wsu-features' === $name && $features_path === $site->path ) {
			return true;
		}

		return false;
	}

	/**
	 * Enqueue scripts used on the front end.
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'wsu-home-typekit', 'https://use.typekit.net/roi0hte.js', array(), false, false );

		if ( $this->is_wsu_site( 'wsu-features' ) || $this->is_wsu_site( 'wsu-home' ) ) {
			wp_enqueue_script( 'wsu-home', get_stylesheet_directory_uri() . '/js/wsu-home.min.js', array( 'backbone', 'wsu-home-typekit' ), $this->script_version(), true );
			wp_enqueue_script( 'wsu-features', get_stylesheet_directory_uri() . '/js/wsu-feature-primary.js', array( 'jquery' ), $this->script_version(), true );
		} else {
			wp_enqueue_script( 'wsu-home-internal', get_stylesheet_directory_uri() . '/js/wsu-home-internal.js', array( 'wsu-home-typekit' ), $this->script_version(), true );
		}
	}

	public function temp_enqueue_style() {
		if ( $this->is_wsu_site( 'wsu-internal' ) ) {
			wp_enqueue_style( 'wsu-courtney-temp', 'https://lilley.wsu.edu/life-css/?custom-css=1&ver=0.19.4-1.2.0-31478#038;csblog=684&cscache=6&csrev=123', array(), $this->script_version() );
			wp_enqueue_style( 'wsu-charles-temp', 'https://lilley.wsu.edu/charles-css/?custom-css=1&ver=0.19.5-1.2.0-31478#038;csblog=695&cscache=6&csrev=1', array(), $this->script_version() );
		}
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

	/**
	 * Filter the list item classes to manually add current and dogeared when necessary.
	 *
	 * @param array   $item_classes List of classes assigned to the list item.
	 * @param WP_Post $page         Post object for the current page.
	 *
	 * @return array
	 */
	public function bu_navigation_filter_item_attrs( $item_classes, $page ) {
		if ( in_array( 'current_page_item', $item_classes ) || in_array( 'current_page_parent', $item_classes ) ) {
			$item_classes[] = 'current';
		}

		if ( is_singular() && get_the_ID() == $page->ID ) {
			$item_classes[] = 'dogeared';
		}

		return $item_classes;
	}

	/**
	 * Replace paragraphs wrapped around lone images with figure.
	 *
	 * @param string $content Original content being stored.
	 *
	 * @return string Modified content.
	 */
	public function replace_p_with_figure( $content ) {
		$content = preg_replace('/<p[^>]*>\\s*?(<a .*?><img.*?><\\/a>|<img.*?>)?\\s*<\/p>/', '<figure class=\"wsu-p-replaced\">$1</figure>', $content);

		return $content;
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

/**
 * Check if a specific site is being loaded.
 *
 * @param string $name Name representing the site.
 *
 * @return bool True if yes. False if no.
 */
function wsu_home_is_site( $name ) {
	global $wsu_home_theme;
	return $wsu_home_theme->is_wsu_site( $name );
}