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
?>
	<section class="single row wsu-125-mark">
		<div class="column one">
			<img src="<?php echo get_stylesheet_directory_uri() . '/images/wsu-125-footer-temporary.png'; ?>" />
		</div>
	</section>
	<section class="single row fat-footer-menu">
		<div class="column one">
			<?php wp_nav_menu( $wsu_fat_footer_args ); ?>
		</div>
	</section>
<?php endif;