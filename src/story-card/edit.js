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

import { useState, useCallback } from '@wordpress/element';
import {
	KeyboardShortcuts,
	PanelBody,
	TextareaControl,
	ExternalLink,
	Button,
	ToggleControl,
	TextControl,
	ToolbarButton,
	ToolbarGroup,
	Popover,
} from '@wordpress/components';
import {
	InspectorControls,
	RichText,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';

function attributesFromMedia({ attributes, setAttributes }) {
	return (media) => {
		let mediaType;
		let src;
		// for media selections originated from a file upload.
		if (media.media_type) {
			if (media.media_type === 'image') {
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

		if (mediaType === 'image') {
			// Try the "large" size URL, falling back to the "full" size URL below.
			src =
				media.sizes?.large?.url ||
				// eslint-disable-next-line camelcase
				media.media_details?.sizes?.large?.source_url;
		}

		setAttributes({
			mediaAlt: media.alt,
			mediaId: media.id,
			mediaType,
			mediaUrl: src || media.url,
			focalPoint: undefined,
		});
	};
}

function URLPicker( {
	isSelected,
	url,
	setAttributes,
	opensInNewTab,
	onToggleOpenInNewTab,
} ) {
	const [ isURLPickerOpen, setIsURLPickerOpen ] = useState( false );
	const urlIsSet = !! url;
	const urlIsSetandSelected = urlIsSet && isSelected;
	const openLinkControl = () => {
		setIsURLPickerOpen( true );
		return false; // prevents default behaviour for event
	};
	const unlinkButton = () => {
		setAttributes( {
			url: undefined,
			linkTarget: undefined,
			rel: undefined,
		} );
		setIsURLPickerOpen( false );
	};
	const linkControl = ( isURLPickerOpen || urlIsSetandSelected ) && (
		<Popover
			position="bottom center"
			onClose={ () => setIsURLPickerOpen( false ) }
		>
			<LinkControl
				className="wp-block-navigation-link__inline-link-input"
				value={ { url, opensInNewTab } }
				onChange={ ( {
					url: newURL = '',
					opensInNewTab: newOpensInNewTab,
				} ) => {
					setAttributes( { url: newURL } );

					if ( opensInNewTab !== newOpensInNewTab ) {
						onToggleOpenInNewTab( newOpensInNewTab );
					}
				} }
			/>
		</Popover>
	);
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{ ! urlIsSet && (
						<ToolbarButton
							name="link"
							icon={ link }
							title={ __( 'Link', 'ucla-dcp-plugin' ) }
							shortcut={ displayShortcut.primary( 'k' ) }
							onClick={ openLinkControl }
						/>
					) }
					{ urlIsSetandSelected && (
						<ToolbarButton
							name="link"
							icon={ linkOff }
							title={ __( 'Unlink', 'ucla-dcp-plugin' ) }
							shortcut={ displayShortcut.primaryShift( 'k' ) }
							onClick={ unlinkButton }
							isActive={ true }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>
			{ isSelected && (
				<KeyboardShortcuts
					bindGlobal
					shortcuts={ {
						[ rawShortcut.primary( 'k' ) ]: openLinkControl,
						[ rawShortcut.primaryShift( 'k' ) ]: unlinkButton,
					} }
				/>
			) }
			{ linkControl }
		</>
	);
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
		mediaAlt,
		mediaType,
		mediaUrl,
		title,
		greyStyle,
		mediaId,
		url,
		linkTarget,
		rel,
	} = attributes;

	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};

	const onSetLinkRel = useCallback(
		( value ) => {
			setAttributes( { rel: value } );
		},
		[ setAttributes ]
	);

	const onToggleOpenInNewTab = useCallback(
		( value ) => {
			const newLinkTarget = value ? '_blank' : undefined;

			let updatedRel = rel;
			if ( newLinkTarget && ! rel ) {
				updatedRel = NEW_TAB_REL;
			} else if ( ! newLinkTarget && rel === NEW_TAB_REL ) {
				updatedRel = undefined;
			}

			setAttributes( {
				linkTarget: newLinkTarget,
				rel: updatedRel,
			} );
		},
		[ rel, setAttributes ]
	);

	const onSelectMedia = attributesFromMedia({ attributes, setAttributes });

	const onMediaAltChange = (newMediaAlt) => {
		setAttributes({ mediaAlt: newMediaAlt });
	};

	const onToggleGreyStyle = (value) => {
		greyStyle = value;
		setAttributes({
			greyStyle: value,
		});
	};
	return (
		<>
			<URLPicker
				url={url}
				setAttributes={setAttributes}
				isSelected={isSelected}
				opensInNewTab={linkTarget === '_blank'}
				onToggleOpenInNewTab={onToggleOpenInNewTab}
			/>

			<InspectorControls>
				<PanelBody
					title={__('Select card image', 'ucla-dcp-plugin')}
					initialOpen={true}
				>
					<div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia}
								value={attributes.mediaId}
								allowedTypes={['image']}
								render={({ open }) => (
									<Button
										className={
											!attributes.mediaId
												? 'editor-post-featured-image__toggle'
												: 'editor-post-featured-image__preview'
										}
										onClick={open}
									>
										{!attributes.mediaId &&
											__('Choose an image', 'ucla-dcp-plugin')}
										{mediaUrl && (
											<img
												src={mediaUrl}
												alt={mediaAlt}
											/>
										)}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{attributes.mediaId && (
							<MediaUploadCheck>
								<MediaUpload
									title={__('Replace image', 'ucla-dcp-plugin')}
									value={attributes.mediaId}
									onSelect={onSelectMedia}
									allowedTypes={['image']}
									render={({ open }) => (
										<Button onClick={open} isDefault>
											{__('Replace image', 'ucla-dcp-plugin')}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						)}
						{attributes.mediaId && (
							<TextareaControl
								label={__('Alt text (alternative text)', 'ucla-dcp-plugin')}
								value={mediaAlt}
								onChange={onMediaAltChange}
								help={
									<>
										<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
											{__(
												'Describe the purpose of the image', 'ucla-dcp-plugin'
											)}
										</ExternalLink>
										{__(
											'Leave empty if the image is purely decorative.', 'ucla-dcp-plugin'
										)}
									</>
								}
							/>
						)}
					</div>
				</PanelBody>
				<PanelBody title={__('Style')}>
					<ToggleControl
						label={__('Switch to the "Grey" style of tile', 'ucla-dcp-plugin')}
						onChange={onToggleGreyStyle}
						checked={greyStyle}
					/>
				</PanelBody>
				<PanelBody title={__('Link settings', 'ucla-dcp-plugin')}>
					<ToggleControl
						label={__('Open in new tab', 'ucla-dcp-plugin')}
						onChange={onToggleOpenInNewTab}
						checked={linkTarget === '_blank'}
					/>
					<TextControl
						label={__('Link rel', 'ucla-dcp-plugin')}
						value={rel || ''}
						onChange={onSetLinkRel}
					/>
				</PanelBody>
			</InspectorControls>
			<article
				className={
					className +
					' story__secondary-card' +
					(greyStyle ? '-grey' : '')
				}
			>
				<div class="story__secondary-image-wrapper">
					<img
						className="story__secondary-image"
						src={
							mediaUrl ??
							'/wp-content/plugins/wp-uwai-plugin/event-card-example-1.jpg'
						}
						alt={__("Two children on their phones under the blankets", 'ucla-dcp-plugin')}
					></img>
				</div>
				<h3 className="story__secondary-title">
					<RichText
						tagName="span"
						className="story__secondary-title-text"
						value={title}
						onChange={onChangeTitle}
						placeholder={__("A cool title..", 'ucla-dcp-plugin')}
					/>
				</h3>
				{/* 					<h4 className="person-card__department">
						<RichText
							tagName="span"
							value={department}
							onChange={onChangeDepartment}
							placeholder="A cool dept.."
						/>
					</h4> */}

				<div className="story__secondary-content">
					<InnerBlocks />
				</div>
			</article>
		</>
	);
}
