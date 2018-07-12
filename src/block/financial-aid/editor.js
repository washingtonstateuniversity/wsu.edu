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

registerBlockType( 'wsu/financial-aid', {
	title: 'Financial Aid',

	description: 'Display a section on the home page with financial aid stats',

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
				<section className="row single gutter pad-top financialhead">
					<div className="column one">

						<h2><span className="recruit-top">We&#8217;ll help you</span><br />
							<span className="recruit-bottom">pay for your education</span></h2>

					</div>
				</section>

				<section className="row side-left gutter pad-top financial">
					<div className="column one">

						<h3>Scholarships and financial aid</h3>
						<ul>
							<li><a href="https://financialaid.wsu.edu/">General information</a></li>
							<li><a href="https://financialaid.wsu.edu/scholarships/">Scholarships</a></li>
						</ul>

						<h3>Tuition and fees</h3>
						<ul>
							<li><a href="https://admission.wsu.edu/tuition-costs/tuition-break-down/">Estimated costs</a></li>
							<li><a href="https://financialaid.wsu.edu/aid-estimator/">Financial Aid Estimator and Cost Calculator</a></li>
						</ul>

					</div>
					<div className="column two">

						<ul>
							<li><span className="numcall">$390 million</span><span className="desccall">in scholarships, grants, work study, and loans offered in 2017-18</span></li>
							<li><span className="numcall">82% of WSU</span><span className="desccall">undergraduates received some form of financial aid in 2017-18</span></li>
						</ul>

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
				<section className="row single gutter pad-top financialhead">
					<div className="column one">

						<h2><span className="recruit-top">We&#8217;ll help you</span><br />
							<span className="recruit-bottom">pay for your education</span></h2>

					</div>
				</section>

				<section className="row side-left gutter pad-top financial">
					<div className="column one">

						<h3>Scholarships and financial aid</h3>

						<ul>
							<li><a href="https://financialaid.wsu.edu/">General information</a></li>
							<li><a href="https://financialaid.wsu.edu/scholarships/">Scholarships</a></li>
						</ul>

						<h3>Tuition and fees</h3>
						<ul>
							<li><a href="https://admission.wsu.edu/tuition-costs/tuition-break-down/">Estimated costs</a></li>
							<li><a href="https://financialaid.wsu.edu/aid-estimator/">Financial Aid Estimator and Cost Calculator</a></li>
						</ul>

					</div>
					<div className="column two">

						<ul>
							<li><span className="numcall">$390 million</span><span className="desccall">in scholarships, grants, work study, and loans offered in 2017-18</span></li>
							<li><span className="numcall">82% of WSU</span><span className="desccall">undergraduates received some form of financial aid in 2017-18</span></li>
						</ul>

					</div>
				</section>
			</div>
		);
	},
} );
