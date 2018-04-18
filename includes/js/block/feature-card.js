const {
	Fragment,
} = wp.element;

const {
	registerBlockType,
	RichText,
	PlainText,
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
				
registerBlockType( 'wsu/feature-card', {
	title: 'Home page feature card',

	description: 'Add a featured card to the top of the home page',

	category: 'layout',

	icon: 'list-view',
	
	attributes: {
		headline: {
			source: 'text',
			selector: '.home-headline-head-wrapper h2'
		},
		subtitle: {
			source: 'text',
			selector: '.home-subtitle',
		},
		card_date: {
			type: 'string',
		},
		card_action_text: {
			source: 'text',
			selector: '.home-cta a',
		},
		card_action_url: {
			source: 'attribute',
			selector: '.home-cta a',
			attribute: 'href',
		},
		image_url: {
			type: 'string',
		},
		image_id: {
			type: 'number',
		},
		block_id: {
			type: 'string',
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
	} )( ( { attributes, isSelected, setAttributes, editable, setState, ...props } ) => {
		const {
			headline,
			subtitle,
			card_date,
			card_action_text,
			card_action_url,
			image_url,
			image_id,
			block_id,
		} = attributes;

		if ( ! block_id || 'no-block-id' === block_id ) {
			setAttributes( { block_id: props.id } );
		}

		const onSetActiveEditable = ( newEditable ) => () => { setState( { editable: newEditable } ); };

		const onSelectImage = ( media ) => setAttributes( { image_id: media.id, image_url: media.url } );

		const onRemoveImage = () => setAttributes( { image_id: null, image_url: '' } );

		return [
			isSelected && (
				<InspectorControls key="inspector">
					<PanelBody title="Feature card data">
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
								<img src={ image_url } />
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
						<PlainText
							placeholder="Enter URL"
							value={ card_action_url }
							onChange={ ( card_action_url ) => setAttributes( { card_action_url } ) }
						/>
						<PlainText
							placeholder="Enter card date: Feb. 12"
							value={ card_date }
							onChange={ ( card_date ) => setAttributes( { card_date } ) }
						/>
					</PanelBody>
				</InspectorControls>
			),
			<div className="card--feature home-headline headline-has-background impact-head dark position-right" style={ { backgroundImage: `url( ${ image_url } )` } } key="edit">
				<div className="feature-content-wrapper">
					<div className="feature-title-wrapper">
						<RichText
							tagName="h2"
							className="home-title"
							value={ headline }
							placeholder="Headline"
							onChange={ ( headline ) => setAttributes( { headline } ) }
						/>
						<RichText
							tagName="div"
							className="home-subtitle"
							placeholder="Subtitle"
							value={ subtitle }
							onChange={ ( subtitle ) => setAttributes( { subtitle } ) }
						/>
					</div>
					<div className="home-cta">
						<RichText
							tagName="span"
							className="editor-card-action-text"
							placeholder="Call to action"
							value={ card_action_text }
							onChange={ ( card_action_text ) => setAttributes( { card_action_text } ) }
						/>
					</div>
				</div>
			</div>
		];
    } ),

    save( { attributes } ) {
		const {
			headline,
			subtitle,
			card_date,
			card_action_text,
			card_action_url,
			image_url,
			block_id,
		} = attributes;

		let display_block_id = 'no-block-id';
		if ( block_id ) {
			display_block_id = block_id;
		}

		return (
			<div id={ display_block_id } className="wsu-home-headline-wrapper impact-head dark position-right">
				<div
					style={ { backgroundImage: `url( ${ image_url } )` } }
					className="home-headline headline-has-background"
					data-id={ display_block_id }
					data-headline={ headline }
					data-anchor={ card_action_url }
					data-date={ card_date }
					>
					<div>
						<div className="home-headline-head-wrapper">
							<h2>{ headline }</h2>
							<div className="home-subtitle">{ subtitle }</div>
						</div>
						<div className="home-cta">
							<a href={ card_action_url }>{ card_action_text }</a>
						</div>
					</div>
				</div>
			</div>
		);
    },
} );
