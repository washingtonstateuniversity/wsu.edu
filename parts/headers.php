<?php

// Single pages with the feature-impact and feature-inspiration categories should
// show information from the page headlines plugin.
if ( function_exists( 'wsu_home_get_page_headline' ) && is_singular( 'page' ) && has_category( array( 'feature-impact', 'feature-inspiration' ) ) ) {
	$home_page_headline = wsu_home_get_page_headline();
	$home_page_subtitle = wsu_home_get_page_subtitle();
	?>
	<header class="main-header">
		<div class="header-group hgroup guttered padded-bottom short">
			<?php if ( $home_page_headline ) : ?><h1 class="page-headline"><?php echo wp_kses_post( $home_page_headline ); ?></h1><?php endif; ?>
			<?php if ( $home_page_subtitle ) : ?><div class="page-subtitle"><?php echo wp_kses_post( $home_page_subtitle ); ?></div><?php endif; ?>
		</div>
	</header>
	<?php
	// @codingStandardsIgnoreStart
} elseif ( false === is_front_page() && spine_get_option( 'main_header_show' ) == 'true' ) {
	// @codingStandardsIgnoreEnd
	$spine_main_header_values = spine_get_main_header();
	?>
	<header class="main-header">
		<div class="header-group hgroup guttered padded-bottom short">
			<sub class="sub-header"
			     data-sitename="<?php echo esc_attr( $spine_main_header_values['site_name'] ); ?>"
			     data-pagetitle="<?php echo esc_attr( $spine_main_header_values['page_title'] ); ?>"
			     data-posttitle="<?php echo esc_attr( $spine_main_header_values['post_title'] ); ?>"
			     data-default="<?php echo esc_html( $spine_main_header_values['sub_header_default'] ); ?>"
			     data-alternate="<?php echo esc_html( $spine_main_header_values['sub_header_alternate'] ); ?>">
				<span class="sub-header-default"><?php echo esc_attr( strip_tags( $spine_main_header_values['sub_header_default'], '<a>' ) ); ?></span>
			</sub>
		</div>
	</header>
	<?php
}
