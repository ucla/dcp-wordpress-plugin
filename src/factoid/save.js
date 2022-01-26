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
 * @param {string} props.attributes.body
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save({
	attributes: { title, body },
	className,
}) {
	return (
		<div className={className}>
			<RichText.Content
				tagName="h3"
				value={title}
			/>
			<aside className="stat-wrapper clearfix">
				<div className="stat-tout stat-tout--inline">
					<div className="stat-tout__info-wrap">
						<RichText.Content
							tagName="span"
							className="stat-tout__label"
							value={body}
						/>
					</div>
				</div>
			</aside>
		</div>
	);
}
