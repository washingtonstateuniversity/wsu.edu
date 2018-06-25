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
				<h3>Find my field of study</h3>
				<form title="Select a field of study by academic area">
					<label><span class="screen-reader-shortcut">Select an Academic Area</span>
					<select>
						<option value="7762">Agricultural Sciences</option>
						<option value="7774">Art, Architecture, and Design</option>
						<option value="7763">Biological and Environmental Sciences</option>
						<option value="41745">Business</option>
						<option value="41685">Business Programs Accredited by AACSB</option>
						<option value="1854">Communication</option>
						<option value="41746">Economics</option>
						<option value="32421">Education</option>
						<option value="7786">Engineering and Computer Science</option>
						<option value="7807">Foreign Languages and Cultures</option>
						<option value="7775">Health Sciences</option>
						<option value="1862">History, Literature, and Philosophy</option>
						<option value="1861">Music</option>
						<option value="7802">Physical and Mathematical Sciences</option>
						<option value="7839">Pre-Professional Studies</option>
						<option value="1876">Social Sciences</option>
						<option value="32423">Sport and Fitness</option>
					</select>
					</label>
					<input id="fos--select" value="View field of study" type="button" />
				</form>
			</div>
		</div>

		<div class="find-fos-alpha-wrapper">
			<div class="find-fos-alpha">
				<h4>Browse Alphabetically</h4>
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
