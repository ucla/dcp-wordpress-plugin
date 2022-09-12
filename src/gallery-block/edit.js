/* eslint-disable no-unused-vars */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
 import { __ } from '@wordpress/i18n';

 import {
	PanelBody,
	RangeControl,
	ToggleControl
} from '@wordpress/components';
import {
	useBlockProps,
	InspectorControls,
	RichText
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

import './editor.scss';

export default function Edit({
	attributes,
	setAttributes
}) {
	const blockProps = useBlockProps({className: 'gallery-container'});
	const galleries = useSelect(select => select('core').getEntityRecords('postType', 'gallery', {_embed: true}));
	console.log(galleries);
	let {numberOfPosts, displayExcerpt} = attributes;

	const onChangePostsNumber = (value) => {
		numberOfPosts = value; 
		setAttributes( {
		   numberOfPosts: value,
		})
	 }

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Number of Posts' ) }>
					<RangeControl
						value={Number(numberOfPosts)}
						onChange={onChangePostsNumber}
						min={1}
						max={6}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Display Excerpt' ) }>
					<ToggleControl
						label={ __( 'Display Excerpt' ) }
						checked={ displayExcerpt }
						onChange={ value => setAttributes( {displayExcerpt: value} ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{!galleries && 'Loading...'}
				{galleries && galleries.length === 0 && 'No Galleries'}
				{galleries && galleries.length > 0 &&
					
						galleries.slice(0, Number(numberOfPosts)).map(gallery => {
							let imageURL = null;
							gallery.featured_media == 0 ?
								imageURL : imageURL = gallery._embedded['wp:featuredmedia'][0].source_url;
							return (
								<article className="basic-card">
									{imageURL != null && 
										<img class="basic-card__image" src={imageURL} alt={gallery.title.rendered} />
									}
									
									<div className="basic-card__info-wrapper">
										<h3 className="basic-card__title">
										<RichText
											tagName='span'
											value={ gallery.title.rendered }
										/>
										</h3>
										{attributes.displayExcerpt === true &&
											<RichText
												tagName='p'
												className='basic-card__description'
												value={ gallery?.excerpt.rendered }
											/>
										}
									</div>
								</article>
							)
						})
					
				}
			</div>
		</>
	)
};