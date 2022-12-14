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
 * @param {string} props.attributes.ribbonContent
 * @param {string} props.attributes.highlight
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save({
    attributes: { ribbonContent, highlight, molecule },
	className,
}) {
    return (
        <div className={`ribbon${className ? ' ' + className : ''}${highlight === 'highlight' ? ' ribbon--highlight' : molecule === true ? ' has-molecule' : ''}`}>
            <RichText.Content
                tagName={highlight === 'highlight' ? 'h3' : 'h2'}
                value={ ribbonContent }
            />
        </div>
    );
};
