<?php

class WSUWP_Media_Wall {
	/**
	 * @var string The slug used for the media wall post type.
	 */
	var $wall_slug = 'wsuwp-media-wall';

	/**
	 * @var string Used in cache groups to help bust cache on previous data.
	 */
	var $object_cache_version = '002';

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
			foreach( $wall_images as $w => $v ) {
				if ( empty( $w ) ) {
					continue;
				}
				echo '<img width="250" src="' . esc_url( $v['hosted_image_url'] ) . '">';
			}
			?>
		</div>
		<?php
	}

	private function sideload_image( $url ) {
		// Set variables for storage, fix file filename for query strings.
		preg_match( '/[^\?]+\.(jpe?g|jpe|gif|png)\b/i', $url, $matches );
		$file_array = array();
		$file_array['name'] = basename( $matches[0] );

		// Download file to temp location.
		$file_array['tmp_name'] = download_url( $url );

		// If error storing temporarily, return the error.
		if ( is_wp_error( $file_array['tmp_name'] ) ) {
			return $file_array['tmp_name'];
		}

		$overrides = array('test_form'=>false);
		$time = current_time( 'mysql' );

		$file = wp_handle_sideload( $file_array, $overrides, $time );
		if ( isset($file['error']) )
			return new WP_Error( 'upload_error', $file['error'] );

		return $file['url'];
	}

	/**
	 * Retrieve image data from an Instagram media URL. Stores the response in cache for
	 * 5 hours to prevent any accidental slamming of the Instagram API.
	 *
	 * @param string $media_url
	 *
	 * @return bool|array False if not successful. Otherwise an array of data.
	 */
	private function retrieve_instagram_media( $media_url = '' ) {
		$client_id = apply_filters( 'wsu_instagram_client_id', '' );
		if ( '' === $client_id ) {
			return false;
		}

		$url = set_url_scheme( 'https://instagram.com/p/zmJjTiv96r/', 'https' );
		if ( 0 === preg_match( '#https://instagram.com/p/(.*)#i', $url, $matches ) ) {
			return false;
		}

		$media_id = untrailingslashit( $matches[1] );

		if ( $image_data = wp_cache_get( $media_id, 'wsu_media_wall' . $this->object_cache_version ) ) {
			return $image_data;
		}

		$api_url = esc_url( 'https://api.instagram.com/v1/media/shortcode/' . $media_id .'?client_id=' . $client_id );

		$response = wp_remote_get( $api_url );
		$body = wp_remote_retrieve_body( $response );

		$response_data = json_decode( $body );

		if ( isset( $response_data->data->images->standard_resolution ) ) {
			$image_data = array();
			$image_data['original_share_url'] = esc_url( $response_data->data->link );
			$image_data['original_image_url'] = esc_url( $response_data->data->images->standard_resolution->url );
			$image_data['hosted_image_url'] = esc_url( $this->sideload_image( $image_data['original_image_url'] ) );
			$image_data['username'] = $response_data->data->user->username;
		} else {
			return false;
		}

		// Append this image to the existing array of assets attached to a wall. This will also
		// overwrite an existing asset with new information if a duplicate fetch.
		$wall_images = (array) get_post_meta( get_the_ID(), '_wsu_media_wall_assets', true );
		$wall_images[ $media_id ] = $image_data;
		update_post_meta( get_the_ID(), '_wsu_media_wall_assets', $wall_images );

		// Cache any successful lookup for 5 hours.
		wp_cache_add( $media_id, $image_data, 'wsu_media_wall' . $this->object_cache_version, 18000 );

		return $image_data;
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
		$default_atts = array(
			'id' => '',
			'width' => '250',
			'height' => '',
		);
		$atts = shortcode_atts( $default_atts, $atts );

		if ( ! isset( $atts['id'] ) || 0 === absint( $atts['id'] ) ) {
			return '';
		}

		$wall_id = absint( $atts['id'] );
		$wall_images = (array) get_post_meta( $wall_id, '_wsu_media_wall_assets', true );

		$wall_html = '';

		if ( ! empty( $atts['width'] ) ) {
			$width = ' width="' . absint( $atts['width'] ) . '" ';
		} else {
			$width = '';
		}

		if ( ! empty( $atts['height'] ) ) {
			$height = ' height="' . absint( $atts['height'] ) . '" ';
		} else {
			$height = '';
		}

		foreach( $wall_images as $w => $v ) {
			if ( empty ( $w ) ) {
				continue;
			}
			$wall_html .= '<img ' . $width . $height . 'src="' . esc_url( $v['hosted_image_url'] ) . '">';
		}

		return $wall_html;
	}
}
new WSUWP_Media_Wall();