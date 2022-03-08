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
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save({
	attributes: {
		sliderId,
		titleVisible,
		titleText,
		captionColor,
		captionSize,
		numSlides,
		slideList
	},
	className,
}) {

	return (
		<div className={className}>
			<img
				src='/website1/wp-content/plugins/wp-uwai-plugin/molecule.png'
				className={`title-image ${titleVisible ? "" : "hidden"}`}
			/>
			<h1 className={`title-text ${titleVisible ? "" : "hidden"}`}>
				{titleText.split(" ").map((word) =>
					<span className='title-word'>
						{word}
					</span>
				)}
			</h1>
			<div id={sliderId} className="splide">
				<div className="splide__track">
					<ul className="splide__list">
						<li className="splide__slide">
							<div className="splide__slide__container">
								{slideList[0].link == '' ?
									<img src="https://picsum.photos/id/1018/1000/600/" />
								:
									<a href={slideList[0].link} target="_blank">
										<img src="https://picsum.photos/id/1018/1000/600/" />
									</a>
								}
							</div>
							<p className={`splide-caption ${captionSize} ${slideList[0].captionLocation} ${captionColor}`}>
								{slideList[0].caption}
							</p>
						</li>
						<li className="splide__slide">
							<div className="splide__slide__container">
								{slideList[1].link == '' ?
									<img src="https://picsum.photos/id/1018/1000/600/" />
								:
									<a href={slideList[1].link} target="_blank">
										<img src="https://picsum.photos/id/1018/1000/600/" />
									</a>
								}								</div>
							<p className={`splide-caption ${captionSize} ${slideList[1].captionLocation} ${captionColor}`}>
								{slideList[1].caption}
							</p>
						</li>
						<li className="splide__slide">
							<div className="splide__slide__container">
								{slideList[2].link == '' ?
									<img src="https://picsum.photos/id/1018/1000/600/" />
								:
									<a href={slideList[2].link} target="_blank">
										<img src="https://picsum.photos/id/1018/1000/600/" />
									</a>
								}								</div>
							<p className={`splide-caption ${captionSize} ${slideList[2].captionLocation} ${captionColor}`}>
								{slideList[2].caption}
							</p>
						</li>
						<li className="splide__slide">
							<div className="splide__slide__container">
								{slideList[3].link == '' ?
									<img src="https://picsum.photos/id/1018/1000/600/" />
								:
									<a href={slideList[3].link} target="_blank">
										<img src="https://picsum.photos/id/1018/1000/600/" />
									</a>
								}								</div>
							<p className={`splide-caption ${captionSize} ${slideList[3].captionLocation} ${captionColor}`}>
								{slideList[3].caption}
							</p>
						</li>
						<li className="splide__slide">
							<div className="splide__slide__container">
								{slideList[4].link == '' ?
									<img src="https://picsum.photos/id/1018/1000/600/" />
								:
									<a href={slideList[4].link} target="_blank">
										<img src="https://picsum.photos/id/1018/1000/600/" />
									</a>
								}								</div>
							<p className={`splide-caption ${captionSize} ${slideList[4].captionLocation} ${captionColor}`}>
								{slideList[4].caption}
							</p>
						</li>
						<li className="splide__slide">
							<div className="splide__slide__container">
								{slideList[5].link == '' ?
									<img src="https://picsum.photos/id/1018/1000/600/" />
								:
									<a href={slideList[5].link} target="_blank">
										<img src="https://picsum.photos/id/1018/1000/600/" />
									</a>
								}								</div>
							<p className={`splide-caption ${captionSize} ${slideList[5].captionLocation} ${captionColor}`}>
								{slideList[5].caption}
							</p>
						</li>
						<li className="splide__slide">
							<div className="splide__slide__container">
								{slideList[6].link == '' ?
									<img src="https://picsum.photos/id/1018/1000/600/" />
								:
									<a href={slideList[6].link} target="_blank">
										<img src="https://picsum.photos/id/1018/1000/600/" />
									</a>
								}								</div>
							<p className={`splide-caption ${captionSize} ${slideList[6].captionLocation} ${captionColor}`}>
								{slideList[6].caption}
							</p>
						</li>
						<li className="splide__slide">
							<div className="splide__slide__container">
								{slideList[7].link == '' ?
									<img src="https://picsum.photos/id/1018/1000/600/" />
								:
									<a href={slideList[7].link} target="_blank">
										<img src="https://picsum.photos/id/1018/1000/600/" />
									</a>
								}								</div>
							<p className={`splide-caption ${captionSize} ${slideList[7].captionLocation} ${captionColor}`}>
								{slideList[7].caption}
							</p>
						</li>
					</ul>
				</div>
			</div>
			<script type='text/javascript'>{`new Splide("#${sliderId}", {type: 'loop'}).mount();`}</script>
		</div>
	)
}

