/* eslint-disable no-unused-vars */
import { RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 * @param {Object} [props]           Properties passed from the editor.
 * @param {Object} props.attributes
 * @param {string} props.attributes.body
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save({
	attributes: { body },
	className,
}) {
	return (
		<aside className={`stat-wrapper clearfix${className ? ' ' + className : ''}`}>
			<div className="stat-tout stat-tout--inline stat-tout__info-wrap">
				<RichText.Content
					tagName="span"
					className="stat-tout__label"
					value={body}
				/>
			</div>
		</aside>
	);
}
