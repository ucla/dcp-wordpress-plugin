/* eslint-disable no-unused-vars */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import './style.scss';

import { RichText, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 * @param {Object} [props]           Properties passed from the editor.
 * @param {Object} props.attributes
 * @param {string} props.attributes.title
 * @param {string} props.attributes.mediaUrl
 * @param {string} props.attributes.mediaAlt
 * @param {string} props.attributes.url
 * @param {string} props.attributes.rel
 * @param {string} props.attributes.mediaAlt
 * @param {boolean} props.attributes.greyStyle
 * @param {boolean} props.attributes.department
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
				<aside class="stat-wrapper clearfix">
					<div class="stat-tout">
						<RichText.Content
							tagName="span"
							className="stat-tout__number"
							value={ranking1}
						/>
						<div class="stat-tout__info-wrap">
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
				<aside class="stat-wrapper clearfix">
					<div class="stat-tout stat-tout--inline">
						<RichText.Content
							tagName="span"
							className="stat-tout__number"
							value={ranking1}
						/>
						<div class="stat-tout__info-wrap">
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
				<div class="stat-set">
					<aside class="stat-wrapper clearfix">
						<div class="stat-tout stat-tout--inline">
							<RichText.Content
								tagName="span"
								className="stat-tout__number"
								value={ranking1}
							/>
							<div class="stat-tout__info-wrap">
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

					<aside class="stat-wrapper clearfix">
						<div class="stat-tout stat-tout--inline">
							<RichText.Content
								tagName="span"
								className="stat-tout__number"
								value={ranking2}
							/>
							<div class="stat-tout__info-wrap">
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
				<div class="stat-set">
					<aside class="stat-wrapper clearfix">
						<div class="stat-tout">
							<RichText.Content
								tagName="span"
								className="stat-tout__number"
								value={ranking1}
							/>
							<div class="stat-tout__info-wrap">
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

					<aside class="stat-wrapper clearfix">
						<div class="stat-tout">
							<RichText.Content
								tagName="span"
								className="stat-tout__number"
								value={ranking2}
							/>
							<div class="stat-tout__info-wrap">
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

					<aside class="stat-wrapper clearfix">
						<div class="stat-tout">
							<RichText.Content
								tagName="span"
								className="stat-tout__number"
								value={ranking3}
							/>
							<div class="stat-tout__info-wrap">
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
