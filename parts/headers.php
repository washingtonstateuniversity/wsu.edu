<?php


if ( false === is_front_page() && spine_get_option( 'main_header_show' ) == 'true' ) :

	$spine_main_header_values = spine_get_main_header();
	?>
	<header class="main-header">
		<div class="header-group hgroup guttered padded-bottom short">

			<sup class="sup-header" data-section="<?php echo $spine_main_header_values['section_title']; ?>" data-pagetitle="<?php echo $spine_main_header_values['page_title']; ?>" data-posttitle="<?php echo $spine_main_header_values['post_title']; ?>" data-default="<?php echo esc_html($spine_main_header_values['sup_header_default']); ?>" data-alternate="<?php echo esc_html($spine_main_header_values['sup_header_alternate']); ?>"><span class="sup-header-default"><?php echo strip_tags( $spine_main_header_values['sup_header_default'], '<a>' ); ?></span></sup>
			<sub class="sub-header" data-sitename="<?php echo $spine_main_header_values['site_name']; ?>" data-pagetitle="<?php echo $spine_main_header_values['page_title']; ?>" data-posttitle="<?php echo $spine_main_header_values['post_title']; ?>" data-default="<?php echo esc_html($spine_main_header_values['sub_header_default']); ?>" data-alternate="<?php echo esc_html($spine_main_header_values['sub_header_alternate']); ?>"><span class="sub-header-default"><?php echo strip_tags( $spine_main_header_values['sub_header_default'], '<a>' ); ?></span></sub>

		</div>
	</header>

<?php endif;