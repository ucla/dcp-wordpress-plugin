/* eslint-disable no-unused-vars */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import './editor.scss';
import {
    PanelBody,
	ToggleControl,
} from '@wordpress/components';
import {
    InspectorControls,
    useBlockProps,
	RichText
} from '@wordpress/block-editor';

 /**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} [props]           Properties passed from the editor.
 * @param {Object} [props.attributes]
 * @param {string} [props.setAttributes]
 * @param {string} [props.className] Class name generated for the block.
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	className,
}) {
    let {molecule} = attributes; 

    const blockProps = useBlockProps({
        // className: molecule && 'has-molecule'
    });
    // const onMoleculeChange = (value) => {
    //     molecule = value
    //     setAttributes({molecule: value});
    // }
    return (
        <div {...blockProps}>
            {/* <InspectorControls>
                <PanelBody>
                    <ToggleControl
                        label={ __('Molecule') }
                        checked={molecule}
                        onChange={onMoleculeChange}
                    />
                </PanelBody>
            </InspectorControls>
            {molecule &&
                    
                    <img class="has-molecule" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='135' height='135'%3E%3Cpath d='M63.967.093l48.7 17.245 22.24 46.63-17.245 48.698-46.63 22.241-48.698-17.245L.093 71.032l17.245-48.698z' fill='%23FFD100' fill-rule='evenodd' opacity='.5'/%3E%3C/svg%3E" />
                
            } */}
            <div className={`ribbon${className ? ' ' + className : ''}`}>
                
                <RichText
                    tagName='h2'
                    value={ attributes.content }
                    onChange={ content => setAttributes({content}) }
                    placeholder={__('15 of the 20 largest fires in Californian history have occurred since 2000.')}
                    preserveWhiteSpace={false}
                />
            </div>
        </div>
    );
}