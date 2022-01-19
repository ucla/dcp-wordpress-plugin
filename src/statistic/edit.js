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
	SelectControl,
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
		segments,
		var1,
		var2,
		var3,
		statistic1,
		label1,
		statistic2,
		label2,
		statistic3,
		label3,
	} = attributes;

	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};

	const onChangeSegments = (value) => {
		setAttributes({ segments: value });
	};

	const onChangeVar1 = (value) => {
		setAttributes({ var1: value });
	};

	const onChangeVar2 = (value) => {
		setAttributes({ var2: value });
	};

	const onChangeVar3 = (value) => {
		setAttributes({ var3: value });
	};

	const onChangeStatistic1 = (value) => {
		setAttributes({ statistic1: value });
	};

	const onChangeLabel1 = (value) => {
		setAttributes({ label1: value });
	};

	const onChangeStatistic2 = (value) => {
		setAttributes({ statistic2: value });
	};

	const onChangeLabel2 = (value) => {
		setAttributes({ label2: value });
	};

	const onChangeStatistic3 = (value) => {
		setAttributes({ statistic3: value });
	};

	const onChangeLabel3 = (value) => {
		setAttributes({ label3: value });
	};


	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Statistic Style' ) }>
					<SelectControl
						label="Number of Segments"
						defaultValue='1'
						value={ attributes.segments }
						options={ [
							{ label: 'Single', value: '1' },
							{ label: 'Single, inline', value: '1, inline' },
							{ label: 'Multiple variable', value: '1, multivar' },
							{ label: 'Two across', value: '2' },
							{ label: 'Three across', value: '3' },
						] }
						onChange={ onChangeSegments }
					/>
				</PanelBody>
			</InspectorControls>
			<article className={className}>
				<RichText
					tagName="h3"
					value={attributes.title}
					onChange={onChangeTitle}
					placeholder='UCLA Ranking'
				/>
				{!attributes.segments || attributes.segments == "1" ?
					<aside class="stat-wrapper clearfix">
						<div class="stat-tout">
							<RichText
								tagName="span"
								className="stat-tout__number"
								value={attributes.statistic1}
								onChange={onChangeStatistic1}
								placeholder='10%'
							/>
							<RichText
								tagName="span"
								className="stat-tout__label"
								value={attributes.label1}
								onChange={onChangeLabel1}
								placeholder='Text here'
							/>
						</div>
					</aside>
				: attributes.segments == "1, inline" ?
					<aside class="stat-wrapper clearfix">
						<div class="stat-tout stat-tout--inline">
							<RichText
								tagName="span"
								className="stat-tout__number"
								value={attributes.statistic1}
								onChange={onChangeStatistic1}
								placeholder='10%'
							/>
							<RichText
								tagName="span"
								className="stat-tout__label"
								value={attributes.label1}
								onChange={onChangeLabel1}
								placeholder='Text here'
							/>
						</div>
					</aside>
				: attributes.segments == "1, multivar" ?
					<aside class="stat-wrapper clearfix">
						<div class="stat-tout stat-tout--inline">
							<RichText
								tagName="span"
								className="stat-tout__number"
								value={attributes.var1}
								onChange={onChangeVar1}
								placeholder='2'
							/>
							<RichText
								tagName="span"
								value={attributes.var2}
								onChange={onChangeVar2}
								placeholder='out of'
							/>
							<RichText
								tagName="span"
								className="stat-tout__number"
								value={attributes.var3}
								onChange={onChangeVar3}
								placeholder='3'
							/>
							<div class="stat-tout__info-wrap">
								<RichText
									tagName="span"
									className="stat-tout__label"
									value={attributes.label1}
									onChange={onChangeLabel1}
									placeholder='Text here'
								/>
							</div>
						</div>
					</aside>
				: attributes.segments == "2" ?
					<div class="stat-set">
						<aside class="stat-wrapper clearfix">
							<div class="stat-tout">
								<RichText
									tagName="span"
									className="stat-tout__number"
									value={attributes.statistic1}
									onChange={onChangeStatistic1}
									placeholder='10%'
								/>
								<div class="stat-tout__info-wrap">
									<RichText
										tagName="span"
										className="stat-tout__label"
										value={attributes.label1}
										onChange={onChangeLabel1}
										placeholder='Text here'
									/>
								</div>
							</div>
						</aside>

						<aside class="stat-wrapper clearfix">
							<div class="stat-tout">
								<RichText
									tagName="span"
									className="stat-tout__number"
									value={attributes.statistic2}
									onChange={onChangeStatistic2}
									placeholder='20%'
								/>
								<div class="stat-tout__info-wrap">
									<RichText
										tagName="span"
										className="stat-tout__label"
										value={attributes.label2}
										onChange={onChangeLabel2}
										placeholder='Text here'
									/>
								</div>
							</div>
						</aside>
					</div>
				:
					<div class="stat-set">
						<aside class="stat-wrapper">
							<div class="stat-tout">
								<RichText
									tagName="span"
									className="stat-tout__number"
									value={attributes.statistic1}
									onChange={onChangeStatistic1}
									placeholder='10%'
								/>
								<div class="stat-tout__info-wrap">
									<RichText
										tagName="span"
										className="stat-tout__label"
										value={attributes.label1}
										onChange={onChangeLabel1}
										placeholder='Text here'
									/>
								</div>
							</div>
						</aside>

						<aside class="stat-wrapper">
							<div class="stat-tout">
								<RichText
									tagName="span"
									className="stat-tout__number"
									value={attributes.statistic2}
									onChange={onChangeStatistic2}
									placeholder='20%'
								/>
								<div class="stat-tout__info-wrap">
									<RichText
										tagName="span"
										className="stat-tout__label"
										value={attributes.label2}
										onChange={onChangeLabel2}
										placeholder='Text here'
									/>
								</div>
							</div>
						</aside>

						<aside class="stat-wrapper">
							<div class="stat-tout">
								<RichText
									tagName="span"
									className="stat-tout__number"
									value={attributes.statistic3}
									onChange={onChangeStatistic3}
									placeholder='30%'
								/>
								<div class="stat-tout__info-wrap">
									<RichText
										tagName="span"
										className="stat-tout__label"
										value={attributes.label3}
										onChange={onChangeLabel3}
										placeholder='Text here'
									/>
								</div>
							</div>
						</aside>
					</div>
				}
			</article>
		</>
	);
}
