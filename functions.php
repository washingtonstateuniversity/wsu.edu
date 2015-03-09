<?php

/**
 * Provide a cache breaking script version for the theme.
 *
 * @return string Current script version
 */
function wsu_home_script_version() {
	return spine_get_script_version() . '0.0.1';
}


add_action( 'wp_enqueue_scripts', 'spine_child_enqueue_scripts', 11 );

function spine_child_enqueue_scripts() {
	wp_enqueue_script( 'wsu-home-typekit', 'https://use.typekit.net/roi0hte.js', array(), false, false );
	wp_enqueue_script( 'wsu-home', get_stylesheet_directory_uri() . '/js/script.js', array( 'wsu-home-typekit' ), spine_get_script_version(), true );
}