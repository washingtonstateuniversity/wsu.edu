const {
	Fragment,
	RawHTML,
} = wp.element;

const {
	registerBlockType,
} = wp.blocks;

const {
	PanelBody,
} = wp.components;

const {
	InspectorControls,
	PlainText,
} = wp.editor;

registerBlockType( 'wsu/fields-of-study', {
	title: 'Fields of Study',

	description: 'Display a fields of study section on the home page',

	category: 'layout',

	icon: 'admin-appearance',

	attributes: {
		accent_bar_text: {
			type: 'string',
		},
		accent_bar_url: {
			type: 'string',
		},
	},

	edit( { attributes, setAttributes } ) {
		const {
			accent_bar_text,
			accent_bar_url,
		} = attributes;

		return [
			<Fragment>
				<section className="row single gutter pad-top accent-bar">
					<div className="column one">
						<p>Fields of Study Block - no edit available.</p>
					</div>
				</section>
			</Fragment>
		];
	},

	save( { attributes } ) {
		const {
			accent_bar_text,
			accent_bar_url,
		}  = attributes;

		let final_html = '';

		if ( accent_bar_url && accent_bar_text && '' !== accent_bar_text ) {
			final_html = `<a href="${ accent_bar_url }">${ accent_bar_text }</a>`
		} else {
			final_html = accent_bar_text;
		}

		return (
			<div>
				<section className="row single gutter pad-top recruitment-head">
					<div className="column one">
						<h2><span className="recruit-top">Majors &amp; minors</span><br />
						<span className="recruit-middle">Explore 200+ programs</span></h2>
					</div>
				</section>

				<section className="row halves gutter pad-top recruitment">
					<div className="column one">
						<p>Discover hands-on learning opportunities in every major. Enjoy courses taught by renowned professors. Get involved in fieldwork, laboratory research, creative projects, study-abroad programs, and more.</p>
						<p>Explore your options and create the college experience that’s right for you.</p>
						<p><strong><a href="http://admission.wsu.edu/">Explore WSU Pullman</a></strong></p>
						<p className="button-row"><a href="http://admission.wsu.edu/visits">Visit</a> <a href="https://goto.wsu.edu/info">Inquire</a> <a class="button-apply" href="http://admission.wsu.edu/applications/">Apply</a></p>

						<h3>Explore other WSU locations</h3>

						<ul>
							<li><a href="https://spokane.wsu.edu/studentaffairs/admissions/">Spokane</a></li>
							<li><a href="http://tricities.wsu.edu/admission/">Tri-Cities</a></li>
							<li><a href="http://studentaffairs.vancouver.wsu.edu/admissions">Vancouver</a></li>
							<li><a href="http://online.wsu.edu/undergrad/Default.aspx">Online</a></li>
							<li><a href="http://everett.wsu.edu/academics-overview/">Everett</a></li>
							<li><a title="Admission" href="https://wsu.edu/admission/">More</a></li>
						</ul>

					</div>

					<div className="column two">

						<div className="find-fos-wrapper">
							<div className="find-fos">
								<h3>Find my field of study</h3>
								<form title="Select a field of study by academic area">
									<label><span className="screen-reader-shortcut">Select an Academic Area</span>
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

						<div className="find-fos-alpha-wrapper">
							<div className="find-fos-alpha">
								<h4>Browse Alphabetically</h4>
								<ul className="az">
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7509">A</a></li>
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7510">B</a></li>
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7511">C</a></li>
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=181">D</a></li>
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=182">E</a></li>
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7512">F</a></li>
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=184">G</a></li>
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=185">H</a></li>
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
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=197">T</a></li>
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=198">U</a></li>
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7622">V</a></li>
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7623">W</a></li>
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=7624">X</a></li>
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=202">Y</a></li>
									<li><a href="http://admission.wsu.edu/academics/fos/Public/area.castle?id=203">Z</a></li>
								</ul>
							</div>
						</div>

						<h2 className="recruit-middle graduate">Graduate and professional programs</h2>

						<p><strong><a href="http://gradschool.wsu.edu/degrees/">Learn more about our 127 degree programs</a></strong></p>
						<p className="button-row graduate-apply"><a href="https://inquiry.wsu.edu/graduate">Inquire</a><a className="button-apply tracked" href="http://gradschool.wsu.edu/apply/">Apply</a></p>

					</div>
				</section>
			</div>
		);
	},
} );
