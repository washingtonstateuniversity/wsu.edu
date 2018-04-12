const { registerBlockType, InnerBlocks } = wp.blocks;
const blockStyle = { backgroundColor: '#fff', color: '#333', padding: '20px' };

registerBlockType( 'wsu/news-deck', {
	title: 'News Deck',

	description: 'Display a group of news cards',

	category: 'layout',

	icon: 'list-view',
	
    edit() {
		return (
			<div className="deck deck--hp-news">
				<InnerBlocks />
			</div>
		);
    },

    save() {
		return (
			<div className="feature-bar-news">
				<section className="row single hp-news-block news-feature--two">
					<div className="column one ">
						<div className="deck deck--hp-news">
							<InnerBlocks.Content />
						</div>
					</div>
				</section>
			</div>
		);
    },
} );
