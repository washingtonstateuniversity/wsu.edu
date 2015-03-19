<?php

/*
 * On the home page, we display fat footer navigation area on the bottom.
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
	<footer class="single row fat-footer-menu">
		<div class="column one">
			<?php echo wsu_home_get_menu( $wsu_fat_footer_args ); ?>
		</div>
	</footer>
<?php endif;