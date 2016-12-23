<?php

include_once( __DIR__ . '/includes/wsu-home-overlay.php' );
include_once( __DIR__ . '/includes/fields-of-study.php' );
include_once( __DIR__ . '/includes/academic-calendar.php' );
include_once( __DIR__ . '/includes/wsuwp-map-embed.php' );
include_once( __DIR__ . '/includes/feature-youtube-embed.php' );

class WSU_Home_Theme {
	/**
	 * @var string The version of the WSU Home theme for cache breaking.
	 */
	var $version = '0.10.7';

	/**
	 * Configure our default hooks.
	 */
	public function __construct() {
		add_action( 'wp_head', array( $this, 'prefetch_dns' ), 5 );
		add_action( 'wp_head', array( $this, 'og_image_url' ), 99 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 30 );
		add_action( 'wp_enqueue_scripts', array( $this, 'temp_enqueue_style' ), 99 );
		add_action( 'after_setup_theme', array( $this, 'register_menus' ), 10 );
		add_action( 'wp_update_nav_menu', array( $this, 'update_nav_menu' ), 10, 1 );
		add_filter( 'make_the_builder_content', array( $this, 'replace_p_with_figure' ), 99 );
		add_filter( 'wp_kses_allowed_html', array( $this, 'allow_source_element' ), 10 );
		add_filter( 'spine_get_title', array( $this, 'set_home_title' ), 10, 4 );
		add_filter( 'wsu_analytics_events_override', '__return_true' );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_action( 'admin_menu', array( $this, 'add_settings_fields' ) );
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
			'news.wsu.edu',
			'maps.googleapis.com',
			'maps.gstatic.com',
		);

		foreach ( $domains as $domain ) {
			echo '<link rel="dns-prefetch" href="//' . esc_attr( $domain ) . '">' . "\n";
		}
	}

	/**
	 * Add an og:image meta tag containing the proper featured image associated with a page.
	 *
	 * @since 0.10.0
	 */
	public function og_image_url() {
		if ( spine_has_featured_image() ) {
			$og_image = spine_get_featured_image_src();
		} elseif ( spine_has_background_image() ) {
			$og_image = spine_get_background_image_src();
		} elseif ( spine_has_thumbnail_image() ) {
			$og_image = spine_get_thumbnail_image_src();
		} else {
			$og_image = false;
		}

		if ( $og_image ) {
			echo '<meta property="og:image" content="' . esc_url( $og_image ) . '">';
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
		$features_path = apply_filters( 'wsu_home_feature_path', '/125/' );
		$impact_path = apply_filters( 'wsu_home_impact_path', '/impact/' );

		if ( 'wsu-home' === $name && $home_path === $site->path && is_front_page() ) {
			return true;
		}

		if ( 'wsu-internal' === $name && $home_path === $site->path && ! is_front_page() ) {
			return true;
		}

		if ( 'wsu-features' === $name && $features_path === $site->path ) {
			return true;
		}

		if ( 'wsu-impact' === $name && $impact_path === $site->path ) {
			return true;
		}

		return false;
	}

	/**
	 * Enqueue scripts used on the front end.
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'wsu-home-typekit', 'https://use.typekit.net/roi0hte.js', array(), false, false );

		if ( $this->is_wsu_site( 'wsu-home' ) ) {
			wp_enqueue_script( 'wsu-home', get_stylesheet_directory_uri() . '/js/wsu-home.min.js', array( 'backbone', 'wsu-home-typekit' ), $this->script_version(), true );

			$post = get_post();
			if ( isset( $post->post_content ) && has_shortcode( $post->post_content, 'wsu_home_map' ) ) {
				wp_enqueue_style( 'jquery-ui-smoothness', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.min.css', array(), false );
				wp_enqueue_style( 'wsu-home-map-style', 'https://beta.maps.wsu.edu/content/dis/css/map.view.styles.css', array(), false );
				wp_enqueue_script( 'wsu-home-map', 'https://beta.maps.wsu.edu/embed/wsu-home', array( 'jquery' ), false, true );
			}
		}

		if ( $this->is_wsu_site( 'wsu-features' ) || $this->is_wsu_site( 'wsu-impact' ) ) {
			wp_enqueue_script( 'wsu-features', get_stylesheet_directory_uri() . '/js/wsu-feature.min.js', array( 'backbone' ), $this->script_version(), true );
		}

		if ( $this->is_wsu_site( 'wsu-internal' ) ) {
			wp_enqueue_script( 'wsu-home-internal', get_stylesheet_directory_uri() . '/js/wsu-home-internal.js', array( 'wsu-home-typekit' ), $this->script_version(), true );
		}
	}

	public function temp_enqueue_style() {
		if ( $this->is_wsu_site( 'wsu-home' ) ) {
			wp_enqueue_style( 'wsu-home-style', get_stylesheet_directory_uri() . '/css/home-style.css', array(), $this->script_version() );
		}
		if ( $this->is_wsu_site( 'wsu-internal' ) ) {
			wp_enqueue_style( 'wsu-home-style', get_stylesheet_directory_uri() . '/css/home-style.css', array(), $this->script_version() );
			wp_enqueue_style( 'wsu-internal-style', get_stylesheet_directory_uri() . '/css/internal-style.css', array(), $this->script_version() );
		}

		if ( $this->is_wsu_site( 'wsu-features' ) || $this->is_wsu_site( 'wsu-impact' ) ) {
			wp_enqueue_style( 'wsu-features-style', get_stylesheet_directory_uri() . '/css/features-style.css', array(), $this->script_version() );
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

		foreach ( $menu_assignments['nav_menu_locations'] as $location => $id ) {
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
	 * Replace paragraphs wrapped around lone images with figure.
	 *
	 * @param string $content Original content being stored.
	 *
	 * @return string Modified content.
	 */
	public function replace_p_with_figure( $content ) {
		$content = preg_replace( '/<p[^>]*>\\s*?(<a .*?><img.*?><\\/a>|<img.*?>)?\\s*<\/p>/', '<figure class=\"wsu-p-replaced\">$1</figure>', $content );

		return $content;
	}

	/**
	 * Allow the source tag to be used. This is required for extended use of the `video` and
	 * `audio` HTML5 elements to provide multiple sources for a media file.
	 *
	 * @param array $tags List of elements and attributes allowed.
	 *
	 * @return mixed Modified list of elements and attributes.
	 */
	public function allow_source_element( $tags ) {
		$tags['source'] = array(
			'src' => true,
			'type' => true,
			'media' => true,
		);

		return $tags;
	}

	/**
	 * Set the time to cache a feed.
	 *
	 * @return int Time in seconds.
	 */
	public function modify_feed_cache() {
		return 60;
	}

	public function display_alert() {
		if ( $current_alert = wp_cache_get( 'wsu-home-alert', 'wsu-home' ) ) {
			return $current_alert;
		}

		// Modify the default SimplePie cache time.
		add_filter( 'wp_feed_cache_transient_lifetime', array( $this, 'modify_feed_cache' ) );

		// Check the emergency alert feed for WSU.
		$feed = fetch_feed( 'http://dev.alert.wsu.edu/alerts/?feed=rss2&cat=3' );

		// Reset the default cache time.
		remove_filter( 'wp_feed_cache_transient_lifetime', array( $this, 'modify_feed_cache' ) );

		$current_alert = '';
		$html = '';
		if ( ! is_wp_error( $feed ) ) {
			$feed_item_count = $feed->get_item_quantity( 1 );

			if ( 0 !== $feed_item_count ) {
				$feed_items = $feed->get_items( 0, $feed_item_count );

				foreach ( $feed_items as $feed_item ) {
					$item_title = $feed_item->get_title();
					$html .= $item_title;
				}

				$current_alert = '<div class="wsu-home-alert"><h1>WSU Alert</h1><a href="http://alert.wsu.edu">' . esc_html( $html ) . '</a></div>';
			}
		}

		wp_cache_set( 'wsu-home-alert', $current_alert, 'wsu-home', 60 );

		return $current_alert;
	}

	/**
	 * Set the title for the home page only.
	 *
	 * @param $title
	 *
	 * @return string
	 */
	public function set_home_title( $title, $site_part, $global_part, $view_title ) {
		if ( $this->is_wsu_site( 'wsu-home' ) && is_front_page() ) {
			return 'Washington State University';
		}

		if ( $this->is_wsu_site( 'wsu-features' ) && is_front_page() ) {
			return '125 | Washington State University';
		}

		if ( $this->is_wsu_site( 'wsu-features' ) && ! is_front_page() ) {
			return $view_title . ' 125 | Washington State University';
		}

		if ( $this->is_wsu_site( 'wsu-impact' ) && is_front_page() ) {
			return 'Impact | Washington State University';
		}

		if ( $this->is_wsu_site( 'wsu-impact' ) && ! is_front_page() ) {
			return $view_title . ' Impact | Washington State University';
		}

		return $view_title . ' Washington State University';
	}

	/**
	 * Register settings used with the theme.
	 *
	 * @since 0.10.3
	 */
	public function register_settings() {
		register_setting( 'general', 'wsu_home_alert', array( $this, 'sanitize_wsu_home_alert' ) );
	}

	/**
	 * Add settings fields used to capture registered settings.
	 *
	 * @since 0.10.3
	 */
	public function add_settings_fields() {
		add_settings_field( 'wsu-home-message', 'WSU Home Alert Message', array( $this, 'display_wsu_home_alert_message' ), 'general', 'default', array( 'label_for' => 'wsu_home_alert' ) );
	}

	/**
	 * Display the textarea used to capture the wsu_home_alert option.
	 *
	 * @since 0.10.3
	 */
	public function display_wsu_home_alert_message() {
		?>
		<textarea name="wsu_home_alert" id="wsu-home-alert" rows="4" style="width:75%;"><?php echo esc_textarea( get_option( 'wsu_home_alert' ) ); ?></textarea>
		<p class="description">Enter HTML to be output in the alert DIV at the top of the WSU homepage and internal wsu.edu pages.</p>
		<?php
	}

	/**
	 * Sanitize the wsu_home_alert option when saved.
	 *
	 * @since 0.10.3
	 *
	 * @param string $option Data to sanitize for option.
	 *
	 * @return string Sanitized option.
	 */
	public function sanitize_wsu_home_alert( $option ) {
		return wp_kses_post( $option );
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

function wsu_home_get_alert() {
	global $wsu_home_theme;
	return $wsu_home_theme->display_alert();
}

function wsu_home_script_version() {
	global $wsu_home_theme;
	return $wsu_home_theme->script_version();
}
