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
 * @param {string} props.attributes.numTabs
 * @param {string} props.attributes.tabContent
 * @param {string} props.className
 * @return {WPElement} Element to render.
 */
export default function save({
	attributes: { numTabs, tabContent },
	className,
}) {

	const [currentTab, setCurrentTab] = useState("1");

	return (
		<div className={`tabs ${className ? className : ''}`}>
			<div role="tablist" aria-label="content-tabs">
				{tabContent.map((tabInfo) => {
					console.log(tabContent)
					console.log(tabInfo)
					console.log(attributes)
					console.log(numTabs)
					if ((Number(tabInfo.id) > Number(numTabs)))
						return null;
					return (
						<button
							onClick={() => setCurrentTab(tabInfo.id)}
							id={"panel-0" + tabInfo.id}
							key={"panel-0" + tabInfo.id}
							className="btn tablinks"
							role="tab"
							aria-selected={currentTab == tabInfo.id ? "true" : "false"}
							aria-controls={"panel-0" + tabInfo.id + "-tab"}
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
						hidden={currentTab == tabInfo.id ? "" : "hidden"}
					>
						<RichText.Content value={tabInfo.content}/>
					</div>
				);
			})}
		</div>
	);
}
