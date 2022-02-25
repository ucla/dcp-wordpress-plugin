/* eslint-disable no-unused-vars */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import './style.scss';
import '../../node_modules/react-image-gallery/styles/scss/image-gallery.scss';

import { RichText, InnerBlocks } from '@wordpress/block-editor';
import * as ImageGallery from '../../node_modules/react-image-gallery/build/image-gallery.js';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 * @param {Object} [props]           Properties passed from the editor.
 * @param {Object} props.attributes
 * @param {string} props.attributes.title
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save({
	attributes: {
		titleVisible,
		titleText,
		thumbnail,
		thumbnailPos,
		autoplay,
		autoplayInterval,
		fullscreen,
		captionColor,
		captionLocation,
		captionSize,
		numSlides,
		slideList
	},
	className,
}) {
	console.log(ImageGallery);
	return (
		<div className={className}>
				<img
					src='/website1/wp-content/plugins/wp-uwai-plugin/molecule.png'
					style={{
						position: "absolute",
						left: "-50px",
						top: "30px",
						zIndex: "1",
						// visibility: titleVisible ? "" : "hidden" 
					}}
				/>
				<h3 style={{
						position: "absolute",
						left: "20px",
						top: "30px",
						fontSize: "40px",
						color: "white",
						backgroundColor: "#2774AE",
						zIndex: "1",
						padding: "10px",
						// visibility: titleVisible ? "" : "hidden",
						maxWidth: "35%",
						textTransform: "uppercase"
					}}
				>
					{titleText}
				</h3>
				<h1>hello there!~!!</h1>
				<div style={{zIndex: "-1"}}>
					<ImageGallery
						items={[
								{
									original: 'https://picsum.photos/id/1018/1000/600/',
									thumbnail: 'https://picsum.photos/id/1018/250/150/',
								},
								{
									original: 'https://picsum.photos/id/1015/1000/600/',
									thumbnail: 'https://picsum.photos/id/1015/250/150/',
								},
								{
									original: 'https://picsum.photos/id/1019/1000/600/',
									thumbnail: 'https://picsum.photos/id/1019/250/150/',
								},
							]}
						// showBullets={true}
						// onClick={(e) => console.log(e)}
						// onMouseOver={(e) => console.log(e)}
						// showThumbnails={thumbnail}
						// thumbnailPosition={thumbnailPos}
						// showPlayButton={autoplay}
						// autoPlay={autoplay}
						// slideInterval={autoplayInterval*1000}
						// showFullscreenButton={fullscreen}
					/>
				</div>
		</div>
	);
}
