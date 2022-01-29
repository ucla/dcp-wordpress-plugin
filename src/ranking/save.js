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
 * @param {string} props.attributes.segments
 * @param {Boolean} props.attributes.inline
 * @param {Array} props.attributes.rankings
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save({
	attributes: {
		segments,
		inline,
		rankings,
	},
	className,
}) {
	return (
		<div className={className + ' stat-set'}>
			{rankings.map((rank) => {
				if (Number(rank.id) > Number(segments))
					return null;
				return (
					<aside className="stat-wrapper clearfix" key={"ranking-0" + rank.id}>
						<div className={`stat-tout ${inline ? "stat-tout--inline" : ""}`}>
							<RichText.Content
								tagName="span"
								className="stat-tout__number"
								value={rank.ranking}
							/>
							<div className="stat-tout__info-wrap">
								<RichText.Content
									tagName="span"
									className="stat-tout__label"
									value={rank.label}
								/>
								<RichText.Content
									tagName="span"
									className="stat-tout__source"
									value={rank.source}
								/>
							</div>
						</div>
					</aside>
				);
			})}
		</div>
	);
}
