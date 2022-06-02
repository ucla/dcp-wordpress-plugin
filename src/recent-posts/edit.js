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
 import {
	 PanelBody,
	 TextareaControl,
	 ExternalLink,
	 Button,
	 ToggleControl,
    NumberControl,
 } from '@wordpress/components';
 import {
	 InspectorControls,
	 RichText,
	 InnerBlocks,
 } from '@wordpress/block-editor';
 import { useSelect } from '@wordpress/data';
 
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
 export default function Edit( {
   attributes,
	setAttributes,
   className
   }) {
   let {
      greyStyle,
      postsArray,
      numberOfPosts
   } = attributes;

   const onToggleGreyStyle = ( value ) => {
		greyStyle = value;
		setAttributes( {
			greyStyle: value,
		} );
	};

   const onChangePostsNumber = (value) => {
      numberOfPosts = value; 
      setAttributes( {
         numberOfPosts: value,
      })
   }

   const posts = useSelect( ( select ) => {
      return select( 'core' ).getEntityRecords( 'postType', 'post', { per_page: attributes.numberOfPosts } );
   }, [] );

   console.log(attributes);
   console.log(posts);

   return (
      <>
      <InspectorControls>
         <PanelBody title={ __( 'Style' ) }>
            <ToggleControl
               label={ __( 'Switch to the "Grey" style of tile' ) }
               onChange={ onToggleGreyStyle }
               checked={ greyStyle }
            />
         </PanelBody>
         <PanelBody title={__( 'Number of Posts' )}>

         </PanelBody>
      </InspectorControls>
      <div>
            { ! posts && 'Loading...' }
            { posts && posts.length === 0 && 'No Posts' }
            { posts && posts.length > 0 && (
               posts.map(post => (
                  <article className={
                     className ? className + ' ' : '' + 'basic-card' + ( greyStyle ? '-grey' : '' )
                  }>
                     <div className="basic-card__info-wrapper">
                        <h3 className="basic-card__title">
                        <RichText
                              tagName="span"
                              value={ post.title.rendered }
                           />
                        </h3>
                        <p class="basic-card__description">
                           <RichText
                              tagName="span"
                              value={ post.excerpt.rendered }
                           />
                        </p>
                        <div class="basic-card__buttons">
                           <button class="btn btn--tertiary" href={ post.link }>
                              Read More About {post.title.rendered}
                           </button>
                        </div>
                     </div>
                  </article>
               ))
            ) }
      </div>
      </>
   );
 }
 