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

registerBlockType( 'wsu/fixed-background-block', {
	title: 'Fixed Background',

	description: 'Display a section on the home page with a fixed background',

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
				<div className="section-wrapper fixedbg section-wrapper-has-background"
					data-background="https://s3.wp.wsu.edu/uploads/sites/625/2016/10/spokane-campus3.jpg"
					data-background-mobile="https://s3.wp.wsu.edu/uploads/sites/625/2016/10/spokane-campus3.jpg">
					<section className="row single gutter pad-top fixedbg campusphoto full">
						<div className="column one">
							<p className="locationcap">WSU Health Sciences Spokane</p>
						</div>
					</section>
				</div>
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
			<div className="section-wrapper fixedbg section-wrapper-has-background"
				data-background="https://s3.wp.wsu.edu/uploads/sites/625/2016/10/spokane-campus3.jpg"
				data-background-mobile="https://s3.wp.wsu.edu/uploads/sites/625/2016/10/spokane-campus3.jpg">
				<section className="row single gutter pad-top fixedbg campusphoto full">
					<div className="column one">
						<p className="locationcap">WSU Health Sciences Spokane</p>
					</div>
				</section>
			</div>
		);
	},
} );
