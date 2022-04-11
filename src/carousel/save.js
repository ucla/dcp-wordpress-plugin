/* eslint-disable no-unused-vars */
import './style.scss';
import '@splidejs/splide';

const defaultImages = [
	"./wp-content/plugins/wp-uwai-plugin/assets/upper_build.jpg",
	"./wp-content/plugins/wp-uwai-plugin/assets/trees.jpg",
	"./wp-content/plugins/wp-uwai-plugin/assets/kerchoff.jpg",
	"./wp-content/plugins/wp-uwai-plugin/assets/cyard_overview.jpg",
	"./wp-content/plugins/wp-uwai-plugin/assets/bwalk.jpg",
	"./wp-content/plugins/wp-uwai-plugin/assets/bruin_store.jpg",
	"./wp-content/plugins/wp-uwai-plugin/assets/big_1.jpg",
	"./wp-content/plugins/wp-uwai-plugin/assets/bear.jpg",
]

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
		autoplay,
		autoplayInterval,
		thumbnailSlider,
		arrowsLocation,
		bulletsLocation,
		pauseLocation,
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
		var urlLink;
		switch (index) {
			case 0:
				urlLink = imageUrl0;
				break;
			case 1:
				urlLink = imageUrl1;
				break;
			case 2:
				urlLink = imageUrl2;
				break;
			case 3:
				urlLink = imageUrl3;
				break;
			case 4:
				urlLink = imageUrl4;
				break;
			case 5:
				urlLink = imageUrl5;
				break;
			case 6:
				urlLink = imageUrl6;
				break;
			case 7:
				urlLink = imageUrl7;
				break;
			default:
				return null;
		}
	
		for (var i = 0; i < defaultImages.length; i++) {
			if (defaultImages[i] === urlLink) {
				return null;
			}
		}

		return urlLink;
	}

	const getImageAlt = (index) => {
		switch (index) {
			case 0:
				return imageAlt0;
			case 1:
				return imageAlt1;
			case 2:
				return imageAlt2;
			case 3:
				return imageAlt3;
			case 4:
				return imageAlt4;
			case 5:
				return imageAlt5;
			case 6:
				return imageAlt6;
			case 7:
				return imageAlt7;
			default:
				return null;
		}
	}

	return (
		<div className={className}>
			<img
				src='./wp-content/plugins/wp-uwai-plugin/molecule.svg'
				className={`title-image ${titleVisible ? "" : "hidden"}`}
			/>
			<h1 className={`title-text ${titleVisible ? "" : "hidden"}`}>
				{titleText.split(" ").map((word) =>
					<span className='title-word'>
						{word}
					</span>
				)}
			</h1>
			<div id={sliderId ?? 'my-splide'} className="splide">
				{autoplay ?
					<div className="splide-autoplay-controls">
						<img
							className={`${pauseLocation == 'pause-top' ? 'play-pause-top' : 'play-pause-bottom'} toggle-${sliderId}`}
							src={'./wp-content/plugins/wp-uwai-plugin/pause-white.svg'}
							alt="Pause Carousel"
						/>
					</div>
				: null}
				<div className="splide__track">
					<ul className="splide__list" style={{height: '550px'}}>
						{slideList.slice(0, Number(numSlides)).map((slide, index) =>
							<li className="splide__slide">
								<div className="splide__slide__container">
									{slide.link == '' ?
										<img
											src={getImageUrl(index) ?? defaultImages[index]}
											alt={getImageAlt(index)}
											className={`splide-image ${getImageUrl(index) != null ? `image-no-${index}` : ''}`}
										/>
									:
										<a href={slide.link} target="_blank">
											<img
												src={getImageUrl(index) ?? defaultImages[index]}
												alt={getImageAlt(index)}
												className={`splide-image ${getImageUrl(index) != null ? `image-no-${index}` : ''}`}
											/>
										</a>
									}
								</div>
								<p className={`splide-caption ${captionSize} ${slide.captionLocation} ${captionColor}`}>
									{slide.caption}
								</p>
							</li>
						)}
					</ul>
				</div>
			</div>
			{thumbnailSlider ?
				<div
					id={sliderId ? `${sliderId}-thumbnails` : 'my-splide-thumbnails'}
					class="splide"
				>
					<div class="splide__track">
						<ul class="splide__list">
							{slideList.slice(0, Number(numSlides)).map((slide, index) =>
								<li className="splide__slide">
									<div className="splide__slide__container">
										<img
											src={getImageUrl(index) ?? defaultImages[index]}
											alt={`Thumbnail for ${getImageAlt(index)}`}
											className={`thumbnail-images`}
										/>
									</div>
								</li>
							)}
						</ul>
					</div>
				</div>
			: null}
			<script type='text/javascript'>
				{`
					if (${thumbnailSlider ? "true" : "false"}) {
						document.addEventListener( 'DOMContentLoaded', function () {
							var main = new Splide( "#${sliderId ?? 'my-splide'}", {
								type: 'fade',
								width: '100%',
								height: '70vh',
								cover: true,
								autoplay: ${autoplay ? "true" : "false"},
								interval: ${Number(autoplayInterval) * 1000},
								speed: 800,
								pauseOnHover: false,
								pauseOnFocus: false,
								classes: {
									arrows: 'splide__arrows',
									arrow: 'splide__arrow ${arrowsLocation === 'arrows-top' ? '' : 'arrows-either-side'}',
									prev: 'splide__arrow--prev',
									next: 'splide__arrow--next ${arrowsLocation === 'arrows-top' ? '' : 'arrows-either-side-right'}',
									pagination: 'splide__pagination ${bulletsLocation === 'bullets-below' ? 'pagination-below' : 'pagination-internal'}',
									page: 'splide__pagination__page',
								},
							} );
						
							var thumbnails = new Splide( "#${sliderId ? `${sliderId}-thumbnails` : 'my-splide-thumbnails'}", {
								fixedWidth  : 100,
								fixedHeight : 60,
								gap         : 10,
								rewind      : true,
								pagination  : false,
								cover       : true,
								isNavigation: true,
								breakpoints : {
									600: {
										fixedWidth : 60,
										fixedHeight: 44,
									},
								},
							} );
						
							thumbnails.sync( main );
							main.mount();
							thumbnails.mount();
						});
					} else {
						document.addEventListener( 'DOMContentLoaded', function () {
							var main = new Splide("#${sliderId ?? 'my-splide'}", {
								type: 'loop',
								width: '100%',
								height: '70vh',
								cover: true,
								autoplay: ${autoplay ? "true" : "false"},
								interval: ${Number(autoplayInterval) * 1000},
								speed: 800,
								pauseOnHover: false,
								pauseOnFocus: false,
								classes: {
									arrows: 'splide__arrows',
									arrow: 'splide__arrow ${arrowsLocation === 'arrows-top' ? '' : 'arrows-either-side'}',
									prev: 'splide__arrow--prev',
									next: 'splide__arrow--next ${arrowsLocation === 'arrows-top' ? '' : 'arrows-either-side-right'}',
									pagination: 'splide__pagination ${bulletsLocation === 'bullets-below' ? 'pagination-below' : 'pagination-internal'}',
									page: 'splide__pagination__page',
								},
							});

							if (${autoplay ? "true" : "false"}) {
								var toggleButton = main.root.querySelector( '.toggle-${sliderId}' );
								
								main.on( 'autoplay:play', function () {
									toggleButton.src = './wp-content/plugins/wp-uwai-plugin/pause-white.svg';
									toggleButton.alt = 'Pause Carousel';
								} );

								main.on( 'autoplay:pause', function () {
									toggleButton.src = './wp-content/plugins/wp-uwai-plugin/play-white.svg';
									toggleButton.alt = 'Play Carousel';
								} );

								toggleButton.addEventListener( 'click', function () {
									var Autoplay = main.Components.Autoplay;
									if ( toggleButton.alt == 'Play Carousel' ) {
										Autoplay.play();
									} else {
										Autoplay.pause();
									}
								});
							}
							main.mount();
						});
					}
				`}
			</script>
		</div>
	)
}

