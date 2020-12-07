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
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save( {
	attributes: { title, mediaUrl, mediaAlt, greyStyle },
	className,
} ) {
	return (
		<div className={ className }>
			<article className={ 'basic-card' + ( greyStyle ? '-grey' : '' ) }>
				<img
					className="basic-card__image"
					src={
						mediaUrl ??
						'/wp-content/plugins/wp-uwai-plugin/event-card-example-1.jpg'
					}
					alt={
						mediaAlt ??
						'Two children on their phones under the blankets'
					}
				></img>
				<div className="basic-card__info-wrapper">
					<h3 className="basic-card__title">
						<RichText.Content tagName="span" value={ title } />
					</h3>
					<InnerBlocks.Content />
				</div>
			</article>
		</div>
	);
}
