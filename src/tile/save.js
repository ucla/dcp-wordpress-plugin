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
 * @param {string} props.attributes.url
 * @param {string} props.attributes.linkTarget
 * @param {string} props.attributes.greyStyle
 * @param {string} props.attributes.rel
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save( {
	// attributes: { title, url, linkTarget, greyStyle, rel },
	attributes: { title, url, linkTarget, rel },
	className,
} ) {
	return (
		
		<div className={`tile${className ? ' ' + className : ''}`}>
			<a
				className="tile__link"
				href={ url }
				target={ linkTarget }
				rel={ rel }
			>
				<RichText.Content tagName="span" value={ title } />
			</a>
		</div>
	);
}
