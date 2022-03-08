/* eslint-disable no-unused-vars */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import {
	PanelBody,
	SelectControl,
} from '@wordpress/components';
import {
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { useState } from '@wordpress/element';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} [props]           Properties passed from the editor.
 * @param {Object} [props.attributes]
 * @param {string} [props.setAttributes]
 * @param {string} [props.isSelected]
 * @param {string} [props.className] Class name generated for the block.
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	className,
}) {
	
	let {
		numTabs,
		tabContent,
	} = attributes;
	
	const [currentTab, setCurrentTab] = useState("1");

	const onChangeTabs = (value) => {
		setAttributes({ numTabs: value });
		setCurrentTab("1");
	};

	const onChangeTitle = (value, titleNum) => {
		const newTabContent = tabContent.slice();
		newTabContent[Number(titleNum)-1].title = value;
		setAttributes({ tabContent: newTabContent });
	};

	const onChangeContent = (value, titleNum) => {
		const newTabContent = tabContent.slice();
		newTabContent[Number(titleNum)-1].content = value;
		setAttributes({ tabContent: newTabContent });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Statistic Style' ) }>
					<SelectControl
						label={__("Number of Tabs")}
						value={ numTabs }
						options={ [
							{ label: '2', value: '2' },
							{ label: '3', value: '3' },
							{ label: '4', value: '4' },
							{ label: '5', value: '5' },
							{ label: '6', value: '6' },
						] }
						onChange={ onChangeTabs }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={`tabs ${className ? className : ''}`}>
				<div role="tablist" aria-label="content-tabs">
					{tabContent.map((tabInfo) => {
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
								<RichText
									value={tabInfo.title}
									onChange={(value) => onChangeTitle(value, tabInfo.id)}
								/>
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
							<RichText
								tagName='p'
								value={tabInfo.content}
								onChange={(value) => onChangeContent(value, tabInfo.id)}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
}
