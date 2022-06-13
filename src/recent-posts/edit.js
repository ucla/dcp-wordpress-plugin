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
    RangeControl,
 } from '@wordpress/components';
 import {
	 InspectorControls,
	 RichText,
    useBlockProps
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
export default function Edit({
   attributes,
   setAttributes,
   className
}) {
   const blockProps = useBlockProps();
   const posts = useSelect( select => select('core').getEntityRecords( 'postType', 'post', {_embed: true} ) );
   let {
      greyStyle,
      numberOfPosts,
      displayFeaturedImage
   } = attributes

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
         <PanelBody title={__( 'Display Featured Image' )}>
            <ToggleControl
					label={ __( 'Display featured image') }
					checked={ displayFeaturedImage }
					onChange={ ( value ) =>
						setAttributes( { displayFeaturedImage: value } )
					}
				/>
         </PanelBody>
         <PanelBody title={__( 'Number of Posts' )}>
         <RangeControl
               value={Number(numberOfPosts)}
               onChange={onChangePostsNumber}
               min={1}
               max={5}
            />
         </PanelBody>
      </InspectorControls>
      <div { ...blockProps }>
         {! posts && 'Loading...'}
         {posts && posts.length === 0 && 'No Posts'}
         {posts && posts.length > 0 && (
            posts.slice(0, Number(numberOfPosts)).map( post => {
               let imageURL = post._embedded['wp:featuredmedia'][0].source_url;
               return (
                  <article className={`basic-card${greyStyle ? '-grey' : ''}`}>
                     
                     {imageURL !== undefined &&
                        <p>{imageURL}</p>
                     }
                     <div className="basic-card__info-wrapper">
                        <h3 className="basic-card__title">
                           <RichText
                              tagName='span'
                              value={ post.title.rendered }
                           />
                        </h3>
                        <RichText
                            tagName='p'
                            className='basic-card__description'
                            value={ post.excerpt.rendered.replace(/<[^>]+>/g, '') } // strips HTML tags from excerpt
                            role='textbox'
                            aria-multiline='true'
                         />
                         <div class="basic-card__buttons">
                           <a class="btn btn--tertiary" href={post.link}>
                              Read more about {post.title.rendered}
                           </a>
                        </div>
                     </div>
                  </article>
               )
                } )
         )}
      </div>
      </>
   );
}
 