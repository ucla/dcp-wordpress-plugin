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
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save({
	attributes: { title },
	className,
}) {
	return (
			<section className={`accordion${className ? className : ''}`}>
				<dl>
					<button className="accordion__title" aria-expanded="false">
						<dt>
							<RichText.Content
								tagName="span"
								value={title}
							/>
						</dt>
					</button>

					<dd className="accordion__content"> 
						<InnerBlocks.Content />
					</dd>
				</dl>    
			</section>
	);
}
