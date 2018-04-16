const {
	Fragment,
} = wp.element;

const { registerBlockType, InnerBlocks } = wp.blocks;
const blockStyle = { backgroundColor: '#fff', color: '#333', padding: '20px' };

registerBlockType( 'wsu/news-deck', {
	title: 'News Deck',

	description: 'Display a group of news cards',

	category: 'layout',

	icon: 'list-view',
	
    edit() {
		return (
			<Fragment>
				<div className="deck deck--hp-news">
					<InnerBlocks />
				</div>
				<p class="hp-news-link-wrap"><a class="hp-news-link" href="https://news.wsu.edu">news.wsu.edu</a></p>
			</Fragment>
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
						<p class="hp-news-link-wrap"><a class="hp-news-link" href="https://news.wsu.edu">news.wsu.edu</a></p>
					</div>
				</section>
			</div>
		);
    },
} );
