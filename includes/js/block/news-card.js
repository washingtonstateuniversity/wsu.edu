const {
	Fragment,
} = wp.element;

const {
	registerBlockType,
	RichText,
	ImagePlaceholder,
	BlockControls,
	InspectorControls,
	MediaUpload,
} = wp.blocks;

const {
	TextControl,
	TextareaControl,
	withState,
	Toolbar,
	IconButton,
	PanelBody,
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
			type: 'array',
			source: 'children',
			selector: 'header',
		},
		image_url: {
			type: 'string',
		},
		image_alt: {
			type: 'string',
		},
		image_id: {
			type: 'number',
		},
	},

	/**
	 * Append additional attributes to the wrapper component in the editor
	 * when this block is used.
	 *
	 * @param {*} attributes 
	 */
	getEditWrapperProps( attributes ) {
		const { image_url } = attributes;

		if ( image_url ) {
			return { 'data-imageurl': 'yes' };
		}
	},

    edit: withState( {
		editable: 'content',
	} )( ( { attributes, isSelected, setAttributes, editable, setState } ) => {
		const { content, category, title, image_id, image_url, image_alt } = attributes;

		const onSetActiveEditable = ( newEditable ) => () => { setState( { editable: newEditable } ); };

		const className = image_url ? "editor-card card--news card--has-image" : "editor-card card--news";

		const onSelectImage = ( media ) => setAttributes( { image_id: media.id, image_url: media.url, image_alt: media.alt } );

		const onRemoveImage = () => setAttributes( { image_id: null, image_url: '', image_alt: '' } );

		return [
			isSelected && (
				<InspectorControls key="inspector">
					<PanelBody title="News card image" className="blocks-font-size">
						{ image_url ? (
							<Fragment>
								<Toolbar>
									<MediaUpload
										onSelect={ onSelectImage }
										type="image"
										value={ image_id }
										render={ ( { open } ) => (
											<div>
												<IconButton
													className="components-toolbar__control"
													label="Edit image"
													icon="edit"
													onClick={ open }
												/>
												<IconButton
													icon="no-alt"
													onClick={ onRemoveImage }
													className="blocks-gallery-image__remove"
													label="Remove image"
												/>
											</div>
										) }
									/>
								</Toolbar>
								<img src={ image_url } alt={ image_alt } />
								<p><strong>Alt text:</strong> {image_alt }</p>
							</Fragment>
						) : (
							""
						) }
						<ImagePlaceholder
							key="card-image"
							icon="format-image"
							label="Image"
							onFocus={ onSetActiveEditable( 'image' ) }
							onSelectImage={ onSelectImage }
						/>
					</PanelBody>
				</InspectorControls>
			),
			<article className={ className }>
				<RichText
					tagname="p"
					className="card-category"
					placeholder="Article category descriptor"
					onFocus={ onSetActiveEditable( 'category' ) }
					value={ category }
					onChange={ ( category ) => setAttributes( { category } ) }
				/>
				{ image_url ? (
					<img src={ image_url } alt={ image_alt } />
				) : (
					""
				) }
				<RichText
					tagname="header"
					className="card-title"
					placeholder="News article title"
					formattingControls={ [ 'link' ] }
					isSelected={ isSelected && editable === 'title' }
					onFocus={ onSetActiveEditable( 'title' ) }
					value={ title }
					onChange={ ( title ) => setAttributes( { title } ) }
				/>
				<RichText
					tagName="p"
					className="card-excerpt"
					placeholder="News article excerpt"
					onFocus={ onSetActiveEditable( 'excerpt' ) }
					value={ content }
					onChange={ ( content ) => setAttributes( { content } ) }
				/>
			</article>
		];
    } ),

    save( { attributes } ) {
		const { content, category, title, image_url, image_alt } = attributes;

		const className = image_url ? "card card--news card--has-image" : "card card--news";

		const imageHTML = image_url ? <img className="card-image" src={ image_url } alt={ image_alt } /> : "";

		return (
			<article className={ className }>
				<header className="card-title">{ title }</header>
				<p className="card-excerpt">{content }</p>
				<p className="card-category">{ category }</p>
				{ imageHTML }
		  	</article>
		);
    },
} );
