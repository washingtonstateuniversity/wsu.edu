const {
	Fragment,
} = wp.element;

const {
	registerBlockType,
	InnerBlocks,
} = wp.blocks;

registerBlockType( 'wsu/feature-deck', {
	title: 'Feature Deck',

	description: 'Contains a list of features to display on the home page',

	category: 'layout',

	icon: 'list-view',

	edit() {
		return (
			<Fragment key="edit">
				<div className="deck deck--hp-features">
					<InnerBlocks />
				</div>
			</Fragment>
		);
	},

	save() {
		return (
			<section className="row single gutter pad-top full features-container features-start">
				<div className="column one">
					<InnerBlocks.Content />
				</div>
			</section>
		);
	},
} );
