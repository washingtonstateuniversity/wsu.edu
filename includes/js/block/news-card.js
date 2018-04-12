const { Fragment } = wp.element;
const { registerBlockType, RichText, UrlInput, source } = wp.blocks;
const {
    TextControl,
} = wp.components;

registerBlockType( 'wsu/news-card', {
	title: 'News Card',

	description: 'Configure a set of featured news items',

	category: 'layout',

	icon: 'list-view',
	
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: '.card-excerpt',
		},
		category: {
			type: 'array',
			source: 'children',
			selector: '.card-category',
		},
		title: {
			type: 'string',
			source: 'text',
			selector: 'a',
		},
		url: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: 'a',
		},
	},

    edit( { attributes, isSelected, setAttributes } ) {
		const { content, category, title, url } = attributes;

		function onChangeContent( newContent ) {
			setAttributes( { content: newContent } );
		}

		function onChangeCategory( newCategory ) {
			setAttributes( { category: newCategory } );
		}

		return (
			isSelected ? (
				<Fragment>
					<TextControl
						label="Category"
						value={ category }
						onChange={ category => setAttributes( { category } ) }
					/>
					<TextControl
						label="Title"
						value={ title }
						onChange={ title => setAttributes( { title } ) }
					/>
					<TextControl
						label="URL"
						value={ url }
						onChange={ url => setAttributes( { url } ) }
					/>
					<TextControl
						label="Description"
						value={ content }
						onChange={ content => setAttributes( { content } ) }
					/>
				</Fragment>
			) : (
				<article className="editor-card card--news card--has-image">
					<header className="card-title"><a href={ url }>{ title }</a></header>
					<p className="card-excerpt">{content }</p>
					<p className="card-category">{ category }</p>
					<img className="card-image" src="https://s3.wp.wsu.edu/uploads/sites/625/2018/01/Andre-Denis-Girard-Wright-wsu.jpg" alt="André-Denis Girard Wright" />
				</article>
			)
		);
    },

    save( { attributes } ) {
		const { content, category, title, url } = attributes;

		return (
			<article className="card card--news card--has-image">
				<header className="card-title"><a href={ url }>{ title }</a></header>
				<p className="card-excerpt">{content }</p>
				<p className="card-category">{ category }</p>
				<img className="card-image" src="https://s3.wp.wsu.edu/uploads/sites/625/2018/01/Andre-Denis-Girard-Wright-wsu.jpg" alt="André-Denis Girard Wright" />
		  	</article>
		);
    },
} );
