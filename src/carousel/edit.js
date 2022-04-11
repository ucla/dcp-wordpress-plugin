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
import './editor.scss';

import {useEffect} from 'react';

import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextareaControl,
	ExternalLink,
	TextControl,
	RangeControl,
	Button,
} from '@wordpress/components';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

// Splide
// import Splide from '@splidejs/splide';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const defaultImages = [
	"../wp-content/plugins/wp-uwai-plugin/assets/upper_build.jpg",
	"../wp-content/plugins/wp-uwai-plugin/assets/trees.jpg",
	"../wp-content/plugins/wp-uwai-plugin/assets/kerchoff.jpg",
	"../wp-content/plugins/wp-uwai-plugin/assets/cyard_overview.jpg",
	"../wp-content/plugins/wp-uwai-plugin/assets/bwalk.jpg",
	"../wp-content/plugins/wp-uwai-plugin/assets/bruin_store.jpg",
	"../wp-content/plugins/wp-uwai-plugin/assets/big_1.jpg",
	"../wp-content/plugins/wp-uwai-plugin/assets/bear.jpg",
]

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
		thumbnailSlider,
		captionColor,
		captionSize,
		arrowsLocation,
		bulletsLocation,
		pauseLocation,
		numSlides,
		slideList,
		imageUrl0,
		imageAlt0,
		imageUrl1,
		imageAlt1,
		imageUrl2,
		imageAlt2,
		imageUrl3,
		imageAlt3,
		imageUrl4,
		imageAlt4,
		imageUrl5,
		imageAlt5,
		imageUrl6,
		imageAlt6,
		imageUrl7,
		imageAlt7,
	} = attributes;

	const onSelectMedia = (index, media) => {
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

		const newSlides = attributes.slideList.slice();
		newSlides[index].mediaId = media.id;
		newSlides[index].mediaType = mediaType;

		switch (index) {
			case 0:
				setAttributes({
					imageUrl0: src || media.url,
					imageAlt0: media.alt,
					slideList: newSlides,
				});
				break;
			case 1:
				setAttributes({
					imageUrl1: src || media.url,
					imageAlt1: media.alt,
					slideList: newSlides,
				});
				break;
			case 2:
				setAttributes({
					imageUrl2: src || media.url,
					imageAlt2: media.alt,
					slideList: newSlides,
				});
				break;
			case 3:
				setAttributes({
					imageUrl3: src || media.url,
					imageAlt3: media.alt,
					slideList: newSlides,
				});
				break;
			case 4:
				setAttributes({
					imageUrl4: src || media.url,
					imageAlt4: media.alt,
					slideList: newSlides,
				});
				break;
			case 5:
				setAttributes({
					imageUrl5: src || media.url,
					imageAlt5: media.alt,
					slideList: newSlides,
				});
				break;
			case 6:
				setAttributes({
					imageUrl6: src || media.url,
					imageAlt6: media.alt,
					slideList: newSlides,
				});
				break;
			case 7:
				setAttributes({
					imageUrl7: src || media.url,
					imageAlt7: media.alt,
					slideList: newSlides,
				});
				break;
		}		
	}

	const onMediaAltChange = (index, newMediaAlt) => {
		switch (index) {
			case 0:
				setAttributes({imageAlt0: newMediaAlt});
				break;
			case 1:
				setAttributes({imageAlt1: newMediaAlt});
				break;
			case 2:
				setAttributes({imageAlt2: newMediaAlt});
				break;
			case 3:
				setAttributes({imageAlt3: newMediaAlt});
				break;
			case 4:
				setAttributes({imageAlt4: newMediaAlt});
				break;
			case 5:
				setAttributes({imageAlt5: newMediaAlt});
				break;
			case 6:
				setAttributes({imageAlt6: newMediaAlt});
				break;
			case 7:
				setAttributes({imageAlt7: newMediaAlt});
				break;
		}
	};

	const setNumSlides = (value) => {
		setAttributes({numSlides: String(value)});
	}

	const setLink = (value, index) => {
		const newSlides = slideList.slice();
		newSlides[index].link = value;
		setAttributes({slideList: newSlides});
	}

	const setArrowsLocation = (value) => {
		setAttributes({arrowsLocation: value});
	}

	const setBulletsLocation = (value) => {
		setAttributes({bulletsLocation: value});
	}

	const setPauseLocation = (value) => {
		setAttributes({pauseLocation: value});
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

	const getImageUrl = (index) => {
		switch (index) {
			case 0:
				return imageUrl0;
			case 1:
				return imageUrl1;
			case 2:
				return imageUrl2;
			case 3:
				return imageUrl3;
			case 4:
				return imageUrl4;
			case 5:
				return imageUrl5;
			case 6:
				return imageUrl6;
			case 7:
				return imageUrl7;
			default:
				return null;
		}
	}

	const getImageAlt = (index) => {
		switch (index) {
			case 0:
				return imageAlt0;
			case 1:
				return imageAlt1;
			case 2:
				return imageAlt2;
			case 3:
				return imageAlt3;
			case 4:
				return imageAlt4;
			case 5:
				return imageAlt5;
			case 6:
				return imageAlt6;
			case 7:
				return imageAlt7;
			default:
				return null;
		}
	}

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
		setAttributes({autoplayInterval: value});
	}

	const setThumbnailSlider = (value) => {
		setAttributes({thumbnailSlider: value});
	}

	// Splide carousel settings
	useEffect(() => {
		if (!sliderId) {
			setAttributes({sliderId: `ucla-slider-${clientId}`});
		}
	}, []);

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
						<PanelBody
							title={__('Slide ' + String(index + 1))}
							initialOpen={false}
						>
							<div className="editor-post-featured-image">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => onSelectMedia(index, media)}
										value={slide.mediaId}
										allowedTypes={['image']}
										render={({open}) => (
											<Button
												className={
													! slide.mediaId
														? 'editor-post-featured-image__toggle'
														: 'editor-post-featured-image__preview'
												}
												onClick={open}
											>
												{!slide.mediaId &&
													__('Choose an image', 'awp')}
												{getImageUrl(index) && (
													<img
														src={getImageUrl(index)}
														alt={getImageAlt(index)}
													/>
												)}
											</Button>
										)}
									/>
								</MediaUploadCheck>
								{slide.mediaId && (
									<MediaUploadCheck>
										<MediaUpload
											title={__('Replace image', 'awp')}
											value={slide.mediaId}
											onSelect={(media) => onSelectMedia(index, media)}
											allowedTypes={['image']}
											render={({open}) => (
												<Button onClick={open} isDefault>
													{__('Replace image', 'awp')}
												</Button>
											) }
										/>
									</MediaUploadCheck>
								)}
								{slide.mediaId && (
									<TextareaControl
										label={__('Alt text (alternative text)')}
										value={getImageAlt(index)}
										onChange={(value) => onMediaAltChange(index, value)}
										help={
											<>
												<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
													{__(
														'Describe the purpose of the image'
													)}
												</ExternalLink>
												{__(
													'Leave empty if the image is purely decorative.'
												)}
											</>
										}
									/>
								)}
							</div>
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
						help='Will not autoplay in edit mode.'
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
				<PanelBody title={ __( 'Features' ) }>
					<SelectControl
						label="Arrows Location"
						value={arrowsLocation}
						options={[
							{label: 'Top', value: 'arrows-top'},
							{label: 'Horizontal (internal)', value: 'arrows-internal'},
							// {label: 'Horizontal (external)', value: 'arrows-external'},
						]}
						onChange={setArrowsLocation}
					/>
					<SelectControl
						label="Bullets location"
						value={bulletsLocation}
						options={[
							{label: 'Below', value: 'bullets-below'},
							{label: 'Inside', value: 'bullets-inside'},
						]}
						onChange={setBulletsLocation}
					/>
					<SelectControl
						label="Pause location"
						value={pauseLocation}
						options={[
							{label: 'Top', value: 'pause-top'},
							{label: 'Inside', value: 'pause-inside'},
						]}
						onChange={setPauseLocation}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Thumbnail Slider' ) }>
	 				<ToggleControl
						label={ __( 'Include a thumbnail slider' ) }
						onChange={setThumbnailSlider}
						checked={thumbnailSlider}
					/>
				</PanelBody>
			</InspectorControls>
			<article className={className}>
				<img
					src='../wp-content/plugins/wp-uwai-plugin/molecule.svg'
					className={`title-image ${titleVisible ? "" : "hidden"}`}
				/>
				<h1 className={`title-text ${titleVisible ? "" : "hidden"}`}>
					{titleText.split(" ").map((word) =>
						<span className='title-word'>
							{word}
						</span>
					)}
				</h1>
				<Splide
					options={{
						type: 'loop',
						width: '100%',
						height: '70vh',
						classes: {
							arrows: 'splide__arrows',
							arrow: `splide__arrow ${arrowsLocation == 'arrows-top' ? '' : 'arrows-either-side'}`,
							prev: 'splide__arrow--prev',
							next: `splide__arrow--next ${arrowsLocation == 'arrows-top' ? '' : 'arrows-either-side-right'}`,
							pagination: `splide__pagination ${bulletsLocation == 'bullets-below' ? 'pagination-below' : 'pagination-internal'}`,
							page: 'splide__pagination__page',
						},
					}}
				>
					{slideList.slice(0, Number(numSlides)).map((slide, index) =>
						<SplideSlide>
							<img
								src={getImageUrl(index) ?? defaultImages[index]}
								alt={getImageAlt(index)}
								className={`splide-image image-no-${index}`}
							/>
							<p className={`splide-caption ${captionSize} ${slide.captionLocation} ${captionColor}`}>
								{slide.caption}
							</p>
						</SplideSlide>
					)}
				</Splide>
			</article>
		</>
	);

}
