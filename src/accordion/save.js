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
	attributes: { title },
	className,
}) {
	return (
			<section className={`accordion${className ? className : ''}`}>
				<dl>
					<button className="accordion__title" aria-expanded="false">
						<dt>
							{/* Title */}
							<RichText.Content
								tagName="span"
								// className="copy__headline-ribbon"
								value={title}
							/>
						</dt>
					</button>

					<dd className="accordion__content"> 
						{/* <RichText.Content
							tagName="span"
							// className="copy__headline-ribbon"
							value={body}
						/> */}
						{/* <p>         
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus sed tellus id ullamcorper. In iaculis dolor vitae urna mattis, vel pellentesque dui semper. Sed dignissim, lorem eget tincidunt sollicitudin, nulla nibh gravida arcu, a fringilla turpis risus id eros. Aliquam lobortis iaculis nunc. Integer imperdiet lacus eget arcu aliquam volutpat. Integer molestie consequat facilisis. Nam dui odio, hendrerit porttitor elit ac, auctor tristique dui. Proin a bibendum sem, ac laoreet neque. Vestibulum elit sem, tincidunt eu lorem at, ullamcorper gravida nulla. Phasellus nec ex eros. Donec at odio eget turpis luctus euismod. Fusce mi ex, tincidunt nec accumsan fringilla, tincidunt venenatis ex. Praesent hendrerit quis dolor hendrerit tristique. Quisque ut metus turpis.
						</p> */}
						<InnerBlocks.Content />
					</dd>
				</dl>    
			</section>
	);
}
