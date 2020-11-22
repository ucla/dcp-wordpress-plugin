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
	attributes: { title, mediaUrl, mediaAlt, greyStyle, url, linkTarget, rel },
	className,
}) {
	return (
		<div className={className}>
			<article
				className={'story__secondary-card' + (greyStyle ? '-grey' : '')}
			>
				<a href={url} target={linkTarget} rel={rel}>
					<div class="story__secondary-image-wrapper">
						<img
							className="story__secondary-image"
							src={
								mediaUrl ??
								'/wp-content/plugins/wp-uwai-plugin/event-card-example-1.jpg'
							}
							alt={
								mediaAlt ??
								'Two children on their phones under the blankets'
							}
						></img>
					</div>
					<h3 className="story__secondary-title">
						<RichText.Content
							tagName="span"
							className="story__secondary-title-text"
							value={title}
						/>
					</h3>
				</a>
				{/* <h4 className="person-card__department">
						<RichText.Content tagName="span" value={ department } />
					</h4> */}

				<div className="story__secondary-content">
					<InnerBlocks.Content />
				</div>
			</article>
		</div>
	);
}
