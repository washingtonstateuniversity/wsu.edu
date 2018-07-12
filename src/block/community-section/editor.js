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

registerBlockType( 'wsu/community-section', {
	title: 'Community Section',

	description: 'Display a section of other links',

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
				<section className="row thirds gutter pad-top full life">
					<div className="column one">

						<a id="5b36aea0df45c" className="home-link-wrap wsu-home-palette-text-default home-life-single" href="https://wsu.edu/life/things-to-do/sightseeing/">
							<div style={ { backgroundImage: 'url(https://s3.wp.wsu.edu/uploads/sites/625/2015/03/Sights2Cropped-396x396.jpg)' } }
								className="home-headline headline-has-background"
								data-id="5b36aea0df45c"
								data-headline="Breathtaking Sights"
								data-anchor="https://wsu.edu/life/things-to-do/sightseeing/"
								data-date="Mar 09">
								<div>
									<div className="home-headline-head-wrapper">
										<h2>Breathtaking Sights</h2>
										<div className="home-subtitle"></div>
									</div>
								</div>
							</div>
						</a>

					</div>
					<div className="column two">

						<a id="5b36aea0df716" className="home-link-wrap wsu-home-palette-text-default home-life-single" href="https://wsu.edu/life/things-to-do/sports/">
							<div style={{ backgroundImage: 'url(https://s3.wp.wsu.edu/uploads/sites/625/2015/03/RecreationCropped-396x396.jpg)' } }
								className="home-headline headline-has-background"
								data-id="5b36aea0df716"
								data-headline="World-Class Recreation"
								data-anchor="https://wsu.edu/life/things-to-do/sports/"
								data-date="Mar 09">
								<div>
									<div className="home-headline-head-wrapper">
										<h2>World-Class Recreation</h2>
										<div className="home-subtitle"></div>
									</div>
								</div>
							</div>
						</a>

					</div>
					<div className="column three ">

						<a id="5b36aea0dfa97" className="home-link-wrap wsu-home-palette-text-default home-life-single" href="https://wsu.edu/life/things-to-do/entertainment/">
							<div style={ { backgroundImage: 'url(https://s3.wp.wsu.edu/uploads/sites/625/2015/03/ShowsCropped-396x396.jpg)' } }
								className="home-headline headline-has-background"
								data-id="5b36aea0dfa97"
								data-headline="Spectacular Shows"
								data-anchor="https://wsu.edu/life/things-to-do/entertainment/"
								data-date="Mar 09">
								<div>
									<div className="home-headline-head-wrapper">
										<h2>Spectacular Shows</h2>
										<div className="home-subtitle"></div>
									</div>
								</div>
							</div>
						</a>

					</div>
				</section>

				<section className="row single h1-header gutter pad-top community-head">
					<div className="column one">
						<h1>The good life</h1>
					</div>
				</section>

				<section className="row thirds gutter pad-top full life">
					<div className="column one ">

						<a id="5b36aea0dfd53"
							className="home-link-wrap wsu-home-palette-text-default home-life-single"
							href="https://wsu.edu/life/things-to-do/restaurants-shopping/">
							<div style={ { backgroundImage: 'url(https://s3.wp.wsu.edu/uploads/sites/625/2015/03/DiningCropped-396x396.jpg)' } }
								className="home-headline headline-has-background"
								data-id="5b36aea0dfd53"
								data-headline="Irresistible Eats"
								data-anchor="https://wsu.edu/life/things-to-do/restaurants-shopping/"
								data-date="Mar 09">
								<div>
									<div className="home-headline-head-wrapper">
										<h2>Irresistible Eats</h2>
										<div className="home-subtitle"></div>
									</div>
								</div>
							</div>
						</a>

					</div>

					<div className="column two">

						<a id="5b36aea0e0014"
							className="home-link-wrap wsu-home-palette-text-default home-life-single"
							href="https://wsu.edu/life/pullman/healthy-living/">
							<div style={ { backgroundImage: 'url(https://s3.wp.wsu.edu/uploads/sites/625/2015/03/HealthyLivingCropped-396x396.jpg)' } }
								className="home-headline headline-has-background"
								data-id="5b36aea0e0014"
								data-headline="Healthy Living"
								data-anchor="https://wsu.edu/life/pullman/healthy-living/"
								data-date="Mar 09">
								<div>
									<div className="home-headline-head-wrapper">
										<h2>Healthy Living</h2>
										<div className="home-subtitle"></div>
									</div>
								</div>
							</div>
						</a>

					</div>
					<div className="column three">

						<a id="5b36aea0e02a6"
							className="home-link-wrap wsu-home-palette-text-default home-life-single"
							href="https://wsu.edu/life/pullman/community-schools/">
							<div style={ { backgroundImage: 'url(https://s3.wp.wsu.edu/uploads/sites/625/2015/03/HomeFamilyCropped-396x396.jpg)' } }
								className="home-headline headline-has-background"
								data-id="5b36aea0e02a6"
								data-headline="Home &amp; Family"
								data-anchor="https://wsu.edu/life/pullman/community-schools/"
								data-date="Mar 09">
								<div>
									<div className="home-headline-head-wrapper">
										<h2>Home &amp; Family</h2>
										<div className="home-subtitle"></div>
									</div>
								</div>
							</div>
						</a>

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
				<section className="row thirds gutter pad-top full life">
					<div className="column one">

						<a id="5b36aea0df45c" className="home-link-wrap wsu-home-palette-text-default home-life-single" href="https://wsu.edu/life/things-to-do/sightseeing/">
							<div style={ { backgroundImage: 'url(https://s3.wp.wsu.edu/uploads/sites/625/2015/03/Sights2Cropped-396x396.jpg)' } }
								className="home-headline headline-has-background"
								data-id="5b36aea0df45c"
								data-headline="Breathtaking Sights"
								data-anchor="https://wsu.edu/life/things-to-do/sightseeing/"
								data-date="Mar 09">
								<div>
									<div className="home-headline-head-wrapper">
										<h2>Breathtaking Sights</h2>
										<div className="home-subtitle"></div>
									</div>
								</div>
							</div>
						</a>

					</div>
					<div className="column two">

						<a id="5b36aea0df716" className="home-link-wrap wsu-home-palette-text-default home-life-single" href="https://wsu.edu/life/things-to-do/sports/">
							<div style={ { backgroundImage: 'url(https://s3.wp.wsu.edu/uploads/sites/625/2015/03/RecreationCropped-396x396.jpg)' } }
								className="home-headline headline-has-background"
								data-id="5b36aea0df716"
								data-headline="World-Class Recreation"
								data-anchor="https://wsu.edu/life/things-to-do/sports/"
								data-date="Mar 09">
								<div>
									<div className="home-headline-head-wrapper">
										<h2>World-Class Recreation</h2>
										<div className="home-subtitle"></div>
									</div>
								</div>
							</div>
						</a>

					</div>
					<div className="column three ">

						<a id="5b36aea0dfa97" className="home-link-wrap wsu-home-palette-text-default home-life-single" href="https://wsu.edu/life/things-to-do/entertainment/">
							<div style={ { backgroundImage: 'url(https://s3.wp.wsu.edu/uploads/sites/625/2015/03/ShowsCropped-396x396.jpg)' } }
								className="home-headline headline-has-background"
								data-id="5b36aea0dfa97"
								data-headline="Spectacular Shows"
								data-anchor="https://wsu.edu/life/things-to-do/entertainment/"
								data-date="Mar 09">
								<div>
									<div className="home-headline-head-wrapper">
										<h2>Spectacular Shows</h2>
										<div className="home-subtitle"></div>
									</div>
								</div>
							</div>
						</a>

					</div>
				</section>

				<section className="row single h1-header gutter pad-top community-head">
					<div className="column one">
						<h1>The good life</h1>
					</div>
				</section>

				<section className="row thirds gutter pad-top full life">
					<div className="column one ">

						<a id="5b36aea0dfd53"
							className="home-link-wrap wsu-home-palette-text-default home-life-single"
							href="https://wsu.edu/life/things-to-do/restaurants-shopping/">
							<div style={ { backgroundImage: 'url(https://s3.wp.wsu.edu/uploads/sites/625/2015/03/DiningCropped-396x396.jpg)' } }
								className="home-headline headline-has-background"
								data-id="5b36aea0dfd53"
								data-headline="Irresistible Eats"
								data-anchor="https://wsu.edu/life/things-to-do/restaurants-shopping/"
								data-date="Mar 09">
								<div>
									<div className="home-headline-head-wrapper">
										<h2>Irresistible Eats</h2>
										<div className="home-subtitle"></div>
									</div>
								</div>
							</div>
						</a>

					</div>

					<div className="column two">

						<a id="5b36aea0e0014"
							className="home-link-wrap wsu-home-palette-text-default home-life-single"
							href="https://wsu.edu/life/pullman/healthy-living/">
							<div style={ { backgroundImage: 'url(https://s3.wp.wsu.edu/uploads/sites/625/2015/03/HealthyLivingCropped-396x396.jpg)' } }
								className="home-headline headline-has-background"
								data-id="5b36aea0e0014"
								data-headline="Healthy Living"
								data-anchor="https://wsu.edu/life/pullman/healthy-living/"
								data-date="Mar 09">
								<div>
									<div className="home-headline-head-wrapper">
										<h2>Healthy Living</h2>
										<div className="home-subtitle"></div>
									</div>
								</div>
							</div>
						</a>

					</div>
					<div className="column three">

						<a id="5b36aea0e02a6"
							className="home-link-wrap wsu-home-palette-text-default home-life-single"
							href="https://wsu.edu/life/pullman/community-schools/">
							<div style={ { backgroundImage: 'url(https://s3.wp.wsu.edu/uploads/sites/625/2015/03/HomeFamilyCropped-396x396.jpg)' } }
								className="home-headline headline-has-background"
								data-id="5b36aea0e02a6"
								data-headline="Home &amp; Family"
								data-anchor="https://wsu.edu/life/pullman/community-schools/"
								data-date="Mar 09">
								<div>
									<div className="home-headline-head-wrapper">
										<h2>Home &amp; Family</h2>
										<div className="home-subtitle"></div>
									</div>
								</div>
							</div>
						</a>

					</div>
				</section>
			</div>
		);
	},
} );
