<?php

namespace WSU\Home\MegaMenu;

add_filter( 'nav_menu_submenu_css_class', 'WSU\Home\MegaMenu\set_sub_navigation_class', 10, 2 );
add_filter( 'nav_menu_css_class', 'WSU\Home\MegaMenu\set_menu_item_class', 10, 4 );
add_filter( 'nav_menu_item_id', 'WSU\Home\MegaMenu\remove_menu_item_id', 10, 3 );
add_filter( 'walker_nav_menu_start_el', 'WSU\Home\MegaMenu\set_top_level_buttons', 10, 4 );
add_filter( 'wp_nav_menu_mega-menu_items', 'WSU\Home\MegaMenu\add_hidden_attribute', 10, 2 );

/**
 * Filter sub-navigation unordered lists to have a sub-navigation class.
 *
 * @since 0.15.0
 *
 * @param array $classes
 * @param stdClass $args
 * @return array
 */
function set_sub_navigation_class( $classes, $args ) {
	if ( 'mega-menu' === $args->menu ) {
		$classes = array( 'sub-navigation' );
	}

	return $classes;
}

/**
 * Filter individual list items in the mega menu to have the expected class.
 *
 * @since 0.15.0
 *
 * @param array    $classes
 * @param array    $items
 * @param stdClass $args
 * @param int      $depth
 * @return array
 */
function set_menu_item_class( $classes, $items, $args, $depth ) {
	if ( 'mega-menu' !== $args->menu ) {
		return $classes;
	}

	if ( 0 === $depth ) {
		return array( 'nav-section' );
	}

	return array( 'menu-item' );
}

/**
 * Remove the ID attached to individual list items.
 *
 * @since 0.15.0
 *
 * @param string   $id
 * @param stdClass $item
 * @param stdClass $args
 * @return string|bool
 */
function remove_menu_item_id( $id, $item, $args ) {
	if ( 'mega-menu' === $args->menu ) {
		return false;
	}

	return $id;
}

/**
 * Use the button element instead of anchors for top level menu labels.
 *
 * @since 0.15.0
 *
 * @param string   $output
 * @param stdClass $item
 * @param int      $depth
 * @param stdClass $args
 * @return string
 */
function set_top_level_buttons( $output, $item, $depth, $args ) {
	if ( 'mega-menu' !== $args->menu || 0 !== $depth ) {
		return $output;
	}

	return '<button aria-expanded="false">' . esc_html( $item->title ) . '</button>';
}

/**
 * Add the hidden attribute to sub-navigation unordered lists on initial display.
 *
 * @since 0.15.0
 *
 * @param string   $items
 * @param stdClass $args
 * @return string
 */
function add_hidden_attribute( $items, $args ) {
	$items = str_replace( '<ul class="sub-navigation">', '<ul class="sub-navigation" hidden>', $items );

	return $items;
}
