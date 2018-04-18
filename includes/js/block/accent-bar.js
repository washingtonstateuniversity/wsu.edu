const {
	Fragment,
	RawHTML,
} = wp.element;

const {
	registerBlockType,
	PlainText,
	InspectorControls,
} = wp.blocks;

const {
	PanelBody,
} = wp.components;

registerBlockType( 'wsu/accent-bar', {
	title: 'Accent bar',

	description: 'Display a crimson accent bar with optional call to action or announcement text',

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
			<InspectorControls key="inspector">
				<PanelBody title="Accent bar information">
					<PlainText
						placeholder="Accent bar text"
						value={ accent_bar_text }
						onChange={ ( accent_bar_text ) => setAttributes( { accent_bar_text } ) }
					/>
					<PlainText
						placeholder="Accent bar link"
						value={ accent_bar_url }
						onChange={ ( accent_bar_url ) => setAttributes( { accent_bar_url } ) }
					/>
				</PanelBody>
			</InspectorControls>,
			<Fragment key="edit">
				<section className="row single gutter pad-top accent-bar">
					<div className="column one">
						<div>
							{ (accent_bar_text ) ? <span>{ accent_bar_text }</span> : "" }
						</div>
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
			<section className="row single gutter pad-top accent-bar">
				<div className="column one">
					<div>
						<RawHTML>{ final_html }</RawHTML>
					</div>
				</div>
			</section>
		);
	},
} );
