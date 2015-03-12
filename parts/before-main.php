<?php

/*
 * On the home page, we display a series of navigation menus at the top.
 */
if ( is_front_page() ) :

	$mega_menu_args = array(
		'theme_location'  => 'mega-menu',
		'menu'            => 'mega-menu',
		'container'       => 'div',
		'container_class' => false,
		'container_id'    => 'mega-menu',
		'menu_class'      => null,
		'menu_id'         => null,
		'items_wrap'      => '<ul>%3$s</ul>',
		'depth'           => 5,
	);

	$signature_menu_args = array(
		'theme_location'  => 'signature-menu',
		'menu'            => 'signature-menu',
		'container'       => 'div',
		'container_class' => false,
		'container_id'    => 'signature-menu',
		'menu_class'      => null,
		'menu_id'         => null,
		'items_wrap'      => '<ul>%3$s</ul>',
		'depth'           => 1,
	);
?>
<header class="triptych row wsu-home-navigation">
	<div class="column one">
		<div class="wsu-logo">WSU LOGO</div>
	</div>
	<div class="column two wsu-mega-nav-placeholder">
		<?php wp_nav_menu( $mega_menu_args ); ?>
	</div>
	<div class="column three wsu-other-nav-placeholder">
		<div class="top-level-links-label">WSU Campuses</div>
		<div class="search-label">Search</div>
	</div>
</header>
<?php endif;