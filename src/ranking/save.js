/* eslint-disable no-unused-vars */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import './style.scss';

import { RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 * @param {Object} [props]           Properties passed from the editor.
 * @param {Object} props.attributes
 * @param {string} props.attributes.title
 * @param {string} props.attributes.segments
 * @param {string} props.attributes.ranking1
 * @param {string} props.attributes.label1
 * @param {string} props.attributes.source1
 * @param {string} props.attributes.ranking2
 * @param {string} props.attributes.label2
 * @param {string} props.attributes.source2
 * @param {string} props.attributes.ranking3
 * @param {string} props.attributes.label3
 * @param {string} props.attributes.source3
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save({
	attributes: {
		title,
		segments,
		ranking1,
		label1,
		source1,
		ranking2,
		label2,
		source2,
		ranking3,
		label3,
		source3,
	},
	className,
}) {
	return (
		<div className={className}>
			<RichText.Content
				tagName="h3"
				value={title}
			/>
			{!segments || segments == '1' ?
				<aside className="stat-wrapper clearfix">
					<div className="stat-tout">
						<RichText.Content
							tagName="span"
							className="stat-tout__number"
							value={ranking1}
						/>
						<div className="stat-tout__info-wrap">
							<RichText.Content
								tagName="span"
								className="stat-tout__label"
								value={label1}
							/>
							<RichText.Content
								tagName="span"
								className="stat-tout__source"
								value={source1}
							/>
						</div>
					</div>
				</aside>
			: segments == '1, inline' ?
				<aside className="stat-wrapper clearfix">
					<div className="stat-tout stat-tout--inline">
						<RichText.Content
							tagName="span"
							className="stat-tout__number"
							value={ranking1}
						/>
						<div className="stat-tout__info-wrap">
							<RichText.Content
								tagName="span"
								className="stat-tout__label"
								value={label1}
							/>
							<RichText.Content
								tagName="span"
								className="stat-tout__source"
								value={source1}
							/>
						</div>
					</div>
				</aside>
			: segments == '2' ?
				<div className="stat-set">
					<aside className="stat-wrapper clearfix">
						<div className="stat-tout stat-tout--inline">
							<RichText.Content
								tagName="span"
								className="stat-tout__number"
								value={ranking1}
							/>
							<div className="stat-tout__info-wrap">
								<RichText.Content
									tagName="span"
									className="stat-tout__label"
									value={label1}
								/>
								<RichText.Content
									tagName="span"
									className="stat-tout__source"
									value={source1}
								/>
							</div>
						</div>
					</aside>

					<aside className="stat-wrapper clearfix">
						<div className="stat-tout stat-tout--inline">
							<RichText.Content
								tagName="span"
								className="stat-tout__number"
								value={ranking2}
							/>
							<div className="stat-tout__info-wrap">
								<RichText.Content
									tagName="span"
									className="stat-tout__label"
									value={label2}
								/>
								<RichText.Content
									tagName="span"
									className="stat-tout__source"
									value={source2}
								/>
							</div>
						</div>
					</aside>
				</div>
			:
				<div className="stat-set">
					<aside className="stat-wrapper clearfix">
						<div className="stat-tout">
							<RichText.Content
								tagName="span"
								className="stat-tout__number"
								value={ranking1}
							/>
							<div className="stat-tout__info-wrap">
								<RichText.Content
									tagName="span"
									className="stat-tout__label"
									value={label1}
								/>
								<RichText.Content
									tagName="span"
									className="stat-tout__source"
									value={source1}
								/>
							</div>
						</div>
					</aside>

					<aside className="stat-wrapper clearfix">
						<div className="stat-tout">
							<RichText.Content
								tagName="span"
								className="stat-tout__number"
								value={ranking2}
							/>
							<div className="stat-tout__info-wrap">
								<RichText.Content
									tagName="span"
									className="stat-tout__label"
									value={label2}
								/>
								<RichText.Content
									tagName="span"
									className="stat-tout__source"
									value={source2}
								/>
							</div>
						</div>
					</aside>

					<aside className="stat-wrapper clearfix">
						<div className="stat-tout">
							<RichText.Content
								tagName="span"
								className="stat-tout__number"
								value={ranking3}
							/>
							<div className="stat-tout__info-wrap">
								<RichText.Content
									tagName="span"
									className="stat-tout__label"
									value={label3}
								/>
								<RichText.Content
									tagName="span"
									className="stat-tout__source"
									value={source3}
								/>
							</div>
						</div>
					</aside>
				</div>
			}
		</div>
	);
}
