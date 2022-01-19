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
		title,
		body,
	} = attributes;

	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};

	const onChangeBody = (value) => {
		setAttributes({ body: value });
	};

	return (
		<>
			<InspectorControls />
			<article className={className}>
				<RichText
					tagName="h3"
					value={title}
					onChange={onChangeTitle}
					placeholder='UCLA Factoid'
				/>
				<aside class="stat-wrapper clearfix">
					<div class="stat-tout stat-tout--inline">
						<div class="stat-tout__info-wrap">
							<RichText
								tagName="span"
								className="stat-tout__label"
								value={body}
								onChange={onChangeBody}
								placeholder='Some text'
							/>
						</div>
					</div>
				</aside>
			</article>
		</>
	);
}
