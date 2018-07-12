<?php

namespace WSU\Home\Block\Config;

add_action( 'init', 'WSU\Home\Block\Config\setup_blocks', 10 );

/**
 * Register custom blocks for wsu.edu.
 *
 * @since 0.15.0
 */
function setup_blocks() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	wp_register_script(
		'wsu-blocks',
		get_stylesheet_directory_uri() . '/js/wsu-blocks.min.js',
		array(
			'wp-blocks',
			'wp-element',
		)
	);

	wp_register_style(
		'wsu-blocks',
		get_stylesheet_directory_uri() . '/css/editor-blocks.css',
		array(
			'wp-edit-blocks',
		)
	);

	register_block_type( 'wsu/news-deck', array(
		'editor_script' => 'wsu-blocks',
	) );

	register_block_type( 'wsu/news-card', array(
		'editor_script' => 'wsu-blocks',
		'editor_style' => 'wsu-blocks',
	) );

	register_block_type( 'wsu/feature-deck', array(
		'editor_script' => 'wsu-blocks',
		'editor_style' => 'wsu-blocks',
	) );

	register_block_type( 'wsu/feature-card', array(
		'editor_script' => 'wsu-blocks',
		'editor_style' => 'wsu-blocks',
	) );

	register_block_type( 'wsu/accent-bar', array(
		'editor_script' => 'wsu-blocks',
		'editor_style' => 'wsu-blocks',
	) );
}
