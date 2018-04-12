<?php

namespace WSU\Home\Block\NewsCard;

add_action( 'init', 'WSU\Home\Block\NewsCard\setup_block', 10 );

/**
 * Register the block used to capture news cards.
 *
 * @since 0.15.0
 */
function setup_block() {
	wp_register_script(
		'wsu-block-news-card',
		get_stylesheet_directory_uri() . '/includes/js/block/news-card.build.js',
		array(
			'wp-blocks',
			'wp-element',
		)
	);

	wp_register_style(
		'wsu-block-news-card',
		get_stylesheet_directory_uri() . '/includes/css/block/news-card.css',
		array(
			'wp-edit-blocks',
		)
	);

	register_block_type( 'wsu/news-deck', array(
		'editor_script' => 'wsu-block-news-card',
	) );

	register_block_type( 'wsu/news-card', array(
		'editor_script' => 'wsu-block-news-card',
		'editor_style' => 'wsu-block-news-card',
	) );
}
