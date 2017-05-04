<?php

class WSUWP_Top_Ten_Card_Shortcode {

	/**
	 * Setup hooks to include.
	 *
	 * @since 0.14.0
	 */
	public function __construct() {
		add_shortcode( 'wsuwp_top_ten_cards', array( $this, 'display_wsuwp_top_ten_cards' ) );
	}

	/**
	 * Displays cards.
	 *
	 * @since 0.14.0
	 */
	public function display_wsuwp_top_ten_cards( $atts ) {
		$defaults = array(
			'count' => 10,
			'site_category_slug' => '',
		);

		$atts = shortcode_atts( $defaults, $atts );

		if ( empty( $atts['site_category_slug'] ) ) {
			return '';
		}

		$args = array(
			'posts_per_page' => absint( $atts['count'] ),
			'orderby' => 'rand',
		);

		if ( $atts['site_category_slug'] ) {
			$args['category_name'] = sanitize_key( $atts['site_category_slug'] );
		}

		$query = new WP_Query( $args );

		if ( ! $query->have_posts() ) {
			return '';
		}

		ob_start();

		while ( $query->have_posts() ) {
			$query->the_post();
			$featured_image_src = spine_get_thumbnail_image_src( 'full' );
			?>
			<article class="content-card">

				<figure class="content-card--feature-image ui-stick-and-go ui-scroll-fade"
						data-desktop-image="<?php echo esc_url( spine_get_featured_image_src( 'full' ) ); ?>"
						data-mobile-image="<?php echo esc_url( $featured_image_src ); ?>">
					<div class="content-card--feature-image-wrapper">
						<img src="<?php echo esc_url( $featured_image_src ); ?>" alt="<?php the_title(); ?>" />
					</div>
				</figure>

				<div class="content-card--text">

					<header>
						<h2><?php the_title(); ?></h2>
					</header>

					<?php
						add_filter( 'the_content', 'wpautop' );
						the_content();
						remove_filter( 'the_content', 'wpautop' );
					?>

				</div>

			</article>
			<?php
		}

		$content = ob_get_clean();

		return $content;
	}
}
new WSUWP_Top_Ten_Card_Shortcode();
