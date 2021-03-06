<?php

class WSU_Home_YouTube_Embed {
	public function __construct() {
		add_shortcode( 'wsu_feature_youtube', array( $this, 'display_feature_youtube' ) );
	}

	/**
	 * Display the custom iframe used for YouTube embeds on feature pages.
	 *
	 * [wsu_feature_youtube src="https://www.youtube.com/embed/OmN5coh0heM?modestbranding=1;showinfo=0;controls=0;rel=0" width="560" height="315"]
	 * @param $atts
	 *
	 * @return string
	 */
	public function display_feature_youtube( $atts ) {
		$defaults = array(
			'target_id' => '',
			'text_trigger' => '',
			'video_id' => '',
			'width' => '560',
			'height' => '315',
			'src' => '',
		);
		$atts = shortcode_atts( $defaults, $atts );

		/**
		 * [wsu_feature_youtube video_id="OmN5coh0heM" width="560" height="315"]
		 */
		ob_start();
		?>
		<!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
		<div class="inline-youtube-video"
			 id="youtube-video-<?php echo esc_attr( $atts['video_id'] ); ?>"
		     data-video-id="<?php echo esc_attr( $atts['video_id'] ); ?>"
			 data-video-width="<?php echo absint( $atts['width'] ); ?>"
			 data-video-height="<?php echo absint( $atts['height'] ); ?>"></div>
		<?php
		$content = ob_get_contents();
		ob_end_clean();

		return $content;
	}

}
new WSU_Home_YouTube_Embed();
