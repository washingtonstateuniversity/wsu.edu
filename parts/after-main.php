<?php

/*
 * On the home page, we display fat footer navigation area on the bottom.
 */
if ( is_front_page() || wsu_home_is_site( 'wsu-features' ) || wsu_home_is_site( 'wsu-impact' ) ) :

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

	/**
	 * If this is the features site, we'd like to use the entire menu area from the
	 * home site.
	 */
	if ( wsu_home_is_site( 'wsu-features' ) || wsu_home_is_site( 'wsu-impact' ) ) {
		$feature_site = wsuwp_get_current_site();
		if ( isset( $feature_site->domain ) ) {
			// Allow a local override for development.
			$home_path = apply_filters( 'wsu_home_path', '/' );
			$home_site = get_blog_details( array( 'domain' => $feature_site->domain, 'path' => $home_path ) );
			if ( isset( $home_site->blog_id ) ) {
				switch_to_blog( $home_site->blog_id );
			}
		}
	}
?>
	<footer class="single row fat-footer-menu">
		<div class="column one">
			<?php echo wsu_home_get_menu( $wsu_fat_footer_args ); ?>
		</div>
	</footer>
	<section class="single row full footer-bar">
		<div class="column one">
			<div class="footer-contact-us"><a href="/about/contact/">Contact Us</a></div>
			<div class="footer-copyright">&copy; Washington State University</div>
		</div>
	</section>
<?php

if ( ms_is_switched() ) {
	restore_current_blog();
}

endif;