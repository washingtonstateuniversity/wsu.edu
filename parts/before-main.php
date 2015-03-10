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
?>
<section class="single row mega-menu">
	<div class="column one">
		<?php wp_nav_menu( $mega_menu_args ); ?>

		<div class="top-level-links-label">WSU Campuses</div>
		<div class="search-label">Search</div>
	</div>
</section>
<?php endif;