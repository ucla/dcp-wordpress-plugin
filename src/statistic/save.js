/* eslint-disable no-unused-vars */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import './style.scss';

import { RichText } from '@wordpress/block-editor';

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
 * @param {string} props.attributes.url
 * @param {string} props.attributes.rel
 * @param {string} props.attributes.mediaAlt
 * @param {boolean} props.attributes.greyStyle
 * @param {boolean} props.attributes.department
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save({
	attributes: {
		segments,
		inline,
		statistics,
	},
	className,
}) {
	return (
		<div className={className + " stat-set"}>
			{statistics.map((stat) => {
				if (Number(stat.id) > Number(segments))
					return null;
				return(
					<aside className="stat-wrapper clearfix" key={"statistic-0" + stat.id}>
						<div className={`stat-tout ${inline ? 'stat-tout--inline' : ''}`}>
							<RichText.Content
								tagName="span"
								className="stat-tout__number"
								value={stat.number}
							/>
							<div className="stat-tout__info-wrap">
								<RichText.Content
									tagName="span"
									className="stat-tout__label"
									value={stat.label}
								/>
							</div>
						</div>
					</aside>
				);
			})}
		</div>
	);
}
