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
?>
<header class="main-header wsu-home-navigation">
	<div class="header-shelf-wrapper">
		<section class="single triptych row header-shelf">
			<div class="column one">
				<div class="wsu-logo">
					<img src="https://repo.wsu.edu/spine/1/marks/wsu-signature-standard.svg">
				</div>
			</div>
			<div class="column two">
				<!-- Empty with purpose. -->
			</div>
			<div class="column three wsu-other-nav-placeholder">
				<div class="top-level-links-label">WSU Campuses</div>
				<div class="search-label">Search</div>
			</div>
		</section>
	</div>
	<div class="header-drawer-wrapper header-drawer-wrapper-hide">
		<section class="single triptych row header-drawer">
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
	</div>
	<!-- Search interface, hidden by default until interaction in header -->
	<div class="header-search-wrapper header-search-wrapper-hide">
		<section class="side-right row" id="search-modal">
			<div class="column one">
				<div class="header-search-input-wrapper">
					<label for="header-search">Search</label>
					<input type="text" value="" placeholder="Search" class="header-search-input" />
				</div>
				<div class="header-search-a-z-wrapper">
					<span class="search-a-z"><a href="http://index.wsu.edu/">A-Z Index</a></span>
				</div>
			</div>
			<div class="column two">
				<div class="quick-links-label">Common Searches</div>
				<?php wp_nav_menu( $wsu_search_args ); ?>
			</div>
		</section>
	</div>

	<!-- Campus links, hidden by default until interaction in header -->
	<div class="campus-links-full-page-wrapper campus-links-hide">
		<div class="campus-links-close">Temporary Close</div>
		<div class="campus-links-internal-wrapper">
			<section class="single row" id="campus-modal">
				<div class="column one">
					<?php wp_nav_menu( $wsu_campus_args ); ?>
				</div>
			</section>
		</div>
	</div>
</header>
<?php endif;