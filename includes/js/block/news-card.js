const {
	Fragment,
} = wp.element;

const {
	registerBlockType,
	RichText,
	ImagePlaceholder,
	BlockControls,
	MediaUpload,
} = wp.blocks;

const {
	TextControl,
	TextareaControl,
	withState,
	Toolbar,
	IconButton,
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

    edit: withState( {
		editable: 'content',
	} )( ( { attributes, isSelected, setAttributes, editable, setState } ) => {
		const { content, category, title, image_id, image_url, image_alt } = attributes;

		const onSetActiveEditable = ( newEditable ) => () => {
			setState( { editable: newEditable } );
		};

		function onChangeContent( newContent ) {
			setAttributes( { content: newContent } );
		}

		function onChangeCategory( newCategory ) {
			setAttributes( { category: newCategory } );
		}

		const onSelectImage = ( media ) => setAttributes( { image_id: media.id, image_url: media.url, image_alt: media.alt } );

		const onRemoveImage = () => setAttributes( { image_id: null, image_url: '', image_alt: '' } );

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
				<RichText
					tagname="p"
					className="card-category"
					placeholder="Article category descriptor"
					onFocus={ onSetActiveEditable( 'category' ) }
					value={ category }
					onChange={ ( category ) => setAttributes( { category } ) }
				/>
				{ ! image_url ? (
					<ImagePlaceholder
						key="card-image"
						icon="format-image"
						label="Image"
						onFocus={ onSetActiveEditable( 'image' ) }
						onSelectImage={ onSelectImage }
					/>
				) : (
					<div>
						<BlockControls key="controls">
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
						</BlockControls>
						<img src={ image_url } alt={ image_alt } />
					</div>
				) }
			</article>
		);
    } ),

    save( { attributes } ) {
		const { content, category, title, image_url, image_alt } = attributes;

		return (
			<article className="card card--news card--has-image">
				<header className="card-title">{ title }</header>
				<p className="card-excerpt">{content }</p>
				<p className="card-category">{ category }</p>
				<img className="card-image" src={ image_url } alt={ image_alt } />
		  	</article>
		);
    },
} );
