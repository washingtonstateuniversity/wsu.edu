<nav id="spine-sitenav" class="spine-sitenav">
	<?php

	if ( false === wsu_home_is_site( 'wsu-home' ) && false === wsu_home_is_site( 'wsu-internal' ) ) {
		$switch_site = get_sites( array(
			'domain' => get_site()->domain,
			'path' => '/',
		) );
		switch_to_blog( $switch_site[0]->blog_id );
	}

	if ( function_exists( 'bu_navigation_display_primary' ) ) {
		$bu_nav_args = array(
			'post_types'      => array( 'page' ), // post types to display
			'include_links'   => true, // whether or not to include BU Navigation links with pages
			'dive'            => true, // whether or not to display descendants
			'depth'           => 4, // how many levels of descendants to display
			'max_items'       => 99, // how many items to display per list
			'container_tag'   => 'ul', // HTML tag to use for menu container
			'container_id'    => '', // HTML ID attribute of menu container
			'container_class' => '', // HTML class attributes for menu container
			'item_tag'        => 'li', // HTML tag to use for individual menu items
			'identify_top'    => false, // If set to true, uses post name as HTML ID attribute for top level posts
			'whitelist_top'   => null, // optional string or array of post names to whitelist for top level
			'echo'            => 1, // whether to display immediately or return
		);
		bu_navigation_display_primary( $bu_nav_args );
	} else {
		$spine_site_args = array(
			'theme_location'  => 'site',
			'menu'            => 'site',
			'container'       => false,
			'container_class' => false,
			'container_id'    => false,
			'menu_class'      => null,
			'menu_id'         => null,
			'items_wrap'      => '<ul>%3$s</ul>',
			'depth'           => 5,
		);
		wp_nav_menu( $spine_site_args );
	}

	if ( ms_is_switched() ) {
		restore_current_blog();
	}
	?>
</nav>
