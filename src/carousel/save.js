/* eslint-disable no-unused-vars */
import './style.scss';

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
		slideList,
		imageUrl0,
		imageAlt0,
		imageUrl1,
		imageAlt1,
		imageUrl2,
		imageAlt2,
		imageUrl3,
		imageAlt3,
		imageUrl4,
		imageAlt4,
		imageUrl5,
		imageAlt5,
		imageUrl6,
		imageAlt6,
		imageUrl7,
		imageAlt7,
	},
	className,
}) {

	const getImageUrl = (index) => {
		switch (index) {
			case 0: imageUrl0;
			break;
			case 1: imageUrl1;
			break;
			case 2: imageUrl2;
			break;
			case 3: imageUrl3;
			break;
			case 4: imageUrl4;
			break;
			case 5: imageUrl5;
			break;
			case 6: imageUrl6;
			break;
			case 7: imageUrl7;
			break;
			default: null;
			break;
		}
	}

	const getImageAlt = (index) => {
		switch (index) {
			case 0: imageAlt0;
			break;
			case 1: imageAlt1;
			break;
			case 2: imageAlt2;
			break;
			case 3: imageAlt3;
			break;
			case 4: imageAlt4;
			break;
			case 5: imageAlt5;
			break;
			case 6: imageAlt6;
			break;
			case 7: imageAlt7;
			break;
			default: null;
			break;
		}
	}

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
						{slideList.map((slide, index) => {
							if (index > numSlides)
								return null;
							return (
								<li className="splide__slide">
									<div className="splide__slide__container">
										{slide.link == '' ?
											<img src={getImageUrl(index)} alt={getImageAlt(index)} className={`.image-no-${index}`} />
										:
											<a href={slide.link} target="_blank">
												<img src={getImageUrl(index)} alt={getImageAlt(index)} className={`.image-no-${index}`} />
											</a>
										}
									</div>
									<p className={`splide-caption ${captionSize} ${slide.captionLocation} ${captionColor}`}>
										{slide.caption}
									</p>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<script type='text/javascript'>
				{`new Splide("#${sliderId}", {type: 'loop'}).mount();`}
			</script>
		</div>
	)
}

