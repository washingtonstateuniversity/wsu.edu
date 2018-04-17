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
				
registerBlockType( 'wsu/feature-card', {
	title: 'Home page feature card',

	description: 'Add a featured card to the top of the home page',

	category: 'layout',

	icon: 'list-view',
	
	attributes: {
		headline: {
			source: 'text',
			selector: 'h2'
		},
		subtitle: {
			source: 'text',
			selector: '.home-subtitle',
		},
		cta: {
			source: 'text',
			selector: '.home-cta a',
		},
		image_url: {
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
		const {
			headline,
			subtitle,
			cta,
			image_url,
			image_id,
		} = attributes;

		const onSetActiveEditable = ( newEditable ) => () => { setState( { editable: newEditable } ); };

		const onSelectImage = ( media ) => setAttributes( { image_id: media.id, image_url: media.url } );

		const onRemoveImage = () => setAttributes( { image_id: null, image_url: '' } );

		return [
			isSelected && (
				<InspectorControls key="inspector">
					<PanelBody title="Featured story image">
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
					</PanelBody>
				</InspectorControls>
			),
			<div className="card--feature home-headline headline-has-background impact-head dark position-right" style={ { backgroundImage: `url( ${ image_url } )` } } key="edit">
				<div className="feature-content-wrapper">
					<div className="home-headline-head-wrapper">
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
					<RichText
						tagName="div"
						className="home-cta"
						placeholder="Call to action"
						value={ cta }
						onChange={ ( cta ) => setAttributes( { cta } ) }
					/>
				</div>
			</div>
		];
    } ),

    save( { attributes } ) {
		const {
			headline,
			subtitle,
			cta,
			image_url,
		} = attributes;

		return (
			<div id="5ad511988632d" className="wsu-home-headline-wrapper impact-head dark position-right">
				<div style={ { backgroundImage: `url( ${ image_url } )` } } className="home-headline headline-has-background " data-id="5ad511988632d" data-headline="Ancient glass, modern problem" data-anchor="https://magazine.wsu.edu/2018/02/02/fires-burned-cauldrons-bubble/" data-date="Feb. 27">
					<div>
						<div className="home-headline-head-wrapper">
							<h2>{ headline }</h2>
							<div className="home-subtitle">{ subtitle }</div>
						</div>
						<div className="home-cta">
							<a href="https://magazine.wsu.edu/2018/02/02/fires-burned-cauldrons-bubble/">{ cta }</a>
						</div>
					</div>
				</div>
			</div>
		);
    },
} );
