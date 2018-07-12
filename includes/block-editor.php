<?php

namespace WSU\Home\Block\Editor;

add_filter( 'gutenberg_can_edit_post_type', 'WSU\Home\Block\Editor\page_templates', 11, 2 );

/**
 * Selectively add support for Gutenberg to posts and pages assigned to a specific page template.
 *
 * @since 0.15.0
 *
 * @param bool   $can_gutenberg Whether Gutenberg thinks it can provide an editor for this post.
 * @param string $post_type     The post type being edited.
 *
 * @return bool Whether the theme thinks Gutenberg should provide the editor for this post.
 */
function page_templates( $can_gutenberg, $post_type ) {
	if ( 'page' === $post_type ) {
		$post = get_post();

		if ( ! $post ) {
			return $can_gutenberg;
		}

		$template = get_post_meta( $post->ID, '_wp_page_template', true );

		if ( 'templates/home-page.php' === $template ) {
			return true;
		}
	}

	return $can_gutenberg;
}
