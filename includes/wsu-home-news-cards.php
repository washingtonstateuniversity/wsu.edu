<?php

namespace WSU\Home\NewsCards;

add_action( 'init', 'WSU\Home\NewsCards\register_post_type', 10 );
add_filter( 'post_updated_messages', 'WSU\Home\NewsCards\card_updated_messages' );
add_action( 'cmb2_admin_init', 'WSU\Home\NewsCards\card_metabox' );

/**
 * Register the News Card custom post type.
 *
 * @since 0.15.0
 */
function register_post_type() {
	\register_post_type( 'news-card', array(
		'labels'            => array(
			'name'                => __( 'News Cards', 'spine' ),
			'singular_name'       => __( 'News Card', 'spine' ),
			'all_items'           => __( 'All News Cards', 'spine' ),
			'new_item'            => __( 'New News Card', 'spine' ),
			'add_new'             => __( 'Add New', 'spine' ),
			'add_new_item'        => __( 'Add New News Card', 'spine' ),
			'edit_item'           => __( 'Edit News Card', 'spine' ),
			'view_item'           => __( 'View News Card', 'spine' ),
			'search_items'        => __( 'Search News Cards', 'spine' ),
			'not_found'           => __( 'No News Cards found', 'spine' ),
			'not_found_in_trash'  => __( 'No News Cards found in trash', 'spine' ),
			'parent_item_colon'   => __( 'Parent News Card', 'spine' ),
			'menu_name'           => __( 'News Cards', 'spine' ),
		),
		'public'            => false,
		'hierarchical'      => false,
		'show_ui'           => true,
		'show_in_nav_menus' => false,
		'supports'          => array(
			'title',
		),
		'has_archive'       => false,
		'rewrite'           => false,
		'query_var'         => false,
		'menu_icon'         => 'dashicons-admin-post',
		'show_in_rest'      => true,
		'rest_base'         => 'news-card',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
	) );
}

/**
 * Filter the messages associated with creating and updating a custom post type.
 *
 * @since 0.15.0
 *
 * @param array $messages
 * @return array
 */
function card_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['news-card'] = array(
		0 => '', // Unused. Messages start at index 1.
		1 => __( 'News Card updated.', 'spine' ),
		2 => __( 'Custom field updated.', 'spine' ),
		3 => __( 'Custom field deleted.', 'spine' ),
		4 => __( 'News Card updated.', 'spine' ),
		/* translators: %s: date and time of the revision */
		5 => isset( $_GET['revision'] ) ? sprintf( __( 'News Card restored to revision from %s', 'spine' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false, // WPCS: CSRF Ok.
		6 => __( 'News Card published.', 'spine' ),
		7 => __( 'News Card saved.', 'spine' ),
		8 => __( 'News Card submitted.', 'spine' ),
		// translators: Publish box date format, see https://secure.php.net/manual/en/function.date.php
		9 => sprintf( __( 'News Card scheduled for: <strong>%1$s</strong>.', 'spine' ),
		date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ) ),
		10 => __( 'News Card draft updated.', 'spine' ),
	);

	return $messages;
}

/**
 * Add meta data capture via CMB2 to news cards.
 *
 * @since 0.15.0
 */
function card_metabox() {
	$prefix = 'newscard_';

	$cmb = new_cmb2_box( array(
		'id'            => 'newscard_data',
		'title'         => 'News Card Information',
		'object_types'  => array(
			'news-card',
		),
		'context'       => 'normal',
		'priority'      => 'high',
		'show_names'    => true,
	) );

	$cmb->add_field( array(
		'name'       => 'Teaser Text',
		'desc'       => 'Enter the category text displayed before the headline.',
		'id'         => $prefix . 'teaser',
		'type'       => 'text',
	) );

	$cmb->add_field( array(
		'name' => 'URL',
		'desc' => 'Enter the web URL the headline should link to.',
		'id' => $prefix . 'url',
		'type' => 'text_url',
	) );

	$cmb->add_field( array(
		'name' => 'Description',
		'desc' => 'Enter the excerpt of text displayed after the headline.',
		'id' => $prefix . 'description',
		'type' => 'textarea',
	) );

	$cmb->add_field( array(
		'name' => 'Image',
		'desc' => 'Attach an image to be displayed with this news card.',
		'id' => $prefix . 'image',
		'type' => 'file',
		'options' => array(
			'url' => false, // Don't show the text input field for URL.
		),
		'text'    => array(
			'add_upload_file_text' => 'Add Image',
		),
		'query_args' => array(
			'type' => array(
				'image/gif',
				'image/jpeg',
				'image/png',
			),
		),
	) );
}
