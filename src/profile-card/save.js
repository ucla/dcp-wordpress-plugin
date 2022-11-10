/* eslint-disable no-unused-vars */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

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
export default function save( {
	attributes: { title, mediaUrl, mediaAlt, greyStyle, department },
	className,
} ) {
	return (
		<article className={`person-card${greyStyle ? '-grey' : ''}${className ? ' ' + className : ''}`}>
			<img
				className="person-card__image"
				src={
					mediaUrl ??
					'/wp-content/plugins/wp-uwai-plugin/event-card-example-1.jpg'
				}
				alt={
					mediaAlt ??
					__('Two children on their phones under the blankets', 'ucla-dcp-plugin')
				}
			></img>
			<div className="person-card__info-wrapper">
				<h3 className="person-card__name">
					<RichText.Content tagName="span" value={ title } />
				</h3>
				<h4 className="person-card__department">
					<RichText.Content tagName="span" value={ department } />
				</h4>

				<InnerBlocks.Content />
			</div>
		</article>
	);
}
