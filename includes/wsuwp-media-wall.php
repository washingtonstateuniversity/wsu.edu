<?php

class WSUWP_Media_Wall {
	/**
	 * @var string The slug used for the media wall post type.
	 */
	var $wall_slug = 'wsuwp-media-wall';

	/**
	 * @var string Used in cache groups to help bust cache on previous data.
	 */
	var $object_cache_version = '005';

	/**
	 * Setup the hooks.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ) );

		// Provide the [wsu_media_wall] shortcode.
		add_shortcode( 'wsu_media_wall', array( $this, 'handle_media_wall' ) );

		// Provide the scripting and AJAX behavior for adding and managing media items.
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
		add_action( 'wp_ajax_wsuwp_media_wall_item', array( $this, 'ajax_save_media_item' ) );
		add_action( 'wp_ajax_wsuwp_media_wall_remove_item', array( $this, 'ajax_remove_media_item' ) );
	}

	/**
	 * Enqueue the scripts used by the plugin. Output nonce and post ID data to the DOM for use by scripts.
	 */
	public function admin_enqueue_scripts() {
		wp_enqueue_script( 'wsu-media-wall', get_stylesheet_directory_uri() . '/includes/js/media-wall.min.js', array( 'backbone' ), $this->object_cache_version, true );
		$ajax_nonce = wp_create_nonce( 'wsu-media-wall' );
		wp_localize_script( 'wsu-media-wall', 'wsuMediaWall', array( 'nonce' => $ajax_nonce, 'post_id' => get_the_ID() ) );
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
		<div id="media-wall-curation">
		<label for="capture-media-url">Add Media:</label>
		<input name="media_url" id="capture-media-url" value="" style="width: 50%;" />
		<div id="submit-media-url" class="button button-primary button-large">Add</div>

		<div class="current-media" style="min-height: 200px;">
			<?php
			foreach( $wall_images as $w => $v ) {
				if ( empty( $w ) ) {
					continue;
				}
				?>
					<div class="instagram-image">
						<div class="item-remove dashicons-no-alt" data-media-id="<?php echo esc_attr( $v['media_id'] ); ?>"></div>
						<figure>
							<img width="200" src="<?php echo esc_url( $v['hosted_image_url'] ); ?>">
							<figcaption>
								<a href="<?php echo esc_url( $v['original_share_url'] ); ?>"><?php echo esc_html( $v['username'] ); ?></a>
							</figcaption>
						</figure>
					</div>
				<?php
			}
			?>
		</div>
		<div class="clear"></div>
		<style>
			.current-media {
				margin-top: 20px;
			}

			.instagram-image {
				position: relative;
				width: 200px;
				float: left;
				padding: 5px;
			}

			.instagram-image figure {
				margin: 0;
			}

			.instagram-image .item-remove {
				position: absolute;
				display: none;
			}

			.instagram-image:hover .item-remove {
				font-family: dashicons;
				cursor: pointer;
				display: block;
				right: 7px;
				top: 7px;
				background: rgba(255,255,255,0.7);
				width: 40px;
				height: 40px;
				font-size: 40px;
				line-height: 40px;
			}
		</style>
		<script type="text/template" id="media-wall-single-template">
			<div class="instagram-image">
				<div class="item-remove dashicons-no-alt" data-media-id="<%= mediaID %>"></div>
				<figure>
					<img width="200" src="<%= imageSource %>">
					<figcaption>
						<a href="<%= imageSourceURL %>"><%= imageUserName %></a>
					</figcaption>
				</figure>
			</div>
		</script>
		</div>
		<?php
	}

	/**
	 * Handle an ajax request to save a media item to a media wall via its URL.
	 */
	public function ajax_save_media_item() {
		check_ajax_referer( 'wsu-media-wall' );

		$url = esc_url( $_POST['url'] );
		$post_id = absint( $_POST['post_id'] );

		if ( '' === $url ) {
			wp_send_json_error( 'Invalid URL' );
		}

		if ( 0 === $post_id ) {
			wp_send_json_error( 'Invalid Post ID' );
		}

		$image_data = $this->retrieve_instagram_media( $url, $post_id );

		wp_send_json_success( $image_data );
	}

	/**
	 * Handle an ajax request to remove an existing media item from a wall.
	 */
	public function ajax_remove_media_item() {
		check_ajax_referer( 'wsu-media-wall' );

		$media_id = sanitize_text_field( $_POST['media_id'] );
		$post_id = absint( $_POST['post_id'] );

		if ( 0 === $post_id ) {
			wp_send_json_error( 'Invalid Post' );
		}

		if ( empty( $media_id ) ) {
			wp_send_json_error( 'Invalid Media ID' );
		}

		$wall_images = (array) get_post_meta( $post_id, '_wsu_media_wall_assets', true );

		unset( $wall_images[ $media_id ] );

		update_post_meta( $post_id, '_wsu_media_wall_assets', $wall_images );

		wp_send_json_success( 'Success' );
	}

	/**
	 * Given a URL for an image, download that URL and sideload it into
	 * the uploads directory for future use. This skips the media sideload
	 * handling provided by default in Core so that these images do not
	 * appear in the media library.
	 *
	 * @param string $url
	 *
	 * @return mixed|\WP_Error
	 */
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
	private function retrieve_instagram_media( $media_url = '',  $post_id ) {
		$client_id = apply_filters( 'wsu_instagram_client_id', '' );
		if ( '' === $client_id ) {
			return false;
		}

		$url = set_url_scheme( $media_url, 'https' );
		if ( 0 === preg_match( '#https://instagram.com/p/(.*)#i', $url, $matches ) ) {
			return false;
		}

		$media_id = untrailingslashit( $matches[1] );

		if ( ! $image_data = wp_cache_get( $media_id, 'wsu_media_wall' . $this->object_cache_version ) ) {
			$api_url = esc_url( 'https://api.instagram.com/v1/media/shortcode/' . $media_id .'?client_id=' . $client_id );

			$response = wp_remote_get( $api_url );
			$body = wp_remote_retrieve_body( $response );

			$response_data = json_decode( $body );

			if ( isset( $response_data->data->images->standard_resolution ) ) {
				$image_data = array();
				$image_data['media_id'] = esc_attr( $media_id );
				$image_data['original_share_url'] = esc_url( $response_data->data->link );
				$image_data['original_image_url'] = esc_url( $response_data->data->images->standard_resolution->url );
				$image_data['hosted_image_url'] = esc_url( $this->sideload_image( $image_data['original_image_url'] ) );
				$image_data['username'] = $response_data->data->user->username;
			} else {
				return false;
			}

			// Cache any successful lookup for 5 hours.
			wp_cache_add( $media_id, $image_data, 'wsu_media_wall' . $this->object_cache_version, 18000 );
		}

		// Append this image to the existing array of assets attached to a wall. This will also
		// overwrite an existing asset with new information if a duplicate fetch.
		$wall_images = (array) get_post_meta( $post_id, '_wsu_media_wall_assets', true );

		$wall_images[ $media_id ] = $image_data;
		update_post_meta( $post_id, '_wsu_media_wall_assets', $wall_images );

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
			'columns' => '',
			'width' => '690',
			'height' => '690',
			'cache_bust' => '',
		);
		$atts = shortcode_atts( $default_atts, $atts );

		if ( ! isset( $atts['id'] ) || 0 === absint( $atts['id'] ) ) {
			return '';
		}

		$atts_key = md5( serialize( $atts ) );

		if ( $content = wp_cache_get( $atts_key, 'wsuwp_media_wall' ) ) {
			return $content;
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

		if ( ! empty( $atts['columns'] ) ) {
			$columns = explode( ',', $atts['columns'] );
			$columns = array_filter( $columns, 'absint' );
		} else {
			$columns = false;
		}

		// If columns are not specified, output all of the images in a single column.
		if ( false === $columns ) {
			$wall_html .= '<div class="media-wall-column">';
			foreach( $wall_images as $w => $v ) {
				if ( empty ( $w ) ) {
					continue;
				}
				$wall_html .= '<img ' . $width . $height . 'src="' . esc_url( $v['hosted_image_url'] ) . '">';
			}
			$wall_html .= '</div>';
		} else {
			// If columns are specified, loop through each and output the number of images
			// allocated to that individual column.
			$column_count = count( $columns );
			for( $x = 0; $x < $column_count; $x++ ) {
				$wall_html .= '<div class="media-wall-column media-wall-column-' . $x . '">';
				if ( isset( $columns[ $x ] ) && 0 < count( $columns[ $x ] ) ) {
					$image_count = $columns[ $x ];
					for ( $z = 0; $z < $image_count; $z++ ) {
						$current_image = array_pop( $wall_images );
						if ( isset( $current_image['hosted_image_url'] ) ) {
							$wall_html .= '
								<a href="' . $current_image['original_share_url'] . '">
									<img src="' . esc_url( get_stylesheet_directory_uri() . '/images/blank.gif' ) . '" data-src="' . esc_url( $current_image['hosted_image_url'] ) . '" class="media-wall-image">
								</a>';
						}
					}
				}
				$wall_html .= '</div>';
			}
		}

		wp_cache_add( $atts_key, $wall_html, 'wsuwp_media_wall', 600 );

		return $wall_html;
	}
}
new WSUWP_Media_Wall();