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
	SelectControl,
} from '@wordpress/components';
import {
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';

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
		segments = "1",
		ranking1,
		label1,
		source1,
		ranking2,
		label2,
		source2,
		ranking3,
		label3,
		source3,
	} = attributes;

	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};

	const onChangeSegments = (value) => {
		setAttributes({ segments: value });
	};

	const onChangeRanking1 = (value) => {
		setAttributes({ ranking1: value });
	};

	const onChangeLabel1 = (value) => {
		setAttributes({ label1: value });
	};

	const onChangeSource1 = (value) => {
		setAttributes({ source1: value });
	};

	const onChangeRanking2 = (value) => {
		setAttributes({ ranking2: value });
	};

	const onChangeLabel2 = (value) => {
		setAttributes({ label2: value });
	};

	const onChangeSource2 = (value) => {
		setAttributes({ source2: value });
	};

	const onChangeRanking3 = (value) => {
		setAttributes({ ranking3: value });
	};

	const onChangeLabel3 = (value) => {
		setAttributes({ label3: value });
	};

	const onChangeSource3 = (value) => {
		setAttributes({ source3: value });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Ranking Style' ) }>
					<SelectControl
						label="Number of Segments"
						defaultValue='1'
						value={ attributes.segments }
						options={ [
							{ label: 'Single', value: '1' },
							{ label: 'Single, inline', value: '1, inline' },
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
				{!attributes.segments || attributes.segments == '1' ?
					<aside className="stat-wrapper clearfix">
						<div className="stat-tout">
							<RichText
								tagName="span"
								className="stat-tout__number"
								value={attributes.ranking1}
								onChange={onChangeRanking1}
								placeholder='#1'
							/>
							<div className="stat-tout__info-wrap">
								<RichText
									tagName="span"
									className="stat-tout__label"
									value={attributes.label1}
									onChange={onChangeLabel1}
									placeholder="Text here"
								/>
								<RichText
									tagName="span"
									className="stat-tout__source"
									value={attributes.source1}
									onChange={onChangeSource1}
									placeholder='Source'
								/>
							</div>
						</div>
					</aside>
				: attributes.segments == '1, inline' ?
					<aside className="stat-wrapper clearfix">
						<div className="stat-tout stat-tout--inline">
							<RichText
								tagName="span"
								className="stat-tout__number"
								value={attributes.ranking1}
								onChange={onChangeRanking1}
								placeholder='#1'
							/>
							<div className="stat-tout__info-wrap">
								<RichText
									tagName="span"
									className="stat-tout__label"
									value={attributes.label1}
									onChange={onChangeLabel1}
									placeholder='Text here'
								/>
								<RichText
									tagName="span"
									className="stat-tout__source"
									value={attributes.source1}
									onChange={onChangeSource1}
									placeholder='Source'
								/>
							</div>
						</div>
					</aside>
				: attributes.segments == '2' ?
					<div className="stat-set">
						<aside className="stat-wrapper clearfix">
							<div className="stat-tout stat-tout--inline">
								<RichText
									tagName="span"
									className="stat-tout__number"
									value={attributes.ranking1}
									onChange={onChangeRanking1}
									placeholder='#1'
								/>
								<div className="stat-tout__info-wrap">
									<RichText
										tagName="span"
										className="stat-tout__label"
										value={attributes.label1}
										onChange={onChangeLabel1}
										placeholder='Text here'
									/>
									<RichText
										tagName="span"
										className="stat-tout__source"
										value={attributes.source1}
										onChange={onChangeSource1}
										placeholder='Source'
									/>
								</div>
							</div>
						</aside>

						<aside className="stat-wrapper clearfix">
							<div className="stat-tout stat-tout--inline">
								<RichText
									tagName="span"
									className="stat-tout__number"
									value={attributes.ranking2}
									onChange={onChangeRanking2}
									placeholder='#2'
								/>
								<div className="stat-tout__info-wrap">
									<RichText
										tagName="span"
										className="stat-tout__label"
										value={attributes.label2}
										onChange={onChangeLabel2}
										placeholder='Text here'
									/>
									<RichText
										tagName="span"
										className="stat-tout__source"
										value={attributes.source2}
										onChange={onChangeSource2}
										placeholder='Source'
									/>
								</div>
							</div>
						</aside>
					</div>
				:
					<div className="stat-set">
						<aside className="stat-wrapper clearfix">
							<div className="stat-tout">
								<RichText
									tagName="span"
									className="stat-tout__number"
									value={attributes.ranking1}
									onChange={onChangeRanking1}
									placeholder='#1'
								/>
								<div className="stat-tout__info-wrap">
									<RichText
										tagName="span"
										className="stat-tout__label"
										value={attributes.label1}
										onChange={onChangeLabel1}
										placeholder='Text here'
									/>
									<RichText
										tagName="span"
										className="stat-tout__source"
										value={attributes.source1}
										onChange={onChangeSource1}
										placeholder='Source'
									/>
								</div>
							</div>
						</aside>

						<aside className="stat-wrapper clearfix">
							<div className="stat-tout">
								<RichText
									tagName="span"
									className="stat-tout__number"
									value={attributes.ranking2}
									onChange={onChangeRanking2}
									placeholder='#2'
								/>
								<div className="stat-tout__info-wrap">
									<RichText
										tagName="span"
										className="stat-tout__label"
										value={attributes.label2}
										onChange={onChangeLabel2}
										placeholder='Text here'
									/>
									<RichText
										tagName="span"
										className="stat-tout__source"
										value={attributes.source2}
										onChange={onChangeSource2}
										placeholder='Source'
									/>
								</div>
							</div>
						</aside>

						<aside className="stat-wrapper clearfix">
							<div className="stat-tout">
								<RichText
									tagName="span"
									className="stat-tout__number"
									value={attributes.ranking3}
									onChange={onChangeRanking3}
									placeholder='#3'
								/>
								<div className="stat-tout__info-wrap">
									<RichText
										tagName="span"
										className="stat-tout__label"
										value={attributes.label3}
										onChange={onChangeLabel3}
										placeholder='Text here'
									/>
									<RichText
										tagName="span"
										className="stat-tout__source"
										value={attributes.source3}
										onChange={onChangeSource3}
										placeholder='Source'
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
