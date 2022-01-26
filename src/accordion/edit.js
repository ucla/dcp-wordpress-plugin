/* eslint-disable no-unused-vars */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { useState } from '@wordpress/element';
import {
	RichText,
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} [props]           Properties passed from the editor.
 * @param {Object} [props.attributes]
 * @param {string} [props.setAttributes]
 * @param {string} [props.isSelected]
 * @param {string} [props.className] Class name generated for the block.
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	isSelected,
	className,
}) {
	
	let {
		title,
	} = attributes;
	
	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};
	
	const [showBody, setShowBody] = useState(false);
	
	const onClick = () => {
		setShowBody(!showBody);
	};

	return (
		<>
			<article className={className}>
				<section className="accordion">
					<dl>
						<button onMouseDown={onClick} className="accordion__title" aria-expanded="false">
							<dt>
								<RichText
									tagName="span"
									value={attributes.title}
									onChange={onChangeTitle}
									placeholder="Title here"
								/>
							</dt>
						</button>
						<dd className="accordion__content" style={{ display: `${showBody ? 'block' : 'none'}` }}> 
							<InnerBlocks />
						</dd>
					</dl>    
				</section>
			</article>
		</>
	);
}
