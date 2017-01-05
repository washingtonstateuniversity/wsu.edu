<nav id="spine-offsitenav" class="spine-offsitenav">
	<?php

	if ( false === wsu_home_is_site( 'wsu-home' ) && false === wsu_home_is_site( 'wsu-internal' ) ) {
		$switch_site = get_sites( array( 'domain' => get_site()->domain, 'path' => '/' ) );
		switch_to_blog( $switch_site[0]->blog_id );
	}

	$spine_offsite_args = array(
		'theme_location'  => 'offsite',
		'menu'            => 'offsite',
		'container'       => false,
		'container_class' => false,
		'container_id'    => false,
		'menu_class'      => null,
		'menu_id'         => null,
		'fallback_cb'     => false,
		'items_wrap'      => '<ul>%3$s</ul>',
		'depth'           => 3,
	);
	wp_nav_menu( $spine_offsite_args );

	if ( ms_is_switched() ) {
		restore_current_blog();
	}
	?>
</nav>
