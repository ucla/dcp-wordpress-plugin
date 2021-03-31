/* eslint-disable no-unused-vars */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import {
	PanelBody,
	TextareaControl,
	ExternalLink,
	Button,
	ToggleControl,
} from '@wordpress/components';
import {
	InspectorControls,
	RichText,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

function attributesFromMedia( { attributes, setAttributes } ) {
	return ( media ) => {
		let mediaType;
		let src;
		// for media selections originated from a file upload.
		if ( media.media_type ) {
			if ( media.media_type === 'image' ) {
				mediaType = 'image';
			} else {
				// only images and videos are accepted so if the media_type is not an image we can assume it is a video.
				// video contain the media type of 'file' in the object returned from the rest api.
				mediaType = 'video';
			}
		} else {
			// for media selections originated from existing files in the media library.
			mediaType = media.type;
		}

		if ( mediaType === 'image' ) {
			// Try the "large" size URL, falling back to the "full" size URL below.
			src =
				media.sizes?.large?.url ||
				// eslint-disable-next-line camelcase
				media.media_details?.sizes?.large?.source_url;
		}

		setAttributes( {
			mediaAlt: media.alt,
			mediaId: media.id,
			mediaType,
			mediaUrl: src || media.url,
			focalPoint: undefined,
		} );
	};
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} [props]           Properties passed from the editor.
 * @param {Object} [props.attributes]
 * @param {string} [props.setAttributes]
 * @param {string} [props.isSelected]
 * @param {string} [props.className] Class name generated for the block.
 * @return {WPElement} Element to render.
 */
export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		mediaAlt,
		mediaType,
		mediaUrl,
		title,
		day,
		month,
		number,
		mediaId,
		location,
		time,
	} = attributes;

	const onChangeTitle = ( value ) => {
		setAttributes( { title: value } );
	};

	const onChangeDay = ( value ) => {
		setAttributes( { day: value } );
	};

	const onChangeMonth = ( value ) => {
		setAttributes( { month: value } );
	};

	const onChangeNumber = ( value ) => {
		setAttributes( { number: value } );
	};

	const onChangeLocation = ( value ) => {
		setAttributes( { location: value } );
	};

	const onChangeTime = ( value ) => {
		setAttributes( { time: value } );
	};

	const onSelectMedia = attributesFromMedia( { attributes, setAttributes } );

	const onMediaAltChange = ( newMediaAlt ) => {
		setAttributes( { mediaAlt: newMediaAlt } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Select card image', 'awp' ) }
					initialOpen={ true }
				>
					<div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectMedia }
								value={ attributes.mediaId }
								allowedTypes={ [ 'image' ] }
								render={ ( { open } ) => (
									<Button
										className={
											! attributes.mediaId
												? 'editor-post-featured-image__toggle'
												: 'editor-post-featured-image__preview'
										}
										onClick={ open }
									>
										{ ! attributes.mediaId &&
											__( 'Choose an image', 'awp' ) }
										{ mediaUrl && (
											<img
												src={ mediaUrl }
												alt={ mediaAlt }
											/>
										) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						{ attributes.mediaId && (
							<MediaUploadCheck>
								<MediaUpload
									title={ __( 'Replace image', 'awp' ) }
									value={ attributes.mediaId }
									onSelect={ onSelectMedia }
									allowedTypes={ [ 'image' ] }
									render={ ( { open } ) => (
										<Button onClick={ open } isDefault>
											{ __( 'Replace image', 'awp' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
						) }
						{ attributes.mediaId && (
							<TextareaControl
								label={ __( 'Alt text (alternative text)' ) }
								value={ mediaAlt }
								onChange={ onMediaAltChange }
								help={
									<>
										<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
											{ __(
												'Describe the purpose of the image'
											) }
										</ExternalLink>
										{ __(
											'Leave empty if the image is purely decorative.'
										) }
									</>
								}
							/>
						) }
					</div>
				</PanelBody>
			</InspectorControls>
			<article className={ className + ' event-card' }>
				<img
					className="event-card__image"
					src={
						mediaUrl ??
						'/wp-content/plugins/wp-uwai-plugin/event-card-example-1.jpg'
					}
					alt="Two children on their phones under the blankets"
				></img>
				<a className="event-card__link" href="#wee">
					<h3 className="event-card__title">
						<RichText
							tagName="span"
							value={ title }
							onChange={ onChangeTitle }
							placeholder="A cool title.."
						/>
					</h3>
				</a>
				<div className="event-card-info">
					<div className="event-card-info__date">
						<span className="small-block">
							<RichText
								tagName="span"
								value={ day }
								onChange={ onChangeDay }
								placeholder="Wed"
								className="event-card-info__day"
							/>
							<RichText
								tagName="span"
								value={ month }
								onChange={ onChangeMonth }
								placeholder="Aug"
								className="event-card-info__month"
							/>
						</span>
						<RichText
							tagName="span"
							value={ number }
							onChange={ onChangeNumber }
							placeholder="11"
							className="event-card-info__number"
						/>
					</div>
					<div className="event-card-info__time">
						<span className="event-card-icon__time"></span>
						<RichText
							tagName="span"
							value={ time }
							onChange={ onChangeTime }
							placeholder="1 p.m. PDT | 4 p.m. EDT"
							className="event-card-info__time-body"
						/>
					</div>
					<div className="event-card-info__location">
						<span className="event-card-icon__play"></span>
						<RichText
							tagName="span"
							value={ location }
							onChange={ onChangeLocation }
							placeholder="Recording Available"
							className="event-card-info__location-body"
						/>
					</div>
					<InnerBlocks />
				</div>
			</article>
		</>
	);
}
