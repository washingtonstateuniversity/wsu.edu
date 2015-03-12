<?php

class WSUWP_Media_Wall {
	/**
	 * @var string The slug used for the media wall post type.
	 */
	var $wall_slug = 'wsuwp-media-wall';

	public function __construct() {
		add_action( 'init', array( $this, 'register_post_type' ) );
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
}
new WSUWP_Media_Wall();