<?php

class WSUWP_Media_Wall {
	/**
	 * @var string The slug used for the media wall post type.
	 */
	var $wall_slug = 'wsuwp-media-wall';

	public function __construct() {
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ) );
		add_shortcode( 'wsu_media_wall', array( $this, 'handle_media_wall' ) );
	}

	/**
	 * Register the Media Wall post type to organize collections of media for use
	 * in a wall type display.
	 */
	function register_post_type() {
		$labels = array(
			'name'               => 'Media Wall',
			'singular_name'      => 'Media Wall',
			'add_new'            => 'Add New',
			'add_new_item'       => 'Add New Media Wall',
			'edit_item'          => 'Edit Media Wall',
			'new_item'           => 'New Media Wall',
			'all_items'          => 'All Media Walls',
			'view_item'          => 'View Media Wall',
			'search_items'       => 'Search Media Walls',
			'not_found'          => 'No walls found',
			'not_found_in_trash' => 'No wallss found in Trash',
			'parent_item_colon'  => '',
			'menu_name'          => 'Media Walls',
		);

		$args = array(
			'labels'             => $labels,
			'public'             => false,
			'publicly_queryable' => false,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => false,
			'capability_type'    => 'post',
			'hierarchical'       => false,
			'menu_position'      => 5,
			'supports'           => array( 'title' ),
		);

		register_post_type( $this->wall_slug, $args );
	}

	/**
	 * Add the meta box used to capture URLs for the media wall.
	 */
	public function add_meta_boxes() {
		add_meta_box( 'media_wall_capture', 'Build Media Wall', array( $this, 'display_media_wall_meta_box' ), $this->wall_slug, 'normal' );
	}

	/**
	 * Display the meta box used to capture URLs for the media wall.
	 */
	public function display_media_wall_meta_box( $post ) {
		$wall_images = (array) get_post_meta( $post->ID, '_wsu_media_wall_assets', true );
		?>
		<label for="capture-media-url">Add Media:</label>
		<input name="media_url" id="capture-media-url" value="" style="width: 50%;" />
		<input type="submit" class="button button-primary button-large">

		<div class="current-media" style="min-height: 200px;">
			<?php
			foreach( $wall_images as $w ) {
				echo '<img src="' . esc_url( $w ) . '">';
			}
			?>
		</div>
		<?php
	}

	/**
	 * Display the media associated with a media wall when the shortcode is used
	 * on a post or page.
	 *
	 * @param array $atts Arguments passed with the shortcode.
	 *
	 * @return string HTML output for the media wall.
	 */
	public function handle_media_wall( $atts ) {
		if ( ! isset( $atts['id'] ) || 0 === absint( $atts['id'] ) ) {
			return '';
		}

		$wall_id = absint( $atts['id'] );
		$wall_images = (array) get_post_meta( $wall_id, '_wsu_media_wall_assets', true );

		$wall_html = '';
		foreach( $wall_images as $wall_image ) {
			$wall_html .= '<img src="' . esc_url( $wall_image ) . '">';
		}

		return $wall_html;
	}
}
new WSUWP_Media_Wall();