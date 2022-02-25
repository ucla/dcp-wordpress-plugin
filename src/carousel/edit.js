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
import '../../node_modules/react-image-gallery/styles/scss/image-gallery.scss';

import ImageGallery from 'react-image-gallery';
import {
	PanelBody,
	TextareaControl,
	ExternalLink,
	Button,
	ToggleControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import {
	InspectorControls,
	RichText,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

const BLUE = "#003B5C";
const LIGHTBLUE = "#005587";
const YELLOW = "#FFD100";
const WHITE = "#FFFFFF";
const BLACK = "#000000";

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
export default function Edit({
	attributes,
	setAttributes,
	isSelected,
	className,
}) {

	let {
		titleVisible,
		titleText,
		thumbnail,
		thumbnailPos,
		autoplay,
		autoplayInterval,
		fullscreen,
		captionColor,
		captionLocation,
		captionSize,
		numSlides,
		slideList,
	} = attributes;

	const handleLink = (index) => {
		const link = slideList[index].link;
		if (link != "") window.open(link, "_blank");
	}

	const onSelectMedia = attributesFromMedia( { attributes, setAttributes } );

	const onMediaAltChange = ( newMediaAlt ) => {
		setAttributes( { mediaAlt: newMediaAlt } );
	};

	const setNumSlides = (value) => {
		setAttributes({numSlides: value});
	}

	const setSlideDescription = (value, index) => {
		const newSlides = slideList.slice();
		newSlides[index].description = value;
		setAttributes({slideList: newSlides});
	}

	const setSlideMedia = (value, index) => {
		const newSlides = slideList.slice();
		newSlides[index].original = value;
		newSlides[index].thumbnail = value;
		setAttributes({slideList: newSlides});
	}

	const setOriginalAlt = (value, index) => {
		const newSlides = slideList.slice();
		newSlides[index].originalAlt = value;
		setAttributes({slideList: newSlides});
	}

	const setSlideLink = (value, index) => {
		const newSlides = slideList.slice();
		newSlides[index].link = value;
		setAttributes({slideList: newSlides});
	}

	const onToggleAutoplay = (value) => {
		setAttributes({autoplay: value});
	}

	const setAutoplayInterval = (value) => {
		var num = value;
		if (isNaN(value) || value < 5) {
			num = 5;
		}
		setAttributes({autoplayInterval: num});
	}

	const onToggleThumbnail = (value) => {
		setAttributes({thumbnail: value});
	}

	const setThumbnailPos = (value) => {
		setAttributes({thumbnailPos: value});
	}

	const onToggleFullscreen = (value) => {
		setAttributes({fullscreen: value});
	}

	const setTitleVisible = (value) => {
		if (value && (captionLocation == "Top left" ||
				captionLocation == "Top center" || captionLocation == "Top right")) {
			var captions = document.getElementsByClassName("image-gallery-description");
			for (var k in captions) {
				if (captions[k] && captions[k]['style']) {
					captions[k]['style']['top'] = "initial";
					captions[k]['style']['bottom'] = "70px";
					captions[k]['style']['left'] = "initial";
					captions[k]['style']['right'] = "0%";
				}
			}
			setAttributes({captionLocation: "Bottom right", titleVisible: value});
		} else {
			setAttributes({titleVisible: value});
		}
	}

	const setTitleText = (value) => {
		setAttributes({titleText: value});
	}

	const onChangeCaptionColor = (value) => {
		var captions = document.getElementsByClassName("image-gallery-description");
		var textColor = "";
		var backgroundColor = "";
		switch (value) {
			case "Blue on yellow":
				textColor = BLUE;
				backgroundColor = YELLOW;
				break;
			case "Yellow on blue":
				textColor = YELLOW;
				backgroundColor = BLUE;
				break;
			case "White on blue":
				textColor = WHITE;
				backgroundColor = BLUE;
				break;
			case "White on light blue":
				textColor = WHITE;
				backgroundColor = LIGHTBLUE;
				break;
			case "White on dark":
				textColor = WHITE;
				backgroundColor = "rgba(0, 0, 0, 0.6)";
				break;
			case "Black on white":
				textColor = BLACK;
				backgroundColor = WHITE;
				break;
			case "Blue on white":
				textColor = LIGHTBLUE;
				backgroundColor = WHITE;
				break;
		}
		for (var k in captions) {
			if (captions[k] && captions[k]['style']) {
				captions[k]['style']['color'] = textColor;
				captions[k]['style']['backgroundColor'] = backgroundColor;
			}
		}
		setAttributes({captionColor: value});
	}

	const onChangeCaptionLocation = (value) => {
		var captions = document.getElementsByClassName("image-gallery-description");

		switch (value) {
			case 'Top left':
				for (var k in captions) {
					if (captions[k] && captions[k]['style']) {
						captions[k]['style']['top'] = "70px";
						captions[k]['style']['bottom'] = "initial";
						captions[k]['style']['left'] = "0%";
						captions[k]['style']['right'] = "initial";
						captions[k]['style']['position'] = "absolute";
						captions[k]['style']['textAlign'] = "initial";
					}
				}
				break;
			case 'Top center':
				for (var k in captions) {
					if (captions[k] && captions[k]['style']) {
						captions[k]['style']['top'] = "15px";
						captions[k]['style']['bottom'] = "initial";
						// captions[k]['style']['left'] = "44%";
						// captions[k]['style']['right'] = "initial";
						captions[k]['style']['left'] = "initial";
						captions[k]['style']['right'] = "initial";
						// captions[k]['style']['position'] = "relative";
						captions[k]['style']['textAlign'] = "center";
					}
				}
				break;
			case 'Top right':
				for (var k in captions) {
					if (captions[k] && captions[k]['style']) {
						captions[k]['style']['top'] = "70px";
						captions[k]['style']['bottom'] = "initial";
						captions[k]['style']['left'] = "initial";
						captions[k]['style']['right'] = "0%";
						captions[k]['style']['position'] = "absolute";
						captions[k]['style']['textAlign'] = "initial";
					}
				}
				break;
			case 'Bottom left':
				for (var k in captions) {
					if (captions[k] && captions[k]['style']) {
						captions[k]['style']['top'] = "initial";
						captions[k]['style']['bottom'] = "70px";
						captions[k]['style']['left'] = "0%";
						captions[k]['style']['right'] = "initial";
						captions[k]['style']['position'] = "absolute";
						captions[k]['style']['textAlign'] = "initial";
					}
				}
				break;
			case 'Bottom center':
				for (var k in captions) {
					if (captions[k] && captions[k]['style']) {
						captions[k]['style']['top'] = "initial";
						captions[k]['style']['bottom'] = "70px";
						captions[k]['style']['left'] = "0%";
						captions[k]['style']['right'] = "initial";
						captions[k]['style']['position'] = "absolute";
						captions[k]['style']['textAlign'] = "center";
					}
				}
				break;
			case 'Bottom right':
				for (var k in captions) {
					if (captions[k] && captions[k]['style']) {
						captions[k]['style']['top'] = "initial";
						captions[k]['style']['bottom'] = "70px";
						captions[k]['style']['left'] = "initial";
						captions[k]['style']['right'] = "0%";
						captions[k]['style']['position'] = "absolute";
						captions[k]['style']['textAlign'] = "initial";
					}
				}
				break;
		}
		setAttributes({captionLocation: value});
	}

	const onChangeCaptionSize = (value) => {
		var captions = document.getElementsByClassName("image-gallery-description");
		for (var k in captions) {
			if (captions[k] && captions[k]['style']) {
				captions[k]['style']['fontSize'] = value;
			}
		}
		setAttributes({captionSize: value});
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Title' ) }>
					<ToggleControl
						label={ __( 'Visible' ) }
						onChange={setTitleVisible}
						checked={titleVisible}
					/>
					{titleVisible ?
						<TextControl
							label={__('Text')}
							value={titleText}
							onChange={setTitleText}
						/> : null
					}
				</PanelBody>
				<PanelBody title={ __( 'Slide Number' ) }>
					<SelectControl
						label="Number of slides"
						value={numSlides}
						options={[
							{label: '2', value: '2'},
							{label: '3', value: '3'},
							{label: '4', value: '4'},
							{label: '5', value: '5'},
							{label: '6', value: '6'},
							{label: '7', value: '7'},
							{label: '8', value: '8'},
						]}
						onChange={setNumSlides}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Caption Styling' ) }>
					<SelectControl
						label="Caption Color"
						value={captionColor}
						options={[
							{label: 'Blue on yellow', value: 'Blue on yellow'},
							{label: 'Yellow on blue', value: 'Yellow on blue'},
							{label: 'White on blue', value: 'White on blue'},
							{label: 'White on light blue', value: 'White on light blue'},
							{label: 'Blue on white', value: 'Blue on white'},
							{label: 'White on dark', value: 'White on dark'},
							{label: 'Black on white', value: 'Black on white'},
						]}
						onChange={onChangeCaptionColor}
					/>
					<SelectControl
						label="Caption Location"
						value={captionLocation}
						options={
							titleVisible ?
								[ {label: 'Bottom left', value: 'Bottom left'},
									{label: 'Bottom center', value: 'Bottom center'},
									{label: 'Bottom right', value: 'Bottom right'},
								] : [
									{label: 'Top left', value: 'Top left'},
									{label: 'Top center', value: 'Top center'},
									{label: 'Top right', value: 'Top right'},
									{label: 'Bottom left', value: 'Bottom left'},
									{label: 'Bottom center', value: 'Bottom center'},
									{label: 'Bottom right', value: 'Bottom right'},
								]
						}
						onChange={onChangeCaptionLocation}
					/>
					<SelectControl
						label="Caption Size"
						value={captionSize}
						options={[
							{label: 'Small', value: '14px'},
							{label: 'Medium', value: '22px'},
							{label: 'Large', value: '30px'},
						]}
						onChange={onChangeCaptionSize}
					/>
				</PanelBody>
				{slideList.map((slide, index) => {
					if (Number(numSlides) <= index)
						return null;
					return (
						<PanelBody title={__( 'Slide ' + String(index + 1))}>
							{/* <div className="editor-post-featured-image">
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
							</div> */}
							<TextControl
								label={__('Description')}
								value={slide.description}
								onChange={(value) => setSlideDescription(value, index)}
							/>
							<TextControl
								label={__('Link URL')}
								value={slide.link}
								onChange={(value) => setSlideLink(value, index)}
							/>
						</PanelBody>
					);
				})}
				<PanelBody title={ __( 'Autoplay' ) }>
					<ToggleControl
						label={ __( 'Autoplay active' ) }
						onChange={onToggleAutoplay}
						checked={autoplay}
					/>
					{autoplay ?
						<TextControl
							label={__('Slide delay (seconds)')}
							value={autoplayInterval}
							onChange={setAutoplayInterval}
						/>
					: null}
				</PanelBody>
				<PanelBody title={ __( 'Image Thumbnails' ) }>
					<ToggleControl
						label={ __( 'Show thumbnail bar' ) }
						onChange={onToggleThumbnail}
						checked={thumbnail}
					/>
					{thumbnail ?
						<SelectControl
							label="Thumbnail position"
							value={thumbnailPos}
							options={[
								{label: 'Top', value: 'top'},
								{label: 'Right', value: 'right'},
								{label: 'Bottom', value: 'bottom'},
								{label: 'Left', value: 'left'},
							]}
							onChange={setThumbnailPos}
						/>
					: null}
				</PanelBody>
				<PanelBody title={ __( 'Fullscreen' ) }>
					<ToggleControl
						label={ __( 'Allow fullscreen option' ) }
						onChange={onToggleFullscreen}
						checked={fullscreen}
					/>
				</PanelBody>
			</InspectorControls>
			<article>
				<img
					src='/website1/wp-content/plugins/wp-uwai-plugin/molecule.png'
					style={{
						position: "absolute",
            left: "-50px",
            top: "30px",
            zIndex: "1",
						visibility: titleVisible ? "" : "hidden" 
					}}
				/>
				<h1 style={{
						position: "absolute",
            left: "20px",
            top: "20px",
						fontSize: "44px",
						color: "white",
            zIndex: "1",
						padding: "4px",
						visibility: titleVisible ? "" : "hidden",
						maxWidth: "540px",
						textTransform: "uppercase",
						lineHeight: "60px"
					}}
				>
					{titleText.split(" ").map((word) =>
						<span style={{
							marginTop: "2px",
							marginBottom: "2px",
							marginLeft: "-8px",
							marginRight: "-8px",
							paddingLeft: "16px",
							paddingRight: "16px",
							backgroundColor: "#2774AE",
							display: "inline-block"
						}}>{word}</span>)
					}
				</h1>
				<div style={{zIndex: "-1"}}>
					<ImageGallery
						items={
							[
								{
									original: 'https://picsum.photos/id/1018/1000/600/',
									thumbnail: 'https://picsum.photos/id/1018/250/150/',
								},
								{
									original: 'https://picsum.photos/id/1015/1000/600/',
									thumbnail: 'https://picsum.photos/id/1015/250/150/',
								},
								{
									original: 'https://picsum.photos/id/1019/1000/600/',
									thumbnail: 'https://picsum.photos/id/1019/250/150/',
								},
							]
							// slideList.slice(0, numSlides)
						}
						showBullets={true}
						// onClick={(e) => console.log(e)}
						// onMouseOver={(e) => console.log(e)}
						showThumbnails={thumbnail}
						thumbnailPosition={thumbnailPos}
						showPlayButton={autoplay}
						autoPlay={autoplay}
						slideInterval={autoplayInterval*1000}
						showFullscreenButton={fullscreen}
					/>
				</div>
			</article>
		</>
	);
}
