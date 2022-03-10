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
import './style.scss';

import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
	RangeControl,
} from '@wordpress/components';
import {
	InspectorControls,
} from '@wordpress/block-editor';

// Splide
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const defaultImages = [
	"/website1/wp-content/plugins/wp-uwai-plugin/assets/upper_build.jpg",
	"/website1/wp-content/plugins/wp-uwai-plugin/assets/trees.jpg",
	"/website1/wp-content/plugins/wp-uwai-plugin/assets/kerchoff.jpg",
	"/website1/wp-content/plugins/wp-uwai-plugin/assets/cyard_overview.jpg",
	"/website1/wp-content/plugins/wp-uwai-plugin/assets/bwalk.jpg",
	"/website1/wp-content/plugins/wp-uwai-plugin/assets/bruin_store.jpg",
	"/website1/wp-content/plugins/wp-uwai-plugin/assets/big_1.jpg",
	"/website1/wp-content/plugins/wp-uwai-plugin/assets/bear.jpg",
]

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
	clientId,
	className,
}) {

	let {
		sliderId,
		titleVisible,
		titleText,
		autoplay,
		autoplayInterval,
		captionColor,
		captionSize,
		numSlides,
		slideList,
	} = attributes;

	if (!sliderId) {
		setAttributes({sliderId: `ucla-slider-${clientId}`});
	}

	// const onSelectMedia = attributesFromMedia( { attributes, setAttributes } );

	// const onMediaAltChange = ( newMediaAlt ) => {
	// 	setAttributes( { mediaAlt: newMediaAlt } );
	// };

	const setNumSlides = (value) => {
		setAttributes({numSlides: value});
	}

	const setLink = (value, index) => {
		const newSlides = slideList.slice();
		newSlides[index].link = value;
		setAttributes({slideList: newSlides});
	}

	const setAlt = (value, index) => {
		const newSlides = slideList.slice();
		newSlides[index].alt = value;
		setAttributes({slideList: newSlides});
	}

	const setCaption = (value, index) => {
		const newSlides = slideList.slice();
		newSlides[index].caption = value;
		setAttributes({slideList: newSlides});
	}

	const setCaptionLocation = (value, index) => {
		const newSlides = slideList.slice();
		newSlides[index].captionLocation = value;
		setAttributes({slideList: newSlides});
	}

	// const setSlideMedia = (value, index) => {
	// 	const newSlides = slideList.slice();
	// 	newSlides[index].original = value;
	// 	newSlides[index].thumbnail = value;
	// 	setAttributes({slideList: newSlides});
	// }

	// const setOriginalAlt = (value, index) => {
	// 	const newSlides = slideList.slice();
	// 	newSlides[index].originalAlt = value;
	// 	setAttributes({slideList: newSlides});
	// }

	const setTitleVisible = (value) => {
		if (value) {
			const newSlides = slideList.slice();
			for (var i = 0; i < newSlides.length; i++) {
				if (newSlides[i].captionLocation == "caption-top-left" ||
						newSlides[i].captionLocation == "caption-top-center" ||
						newSlides[i].captionLocation == "caption-top-right")
					newSlides[i].captionLocation = "caption-bottom-right";
			}
			setAttributes({slideList: newSlides});
		}
		setAttributes({titleVisible: value});
	}

	const setTitleText = (value) => {
		setAttributes({titleText: value});
	}

	const setCaptionColor = (value) => {
		setAttributes({captionColor: value});
	}

	const setCaptionSize = (value) => {
		setAttributes({captionSize: value});
	}

	const setAutoplay = (value) => {
		setAttributes({autoplay: value});
	}

	const setAutoplayInterval = (value) => {
		var num = value;
		if (isNaN(value) || value < 5) {
			num = 5;
		}
		setAttributes({autoplayInterval: num});
	}

	return (
		<>
	 		<InspectorControls>
	 			<PanelBody title={ __( 'Title' ) }>
	 				<ToggleControl
						label={ __( 'Visible' ) }
						onChange={setTitleVisible}
						checked={titleVisible}
						help='Turning on title will move any captions near top of image to bottom.'
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
					<RangeControl
						label="Number of slides"
						value={Number(numSlides)}
						onChange={setNumSlides}
						min={2}
						max={8}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Caption Styling' ) }>
					<SelectControl
						label="Caption Color"
						value={captionColor}
						options={[
							{label: 'Blue on yellow', value: 'caption-blue-on-yellow'},
							{label: 'Yellow on blue', value: 'caption-yellow-on-blue'},
							{label: 'White on blue', value: 'caption-white-on-blue'},
							{label: 'White on light blue', value: 'caption-white-on-lightblue'},
							{label: 'Blue on white', value: 'caption-blue-on-white'},
							{label: 'White on dark', value: 'caption-white-on-dark'},
							{label: 'Black on white', value: 'caption-black-on-white'},
						]}
						onChange={setCaptionColor}
					/>
					<SelectControl
						label="Caption Size"
						value={captionSize}
						options={[
							{label: 'Small', value: 'caption-small'},
							{label: 'Medium', value: 'caption-medium'},
							{label: 'Large', value: 'caption-large'},
						]}
						onChange={setCaptionSize}
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
								label={__('Alt text')}
								value={slide.alt}
								onChange={(value) => setAlt(value, index)}
							/>
							<TextControl
								label={__('Caption')}
								value={slide.caption}
								onChange={(value) => setCaption(value, index)}
							/>
							<SelectControl
								label="Caption Location"
								value={slide.captionLocation}
								options={
									titleVisible ?
										[ {label: 'Top left', value: 'caption-top-left'},
											{label: 'Top center', value: 'caption-top-center'},
											{label: 'Top right', value: 'caption-top-right'},
										] : [
											{label: 'Top left', value: 'caption-top-left'},
											{label: 'Top center', value: 'caption-top-center'},
											{label: 'Top right', value: 'caption-top-right'},
											{label: 'Bottom left', value: 'caption-bottom-left'},
											{label: 'Bottom center', value: 'caption-bottom-center'},
											{label: 'Bottom right', value: 'caption-bottom-right'},
										]
								}
								onChange={(value) => setCaptionLocation(value, index)}
							/>
							<TextControl
								label={__('Link URL')}
								value={slide.link}
								onChange={(value) => setLink(value, index)}
								help="When linking to an external site, be sure to use 'https://'"
							/>
						</PanelBody>
					);
				})}
	 			<PanelBody title={ __( 'Autoplay' ) }>
	 				<ToggleControl
						label={ __( 'Autoplay active' ) }
						onChange={setAutoplay}
						checked={autoplay}
					/>
					{autoplay ?
						<TextControl
							label={__('Slide delay (seconds)')}
							value={autoplayInterval}
							onChange={setAutoplayInterval}
							help='Must be at least 5 seconds long.'
						/>
					: null}
				</PanelBody>
			</InspectorControls>
			<article className={className}>
				<img
					src='/website1/wp-content/plugins/wp-uwai-plugin/molecule.png'
					className={`title-image ${titleVisible ? "" : "hidden"}`}
				/>
				<h1 className={`title-text ${titleVisible ? "" : "hidden"}`}>
					{titleText.split(" ").map((word) =>
						<span className='title-word'>
							{word}
						</span>
					)}
				</h1>
				{/* {autoplay ?
					<img
						src={isPlay ? '/website1/wp-content/plugins/wp-uwai-plugin/pause_button.png' : '/website1/wp-content/plugins/wp-uwai-plugin/pause_button.png'}
						style={{width: '30px', height: '30px', position: 'absolute', left: '30px', top: '555px', zIndex: "30", cursor: 'pointer'}}
						onClick={togglePlay}
					/>
				: null}		 */}
				<Splide
				  options={ {
						type: 'loop',
						autoplay: autoplay,
						interval: String(Number(autoplayInterval) * 1000),
						width: '100%',
						height: '80vh',
						// fixedWidth: 100,
						// fixedHeight: 60,
						// gap        : 10,
						// rewind     : true,
						// pagination : false,
						// cover: true,
					} }
					hasAutoplayControls
				>
					{slideList.map((slide, index) => {
						if (index >= numSlides)
							return null;
						return (
							<SplideSlide>
								<div className="splide__slide__container">
									{slide.link === "" ?
										<img
											src={defaultImages[index]}
											alt={slide.alt}
											className="splide-image"
										/>
									:
										<a href={slide.link} target="_blank">
											<img
												src={defaultImages[index]}
												alt={slide.alt}
												className="splide-image"
											/>
										</a>
									}
								</div>
								<p className={`splide-caption ${captionSize} ${slide.captionLocation} ${captionColor}`}>
									{slide.caption}
								</p>
							</SplideSlide>
						);
					})}
				</Splide>
					{/* <div class="splide__arrows">
						<button class="splide__arrow splide__arrow--prev">
						</button>
						<button class="splide__arrow splide__arrow--next">
						</button>
					</div>
					<div class="splide__autoplay">
						<button class="splide__play">Play</button>
						<button class="splide__pause">Pause</button>
					</div> */}
			</article>
		</>
	);

}
