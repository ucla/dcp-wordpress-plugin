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
 export default function save({
    attributes: { postsArray, numberOfPosts, greyStyle },
	className
 }) {
	 return (
         <div className={className}>
             {postsArray.map(post=>(
                 <div>{post.title.rendered}</div>
             ))}
         </div>
     );
 }
 