<?php

class WSU_Home_Overlay {
	/**
	 * Setup the plugin.
	 */
	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ), 10, 2 );
		add_action( 'save_post', array( $this, 'save_post' ), 10, 2 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Add the necessary meta boxes on the proper page view.
	 *
	 * @param string  $post_type The type of post being edited.
	 * @param WP_Post $post      The post object of the post being edited.
	 */
	public function add_meta_boxes( $post_type, $post ) {
		if ( 'page' !== $post_type && $post->ID != get_option( 'page_on_front', false ) ) {
			return;
		}
		add_meta_box( 'wsu_overlay_toggle', 'Enable Overlay', array( $this, 'display_overlay_toggle' ), 'page', 'side' );
	}

	/**
	 * Display the meta box used to toggle overlay type on the home page.
	 *
	 * @param WP_Post $post Post being edited.
	 */
	public function display_overlay_toggle( $post ) {
		$overlay_type = get_post_meta( $post->ID, '_wsu_display_home_overlay', true );

		if ( ! in_array( $overlay_type, array( 'takeover', 'none' ) ) ) {
			$overlay_type = 'none';
		}

		?><label for="overlay-select">Overlay Type:</label>
		<select id="overlay-select" name="overlay_select">
			<option value="none" <?php selected( 'none', $overlay_type ); ?>>None</option>
			<option value="takeover" <?php selected( 'takeover', $overlay_type ); ?>>Takeover</option>
		</select><?php
	}

	/**
	 * Save overlay type when the front page is saved.
	 *
	 * @param int     $post_id ID of the post currently being saved.
	 * @param WP_Post $post    Object of the post being saved.
	 */
	public function save_post( $post_id, $post ) {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( false === $this->overlay_type() ) {
			return;
		}

		if ( 'auto-draft' === $post->post_status ) {
			return;
		}

		if ( ! isset( $_POST['overlay_select'] ) ) {
			return;
		}

		if ( in_array( $_POST['overlay_select'], array( 'none', 'takeover' ) ) ) {
			update_post_meta( $post_id, '_wsu_display_home_overlay', sanitize_text_field( $_POST['overlay_select'] ) );
		} else {
			update_post_meta( $post_id, '_wsu_display_home_overlay', 'none' );
		}

		return;
	}

	/**
	 * If an overlay is enabled, return the type.
	 *
	 * @return bool|string The type of overlay if enabled. False if not.
	 */
	public function overlay_type() {
		if ( get_the_ID() != get_option( 'page_on_front', false ) ) {
			return false;
		}

		$overlay_enabled = get_post_meta( get_the_ID(), '_wsu_display_home_overlay', true );

		if ( 'takeover' === $overlay_enabled ) {
			return 'takeover';
		}

		return 'none';
	}

	/**
	 * Enqueue the styles used to handle the overlay.
	 */
	public function enqueue_styles() {
		if ( 'takeover' === $this->overlay_type() ) {
			wp_enqueue_style( 'wsu-overlay-style', get_stylesheet_directory_uri() . '/includes/css/overlay.css', array(), wsu_home_script_version() );
		}
	}

	/**
	 * Enqueue the scripts used to handle the overlay.
	 */
	public function enqueue_scripts() {
		if ( 'takeover' === $this->overlay_type() ) {
			wp_enqueue_script( 'wsu-overlay-script', get_stylesheet_directory_uri() . '/includes/js/overlay.js', array( 'jquery' ), wsu_home_script_version(), true );
		}
	}
}
new WSU_Home_Overlay();