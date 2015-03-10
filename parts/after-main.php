<?php

/*
 * On the home page, we display a series of navigation menus at the top.
 */
if ( is_front_page() ) :

	$wsu_fat_footer_args = array(
		'theme_location'  => 'fat-footer',
		'menu'            => 'fat-footer',
		'container'       => 'div',
		'container_class' => false,
		'container_id'    => 'fat-footer',
		'menu_class'      => null,
		'menu_id'         => null,
		'items_wrap'      => '<ul>%3$s</ul>',
		'depth'           => 3,
	);

	$wsu_campus_args = array(
		'theme_location'  => 'top-level-links',
		'menu'            => 'top-level-links',
		'container'       => 'div',
		'container_class' => false,
		'container_id'    => 'top-level-links',
		'menu_class'      => null,
		'menu_id'         => null,
		'items_wrap'      => '<ul>%3$s</ul>',
		'depth'           => 1,
	);

	$wsu_search_args = array(
		'theme_location'  => 'quick-links',
		'menu'            => 'quick-links',
		'container'       => 'div',
		'container_class' => false,
		'container_id'    => 'quick-links',
		'menu_class'      => null,
		'menu_id'         => null,
		'items_wrap'      => '<ul>%3$s</ul>',
		'depth'           => 2,
	);
?>
	<section class="single row fat-footer-menu">
		<div class="column one">
			<?php wp_nav_menu( $wsu_fat_footer_args ); ?>
		</div>
	</section>

	<!-- Campus links, hidden by default until interaction in header -->
	<section class="single row" id="campus-modal">
		<div class="column one">
			<?php wp_nav_menu( $wsu_campus_args ); ?>
		</div>
	</section>

	<!-- Search interface, hidden by default until interaction in header -->
	<section class="single row" id="search-modal">
		<div class="column one">
			Search Interface
			<div class="quick-links-label">Quick Links</div>
			<?php wp_nav_menu( $wsu_search_args ); ?>
		</div>
	</section>
<?php endif;