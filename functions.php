<?php

include_once( __DIR__ . '/includes/wsu-home-overlay.php' );
include_once( __DIR__ . '/includes/fields-of-study.php' );
include_once( __DIR__ . '/includes/academic-calendar.php' );
include_once( __DIR__ . '/includes/wsuwp-map-embed.php' );
include_once( __DIR__ . '/includes/feature-youtube-embed.php' );
include_once( __DIR__ . '/includes/top-ten-card-shortcode.php' );
include_once __DIR__ . '/includes/block-editor.php';
include_once __DIR__ . '/includes/block-news-card.php';

class WSU_Home_Theme {
	/**
	 * @var string The version of the WSU Home theme for cache breaking.
	 */
	public $version = '0.14.16';

	/**
	 * Configure our default hooks.
	 */
	public function __construct() {
		add_action( 'wp_resource_hints', array( $this, 'prefetch_dns' ), 10, 2 );
		add_action( 'wp_head', array( $this, 'og_image_url' ), 99 );
		add_filter( 'spine_child_theme_version', array( $this, 'script_version' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 30 );
		add_action( 'wp_enqueue_scripts', array( $this, 'temp_enqueue_style' ), 99 );
		add_action( 'wp_enqueue_scripts', array( $this, 'top_ten_enqueue_style' ), 100 );
		add_action( 'after_setup_theme', array( $this, 'register_menus' ), 10 );
		add_action( 'wp_update_nav_menu', array( $this, 'update_nav_menu' ), 10, 1 );
		add_filter( 'make_the_builder_content', array( $this, 'replace_p_with_figure' ), 99 );
		add_filter( 'wp_kses_allowed_html', array( $this, 'allow_source_element' ), 10 );
		add_filter( 'spine_get_title', array( $this, 'set_home_title' ), 10, 4 );
		add_filter( 'wsu_analytics_events_override', '__return_true' );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_action( 'admin_menu', array( $this, 'add_settings_fields' ) );
		add_filter( 'wsu_spine_navigation_id', array( $this, 'filter_navigation_id' ) );
		add_action( 'wsu_register_inline_svg', array( $this, 'top_ten_down_arrow' ) );
	}

	/*
	 * Maintain the script version in combination with the parent.
	 */
	public function script_version() {
		return spine_get_script_version() . $this->version;
	}

	/**
	 * Adds a list of domains to the existing DNS prefetch list in the document head.
	 *
	 * @since 0.4.0
	 * @since 0.11.0 Converted to use the `wp_resource_hints` filter in WordPress.
	 */
	public function prefetch_dns( $urls, $relation_type ) {
		if ( 'dns-prefetch' !== $relation_type ) {
			return $urls;
		}

		$domains = array(
			'beta.maps.wsu.edu',
			'news.wsu.edu',
			'maps.googleapis.com',
			'maps.gstatic.com',
		);

		$urls = array_merge_recursive( $urls, $domains );

		return $urls;
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
		$site = get_site();

		$home_path = apply_filters( 'wsu_home_path', '/' );
		$features_path = apply_filters( 'wsu_home_feature_path', '/125/' );
		$impact_path = apply_filters( 'wsu_home_impact_path', '/impact/' );

		if ( 'wsu-home' === $name && $home_path === $site->path && is_front_page() ) {
			return true;
		}

		if ( 'wsu-home' === $name && $home_path === $site->path && is_404() ) {
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

		if ( $this->is_wsu_site( 'wsu-internal' ) && ! is_404() ) {
			wp_enqueue_script( 'wsu-home-internal', get_stylesheet_directory_uri() . '/js/wsu-home-internal.js', array( 'wsu-home-typekit' ), $this->script_version(), true );
		}
	}

	public function temp_enqueue_style() {
		if ( $this->is_wsu_site( 'wsu-home' ) ) {
			wp_enqueue_style( 'wsu-home-custom-style', get_stylesheet_directory_uri() . '/css/edit-css.css', array(), $this->script_version() );
			wp_enqueue_style( 'wsu-home-style', get_stylesheet_directory_uri() . '/css/home-style.css', array(), $this->script_version() );
		}

		if ( $this->is_wsu_site( 'wsu-internal' ) && ! is_404() ) {
			wp_enqueue_style( 'wsu-home-custom-style', get_stylesheet_directory_uri() . '/css/edit-css.css', array(), $this->script_version() );
			wp_enqueue_style( 'wsu-home-style', get_stylesheet_directory_uri() . '/css/home-style.css', array(), $this->script_version() );
			wp_enqueue_style( 'wsu-internal-style', get_stylesheet_directory_uri() . '/css/internal-style.css', array(), $this->script_version() );
		}

		if ( $this->is_wsu_site( 'wsu-features' ) || $this->is_wsu_site( 'wsu-impact' ) ) {
			wp_enqueue_style( 'wsu-features-style', get_stylesheet_directory_uri() . '/css/features-style.css', array(), $this->script_version() );
		}
	}

	public function top_ten_enqueue_style() {
		if ( $this->is_wsu_site( 'wsu-impact' ) ) {

			// Haha, just kidding. We don't have an impact front page.
			if ( is_front_page() ) {
				wp_safe_redirect( 'https://wsu.edu/', 302 );
				exit;
			}

			$body_classes = get_post_meta( get_post()->ID, '_wsuwp_body_class', true );

			if ( in_array( 'top-ten', explode( ' ', $body_classes ), true ) ) {
				wp_dequeue_style( 'wsu-home-style' );
				wp_dequeue_style( 'wsu-home-custom-style' );
				wp_dequeue_style( 'wsu-internal-style' );
				wp_enqueue_style( 'wsu-features-style', get_stylesheet_directory_uri() . '/css/features-style.css', array(), $this->script_version() );
				wp_enqueue_style( 'wsu-top-ten', get_stylesheet_directory_uri() . '/css/combined-top-ten.css', array(), $this->script_version() );
				wp_enqueue_script( 'wsu-stick-and-go', get_stylesheet_directory_uri() . '/src/js/stick-and-go.js', array( 'jquery' ), $this->script_version() );
				wp_enqueue_script( 'wsu-scroll-fade', get_stylesheet_directory_uri() . '/src/js/scroll-fade.js', array( 'jquery' ), $this->script_version() );
				wp_enqueue_script( 'wsu-parallax', get_stylesheet_directory_uri() . '/src/js/parallax.js', array( 'jquery' ), $this->script_version() );
				wp_enqueue_script( 'wsu-scroll-scale', get_stylesheet_directory_uri() . '/src/js/scroll-scale.js', array( 'jquery' ), $this->script_version() );
				wp_enqueue_script( 'wsu-top-ten', get_stylesheet_directory_uri() . '/src/js/top-ten.js', array( 'jquery' ), $this->script_version() );
			}
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
		$cache_key = md5( serialize( $menu_args ) ); // @codingStandardsIgnoreLine

		$cache_incr = wp_cache_get( $cache_incr_key, 'wsu-home-nav' );
		if ( ! $cache_incr ) {
			$cache_incr = '';
		}

		$nav_menu = wp_cache_get( $cache_key . $cache_incr, 'wsu-home-nav' );
		if ( $nav_menu ) {
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
			return $view_title . ' Washington State University';
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
		add_settings_field( 'wsu-home-message', 'WSU Home Alert Message', array( $this, 'display_wsu_home_alert_message' ), 'general', 'default',
			array(
				'label_for' => 'wsu_home_alert',
			)
		);
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

	/**
	 * Modifies the ID used for the skip to nav link.
	 *
	 * @since 0.12.0
	 *
	 * @param string $id ID used by primary navigation.
	 *
	 * @return string
	 */
	public function filter_navigation_id( $id ) {
		if ( $this->is_wsu_site( 'wsu-home' ) ) {
			return 'wsu-home-primary-nav';
		}

		return $id;
	}

	/**
	 * Register the Top Ten down arrow SVG.
	 *
	 * @since 0.14.2
	 */
	public function top_ten_down_arrow() {
		ob_start();
		?>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.1 93.5" class="top-ten-down-arrow">
			<circle cx="46.4" cy="46.7" r="45.4" style="fill:none;stroke-width:2;stroke:#fff" />
			<polyline points="67.7 47.5 46.4 68.7 25.2 47.5" style="fill:none;stroke-linejoin:round;stroke-width:2;stroke:#fff;" />
			<line x1="46.4" y1="24.1" x2="46.4" y2="68.7" style="fill:none;stroke-linejoin:round;stroke-width:2;stroke:#fff;" />
		</svg>
		<?php
		$down_arrow = ob_get_clean();

		wsu_register_inline_svg( 'top-ten-down-arrow', $down_arrow );
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

function wsu_home_script_version() {
	global $wsu_home_theme;
	return $wsu_home_theme->script_version();
}
