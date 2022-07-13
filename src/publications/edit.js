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
	const blockProps = useBlockProps();
	const publications = useSelect(select => select('core').getEntityRecords('postType', 'publication', {_embed: true}));
	let {numberOfPosts, displayAuthor} = attributes;

	const onChangePostsNumber = (value) => {
		numberOfPosts = value; 
		setAttributes( {
		   numberOfPosts: value,
		})
	 }

	// if (publications) {
	// 	console.log('publications', publications)
	// }
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Number of Publications' ) }>
					<RangeControl
						value={Number(numberOfPosts)}
						onChange={onChangePostsNumber}
						min={1}
						max={6}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Display Author' ) }>
					<ToggleControl
						label={ __( 'Display Author' ) }
						checked={ displayAuthor }
						onChange={ value => setAttributes( {displayAuthor: value} ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{!publications && 'Loading...'}
				{publications && publications.length === 0 && 'No Publications'}
				{publications && publications.length > 0 &&
					
						publications.slice(0, Number(numberOfPosts)).map(publication => {
							let imageURL = null;
							publication.featured_media == 0 ?
								imageURL : imageURL = publication._embedded['wp:featuredmedia'][0].source_url;
							return (
								<article className="basic-card">
									<img class="basic-card__image" src={imageURL} alt={publication.title.rendered} />
									
									<div className="basic-card__info-wrapper">
										<h3 className="basic-card__title">
										<RichText
											tagName='span'
											value={ publication.title.rendered }
										/>
										</h3>
										{attributes.displayAuthor === true &&
											<RichText
												tagName='p'
												className='basic-card__description'
												value={ publication?.publication_author.rendered }
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