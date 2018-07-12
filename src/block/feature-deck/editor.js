const {
	Fragment,
} = wp.element;

const {
	registerBlockType,
} = wp.blocks;

const {
	InnerBlocks,
} = wp.editor;

registerBlockType( 'wsu/feature-deck', {
	title: 'Feature Deck',

	description: 'Contains a list of features to display on the home page',

	category: 'layout',

	icon: 'list-view',

	edit() {
		return (
			<Fragment key="edit">
				<div className="deck deck--feature">
					<InnerBlocks />
				</div>
			</Fragment>
		);
	},

	save() {
		return (
			<section className="row single gutter pad-top full features-container features-start">
				<div className="column one deck deck--feature">
					<InnerBlocks.Content />
				</div>
			</section>
		);
	},
} );
