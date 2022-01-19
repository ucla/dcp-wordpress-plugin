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
			<InspectorControls>
				<PanelBody title={__('Content')}>
					<TextControl
						label={__('Inner text')}
						value={attributes.body || ''}
						onChange={onChangeBody}
					/>
				</PanelBody>
			</InspectorControls>
			<article className={className}>
				<section class="accordion">
					<dl>
						{/* <button class="accordion__title" aria-expanded="false">
							<dt>Title</dt>
						</button>

						<dd class="accordion__content"> 
							<p>         
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus sed tellus id ullamcorper. In iaculis dolor vitae urna mattis, vel pellentesque dui semper. Sed dignissim, lorem eget tincidunt sollicitudin, nulla nibh gravida arcu, a fringilla turpis risus id eros. Aliquam lobortis iaculis nunc. Integer imperdiet lacus eget arcu aliquam volutpat. Integer molestie consequat facilisis. Nam dui odio, hendrerit porttitor elit ac, auctor tristique dui. Proin a bibendum sem, ac laoreet neque. Vestibulum elit sem, tincidunt eu lorem at, ullamcorper gravida nulla. Phasellus nec ex eros. Donec at odio eget turpis luctus euismod. Fusce mi ex, tincidunt nec accumsan fringilla, tincidunt venenatis ex. Praesent hendrerit quis dolor hendrerit tristique. Quisque ut metus turpis.
							</p>
						</dd> */}
						<button class="accordion__title" aria-expanded="false">
						<dt>
							{/* Title */}
							<RichText
								tagName="span"
								// className="copy__headline-ribbon"
								value={attributes.title}
								onChange={onChangeTitle}
								placeholder="Title here"
							/>
						</dt>
					</button>

					<dd class="accordion__content"> 
						<RichText.Content
							tagName="span"
							// className="copy__headline-ribbon"
							value={attributes.body}
							placeholder="Text here"
						/>
						{/* <p>         
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus sed tellus id ullamcorper. In iaculis dolor vitae urna mattis, vel pellentesque dui semper. Sed dignissim, lorem eget tincidunt sollicitudin, nulla nibh gravida arcu, a fringilla turpis risus id eros. Aliquam lobortis iaculis nunc. Integer imperdiet lacus eget arcu aliquam volutpat. Integer molestie consequat facilisis. Nam dui odio, hendrerit porttitor elit ac, auctor tristique dui. Proin a bibendum sem, ac laoreet neque. Vestibulum elit sem, tincidunt eu lorem at, ullamcorper gravida nulla. Phasellus nec ex eros. Donec at odio eget turpis luctus euismod. Fusce mi ex, tincidunt nec accumsan fringilla, tincidunt venenatis ex. Praesent hendrerit quis dolor hendrerit tristique. Quisque ut metus turpis.
						</p> */}
					</dd>
					</dl>    
				</section>
			</article>
		</>
	);
}
