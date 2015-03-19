<?php

class WSU_Home_Fields_Of_Study {
	public function __construct() {
		add_shortcode( 'wsu_fields_of_study', array( $this, 'display_fields_of_study' ) );
	}

	public function display_fields_of_study( $atts ) {
		ob_start();
		?>
		<div class="find-fos-wrapper">
			<div class="find-fos">
					<h4>Find my field of study</h4>
					<ul class="fos">
						<li class="fos-label">by Academic Area</li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7762">Agricultural Sciences</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7774">Art, Architecture, and Design</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7763">Biological and Environmental Sciences</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=41745">Business</a></li>
						<li class="fos-item fos-item-child"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=41685">Business Programs Accredited by AACSB</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=1854">Communication</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=41746">Economics</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=32421">Education</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7786">Engineering and Computer Science</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7807">Foreign Languages and Cultures</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7775">Health Sciences</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=1862">History, Literature, and Philosophy</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=1861">Music</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7802">Physical and Mathematical Sciences</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7839">Pre-Professional Studies</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=1876">Social Sciences</a></li>
						<li class="fos-item"><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=32423">Sport and Fitness</a></li>
					</ul>
			</div>
		</div>
		<div class="find-fos-alpha-wrapper">
			<div class="find-fos-alpha">
				<h3>Browse Alphabetically</h3>
				<ul class="az">
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7509">A</a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7510">B</a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7511">C</a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=181">D </a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=182">E </a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7512">F</a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=184">G </a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=185">H </a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7621">I</a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=187">J </a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=188">K </a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=189">L </a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=190">M </a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=191">N </a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=192">O </a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7513">P</a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7514">Q</a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7515">R</a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7516">S</a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=197">T </a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=198">U </a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7622">V</a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7623">W</a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7624">X</a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=202">Y </a></li>
					<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=203">Z </a></li>
				</ul>
			</div>
		</div>
		<?php
		$content = ob_get_contents();
		ob_end_clean();

		return $content;
	}
}
new WSU_Home_Fields_Of_Study();