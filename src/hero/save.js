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
 * @param {boolean} props.attributes.greyStyle
 * @param {boolean} props.attributes.department
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save({
	attributes: {
		body,
		mediaUrl,
		mediaAlt,
		greyStyle,
		department,
		row1,
		row2,
		row3,
		row4,
	},
	className,
}) {
	let row1J, row2J, row3J, row4J;
	row1J = row1 ? (
		<>
			<RichText.Content
				tagName="span"
				className="copy__headline-ribbon"
				value={row1}
			/>
			<br />
		</>
	) : null;
	row2J = row2 ? (
		<>
			<RichText.Content
				tagName="span"
				className="copy__headline-ribbon"
				value={row2}
			/>
			<br />
		</>
	) : null;
	row3J = row3 ? (
		<>
			<RichText.Content
				tagName="span"
				className="copy__headline-ribbon"
				value={row3}
			/>
			<br />
		</>
	) : null;
	row4J = row4 ? (
		<>
			<RichText.Content
				tagName="span"
				className="copy__headline-ribbon"
				value={row4}
			/>
			<br />
		</>
	) : null;
	return (
		<div className={className}>
			<section
				id="hero"
				class="section group full-width"
				aria-labelledby="hero-heading"
			>
				<div class="copy">
					<div class="col span_3_of_12 copy__wrapper">
						<h1
							id="hero-heading"
							class="screenreader-only"
							style={{color: "transparent", userSelect: "none"}}
						>
							{row1 + ' ' + row2 + ' ' + row3 + ' ' + row4}
						</h1>
						<div class="copy__headline">
							{row1J}
							{row2J}
							{row3J}
							{row4J}
						</div>
						<RichText.Content
							tagName="p"
							className="copy__supporting-text"
							value={body}
						/>
						<p>
							<span
								class="copy__cta"
								data-width="1128"
								data-height="634"
							>
								<InnerBlocks.Content />
							</span>
						</p>
					</div>
				</div>
				<div class="col span_9_of_12 graphics">
					<div
						class="graphics__image"
						role="img"
						aria-label={
							mediaAlt ??
							'Jonathan Kao Director’s New Innovator Award'
						}
						style={{
							backgroundImage:
								'url(' +
								(mediaUrl ??
									'https://picsum.photos/id/1005/500/700') +
								')',
						}}
					></div>
					<p>
						<img
							class="graphics__molecule"
							src={js_data.path + '/assets/polygon.png'}
							alt=""
						></img>
					</p>
				</div>
			</section>
		</div>
	);
}
