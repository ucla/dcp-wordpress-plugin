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
     ColorPalette,
     TextareaControl,
     ExternalLink,
     Button,
     SelectControl
 } from '@wordpress/components';
 import {
	 useBlockProps,
     InspectorControls,
     RichText,
     InnerBlocks,
     MediaUpload,
     MediaUploadCheck,
 } from '@wordpress/block-editor';
 import { useSelect } from '@wordpress/data'
 import { useState, useEffect } from '@wordpress/element'
 
 function attributesFromMedia({ attributes, setAttributes }) {
     return (media) => {
         let mediaType;
         let src;
         // for media selections originated from a file upload.
         if (media.media_type) {
             if (media.media_type === 'image') {
                 mediaType = 'image';
             } else {
                 // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
                 // video contain the media type of 'file' in the object returned from the rest api.
                 mediaType = 'video';
             }
         } else {
             // for media selections originated from existing files in the media library.
             mediaType = media.type;
         }
 
         if (mediaType === 'image') {
             // Try the "large" size URL, falling back to the "full" size URL below.
             src =
                 media.sizes?.full?.url ||
                 // eslint-disable-next-line camelcase
                 media.media_details?.sizes?.full?.source_url;
         }
 
         setAttributes({
             mediaAlt: media.alt,
             mediaId: media.id,
             mediaType,
             mediaUrl: src || media.url,
             focalPoint: undefined,
         });
     };
 }
 
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
     clientId,
 }) {
     let {
         mediaAlt,
         mediaUrl,
         cardType,
         bannerContainer,
         storyBg
     } = attributes;
     const { bannerContent } = useSelect(select => {
        let bannerBlock = select("core/block-editor").getBlock(clientId);
        let hasContent = false;
        if ( bannerBlock.innerBlocks.length > 0 ) {
            bannerBlock.innerBlocks.map(block=> {
                if (block.attributes.content === '') {
                    return;
                } else {
                    hasContent = true
                }
            })
        }
        return {
            bannerContent: hasContent === true ? select("core/block-editor").getBlockCount(clientId) : 0
        }
     });
     const [type, setType] = useState(cardType);
     const [width, setWidth] = useState(bannerContainer);
     const [storyBackground, setStoryBackground] = useState(storyBg);
     const storyColors = [
        { name: 'White', color: '#fff' },
        { name: 'UCLA Blue', color: '#2774AE' }
     ];
     const innerAllowed = [ 'core/paragraph', 'core/heading', 'core/button', 'uwai/button', 'uwai/ribbon' ];
	 const blockProps = useBlockProps({
        className: type === 'story' ? `hero-story${width === 'fluid' ? ' full-width' : ''}` : `hero-banner${width === 'fluid' ? ' full-width' : ''}`
     });
 
     const onSelectMedia = attributesFromMedia({ attributes, setAttributes });
 
     const onMediaAltChange = (newMediaAlt) => {
         setAttributes({ mediaAlt: newMediaAlt });
     };

     const onImgCreditChange = value => {
        setAttributes({imgCredit: value})
     }

     const onCardTypeChange = value => {
        setType(value)
        setAttributes({cardType: value})
     }

     const onBannerContainerChange = value => {
        setWidth(value)
        setAttributes({bannerContainer: value})
     }
     useEffect(() => {
        setAttributes({ bannerContent });
    }, [bannerContent]);
     return (
         <div {...blockProps}>
             <InspectorControls>
                <PanelBody
                     title={__('Select card type')}
                     initialOpen={true}
                 >
                    <SelectControl
                        label={__( 'Hero Type' )}
                        value={ type }
                        options={[
                            {label: 'Full Banner', value: 'full'},
                            {label: 'Story', value: 'story'},
                        ]}
                        onChange={(selected) => {
                            onCardTypeChange(selected)
                        }}
                        __nextHasNoMarginBottom
                    />
                 </PanelBody>
                 <PanelBody>
                    <SelectControl
                        label={__('Width')}
                        value={width}
                        options={[
                            {label: 'Full Width', value: 'fluid'},
                            {label: 'Contained', value: 'container'}
                        ]}
                        onChange={selected=> {
                            onBannerContainerChange(selected)
                        }}
                        __nextHasNoMarginBottom
                    />
                 </PanelBody>
                 {cardType === 'story' &&
                    <PanelBody title="Story Content Background Color">
                        <ColorPalette
                            colors={storyColors}
                            disableCustomColors={true}
                            onChange={value=>{setAttributes({storyBg:value});setStoryBackground(value)}}
                        />
                    </PanelBody>
                    
                 } 
                 <PanelBody
                     title={__('Select card image')}
                     initialOpen={true}
                 >
                    
                     <div className="editor-post-featured-image">
                         <MediaUploadCheck>
                             <MediaUpload
                                 onSelect={onSelectMedia}
                                 value={attributes.mediaId}
                                 allowedTypes={['image']}
                                 render={({ open }) => (
                                     <Button
                                         className={
                                             !attributes.mediaId
                                                 ? 'editor-post-featured-image__toggle'
                                                 : 'editor-post-featured-image__preview'
                                         }
                                         onClick={open}
                                     >
                                         {!attributes.mediaId &&
                                             __('Choose an image', 'awp')}
                                         {mediaUrl && (
                                             <img
                                                 src={mediaUrl}
                                                 alt={mediaAlt}
                                             />
                                         )}
                                     </Button>
                                 )}
                             />
                         </MediaUploadCheck>
                         {width === 'fluid' && <p><small>Hi-resolution image is recommended for Full Width</small></p>}
                         {attributes.mediaId && (
                             <MediaUploadCheck>
                                 <MediaUpload
                                     title={__('Replace image', 'awp')}
                                     value={attributes.mediaId}
                                     onSelect={onSelectMedia}
                                     allowedTypes={['image']}
                                     render={({ open }) => (
                                         <Button onClick={open} variant="secondary">
                                             {__('Replace image', 'awp')}
                                         </Button>
                                     )}
                                 />
                             </MediaUploadCheck>
                         )}
                         {attributes.mediaId && (
                             <TextareaControl
                             label={__('Alt text (alternative text)')}
                             value={mediaAlt}
                             onChange={onMediaAltChange}
                             help={
                                 <>
                                     <ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
                                         {__(
                                             'Describe the purpose of the image'
                                         )}
                                     </ExternalLink>
                                     {__(
                                         'Leave empty if the image is purely decorative.'
                                     )}
                                 </>
                             }
                         />
                         )}
                     </div>
                 </PanelBody>
                
             </InspectorControls>
            {attributes.cardType === 'story' &&
                <section className="story">
                    <div className="story__featured">
                        <article className="story__featured-card">
                                <img class="story__featured-image" src={mediaUrl ?? 'https://picsum.photos/id/1005/500/700'} alt="" />
                            <div class="story__featured-content" style={{backgroundColor: storyBackground}}>
                                <InnerBlocks
                                    allowedBlocks={ innerAllowed }
                                    template={[
                                        ['core/heading', { placeholder: 'Featured Story', className: 'story__featured-title' }],
                                        ['core/paragraph', { placeholder: "Hall of Famer Bill Walton '74 recently talked about his approach to life, what he's learned and his love for his alma mater.", className: 'story__featured-blurb' }]
                                    ]}
                                />
                            </div>
                        </article>
                    </div>
                </section>
            }
            {attributes.cardType === 'full' && 
                <section className="banner" style={{'backgroundImage': `url(${mediaUrl ?? 'https://picsum.photos/id/1005/500/700'})`}}>
                    <div className="banner__content">
                        <InnerBlocks
                            allowedBlocks={ innerAllowed }
                            template={[
                                ['core/heading', { placeholder: 'Heading' }],
                                ['core/paragraph', { placeholder: "Hall of Famer Bill Walton '74 recently talked about his approach to life, what he's learned and his love for his alma mater." }]
                            ]}
                        />
                    </div>
                </section>
            }
         </div>
     );
 }
 