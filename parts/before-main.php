<?php

/*
 * On the home page, we display a series of navigation menus at the top.
 */
if ( is_front_page() ) :

	$mega_menu_args = array(
		'theme_location'  => 'mega-menu',
		'menu'            => 'mega-menu',
		'container'       => 'div',
		'container_class' => 'mega-menu-wrapper',
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
		'container_class' => 'signature-menu-wrapper',
		'container_id'    => 'signature-menu',
		'menu_class'      => null,
		'menu_id'         => null,
		'items_wrap'      => '<ul>%3$s</ul>',
		'depth'           => 1,
	);
?>
<header class="main-header wsu-home-navigation">
	<section class="single triptych row">
		<div class="column one">
			<div class="wsu-logo">WSU LOGO</div>
		</div>
		<div class="column two">
			<!-- Empty with purpose. -->
		</div>
		<div class="column three wsu-other-nav-placeholder">
			<div class="top-level-links-label">WSU Campuses</div>
			<div class="search-label">Search</div>
		</div>
	</section>
	<section class="single triptych row">
		<div class="column one wsu-signature-nav-container">
			<?php wp_nav_menu( $signature_menu_args ); ?>
		</div>
		<div class="column two wsu-mega-nav-container">
			<?php wp_nav_menu( $mega_menu_args ); ?>
		</div>
		<div class="column three">
			<!-- Empty with purpose. -->
		</div>
	</section>
</header>
<?php endif;