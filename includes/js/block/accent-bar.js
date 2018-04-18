const {
	Fragment,
} = wp.element;

const {
	registerBlockType,
} = wp.blocks;

registerBlockType( 'wsu/accent-bar', {
	title: 'Accent bar',

	description: 'Display a crimson accent bar',

	category: 'layout',

	icon: 'admin-appearance',

	edit() {
		return (
			<Fragment key="edit">
				<section className="row single gutter pad-top accent-bar">
					<div className="column one"></div>
				</section>
			</Fragment>
		);
	},

	save() {
		return (
			<section className="row single gutter pad-top accent-bar">
				<div className="column one"></div>
			</section>
		);
	},
} );
