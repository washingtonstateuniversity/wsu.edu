const {
	Fragment,
} = wp.element;

const {
	registerBlockType,
	RichText,
} = wp.blocks;

const {
	TextControl,
	TextareaControl,
	withState,
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

    edit: withState( {
		editable: 'content',
	} )( ( { attributes, isSelected, setAttributes, editable, setState } ) => {
		const { content, category, title, url } = attributes;

		const onSetActiveEditable = ( newEditable ) => () => {
			setState( { editable: newEditable } );
		};

		function onChangeContent( newContent ) {
			setAttributes( { content: newContent } );
		}

		function onChangeCategory( newCategory ) {
			setAttributes( { category: newCategory } );
		}

		return (
			<article className="editor-card card--news card--has-image">
				<RichText
					tagname="header"
					className="card-title"
					placeholder="News article title"
					formattingControls={ [ 'link' ] }
					isSelected={ isSelected && editable === 'title' }
					onFocus={ onSetActiveEditable( 'title' ) }
					value={ title }
					onChange={ ( content ) => setAttributes( { title } ) }
				/>
				<RichText
					tagName="p"
					className="card-excerpt"
					placeholder="News article excerpt"
					onFocus={ onSetActiveEditable( 'excerpt' ) }
					value={ content }
					onChange={ ( content ) => setAttributes( { content } ) }
				/>
				<RichText
					tagname="p"
					className="card-category"
					placeholder="Article category descriptor"
					onFocus={ onSetActiveEditable( 'category' ) }
					value={ category }
					onChange={ ( category ) => setAttributes( { category } ) }
				/>
				<img className="card-image" src="https://s3.wp.wsu.edu/uploads/sites/625/2018/01/Andre-Denis-Girard-Wright-wsu.jpg" alt="André-Denis Girard Wright" />
			</article>
		);
    } ),

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
