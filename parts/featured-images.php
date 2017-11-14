<?php

// If a featured image is assigned to the post, display as a background image.

if ( spine_has_background_image() ) {
	$background_image_full = spine_get_background_image_src( 'full' );
	$background_image_xlarge = spine_get_background_image_src( 'spine-xlarge_size' );
	$background_image_medium = spine_get_background_image_src( 'spine-medium_size' );
	?>
	<style>
		@media screen and (max-width:791px) {
			.main-header { background-image: url(<?php echo esc_url( $background_image_medium ); ?>); background-color: transparent; }
		}

		@media screen and (min-width: 792px) {
			.main-header { background-image: url(<?php echo esc_url( $background_image_xlarge ); ?>); background-color: transparent; }
		}

		@media screen and (min-width: 1188px) {
			.main-header { background-image: url(<?php echo esc_url( $background_image_full ); ?>); background-color: transparent; }
		}
	</style>
<?php } ?>

<?php if ( spine_has_featured_image() ) {
	$featured_image_src = spine_get_featured_image_src(); ?>
	<figure class="featured-image" style="background-image: url('<?php echo esc_attr( $featured_image_src ); ?>');">
		<?php spine_the_featured_image(); ?>
	</figure>
<?php }
