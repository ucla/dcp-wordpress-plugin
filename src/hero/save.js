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
 * @param {boolean} props.attributes.department
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save({
	attributes: {
		body,
		mediaUrl,
		mediaAlt,
		greyStyle,
		department,
		cardType,
		bannerContainer,
		storyBg,
		bannerContent
	},
	className,
}) {
	
	switch (cardType) {
		case 'story':
			return (
				<section className={`story${className ? ' ' + className : ''}${bannerContainer === 'fluid' ? ' full-width' : ''}`}>
					<div className="story__featured">
						<article className="story__featured-card">
							<img className="story__featured-image" src={mediaUrl ?? 'https://picsum.photos/id/1005/500/700'} />
							<div className="story__featured-content" style={{backgroundColor: storyBg}}>
								<InnerBlocks.Content />
							</div>
						</article>
					</div>
				</section>
			);
		break;
		case 'full':
			return (
				<section className={`hero-banner-container${className ? ' ' + className : ''}${bannerContainer === 'fluid' ? ' full-width' : ''}`} style={{'backgroundImage': `url(${mediaUrl ?? 'https://picsum.photos/id/1005/500/700'})`}}>
					{bannerContent > 0 && (
					<div className="hero-banner__content">
						<InnerBlocks.Content />
					</div>
					)}
				</section>
			);
		break;
		default:
			console.log('cardType', cardType);
		break;
	}
	
}
