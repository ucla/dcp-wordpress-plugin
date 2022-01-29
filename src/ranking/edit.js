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
	ToggleControl,
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
		segments,
		inline,
		rankings,
	} = attributes;

	const onChangeSegments = (value) => {
		setAttributes({ segments: value });
	};

	const onToggleInline = (value) => {
		setAttributes({ inline: value });
	};

	const onChangeRanking = (value, id) => {
		const newRankings = rankings.slice();
		newRankings[Number(id)-1].ranking = value;
		setAttributes({ rankings: newRankings });
	};
	
	const onChangeLabel = (value, id) => {
		const newRankings = rankings.slice();
		newRankings[Number(id)-1].label = value;
		setAttributes({ rankings: newRankings });
	};

	const onChangeSource = (value, id) => {
		const newRankings = rankings.slice();
		newRankings[Number(id)-1].source = value;
		setAttributes({ rankings: newRankings });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Ranking Style' ) }>
					<SelectControl
						label="Number of Segments"
						value={ segments }
						options={ [
							{ label: '1', value: '1' },
							{ label: '2', value: '2' },
							{ label: '3', value: '3' },
						] }
						onChange={ onChangeSegments }
					/>
					<ToggleControl
						label={__('Label Inline')}
						onChange={onToggleInline}
						checked={inline}
					/>
				</PanelBody>
			</InspectorControls>
			<article className={className + ' stat-set'}>
				{rankings.map((rank) => {
					if (Number(rank.id) > Number(segments))
						return null;
					return (
						<aside className="stat-wrapper clearfix" key={"ranking-0" + rank.id}>
							<div className={`stat-tout ${inline ? "stat-tout--inline" : ""}`}>
								<RichText
									tagName="span"
									className="stat-tout__number"
									value={rank.ranking}
									onChange={(value) => onChangeRanking(value, rank.id)}
									placeholder='#1'
								/>
								<div className="stat-tout__info-wrap">
									<RichText
										tagName="span"
										className="stat-tout__label"
										value={rank.label}
										onChange={(value) => onChangeLabel(value, rank.id)}
										placeholder="Text here"
									/>
									<RichText
										tagName="span"
										className="stat-tout__source"
										value={rank.source}
										onChange={(value) => onChangeSource(value, rank.id)}
										placeholder='Source'
									/>
								</div>
							</div>
						</aside>
					);
				})}
			</article>
		</>
	);
}
