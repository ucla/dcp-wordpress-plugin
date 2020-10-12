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
 * @param {string} props.attributes.day
 * @param {string} props.attributes.month
 * @param {string} props.attributes.number
 * @param {string} props.attributes.time
 * @param {string} props.attributes.location
 * @param {boolean} props.attributes.greyStyle
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save( {
	attributes: {
		title,
		mediaUrl,
		mediaAlt,
		greyStyle,
		day,
		month,
		number,
		time,
		location,
	},
	className,
} ) {
	return (
		<div className={ className }>
			<article className={ 'event-card' + ( greyStyle ? '-grey' : '' ) }>
				<img
					className="event-card__image"
					src={
						mediaUrl ??
						'/wp-content/plugins/wp-uwai-plugin/event-card-example-1.jpg'
					}
					alt={
						mediaAlt ??
						'Two children on their phones under the blankets'
					}
				></img>
				<a className="event-card__link" href="#wee">
					<h3 className="event-card__title">
						<RichText.Content tagName="span" value={ title } />
					</h3>
				</a>
				<div className="event-card-info">
					<div className="event-card-info__date">
						<span className="small-block">
							<RichText.Content
								tagName="span"
								value={ day }
								className="event-card-info__day"
							/>
							<RichText.Content
								tagName="span"
								value={ month }
								className="event-card-info__month"
							/>
						</span>
						<RichText.Content
							tagName="span"
							value={ number }
							className="event-card-info__number"
						/>
					</div>
					<div className="event-card-info__time">
						<span className="event-card-icon__time"></span>
						<RichText.Content
							tagName="span"
							value={ time }
							className="event-card-info__time-body"
						/>
					</div>
					<div className="event-card-info__location">
						<span className="event-card-icon__play"></span>
						<RichText.Content
							tagName="span"
							value={ location }
							className="event-card-info__location-body"
						/>
					</div>
					<InnerBlocks.Content />
				</div>
			</article>
		</div>
	);
}
