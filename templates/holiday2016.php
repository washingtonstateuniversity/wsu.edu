<?php /* Template Name: Holiday Card 2016 */ ?>

<!DOCTYPE HTML>
<html>
<head>
	<title>WSU | Happy Holidays 2016</title>
	<link rel="stylesheet" href="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/layers3d/css/layers3d.css' ); ?>" type="text/css">
	<link rel="stylesheet" href="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/curtains/curtain.css' ); ?>">
	<!--[if lt IE 9]>
	<script src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/layers3d/js/html5.js' ); ?>"></script>
	<![endif]-->

	<script type='text/javascript' src='https://wsu.edu/wp-includes/js/jquery/jquery.js?ver=1.12.4'></script>
	<script type='text/javascript' src='https://wsu.edu/wp-includes/js/jquery/jquery-migrate.min.js?ver=1.4.1'></script>
	<script type="text/javascript">
		var $ = jQuery;
	</script>

	<?php
	// We don't want to use wp_head(), but we do want to capture analytics.
	if ( class_exists( 'WSU_Analytics' ) ) {
		global $wsu_analytics;
		$wsu_analytics->display_tag_manager();
	}
	?>
</head>

<body>




<ol class="curtains">
	<li id="section-home" class="cover">

		<div class="layer6 l3d-container">
			<!--<img class="l3d-level1" src="img/lattice.png" style="width:112%; left:-5%;">-->
			<img class="l3d-level2" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/img/lights.gif' ); ?>" style="width:110%; left:-5%;">
			<img class="l3d-level3" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/img/happy-holidays.png' ); ?>" style="width:35%; left:32.75%;">
		</div>

	</li><!--close "section-home"-->

	<li id="section-collage" class="cover">
		<div class="layer6 l3d-container">
			<!--<img class="l3d-level1" src="img/lattice.png" style="width:112%; left:-5%;">-->
			<img class="l3d-level2" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/img/collageLeft.gif' ); ?>" style="width:40%; left:3.5%;">
			<img class="l3d-level3" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/img/schulz.png' ); ?>" style="width:28%; left:36%;">
			<img class="l3d-level2" src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/img/collageRight.gif' ); ?>" style="width:40%; left:52.75%;">
		</div>
	</li><!--close "section-collage"-->
</ol>

<!--<div class="smokeContainer">
   <img class="smoke" src="img/smoke.png" alt="" /><br />
<img class="smoke2" src="img/smoke2.png" alt="" />
</div>-->

<div id="footer">
	<p style="text-align: center; color: #fff;"><a href="http://wsu.edu" target="blank" title="Washington State University"><img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/img/wsu-signature.png' ); ?>" style="padding: 5px;"></a></p>
</div>

<script src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/layers3d/jQuery/jquery-easing-1.3.js' ); ?>" type="text/javascript"></script>
<script src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/layers3d/js/layers3d.jquery-min.js' ); ?>" type="text/javascript"></script>
<script type="text/javascript">

	$(document).ready(function(){

		$('.layer6').layers3D({
			trigger : 'mousemove',
			factor3D : .5,
			mouseMoveDirection : 'normal',
			responsive : true,
			movement : 'horizontal',

		});
	});

</script>

<script src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/layers3d/js/examples.js' ); ?>" type="text/javascript"></script>

<script src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/curtains/curtain.js' ); ?>"></script>
<script>
	$(function(){
		$('.curtains').curtain({
			scrollSpeed: 300,
			controls: '.menu',
			curtainLinks: '.curtain-links',
			nextSlide: function(){
				console.log("ok");
			}
		});
	});
</script>

</body>
</html>
