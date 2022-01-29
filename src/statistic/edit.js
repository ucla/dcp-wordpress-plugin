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
	ToggleControl,
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
		segments,
		inline,
		statistics,
	} = attributes;

	const onChangeSegments = (value) => {
		setAttributes({ segments: value });
	};

	const onToggleInline = (value) => {
		setAttributes({ inline: value });
	};

	const onChangeNumber = (value, id) => {
		const newStatistics = statistics.slice();
		newStatistics[Number(id)-1].number = value;
		setAttributes({ statistics: newStatistics });
	};
	
	const onChangeLabel = (value, id) => {
		const newStatistics = statistics.slice();
		newStatistics[Number(id)-1].label = value;
		setAttributes({ statistics: newStatistics });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Statistics Style' ) }>
					<SelectControl
						label="Number of Segments"
						value={segments}
						options={[
							{label: '1', value: '1'},
							{label: '2', value: '2'},
							{label: '3', value: '3'},
						]}
						onChange={onChangeSegments}
					/>
					<ToggleControl
						label={__('Label Inline')}
						onChange={onToggleInline}
						checked={inline}
					/>
				</PanelBody>
			</InspectorControls>
			<article className={className}>
				<div className="stat-set">
					{statistics.map((stat) => {
						if (Number(stat.id) > Number(segments))
							return null;
						return(
							<aside className="stat-wrapper clearfix" key={"statistic-0" + stat.id}>
								<div className={`stat-tout ${inline ? 'stat-tout--inline' : ''}`}>
									<RichText
										tagName="span"
										className="stat-tout__number"
										value={stat.number}
										onChange={(value) => onChangeNumber(value, stat.id)}
										placeholder='10%'
									/>
									<div className="stat-tout__info-wrap">
										<RichText
											tagName="span"
											className="stat-tout__label"
											value={stat.label}
											onChange={(value) => onChangeLabel(value, stat.id)}
											placeholder='Text here'
										/>
									</div>
								</div>
							</aside>
						);
					})}
				</div>
			</article>
		</>
	);
}
