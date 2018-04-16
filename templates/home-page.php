<?php
/**
 * Template Name: Home Page (Gutenberg)
 *
 * Provides the template for the WSU home page at wsu.edu, built
 * with Gutenberg.
 */

get_header();
?>
<main id="wsuwp-main" class="spine-blank-template">

	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

		<?php get_template_part( 'parts/headers' ); ?>
		<?php get_template_part( 'parts/featured-images' ); ?>

		<div id="page-<?php the_ID(); ?>" <?php post_class(); ?>>
			<?php the_content(); ?>
		</div><!-- #post -->

	<?php
	endwhile;
	endif;

	get_template_part( 'parts/footers' );
	?>
</main>
<?php
get_footer();
