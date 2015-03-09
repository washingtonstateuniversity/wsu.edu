<?php

$mega_menu_args = array(
	'theme_location'  => 'mega-menu',
	'menu'            => 'mega-menu',
	'container'       => 'div',
	'container_class' => false,
	'container_id'    => 'mega-menu',
	'menu_class'      => null,
	'menu_id'         => null,
	'items_wrap'      => '<ul>%3$s</ul>',
	'depth'           => 5,
);

?>
<section class="single row">
	<div class="column one"><?php wp_nav_menu( $mega_menu_args ); ?></div>
</section>