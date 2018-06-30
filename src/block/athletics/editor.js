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

registerBlockType( 'wsu/athletics', {
	title: 'Athletics Section',

	description: 'Display a section on the home page with upcoming events and the academic calendar',

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
				<section className="row single gutter pad-top athletics full">
					<div className="column one">

						<p><a href="http://wsucougars.com"><img className="alignnone athletics-logo size-full wp-image-1446" src="https://s3.wp.wsu.edu/uploads/sites/625/2015/03/WState-Athletics-full.png" alt="WSU-Athletics" width="427" height="83" /></a><img className="action-img alignnone wp-image-5580 size-large"
								src="https://s3.wp.wsu.edu/uploads/sites/625/2018/04/ath-baseball2018-792x270.jpg" alt="Andres Alvarez raises the baseball in preparation to throw " width="792" height="270" srcSet="https://s3.wp.wsu.edu/uploads/sites/625/2018/04/ath-baseball2018-792x270.jpg 792w, https://s3.wp.wsu.edu/uploads/sites/625/2018/04/ath-baseball2018-396x135.jpg 396w, https://s3.wp.wsu.edu/uploads/sites/625/2018/04/ath-baseball2018-768x262.jpg 768w, https://s3.wp.wsu.edu/uploads/sites/625/2018/04/ath-baseball2018-990x338.jpg 990w, https://s3.wp.wsu.edu/uploads/sites/625/2018/04/ath-baseball2018.jpg 1025w"
								sizes="(max-width: 792px) 100vw, 792px" /></p>
						<ul>
							<li><a href="http://www.wsucougars.com/ViewArticle.dbml?&amp;ATCLID=208903163&amp;DB_OEM_ID=30400">Purchase tickets</a></li>
							<li><a href="http://www.wsucougars.com/main/Schedule.dbml?DB_LANG=C&amp;&amp;DB_OEM_ID=30400">All sports schedule</a></li>
							<li><a href="http://www.wsucougars.com/">WSUCougars.com</a></li>
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
			<section className="row single gutter pad-top athletics full">
				<div className="column one">

					<p><a href="http://wsucougars.com"><img className="alignnone athletics-logo size-full wp-image-1446" src="https://s3.wp.wsu.edu/uploads/sites/625/2015/03/WState-Athletics-full.png" alt="WSU-Athletics" width="427" height="83" /></a><img className="action-img alignnone wp-image-5580 size-large"
							src="https://s3.wp.wsu.edu/uploads/sites/625/2018/04/ath-baseball2018-792x270.jpg" alt="Andres Alvarez raises the baseball in preparation to throw " width="792" height="270" srcSet="https://s3.wp.wsu.edu/uploads/sites/625/2018/04/ath-baseball2018-792x270.jpg 792w, https://s3.wp.wsu.edu/uploads/sites/625/2018/04/ath-baseball2018-396x135.jpg 396w, https://s3.wp.wsu.edu/uploads/sites/625/2018/04/ath-baseball2018-768x262.jpg 768w, https://s3.wp.wsu.edu/uploads/sites/625/2018/04/ath-baseball2018-990x338.jpg 990w, https://s3.wp.wsu.edu/uploads/sites/625/2018/04/ath-baseball2018.jpg 1025w"
							sizes="(max-width: 792px) 100vw, 792px" /></p>
					<ul>
						<li><a href="http://www.wsucougars.com/ViewArticle.dbml?&amp;ATCLID=208903163&amp;DB_OEM_ID=30400">Purchase tickets</a></li>
						<li><a href="http://www.wsucougars.com/main/Schedule.dbml?DB_LANG=C&amp;&amp;DB_OEM_ID=30400">All sports schedule</a></li>
						<li><a href="http://www.wsucougars.com/">WSUCougars.com</a></li>
					</ul>

				</div>
			</section>
		);
	},
} );
