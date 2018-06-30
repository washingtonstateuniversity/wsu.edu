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

registerBlockType( 'wsu/calendar-section', {
	title: 'Events and Academic Calendar',

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
				<div className="section-wrapper graybg">
					<section className="row halves gutter pad-top news">
						<div className="column one ">

							<header>
								<h2>Events</h2>
							</header>

							<div className="wsuwp-content-syndicate-wrapper">
								<ul>
									<li><span className="content-item-event-date">June 30 </span><span className="content-item-event-title"><a href="https://events.wsu.edu/event/wsu-pullman-community-safety-fair/">Community Safety Fair</a></span><span className="content-item-event-city">Pullman</span></li>
									<li><span className="content-item-event-date">July 2-6 </span><span className="content-item-event-title"><a href="https://urec.wsu.edu/cougarkids/cougar-kids-camp/camp-weekly-themes/">Cougar Kids Camp: Superhero</a></span><span className="content-item-event-city">Pullman</span></li>
									<li><span className="content-item-event-date">July 6 </span><span className="content-item-event-title"><a href="https://events.wsu.edu/event/wsu-planetarium-hubblevision/">WSU Planetarium: Hubblevision</a></span><span className="content-item-event-city">Pullman</span></li>
									<li><span className="content-item-event-date">July 9-13 </span><span className="content-item-event-title"><a href="http://www.totalcamps.com/WSUWOMENSSOCCERCAMPS/camps/2018_summer_camp_session_2/_cJn">Coed soccer camp, session 2</a></span>
										<span
											className="content-item-event-city">Pullman</span>
									</li>
									<li><span className="content-item-event-date">July 11-14 </span><span className="content-item-event-title"><a href="http://www.totalcamps.com/WSUWOMENSVOLLEYBALLCAMPS">High school team volleyball camp</a></span><span className="content-item-event-city">Pullman</span></li>
									<li><span className="content-item-event-date">July 12-15 </span><span className="content-item-event-title"><a href="http://www.totalcamps.com/WSUBASEBALLCAMPS/camps/2018_wsu_baseball_team_camp-coach_registration_%289th-12th_grade%29/_cJD">9th-12th grade baseball camp</a></span>
										<span
											className="content-item-event-city">Pullman</span>
									</li>
								</ul>
								<ul>
									<li><a href="https://events.wsu.edu/">More events</a></li>
								</ul>
							</div>

						</div>
						<div className="column two ">

							<header>
								<h2>Academic Calendar</h2>
							</header>

							<ul className="wsu-academic-calendar">
								<li><span className="wsu-ac-month">July</span> <span className="wsu-ac-day">4</span> <span className="wsu-ac-text">Independence Day holiday</span></li>
								<li><span className="wsu-ac-month">July</span> <span className="wsu-ac-day">27</span> <span className="wsu-ac-text">Last day of summer session classes</span></li>
								<li><span className="wsu-ac-month">July</span> <span className="wsu-ac-day">28</span> <span className="wsu-ac-text">Intersession begins</span></li>
								<li><span className="wsu-ac-month">August</span> <span className="wsu-ac-day">20</span> <span className="wsu-ac-text">First day of fall semester classes</span></li>
							</ul><br />

							<a href="http://registrar.wsu.edu/academic-calendar/">Academic calendar</a>

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
			<div className="section-wrapper graybg">
				<section className="row halves gutter pad-top news">
					<div className="column one ">

						<header>
							<h2>Events</h2>
						</header>

						<div className="wsuwp-content-syndicate-wrapper">
							<ul>
								<li><span className="content-item-event-date">June 30 </span><span className="content-item-event-title"><a href="https://events.wsu.edu/event/wsu-pullman-community-safety-fair/">Community Safety Fair</a></span><span className="content-item-event-city">Pullman</span></li>
								<li><span className="content-item-event-date">July 2-6 </span><span className="content-item-event-title"><a href="https://urec.wsu.edu/cougarkids/cougar-kids-camp/camp-weekly-themes/">Cougar Kids Camp: Superhero</a></span><span className="content-item-event-city">Pullman</span></li>
								<li><span className="content-item-event-date">July 6 </span><span className="content-item-event-title"><a href="https://events.wsu.edu/event/wsu-planetarium-hubblevision/">WSU Planetarium: Hubblevision</a></span><span className="content-item-event-city">Pullman</span></li>
								<li><span className="content-item-event-date">July 9-13 </span><span className="content-item-event-title"><a href="http://www.totalcamps.com/WSUWOMENSSOCCERCAMPS/camps/2018_summer_camp_session_2/_cJn">Coed soccer camp, session 2</a></span>
									<span
										className="content-item-event-city">Pullman</span>
								</li>
								<li><span className="content-item-event-date">July 11-14 </span><span className="content-item-event-title"><a href="http://www.totalcamps.com/WSUWOMENSVOLLEYBALLCAMPS">High school team volleyball camp</a></span><span className="content-item-event-city">Pullman</span></li>
								<li><span className="content-item-event-date">July 12-15 </span><span className="content-item-event-title"><a href="http://www.totalcamps.com/WSUBASEBALLCAMPS/camps/2018_wsu_baseball_team_camp-coach_registration_%289th-12th_grade%29/_cJD">9th-12th grade baseball camp</a></span>
									<span
										className="content-item-event-city">Pullman</span>
								</li>
							</ul>
							<ul>
								<li><a href="https://events.wsu.edu/">More events</a></li>
							</ul>
						</div>

					</div>
					<div className="column two ">

						<header>
							<h2>Academic Calendar</h2>
						</header>

						<ul className="wsu-academic-calendar">
							<li><span className="wsu-ac-month">July</span> <span className="wsu-ac-day">4</span> <span className="wsu-ac-text">Independence Day holiday</span></li>
							<li><span className="wsu-ac-month">July</span> <span className="wsu-ac-day">27</span> <span className="wsu-ac-text">Last day of summer session classes</span></li>
							<li><span className="wsu-ac-month">July</span> <span className="wsu-ac-day">28</span> <span className="wsu-ac-text">Intersession begins</span></li>
							<li><span className="wsu-ac-month">August</span> <span className="wsu-ac-day">20</span> <span className="wsu-ac-text">First day of fall semester classes</span></li>
						</ul><br />

						<a href="http://registrar.wsu.edu/academic-calendar/">Academic calendar</a>

					</div>
				</section>
			</div>
		);
	},
} );
