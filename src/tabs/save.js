/* eslint-disable no-unused-vars */
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
 * @param {string} props.attributes.numTabs
 * @param {array} props.attributes.tabContent
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save({
	attributes: { numTabs, tabContent },
	className,
}) {

	return (
		<section className={`tabs left-align ${className ? className : ''}`}>
			<div role="tablist" aria-label="content-tabs">
				{tabContent.map((tabInfo) => {
					if ((Number(tabInfo.id) > Number(numTabs)))
						return null;
					return (
						<button
							id={"panel-0" + tabInfo.id}
							key={"panel-0" + tabInfo.id}
							className="btn tablinks"
							role="tab"
							aria-controls={"panel-0" + tabInfo.id + "-tab"}
							aria-selected={tabInfo.id === "1" ? true : false}
						>
							<RichText.Content value={tabInfo.title}/>
						</button>
					);
				})}
			</div>
			{tabContent.map((tabInfo) => {
				if ((Number(tabInfo.id) > Number(numTabs)))
					return null;
				return (
					<div
						id={"panel-0" + tabInfo.id + "-tab"}
						key={"panel-0" + tabInfo.id + "-tab"}
						tabindex="0"
						role="tabpanel"
						aria-labelledby={"panel-0" + tabInfo.id}
						className="tabcontent"
						hidden={tabInfo.id === "1" ? false : true}
					>
						<RichText.Content
							tagName='p'
							value={tabInfo.content}
						/>
					</div>
				);
			})}
		</section>
	);
}
 